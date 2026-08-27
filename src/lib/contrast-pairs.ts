// Lida por dois consumidores: o gate de build, que resolve os tokens do
// tokens.css, e o <ContrastReport />, que os resolve via getComputedStyle.
// Cor nova sem par aqui é cor não medida.

export type PairKind = 'text' | 'indicator'

export type ContrastPair = {
  fg: string
  bg: string
  kind: PairKind
  // `inatos` resolve dentro do escopo `.inatos-palette`.
  scope?: 'inatos'
  usedIn: { pt: string; en: string }
}

export const MIN_RATIO: Record<PairKind, number> = {
  text: 4.5,
  indicator: 3,
}

export const CONTRAST_PAIRS: ContrastPair[] = [
  // Texto sobre as três superfícies
  { fg: 'ink', bg: 'bg', kind: 'text', usedIn: { pt: 'corpo sobre a pagina', en: 'body text on the page' } },
  { fg: 'ink', bg: 'surface', kind: 'text', usedIn: { pt: 'corpo sobre cartao', en: 'body text on a card' } },
  { fg: 'ink', bg: 'surface-2', kind: 'text', usedIn: { pt: 'corpo sobre faixa', en: 'body text on a band' } },
  { fg: 'ink-2', bg: 'bg', kind: 'text', usedIn: { pt: 'texto secundario', en: 'secondary text' } },
  { fg: 'ink-2', bg: 'surface', kind: 'text', usedIn: { pt: 'texto secundario em cartao', en: 'secondary text on a card' } },
  { fg: 'ink-2', bg: 'surface-2', kind: 'text', usedIn: { pt: 'texto secundario em faixa', en: 'secondary text on a band' } },
  { fg: 'ink-3', bg: 'bg', kind: 'text', usedIn: { pt: 'legenda, rotulo de campo', en: 'caption, field label' } },
  { fg: 'ink-3', bg: 'surface', kind: 'text', usedIn: { pt: 'legenda em cartao', en: 'caption on a card' } },

  // Marca
  { fg: 'brand-text', bg: 'bg', kind: 'text', usedIn: { pt: 'link e verbo de acao', en: 'link and action verb' } },
  { fg: 'brand-text', bg: 'surface', kind: 'text', usedIn: { pt: 'link em cartao', en: 'link on a card' } },
  { fg: 'brand-text', bg: 'brand-subtle', kind: 'text', usedIn: { pt: 'destaque de marca', en: 'brand highlight' } },
  { fg: 'ink-on-brand', bg: 'brand', kind: 'text', usedIn: { pt: 'rotulo do botao primario', en: 'primary button label' } },

  // A barra do topo, superfície que a cor carrega
  { fg: 'nav-ink', bg: 'nav', kind: 'text', usedIn: { pt: 'item da barra', en: 'nav item' } },
  { fg: 'nav-ink-2', bg: 'nav', kind: 'text', usedIn: { pt: 'item inativo da barra', en: 'inactive nav item' } },
  { fg: 'nav-ink-2', bg: 'nav-group', kind: 'text', usedIn: { pt: 'idioma inativo no seletor', en: 'inactive language option' } },
  { fg: 'nav-ink', bg: 'nav-group', kind: 'text', usedIn: { pt: 'texto sobre o agrupamento', en: 'text on the group' } },
  // O contorno do agrupamento fica de fora de propósito: a WCAG 1.4.11 pede
  // 3:1 do que identifica o controle, e aqui isso é o texto mais o
  // preenchimento da opção ativa.

  // Erro
  { fg: 'danger-text', bg: 'bg', kind: 'text', usedIn: { pt: 'mensagem de erro', en: 'error message' } },
  { fg: 'danger-text', bg: 'surface', kind: 'text', usedIn: { pt: 'erro em cartao', en: 'error on a card' } },
  { fg: 'danger-text', bg: 'danger-subtle', kind: 'text', usedIn: { pt: 'erro em faixa de erro', en: 'error on an error band' } },

  // Indicadores e bordas de controle
  { fg: 'focus', bg: 'bg', kind: 'indicator', usedIn: { pt: 'anel de foco sobre a pagina', en: 'focus ring on the page' } },
  { fg: 'focus', bg: 'surface', kind: 'indicator', usedIn: { pt: 'anel de foco sobre cartao', en: 'focus ring on a card' } },
  { fg: 'focus', bg: 'surface-2', kind: 'indicator', usedIn: { pt: 'anel de foco sobre faixa', en: 'focus ring on a band' } },
  { fg: 'field-line', bg: 'surface', kind: 'indicator', usedIn: { pt: 'borda de campo e de botao', en: 'field and button border' } },
  { fg: 'field-line', bg: 'bg', kind: 'indicator', usedIn: { pt: 'borda de campo sobre a pagina', en: 'field border on the page' } },
  { fg: 'field-line', bg: 'field', kind: 'indicator', usedIn: { pt: 'borda de cartao sobre o campo', en: 'card border on the field' } },
  { fg: 'brand', bg: 'bg', kind: 'indicator', usedIn: { pt: 'preenchimento do botao primario', en: 'primary button fill' } },
  { fg: 'nav-active', bg: 'nav', kind: 'indicator', usedIn: { pt: 'marcador da pagina atual', en: 'current page marker' } },

  // Paleta do INATOS, só dentro do case.
  { fg: 'i-success', bg: 'bg', kind: 'text', scope: 'inatos', usedIn: { pt: 'pago', en: 'paid' } },
  { fg: 'i-warning', bg: 'bg', kind: 'text', scope: 'inatos', usedIn: { pt: 'pendente', en: 'pending' } },
  { fg: 'i-danger', bg: 'bg', kind: 'text', scope: 'inatos', usedIn: { pt: 'glosado', en: 'disallowed' } },
  { fg: 'i-info', bg: 'bg', kind: 'text', scope: 'inatos', usedIn: { pt: 'em analise', en: 'under review' } },
  { fg: 'i-success', bg: 'surface', kind: 'indicator', scope: 'inatos', usedIn: { pt: 'ponto do filtro pago', en: 'paid filter dot' } },
  { fg: 'i-warning', bg: 'surface', kind: 'indicator', scope: 'inatos', usedIn: { pt: 'ponto do filtro pendente', en: 'pending filter dot' } },
  { fg: 'i-danger', bg: 'surface', kind: 'indicator', scope: 'inatos', usedIn: { pt: 'ponto do filtro glosado', en: 'disallowed filter dot' } },
  { fg: 'i-info', bg: 'surface', kind: 'indicator', scope: 'inatos', usedIn: { pt: 'ponto do filtro em análise', en: 'under review filter dot' } },
  { fg: 'i-success', bg: 'i-success-subtle', kind: 'text', scope: 'inatos', usedIn: { pt: 'etiqueta pago', en: 'paid badge' } },
  { fg: 'i-warning', bg: 'i-warning-subtle', kind: 'text', scope: 'inatos', usedIn: { pt: 'etiqueta pendente', en: 'pending badge' } },
  { fg: 'i-danger', bg: 'i-danger-subtle', kind: 'text', scope: 'inatos', usedIn: { pt: 'etiqueta glosado', en: 'disallowed badge' } },
  { fg: 'i-info', bg: 'i-info-subtle', kind: 'text', scope: 'inatos', usedIn: { pt: 'etiqueta em analise', en: 'under review badge' } },
]

export const THEMES = ['light', 'dark'] as const
export type Theme = (typeof THEMES)[number]
