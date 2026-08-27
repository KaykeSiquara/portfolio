# Portfólio de Kayke Siquara Mendonça

React, TypeScript, Vite e Tailwind v4. Bilíngue, tema claro e escuro, seis
rotas numa coluna de 56rem centralizada.

O projeto principal do portfólio não pode aparecer em imagens, porque a base
tem dados de famílias atendidas por uma ONG. Então o estudo de caso não mostra
telas: os primitivos rodam na página, e o validador de contraste calcula as
razões ao vivo.

## Rodar

```bash
npm install
npm run dev
```

## Verificar

```bash
npm run typecheck
npm run check:contrast   # WCAG 2.1 nos dois temas, sem dependências
npm run check:a11y       # teclado e nome acessível, precisa do dev no ar
npm run build            # roda typecheck e contraste antes de compilar
```

`check:contrast` lê `src/styles/tokens.css`, resolve as cadeias de `var()` e
confere os pares de `src/lib/contrast-pairs.ts`: 4,5:1 em texto, 3:1 em
indicador. Também acusa token que pede mais croma do que cabe no sRGB.

`check:a11y` sobe o Chrome ou o Edge já instalado e percorre as rotas.
Aponte para outro endereço com `BASE_URL=http://localhost:4173`.

## Falta

`public/kayke.webp`, o retrato, 4:5, cerca de 448x560. Até lá a seção Perfil
mostra o espaço reservado, do mesmo tamanho, então nada pula quando ele chegar.

## Estrutura

```
scripts/          os dois gates
src/components/   Shell, TopNav, Colophon, LanguageGate
src/lib/          cor, pares de contraste, hooks
src/styles/       tokens, base, primitivos
src/ui/           Button, Field, Combobox, Dialog, DataTable, ResizableArea
src/demos/        os componentes rodando
src/sections/     os blocos que as páginas montam
src/pages/        Home, Perfil, DesignSystem, InatosCase, Curriculo, Contato
src/i18n/         pt.ts define a forma, en.ts é tipado a partir dela
```

Na primeira visita o site abre numa tela de escolha de idioma. A escolha grava
em `localStorage` e a tela não volta; os scripts de verificação semeiam a chave
para testar as páginas.

A escala de espaçamento é nomeada (`--spacing-sm` e afins) e no Tailwind v4 ela
tem precedência sobre `--container-*`. Para largura e altura use valor literal,
`max-w-[24rem]`, senão `max-w-sm` resolve para 0.75rem.

## Publicar

```bash
npm run build                        # raiz do domínio
npm run build -- --base=/portfolio/  # subpasta
```

`public/_redirects` e `vercel.json` cuidam do fallback das rotas. Sem ele, abrir
`/perfil` direto pela URL devolve 404. Vale notar que em hospedagem com esse
fallback um caminho inexistente devolve 200 com o `index.html`, não 404: um link
quebrado para PDF entrega HTML com nome de PDF.
