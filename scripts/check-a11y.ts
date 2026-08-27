// Gate de teclado e nome acessível. Precisa do site no ar; aponte para outro
// endereço com BASE_URL=http://localhost:4173 npm run check:a11y
//
// Usa o Chrome ou o Edge já instalado, sem baixar navegador.

import { chromium } from 'playwright'
import type { Browser, BrowserContext, Page } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

const passes: string[] = []
const failures: string[] = []

function check(condition: boolean, ok: string, bad: string) {
  if (condition) passes.push(ok)
  else failures.push(bad)
}

async function launch(): Promise<Browser> {
  for (const channel of ['chrome', 'msedge'] as const) {
    try {
      return await chromium.launch({ channel })
    } catch {
      // Tenta o próximo canal instalado.
    }
  }
  return chromium.launch()
}

const browser = await launch()

async function open(path: string, options: { reducedMotion?: 'reduce' } = {}) {
  const context: BrowserContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: options.reducedMotion,
  })
  const page = await context.newPage()

  // Semeia o idioma para cair direto no site; a tela de escolha tem teste próprio.
  await page.addInitScript(() => {
    try {
      localStorage.setItem('kayke_lang', 'pt')
    } catch {
      /* sem storage: a tela de escolha aparece, é o teste dela cobre isso */
    }
  })

  const consoleErrors: string[] = []
  page.on('pageerror', (error) => consoleErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { page, context, consoleErrors }
}

async function unnamedControls(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const nameOf = (el: Element): string => {
      const label = el.getAttribute('aria-label')
      if (label) return label

      const labelledBy = el.getAttribute('aria-labelledby')
      if (labelledBy) {
        return labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent ?? '')
          .join(' ')
      }

      if (el.id) {
        const explicit = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
        if (explicit?.textContent?.trim()) return explicit.textContent
      }

      const wrapping = el.closest('label')
      if (wrapping?.textContent?.trim()) return wrapping.textContent
      if (el.getAttribute('title')) return el.getAttribute('title') as string

      return (el.textContent ?? '').replace(/\s+/g, ' ').trim()
    }

    const selector =
      'button, a[href], input:not([type=hidden]), select, textarea, [role="slider"], [role="combobox"]'
    const bad: string[] = []

    for (const el of document.querySelectorAll(selector)) {
      if (el.closest('[aria-hidden="true"]')) continue
      if (!nameOf(el).trim()) {
        bad.push(`<${el.tagName.toLowerCase()}> ${String(el.className).split(' ')[0] ?? ''}`)
      }
    }
    return bad
  })
}

for (const path of ['/', '/perfil', '/design-system', '/inatos', '/curriculo', '/contato']) {
  const { page, context, consoleErrors } = await open(path)

  const unnamed = await unnamedControls(page)
  check(
    unnamed.length === 0,
    `${path}: todo controle tem nome acessivel`,
    `${path}: sem nome acessivel: ${unnamed.join(', ')}`,
  )

  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }))
  check(
    overflow.scroll <= overflow.client + 1,
    `${path}: sem rolagem horizontal`,
    `${path}: rolagem horizontal, ${overflow.scroll}px de conteudo em ${overflow.client}px`,
  )

  check(consoleErrors.length === 0, `${path}: console limpo`, `${path}: ${consoleErrors.join(' | ')}`)

  // Entrou no gate depois de três páginas ficarem sem h1 ao dividir o site.
  const headings = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .filter((h) => !h.closest('[aria-hidden="true"]'))
      .map((h) => ({ level: Number(h.tagName[1]), text: (h.textContent ?? '').trim().slice(0, 40) })),
  )

  const h1Count = headings.filter((h) => h.level === 1).length
  check(h1Count === 1, `${path}: exatamente um h1`, `${path}: ${h1Count} elementos h1, esperado 1`)

  const skip = headings.find((h, i) => i > 0 && h.level - (headings[i - 1]?.level ?? h.level) > 1)
  check(
    skip === undefined,
    `${path}: hierarquia de titulos sem pulo`,
    `${path}: pulo de nivel ate h${skip?.level} em "${skip?.text}"`,
  )

  const duplicateIds = await page.evaluate(() => {
    const seen = new Set<string>()
    const repeated = new Set<string>()
    for (const el of document.querySelectorAll('[id]')) {
      if (seen.has(el.id)) repeated.add(el.id)
      seen.add(el.id)
    }
    return [...repeated]
  })
  check(
    duplicateIds.length === 0,
    `${path}: nenhum id repetido`,
    `${path}: id repetido -> ${duplicateIds.join(', ')}`,
  )

  await context.close()
}

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  const options = page.locator('main button[lang]')
  check(
    (await options.count()) === 2,
    'a tela de escolha oferece as duas linguas',
    `a tela de escolha tem ${await options.count()} opcoes, esperado 2`,
  )

  // Cada cartão precisa do próprio lang, senão o leitor de tela pronuncia
  // "English" com fonema de português.
  const langs = await options.evaluateAll((els) => els.map((el) => el.getAttribute('lang')))
  check(
    langs.includes('pt-BR') && langs.includes('en'),
    'cada cartao declara o proprio idioma',
    `atributos lang encontrados: ${langs.join(', ')}`,
  )

  await page.keyboard.press('Tab')
  const firstStop = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    lang: document.activeElement?.getAttribute('lang'),
  }))
  check(
    firstStop.tag === 'BUTTON' && !!firstStop.lang,
    'o primeiro Tab chega numa opcao de idioma, nao num controle secundario',
    `o primeiro Tab foi para <${firstStop.tag?.toLowerCase()}> sem lang, e nao numa opcao de idioma`,
  )

  await page.keyboard.press('Enter')
  await page.waitForSelector('header nav')
  check(true, 'escolher pelo teclado abre o site', '')

  check(
    (await page.locator('main button[lang]').count()) === 0,
    'depois de escolher, a tela nao volta',
    'a tela de escolha continuou visivel depois da escolha',
  )

  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  check(
    (await page.locator('header nav').count()) > 0,
    'a escolha sobrevive ao recarregar',
    'a tela de escolha voltou depois do reload',
  )

  await context.close()
}

{
  const { page, context } = await open('/')
  await page.keyboard.press('Tab')
  const focused = await page.evaluate(() => String(document.activeElement?.className ?? ''))
  check(
    focused.includes('skip-link'),
    'o primeiro Tab chega no skip link',
    `o primeiro Tab foi para ".${focused.split(' ')[0]}" em vez do skip link`,
  )
  await context.close()
}

{
  const { page, context } = await open('/design-system')
  const trigger = page.locator('button').filter({ hasText: /Anexar|Attach/ }).first()
  await trigger.scrollIntoViewIfNeeded()
  await trigger.focus()
  const triggerLabel = (await trigger.textContent())?.trim()

  await page.keyboard.press('Enter')
  await page.waitForSelector('[role="dialog"]')

  check(
    await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')),
    'o dialogo abre com o foco dentro dele',
    'o dialogo abriu com o foco fora dele',
  )

  let escaped = false
  for (let i = 0; i < 14 && !escaped; i++) {
    await page.keyboard.press('Tab')
    escaped = !(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')))
  }
  check(!escaped, 'o Tab circula preso dentro do dialogo', 'o foco escapou do dialogo pelo Tab')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  check(
    (await page.locator('[role="dialog"]').count()) === 0,
    'o Esc fecha o dialogo',
    'o Esc nao fechou o dialogo',
  )

  const returned = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '')
  check(
    returned === triggerLabel,
    'o foco volta para o botao que abriu o dialogo',
    `o foco voltou para "${returned}", esperado "${triggerLabel}"`,
  )
  await context.close()
}

{
  const { page, context } = await open('/design-system')
  const input = page.locator('input[role="combobox"]').first()
  await input.scrollIntoViewIfNeeded()
  await input.focus()

  const before = await input.inputValue()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')

  check(
    !!(await input.getAttribute('aria-activedescendant')),
    'o combobox aponta o item corrente por aria-activedescendant',
    'o combobox nao expos aria-activedescendant apos as setas',
  )
  check(
    await page.evaluate(() => document.activeElement?.getAttribute('role') === 'combobox'),
    'o foco permanece no campo durante a navegacao',
    'o foco saiu do campo ao navegar pelas setas',
  )

  await page.keyboard.press('Enter')
  check(
    (await input.inputValue()) !== before,
    'o Enter escolhe a opcao corrente',
    'o Enter nao trocou o valor escolhido',
  )
  check(
    (await input.getAttribute('aria-expanded')) === 'false',
    'a lista fecha depois da escolha',
    'a lista continuou aberta depois do Enter',
  )
  await context.close()
}

{
  const { page, context } = await open('/design-system')
  const sortButton = page.locator('.table__sort').first()
  await sortButton.scrollIntoViewIfNeeded()
  await sortButton.focus()

  const header = page.locator('th').first()
  check(
    (await header.getAttribute('aria-sort')) === 'none',
    'a coluna comeca em aria-sort="none"',
    `a coluna comecou em aria-sort="${await header.getAttribute('aria-sort')}"`,
  )

  await page.keyboard.press('Enter')
  check(
    (await header.getAttribute('aria-sort')) === 'ascending',
    'o Enter ordena e marca aria-sort="ascending"',
    'o Enter nao levou a coluna a ascending',
  )

  await page.keyboard.press('Enter')
  check(
    (await header.getAttribute('aria-sort')) === 'descending',
    'o segundo Enter marca aria-sort="descending"',
    'o segundo Enter nao levou a coluna a descending',
  )
  await context.close()
}

{
  const { page, context } = await open('/inatos')
  const slider = page.locator('[role="slider"]').first()
  await slider.scrollIntoViewIfNeeded()
  await slider.focus()

  // O valor vem de um ResizeObserver e só chega no quadro seguinte.
  const settle = () => page.waitForTimeout(120)

  const start = Number(await slider.getAttribute('aria-valuenow'))
  await page.keyboard.press('Home')
  await settle()
  const min = Number(await slider.getAttribute('aria-valuenow'))
  check(min < start, `o Home leva a alca ao minimo (${start} para ${min})`, 'o Home nao moveu a alca')

  await page.keyboard.press('ArrowRight')
  await settle()
  const stepped = Number(await slider.getAttribute('aria-valuenow'))
  check(
    stepped > min,
    `a seta move a alca em passo (${min} para ${stepped})`,
    `a seta direita nao moveu a alca (ficou em ${stepped})`,
  )

  await page.keyboard.press('Home')
  await page.waitForTimeout(250)
  const collapsed = await page.evaluate(() => {
    const cell = document.querySelector('[role="slider"]')?.parentElement?.querySelector('tbody td')
    if (!cell) return null
    return {
      display: getComputedStyle(cell).display,
      label: getComputedStyle(cell, '::before').content,
    }
  })
  check(
    collapsed?.display === 'flex' && collapsed.label !== 'none',
    'no minimo a tabela vira cartao e cada celula carrega o proprio rotulo',
    `no minimo a celula ficou display:${collapsed?.display} com ::before ${collapsed?.label}`,
  )
  await context.close()
}

{
  const { page, context } = await open('/inatos#contraste')
  await page.waitForSelector('#contraste table tbody tr')
  await page.waitForTimeout(300)

  const read = () =>
    page.evaluate(() => {
      const row = [...document.querySelectorAll('#contraste table tbody tr')].find(
        (tr) => tr.children[0]?.textContent?.includes('ink /'),
      )
      return {
        theme: document.documentElement.dataset.theme,
        ratio: row?.children[1]?.textContent?.trim() ?? '',
      }
    })

  const before = await read()
  await page.locator('header button[aria-label]').first().click()
  await page.waitForTimeout(400)
  const after = await read()

  check(
    before.theme !== after.theme,
    'trocar o tema muda o atributo data-theme',
    `data-theme ficou em "${after.theme}" depois do clique`,
  )
  check(
    before.ratio !== after.ratio,
    `o relatorio recalcula ao trocar de tema (${before.ratio} para ${after.ratio})`,
    `o relatorio manteve ${after.ratio} nos dois temas: esta medindo o tema anterior`,
  )

  await context.close()
}

{
  const { page, context } = await open('/', { reducedMotion: 'reduce' })
  const spinner = await page.evaluate(() => {
    const el = document.querySelector('.btn__spinner')
    return el ? getComputedStyle(el).display : 'ausente'
  })
  check(
    spinner === 'none' || spinner === 'ausente',
    'sob movimento reduzido o spinner nao fica girando',
    `o spinner ficou em display:${spinner}`,
  )

  const duration = await page.evaluate(() => {
    const el = document.querySelector('.btn')
    return el ? getComputedStyle(el).transitionDuration : '0s'
  })
  check(
    parseFloat(duration) <= 0.001,
    `sob movimento reduzido as transicoes ficam desligadas (${duration})`,
    `as transicoes seguem em ${duration}`,
  )
  await context.close()
}

await browser.close()

for (const line of passes) console.log(`  ok    ${line}`)

if (failures.length > 0) {
  console.error('')
  for (const line of failures) console.error(`  FALHA ${line}`)
  console.error(`\n  ${failures.length} verificacao(oes) reprovada(s).\n`)
  process.exit(1)
}

console.log(`\n  ${passes.length} verificacoes de teclado e nome acessivel. Todas passam.\n`)
