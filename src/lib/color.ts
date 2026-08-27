// sRGB, OKLab, OKLCH e a razão de contraste da WCAG 2.1, sem dependências.
// Matrizes de Björn Ottosson: https://bottosson.github.io/posts/oklab/

export type Rgb = { r: number; g: number; b: number }
export type Oklch = { l: number; c: number; h: number }

export function srgbToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
}

export function linearToSrgb(channel: number): number {
  return channel <= 0.0031308 ? channel * 12.92 : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

// `inGamut` avisa quando a cor pedida não cabe no sRGB. O valor volta cortado,
// como o navegador faz, mas o gate precisa saber que houve corte.
export function oklchToRgb({ l, c, h }: Oklch): Rgb & { inGamut: boolean } {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const lc = l_ * l_ * l_
  const mc = m_ * m_ * m_
  const sc = s_ * s_ * s_

  const rLin = 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc
  const gLin = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc
  const bLin = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc

  const eps = 1e-5
  const inGamut =
    rLin >= -eps && rLin <= 1 + eps && gLin >= -eps && gLin <= 1 + eps && bLin >= -eps && bLin <= 1 + eps

  return {
    r: Math.round(clamp01(linearToSrgb(clamp01(rLin))) * 255),
    g: Math.round(clamp01(linearToSrgb(clamp01(gLin))) * 255),
    b: Math.round(clamp01(linearToSrgb(clamp01(bLin))) * 255),
    inGamut,
  }
}

export function rgbToOklch({ r, g, b }: Rgb): Oklch {
  const rLin = srgbToLinear(r / 255)
  const gLin = srgbToLinear(g / 255)
  const bLin = srgbToLinear(b / 255)

  const l_ = Math.cbrt(0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin)
  const m_ = Math.cbrt(0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin)
  const s_ = Math.cbrt(0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin)

  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const c = Math.sqrt(a * a + bb * bb)
  let h = (Math.atan2(bb, a) * 180) / Math.PI
  if (h < 0) h += 360

  return { l, c, h: c < 1e-6 ? 0 : h }
}

// WCAG 2.1, seção 1.4.3.
export function relativeLuminance({ r, g, b }: Rgb): number {
  return (
    0.2126 * srgbToLinear(r / 255) + 0.7152 * srgbToLinear(g / 255) + 0.0722 * srgbToLinear(b / 255)
  )
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}

// Para baixo: 4,4987 não pode virar 4,50.
export function formatRatio(ratio: number): string {
  return (Math.floor(ratio * 100) / 100).toFixed(2)
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const OKLCH = /^oklch\(\s*([^\s/]+)\s+([^\s/]+)\s+([^\s/)]+)/i
const OKLAB = /^oklab\(\s*([^\s/]+)\s+([^\s/]+)\s+([^\s/)]+)/i
const ALFA_BARRA = /\/\s*(?:[\d.]+%?|none)\s*\)/
// Exige os quatro componentes, senão casa com a vírgula de um rgb() normal.
const ALFA_VIRGULA = /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/
const RGB_FN = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i
const SRGB_FN = /^color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i

function parseNumber(token: string, scale: number): number {
  const trimmed = token.trim()
  if (trimmed.endsWith('%')) return (parseFloat(trimmed) / 100) * scale
  if (trimmed === 'none') return 0
  return parseFloat(trimmed)
}

// Devolve null para formato desconhecido e para cor com alfa. Translúcido não
// tem contraste próprio, só o do resultado composto, e chutar um número ali
// seria pior que não responder.
export function parseCssColor(input: string): Rgb | null {
  const value = input.trim()
  if (!value) return null

  const hex = HEX.exec(value)
  if (hex?.[1]) {
    let h = hex[1]
    if (h.length === 4 && h[3]?.toLowerCase() !== 'f') return null
    if (h.length === 8 && h.slice(6).toLowerCase() !== 'ff') return null
    if (h.length === 3 || h.length === 4) {
      h = h
        .slice(0, 3)
        .split('')
        .map((ch) => ch + ch)
        .join('')
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    }
  }

  if (ALFA_BARRA.test(value)) return null
  const alfaVirgula = ALFA_VIRGULA.exec(value)
  if (alfaVirgula?.[1] && parseFloat(alfaVirgula[1]) < 1) return null

  const oklab = OKLAB.exec(value)
  if (oklab?.[1] && oklab[2] && oklab[3]) {
    const l = parseNumber(oklab[1], 1)
    const a = parseNumber(oklab[2], 0.4)
    const bAxis = parseNumber(oklab[3], 0.4)
    let hue = (Math.atan2(bAxis, a) * 180) / Math.PI
    if (hue < 0) hue += 360
    const rgb = oklchToRgb({ l, c: Math.sqrt(a * a + bAxis * bAxis), h: hue })
    return { r: rgb.r, g: rgb.g, b: rgb.b }
  }

  const oklch = OKLCH.exec(value)
  if (oklch?.[1] && oklch[2] && oklch[3]) {
    const rgb = oklchToRgb({
      l: parseNumber(oklch[1], 1),
      c: parseNumber(oklch[2], 0.4),
      h: parseFloat(oklch[3]) || 0,
    })
    return { r: rgb.r, g: rgb.g, b: rgb.b }
  }

  const rgbFn = RGB_FN.exec(value)
  if (rgbFn?.[1] && rgbFn[2] && rgbFn[3]) {
    return { r: +rgbFn[1], g: +rgbFn[2], b: +rgbFn[3] }
  }

  const srgbFn = SRGB_FN.exec(value)
  if (srgbFn?.[1] && srgbFn[2] && srgbFn[3]) {
    return {
      r: Math.round(clamp01(+srgbFn[1]) * 255),
      g: Math.round(clamp01(+srgbFn[2]) * 255),
      b: Math.round(clamp01(+srgbFn[3]) * 255),
    }
  }

  return null
}

export function toHex({ r, g, b }: Rgb): string {
  const pair = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${pair(r)}${pair(g)}${pair(b)}`
}
