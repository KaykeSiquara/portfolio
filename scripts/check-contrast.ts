// Lê o tokens.css, resolve as cadeias de var() por tema e confere cada par
// contra a WCAG 2.1. Falha com exit 1.
//
// Lê o CSS em vez de manter uma cópia dos valores porque uma lista paralela sai
// de sincronia no primeiro ajuste de cor.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { contrastRatio, formatRatio, oklchToRgb, parseCssColor, toHex } from '../src/lib/color.ts'
import { CONTRAST_PAIRS, MIN_RATIO, THEMES } from '../src/lib/contrast-pairs.ts'
import type { ContrastPair, Theme } from '../src/lib/contrast-pairs.ts'

const here = dirname(fileURLToPath(import.meta.url))
const TOKENS_PATH = resolve(here, '../src/styles/tokens.css')

type Block = { selector: string; declarations: Map<string, string> }

// Não é um parser de CSS completo e não precisa ser: o tokens.css é plano.
// Aninhamento novo aparece como bloco ignorado, não como valor errado.
function readBlocks(css: string): Block[] {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const blocks: Block[] = []
  let index = 0

  while (index < withoutComments.length) {
    const open = withoutComments.indexOf('{', index)
    if (open === -1) break

    const selector = withoutComments.slice(index, open).trim()
    let depth = 1
    let cursor = open + 1
    while (cursor < withoutComments.length && depth > 0) {
      const ch = withoutComments[cursor]
      if (ch === '{') depth++
      else if (ch === '}') depth--
      cursor++
    }

    const body = withoutComments.slice(open + 1, cursor - 1)
    if (!selector.startsWith('@')) {
      const declarations = new Map<string, string>()
      for (const match of body.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
        if (match[1] && match[2]) declarations.set(match[1].slice(2), match[2].trim())
      }
      if (declarations.size > 0) blocks.push({ selector, declarations })
    }

    index = cursor
  }

  return blocks
}

function selectorMatches(selector: string, wanted: string[]): boolean {
  return selector
    .split(',')
    .map((part) => part.trim().replace(/["']/g, "'"))
    .some((part) => wanted.includes(part))
}

// Empilha na ordem da cascata: o último a escrever ganha.
function buildScope(blocks: Block[], theme: Theme, scope?: 'inatos'): Map<string, string> {
  const wanted =
    theme === 'light' ? [':root', "[data-theme='light']"] : [':root', "[data-theme='dark']"]

  const resolved = new Map<string, string>()

  for (const block of blocks) {
    if (block.selector.includes('.inatos-palette')) continue
    const isDarkOnly = selectorMatches(block.selector, ["[data-theme='dark']"])
    if (theme === 'light' && isDarkOnly) continue
    if (selectorMatches(block.selector, wanted)) {
      for (const [key, value] of block.declarations) resolved.set(key, value)
    }
  }

  if (scope === 'inatos') {
    for (const block of blocks) {
      if (!block.selector.includes('.inatos-palette')) continue
      const isDarkScope = block.selector.includes("[data-theme='dark']")
      if (theme === 'light' && isDarkScope) continue
      for (const [key, value] of block.declarations) resolved.set(key, value)
    }
  }

  return resolved
}

// Segue var(--a) até um literal. Corta ciclo em vez de travar.
function resolveToken(name: string, scope: Map<string, string>, seen = new Set<string>()): string | null {
  if (seen.has(name)) return null
  seen.add(name)

  const raw = scope.get(name)
  if (!raw) return null

  const varRef = /^var\(\s*--([\w-]+)\s*(?:,[\s\S]*)?\)$/.exec(raw.trim())
  if (varRef?.[1]) return resolveToken(varRef[1], scope, seen)

  return raw.trim()
}

type Row = {
  theme: Theme
  pair: ContrastPair
  ratio: number
  min: number
  pass: boolean
  fgHex: string
  bgHex: string
}

const tokensCss = readFileSync(TOKENS_PATH, 'utf8')
const blocks = readBlocks(tokensCss)
const rows: Row[] = []
const problems: string[] = []

// Croma acima do que cabe no sRGB é cortado sem aviso, e o arquivo passa a
// dizer uma cor enquanto a tela mostra outra. Confere todo literal oklch.
function maxChromaFor(l: number, h: number): number {
  let low = 0
  let high = 0.4
  for (let step = 0; step < 40; step++) {
    const mid = (low + high) / 2
    if (oklchToRgb({ l, c: mid, h }).inGamut) low = mid
    else high = mid
  }
  return Math.floor(low * 1000) / 1000
}

const gamutErrors: string[] = []
for (const match of tokensCss
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .matchAll(/(--[\w-]+)\s*:\s*oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/g)) {
  const [, name, l, c, h] = match
  if (!name || !l || !c || !h) continue
  if (!oklchToRgb({ l: +l, c: +c, h: +h }).inGamut) {
    gamutErrors.push(
      `${name} pede croma ${c} em L=${l} h=${h}, mas o sRGB so comporta ${maxChromaFor(+l, +h)}`,
    )
  }
}

for (const theme of THEMES) {
  for (const pair of CONTRAST_PAIRS) {
    const scope = buildScope(blocks, theme, pair.scope)

    const fgRaw = resolveToken(pair.fg, scope)
    const bgRaw = resolveToken(pair.bg, scope)

    if (!fgRaw || !bgRaw) {
      problems.push(
        `token nao encontrado no tema ${theme}: ${!fgRaw ? `--${pair.fg}` : `--${pair.bg}`}`,
      )
      continue
    }

    const fg = parseCssColor(fgRaw)
    const bg = parseCssColor(bgRaw)

    if (!fg || !bg) {
      problems.push(`cor ilegivel no tema ${theme}: ${!fg ? fgRaw : bgRaw}`)
      continue
    }

    const min = MIN_RATIO[pair.kind]
    const ratio = contrastRatio(fg, bg)
    rows.push({
      theme,
      pair,
      ratio,
      min,
      pass: ratio >= min,
      fgHex: toHex(fg),
      bgHex: toHex(bg),
    })
  }
}

const pad = (value: string, width: number) => value.padEnd(width)
const failures = rows.filter((row) => !row.pass)

for (const theme of THEMES) {
  const themeRows = rows.filter((row) => row.theme === theme)
  const nameWidth = Math.max(...themeRows.map((r) => `${r.pair.fg} / ${r.pair.bg}`.length)) + 2

  console.log(`\n  tema ${theme}`)
  console.log(`  ${'-'.repeat(nameWidth + 42)}`)

  for (const row of themeRows) {
    const name = `${row.pair.fg} / ${row.pair.bg}`
    const mark = row.pass ? 'ok  ' : 'FALHA'
    const ratio = `${formatRatio(row.ratio)}:1`.padStart(8)
    const target = `min ${row.min}`.padEnd(8)
    console.log(
      `  ${mark} ${pad(name, nameWidth)}${ratio}  ${target} ${row.fgHex} sobre ${row.bgHex}  ${row.pair.usedIn.pt}`,
    )
  }
}

const textCount = rows.filter((r) => r.pair.kind === 'text').length
const indicatorCount = rows.length - textCount

console.log(
  `\n  ${rows.length} pares conferidos nos dois temas ` +
    `(${textCount} de texto a 4,5:1, ${indicatorCount} de indicador a 3:1).`,
)
console.log(`  Gamut sRGB conferido em todos os tokens oklch do arquivo.`)

if (gamutErrors.length > 0) {
  console.error('\n  tokens fora do sRGB:')
  for (const error of gamutErrors) console.error(`  . ${error}`)
}

if (problems.length > 0) {
  console.error('\n  problemas de leitura dos tokens:')
  for (const problem of problems) console.error(`  . ${problem}`)
}

if (failures.length > 0 || problems.length > 0 || gamutErrors.length > 0) {
  console.error(
    `\n  Gate reprovado: ${failures.length} par(es) abaixo do minimo, ` +
      `${gamutErrors.length} token(s) fora do gamut.\n`,
  )
  process.exit(1)
}

console.log('  Todos passam. Gate aprovado.\n')
