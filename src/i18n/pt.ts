
export const pt = {
  meta: {
    title: 'Kayke Siquara Mendonça, front-end e UI/UX',
    description:
      'Desenvolvedor front-end e UI/UX. React, TypeScript, design system em OKLCH e acessibilidade verificada por script.',
    caseTitle: 'Sistema de Gestão INATOS, estudo de caso',
  },

  a11y: {
    skipToContent: 'Pular para o conteúdo',
    mainNav: 'Páginas do site',
    themeToggle: 'Alternar entre tema claro e escuro',
    themeNowLight: 'Tema claro ativo',
    themeNowDark: 'Tema escuro ativo',
    langGroup: 'Idioma',
    langCurrent: 'idioma atual',
    langPt: 'Ver o site em português',
    langEn: 'Ver o site em inglês',
    openMenu: 'Abrir o menu de navegação',
    closeMenu: 'Fechar o menu de navegação',
    closeDialog: 'Fechar o diálogo',
    externalLink: 'abre em uma nova aba',
  },

  nav: {
    home: 'Início',
    profile: 'Perfil',
    designSystem: 'Design system',
    case: 'INATOS',
    resume: 'Currículo',
    contact: 'Contato',
    current: 'página atual',
  },

  hero: {
    role: 'Desenvolvedor front-end e UI/UX',
    availability: 'Disponível para novas oportunidades',
    name: 'Kayke Siquara Mendonça',
    lede: 'Entreguei o front-end de um sistema de gestão que hoje roda em produção, e o design system que o sustenta.',
    ctaPrimary: 'Ver o estudo de caso',
    ctaSecondary: 'Ver currículo',

    demoLabel: 'Botão, sete estados',
    demoHint: 'Este botão é o de verdade. Chegue nele com Tab.',
  },

  proof: {
    heading: 'Em números',
    note: 'Cada número leva à seção que o prova.',
    items: [
      { value: '117', label: 'telas em React e TypeScript', href: '/inatos#migracao' },
      { value: '13', label: 'primitivos de UI no lugar de 55 duplicados', href: '/design-system' },
      { value: '257/257', label: 'campos com nome acessível', href: '/inatos#acessibilidade' },
      { value: '36', label: 'pares de contraste validados por script', href: '/inatos#contraste' },
    ],
  },

  resume: {
    heading: 'Currículo',
    lede: 'A mesma página que vai no PDF, aberta aqui. Troque o idioma ou baixe o arquivo.',
    download: 'Baixar em PDF',
    frameTitle: 'Currículo de Kayke Siquara Mendonça',
    langGroup: 'Idioma do currículo',
    loading: 'Carregando o currículo',
  },

  about: {
    heading: 'Perfil',
    photoAlt: 'Retrato de Kayke Siquara Mendonça',
    photoPending: 'Foto ainda não adicionada',
    body: [
      'Desenhei e construí o front-end e o design de um sistema interno que a equipe do Instituto INATOS usa todo dia. O INATOS é uma ONG do Rio que atende famílias em vulnerabilidade, e o sistema substituiu uma teia de planilhas por um registro único de prestação de contas: quinze módulos, cinco perfis de acesso, telas densas de conciliação financeira. Está entregue e em uso desde então; hoje eu só dou suporte pontual.',
      'Meu trabalho ali começou antes do componente. Derivei a paleta das cores da marca em OKLCH, escrevi o contrato de estados que todo controle obedece, e depois construí os primitivos que sustentam as telas. O que não dá para medir eu não afirmo: contraste e nome acessível passam por script, não pelo olho.',
      'Antes disso morei um ano na Nova Zelândia, estudando e trabalhando em inglês. Concluí Análise e Desenvolvimento de Sistemas na UNISUAM em 2026.',
    ],
  },

  playground: {
    heading: 'O design system, rodando',
    lede: 'Não é screenshot. Os controles abaixo são os mesmos que construí para produção, com os mesmos estados e a mesma marcação. Percorra a seção inteira com Tab, sem tocar no mouse.',
    keyboardNote: 'Tudo aqui opera por teclado. As setas navegam a lista, Esc fecha o diálogo.',
    blocks: {
      statesTitle: 'Sete estados, não um',
      statesBody:
        'Todo controle interativo entrega default, hover, foco, ativo, desabilitado, carregando e erro. Um componente que só tem o estado feliz é um componente pela metade, e é o que quebra no primeiro uso real.',
      fieldTitle: 'Campo com rótulo, ajuda e erro',
      fieldBody:
        'Rótulo visível e associado, texto de apoio persistente, e o erro embaixo do campo, ligado por aria-describedby. Placeholder nunca faz o papel de rótulo: ele some no primeiro caractere digitado.',
      badgeTitle: 'Estado nunca só na cor',
      badgeBody:
        'Pago, pendente e glosado são o vocabulário de estado do sistema. Cada um carrega rótulo em texto além da cor, porque quem não distingue verde de laranja precisa ler a mesma informação.',
      comboboxTitle: 'Combobox com teclado de verdade',
      comboboxBody:
        'Setas para navegar, Home e End para as pontas, digitação incremental para saltar, Enter para escolher, Esc para desistir. O item ativo é anunciado por aria-activedescendant, sem tirar o foco do campo.',
      tableTitle: 'Tabela que filtra, ordena e muda de forma',
      tableBody:
        'Filtro por texto e por situação, ordenação em qualquer coluna pelo teclado com aria-sort, moeda e data formatadas por Intl, e figuras tabulares para a coluna de valor não dançar. Abaixo de 675px de container cada linha vira um cartão, com o rótulo vindo do cabeçalho da própria coluna.',
      dialogTitle: 'Diálogo que prende e devolve o foco',
      dialogBody:
        'Escrito à mão, sem biblioteca, porque o ponto é o mecanismo. Abre com o foco dentro, o Tab circula, Esc fecha, e o foco volta exatamente para o botão que o abriu.',
    },
  },

  caseTeaser: {
    eyebrow: 'Estudo de caso',
    heading: 'Sistema de Gestão INATOS',
    /* Nome legal do instituto. Não se traduz: a sigla INATOS sai justamente
       destas palavras. Na versão em inglês entra a glosa ao lado. */
    org: 'Instituto Nacional de Assistência, Trabalho, Oportunidades e Saúde',
    orgGloss: '',
    period: 'Entregue em 2026. Em uso, com suporte pontual.',
    body: 'Um sistema interno de prestação de contas que não posso mostrar em imagem, porque a base tem dados de famílias atendidas. Então o case não mostra telas: ele executa a prova. A paleta, o contrato de estados e o validador de contraste estão todos rodando dentro da página.',
    cta: 'Ler o estudo de caso',
    facts: [
      { key: '15', value: 'módulos' },
      { key: '5', value: 'perfis de acesso' },
      { key: '247', value: 'achados de auditoria rastreados' },
      { key: '0', value: 'erros de TypeScript, de 30' },
    ],
  },

  skills: {
    heading: 'Competências',
    lede: 'O que uso no dia a dia, agrupado por onde entra no trabalho.',
    groups: [
      {
        title: 'Front-end',
        items:
          'TypeScript, JavaScript (ES2022), HTML5, CSS3. React 18 e 19 com hooks, context e error boundaries. Vite 6, Tailwind CSS v4, Radix UI, Motion, Recharts. Python, SQL e PowerShell no restante do sistema.',
      },
      {
        title: 'UI e UX',
        items:
          'Design system e tokens, cor em OKLCH, tema claro e escuro, tipografia e escala modular, layout responsivo, microinterações, UX writing em português, auditoria de interface.',
      },
      {
        title: 'Acessibilidade',
        items:
          'WCAG 2.1 AA, nome acessível, navegação por teclado, gestão de foco em modal, aria e role, prefers-reduced-motion, cor nunca como único portador de significado.',
      },
      {
        title: 'Dados e APIs',
        items:
          'REST, Fetch e streams, File System Access, localStorage, Intl para data e moeda em pt-BR. Estados de carregamento e erro, tabelas longas com filtro e ordenação.',
      },
      {
        title: 'Ferramentas',
        items: 'Git, Figma para Make e handoff, DevTools do navegador, VS Code.',
      },
    ],
  },

  projects: {
    heading: 'Projetos',
    lede: 'O que está rodando hoje. Os próximos entram aqui conforme forem ao ar.',
    empty: 'Mais projetos em construção.',
    viewCase: 'Ver o estudo de caso',
    viewLive: 'Ver rodando',
    viewCode: 'Ver o código',
    inProduction: 'Em produção',
    items: {
      inatos: {
        title: 'Sistema de Gestão INATOS',
        summary:
          'Sistema interno de prestação de contas para uma ONG do Rio: quinze módulos, cinco perfis de acesso, telas densas de conciliação financeira. Desenhei e construí o front-end e o design system que o sustenta, do token de cor ao contrato de estados.',
      },
      'validador-contraste': {
        title: 'Validador de contraste',
        summary:
          'Biblioteca de cor sem dependência nenhuma: sRGB, OKLab, OKLCH e a razão da WCAG 2.1. O mesmo código roda em dois lugares. Como gate, ele lê o arquivo de tokens e reprova o build quando um par cai abaixo do mínimo, nos dois temas. Dentro da página, mede a cor que o navegador acabou de pintar e imprime a tabela ao vivo.',
      },
    },
  },

  education: {
    heading: 'Formação e idiomas',
    course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    school: 'UNISUAM, Rio de Janeiro',
    period: '2024 a 2026, concluído',
    languages: [
      {
        name: 'Inglês',
        level: 'Avançado',
        detail: 'Um ano de intercâmbio na Nova Zelândia, vivendo e estudando em inglês.',
      },
      { name: 'Português', level: 'Nativo', detail: '' },
    ],
  },

  contact: {
    heading: 'Contato',
    lede: 'Aberto a vagas de front-end e UI/UX.',
    nameLabel: 'Seu nome',
    emailLabel: 'Seu e-mail',
    messageLabel: 'Mensagem',
    messageHelp: 'O que você está construindo e onde eu entraria.',
    submit: 'Enviar mensagem',
    sending: 'Enviando',
    sent: 'Mensagem enviada. Respondo em até um dia útil.',
    failed: 'Não consegui enviar. Tente de novo ou escreva direto para o e-mail abaixo.',
    errors: {
      nameRequired: 'Escreva seu nome para eu saber com quem falo.',
      emailRequired: 'Preciso de um e-mail para responder.',
      emailInvalid: 'Esse e-mail parece incompleto. Confira o arroba e o domínio.',
      messageRequired: 'Escreva uma linha que seja sobre o que você precisa.',
      summary: 'Corrija os campos abaixo para enviar.',
    },
    mailtoNote:
      'O formulário abre seu aplicativo de e-mail com a mensagem pronta. Se preferir, copie o endereço.',
    copyEmail: 'Copiar e-mail',
    copyPhone: 'Copiar telefone',
    copied: 'Copiado',
    directLabel: 'Ou fale direto',
  },

  colophon: {
    heading: 'Como este site foi feito',
    builtWith: 'Feito com',
    stack: 'React 19, TypeScript, Vite 6 e Tailwind CSS v4.',
    fontsLabel: 'Tipografia',
    fonts: 'Geist e Geist Mono, servidas deste domínio. Nenhuma requisição a terceiros.',
    colorLabel: 'Cor',
    color:
      'Paleta própria em OKLCH, matiz 205. Os tokens do INATOS aparecem apenas dentro do estudo de caso, onde significam algo.',
    contrastLabel: 'Contraste',
    contrastNote: 'pares validados por script nos dois temas, no build e nesta página.',
    sourceLabel: 'Código',
    rights: 'Kayke Siquara Mendonça',
    year: '2026',
  },

  contrast: {
    heading: 'O contraste desta página, agora',
    lede: 'A tabela abaixo não é uma captura de um relatório. Ela lê a cor que o navegador acabou de pintar em cada token, calcula a razão pela WCAG 2.1 e imprime o resultado. Troque o tema e os números mudam.',
    columns: {
      pair: 'Par',
      ratio: 'Razão',
      min: 'Mínimo',
      status: 'Situação',
      usedIn: 'Onde aparece',
    },
    pass: 'passa',
    fail: 'reprova',
    summary: (total: number, theme: string) =>
      `${total} pares medidos no tema ${theme}, nesta sessão.`,
    themeName: { light: 'claro', dark: 'escuro' },
    kind: { text: 'texto', indicator: 'indicador' },
  },

  demos: {
    button: {
      label: 'Salvar lançamento',
      loading: 'Salvando',
      error: 'Tentar de novo',
      states: {
        default: 'padrão',
        hover: 'hover',
        focus: 'foco',
        active: 'ativo',
        disabled: 'desabilitado',
        loading: 'carregando',
        error: 'erro',
      },
      forcedNote: 'Os estados estão forçados por propriedade, para você inspecionar todos de uma vez.',
    },
    field: {
      label: 'Valor da nota',
      help: 'Use vírgula para os centavos. O campo formata em reais ao sair.',
      error: 'O valor precisa ser maior que zero.',
      hint: 'O primeiro campo é o de verdade: digite zero nele e ele entra em erro sozinho.',
      placeholder: '0,00',
    },
    badge: {
      paid: 'Pago',
      pending: 'Pendente',
      rejected: 'Glosado',
      review: 'Em análise',
    },
    combobox: {
      label: 'Meta do projeto',
      placeholder: 'Comece a digitar',
      empty: 'Nenhuma meta com esse nome.',
      hint: 'Setas navegam, Enter escolhe, Esc fecha.',
      /* Programas fictícios. Os nomes reais dos contratos do instituto ficam
         de fora: um site que diz não poder mostrar dado real não pode nomear
         os programas dele numa caixa de exemplo. */
      options: [
        'Programa Semente, oficinas socioeducativas',
        'Programa Semente, transporte de beneficiários',
        'Casa Aberta, alimentação',
        'Casa Aberta, material de oficina',
        'Núcleo Central, folha de pagamento',
        'Núcleo Central, manutenção predial',
        'Rede Solidária, cestas básicas',
        'Rede Solidária, bolsas de estudo',
      ],
    },
    dialog: {
      trigger: 'Anexar comprovante',
      title: 'Anexar comprovante',
      body: 'No sistema original este diálogo tinha um input de arquivo escondido atrás de uma div clicável. Quem usava teclado simplesmente não conseguia anexar nada. Aqui o botão é um botão, e o foco fica preso até você fechar.',
      fileLabel: 'Arquivo do comprovante',
      fileChoose: 'Escolher arquivo',
      fileNone: 'Nenhum arquivo escolhido',
      fileRemove: 'Remover o arquivo escolhido',
      confirm: 'Anexar',
      cancel: 'Cancelar',
      closed: 'Diálogo fechado. O foco voltou para o botão que o abriu.',
    },
    table: {
      caption: 'Lançamentos de exemplo. Os dados são fictícios.',
      /* Fornecedores fictícios. Ficam no dicionário, e não nos dados, porque
         aparecem na tela e precisam trocar de língua com o resto. */
      suppliers: [
        'Papelaria Aurora',
        'Distribuidora Vila Rica',
        'Transportes Bonsucesso',
        'Gráfica Meier',
        'Hortifruti Penha',
        'Serralheria Irajá',
        'Confecções Ramos',
      ],
      filterLabel: 'Filtrar por fornecedor ou meta',
      filterPlaceholder: 'Filtrar',
      statusFilterLabel: 'Filtrar por situação',
      statusFilterHint: 'Nenhuma marcada mostra tudo. Dá para marcar mais de uma.',
      clearFilters: 'Limpar filtros',
      showing: (visible: number, total: number) =>
        visible === total
          ? `Mostrando os ${total} lançamentos`
          : `Mostrando ${visible} de ${total} lançamentos`,
      empty: 'Nenhum lançamento com esse filtro.',
      sortedAsc: 'ordenado de forma crescente',
      sortedDesc: 'ordenado de forma decrescente',
      sortable: 'clique para ordenar',
      columns: {
        supplier: 'Fornecedor',
        goal: 'Meta',
        date: 'Data',
        amount: 'Valor',
        status: 'Situação',
      },
      resultCount: (n: number) => `${n} lançamento${n === 1 ? '' : 's'} listado${n === 1 ? '' : 's'}`,
    },
    resize: {
      label: 'Largura da área de teste',
      hint: 'Arraste a alça para estreitar. Em 675 pixels a tabela vira cartões, do jeito que vira no celular.',
      handle: 'Redimensionar a área de teste',
      current: (w: number) => `${w} pixels de largura`,
      band: (name: string) => `faixa ${name}`,
      bands: {
        base: 'celular, cartões',
        sm: 'celular grande, tabela compacta',
        md: 'tablet, tabela com coluna fixa',
        lg: 'desktop, tabela completa',
        xl: 'desktop largo',
      },
    },
    palette: {
      heading: 'De onde a cor veio',
      lede: 'As quatro cores do logo do instituto viraram os quatro papeis semânticos do sistema. Nenhuma cor entrou por gosto: cada uma já significava alguma coisa antes de virar token.',
      columns: { origin: 'Origem', hue: 'Matiz OKLCH', role: 'Papel', meaning: 'Significa' },
      rows: [
        { origin: 'Verde do logo', hue: '152,7°', role: 'success', meaning: 'pago, conciliado, lançado' },
        { origin: 'Laranja do logo', hue: '51,6°', role: 'warning', meaning: 'pendente, em análise' },
        { origin: 'Vermelho do logo', hue: '26,8°', role: 'danger', meaning: 'glosado, erro, atrasado' },
        { origin: 'Azul do logo', hue: '234,8°', role: 'info', meaning: 'seleção, ação primária, foco' },
      ],
      tuningTitle: 'O ajuste que veio do uso',
      tuning:
        'Um usuário relatou que não distinguia laranja de vermelho num número de 14 pixels. Medi a distância perceptual em OKLab e as duas matizes estavam perto demais. Movi o laranja para 56 graus e o vermelho para 20, o que abriu 36 graus entre elas: 62 por cento mais distintas no tema claro e 80 por cento no escuro. A cor deixou de ser decisão de gosto e virou decisão medida.',
      swatchLabel: (role: string) => `Amostra da cor ${role}`,
    },
  },

  caseStudy: {
    back: 'Voltar ao início',
    eyebrow: 'Estudo de caso',
    title: 'Sistema de Gestão INATOS',
    subtitle: 'Front-end e UI/UX. Entregue em 2026, em uso desde então.',
    intro:
      'O Instituto INATOS é uma ONG do Rio de Janeiro com programas socioassistenciais para famílias em vulnerabilidade. O sistema é interno, de prestação de contas, e a base tem dados de pessoas atendidas. Nada dele pode virar imagem numa página pública. Então este case não mostra telas. Ele executa a prova: a paleta, o contrato de estados, o validador de contraste e as faixas responsivas estão todos rodando aqui dentro, e você pode operar cada um.',
    toc: 'Nesta página',
    /* Rótulos curtos para o índice. O título inteiro de cada seção ocuparia
       três linhas e o índice deixaria de ser escaneável de relance. */
    rail: [
      'O problema',
      'A migração',
      'A paleta',
      'Sete estados',
      'Acessibilidade',
      'Contraste',
      'Cinco faixas',
      'As regras',
      'O que ficou',
    ],
    sections: {
      problem: {
        number: '01',
        title: 'O problema era a planilha, não a tela',
        body: [
          'A prestação de contas do instituto vivia numa teia de planilhas. Cada programa tinha a sua, cada mês uma cópia, e o número que ia para o relatório final vinha de uma célula que ninguém sabia mais de onde puxava. Quando o repasse era questionado, a resposta demorava dias.',
          'O critério de sucesso do sistema foi escrito assim, e continua valendo: o número que aparece na tela é o número que vai na prestação de contas, e quem olha sabe de onde ele veio.',
          'Isso decide o desenho inteiro. Quinze módulos, cinco perfis de acesso, e telas densas de propósito: quem confere nota contra nota trabalha seis a oito horas por dia na mesma tela, e espaçamento generoso vira rolagem infinita. Densidade aqui não é descuido, é requisito.',
        ],
      },
      migration: {
        number: '02',
        title: 'De protótipo em Streamlit a produto de uso diário',
        body: [
          'O sistema nasceu como protótipo de dados em Streamlit, útil para validar o cálculo e péssimo como ferramenta de trabalho. Migrei o front-end para React com TypeScript e o levei a produção como produto que a equipe abre todo dia.',
          'A herança do protótipo não era só técnica. O visual que veio junto era genérico, escolhido antes de alguém perguntar para quem o sistema serviria: nada ali vinha do instituto nem do trabalho que ele faz. Descartei esse visual e derivei a interface inteira da marca do próprio INATOS.',
          'Ao migrar, encontrei 4292 decisões de cor escritas direto no componente. Elas viraram cerca de 40 utilitárias de token. O CSS caiu de 151 KB para 69 KB, de 21,8 KB para 13,4 KB comprimido, e a partir dali trocar uma cor passou a ser trocar uma linha em um arquivo, não caçar hexadecimal em 117 telas.',
        ],
      },
      palette: {
        number: '03',
        title: 'A cor veio do logo, e depois foi medida',
        body: [
          'O logo do instituto são quatro figuras humanas em círculo, em verde, laranja, vermelho e azul. Não inventei paleta: peguei as quatro matizes e dei a cada uma um papel semântico. O sistema já falava esse vocabulário em voz alta, ele só não estava escrito em lugar nenhum.',
          'Os neutros ficaram com croma de 0,01 na matiz do azul institucional. A marca sussurrada, não declarada. Isso mantém a interface calma sem ficar cinza morto, e faz a cor saltar quando ela realmente aparece.',
        ],
      },
      states: {
        number: '04',
        title: 'Sete estados, ou o componente não está pronto',
        body: [
          'Todo controle interativo do sistema entrega os sete: default, hover, foco, ativo, desabilitado, carregando e erro. Componente que só tem o estado feliz é componente pela metade, e é sempre no estado que faltou que a interface quebra na frente do usuário.',
          'A auditoria mostrou o custo de não ter esse contrato. 49 botões usavam preenchimento sólido com texto de tinta, o que dava cerca de 2,4 para 1 de contraste, ilegível nos dois temas. E a hierarquia estava invertida: qualquer botão de ação assumia a cor do seu contexto semântico, então tudo parecia perigoso. Movi 79 botões para primário e deixei 8 em perigo, que são os que realmente destroem dado.',
        ],
      },
      a11y: {
        number: '05',
        title: 'Acessibilidade que passou por script',
        body: [
          'Fiz uma auditoria de interface em todos os módulos, com 247 achados rastreados até a causa raiz. Dois deles não eram detalhe de conformidade, eram bloqueio funcional: dois diálogos de anexo tinham um input de arquivo escondido, alcançável apenas clicando numa div. Quem usava teclado não conseguia anexar arquivo nenhum.',
          'Os números abaixo foram medidos por script sobre os componentes, não estimados no olho.',
        ],
        table: {
          caption: 'Resultado da auditoria de acessibilidade, medido por script.',
          columns: { metric: 'O que foi medido', before: 'Antes', after: 'Depois' },
          rows: [
            { metric: 'Campos de formulário com nome acessível', before: 'parcial', after: '257 de 257' },
            { metric: 'Botões só-ícone com nome acessível', before: 'parcial', after: '80 de 80' },
            { metric: 'Modais com Esc, foco preso e retorno de foco', before: '0', after: '56' },
            { metric: 'Clicáveis inalcançáveis por teclado', before: '5', after: '0' },
            { metric: 'Colunas com aria-sort', before: '1 tela', after: '37 colunas' },
            { metric: 'Erros de TypeScript', before: '30', after: '0' },
          ],
        },
        after:
          'A dívida de tipos foi a zero e ficou como linha de base: qualquer erro novo aparece limpo no diff, em vez de se esconder no meio de trinta antigos.',
      },
      contrast: {
        number: '06',
        title: 'O validador de contraste',
        body: [
          'Escrevi um validador próprio, sem dependência nenhuma, que faz o caminho completo de sRGB para OKLab e OKLCH e calcula a razão pela WCAG 2.1. Ele roda como gate: 4,5 para 1 em texto, 3 para 1 em indicador, nos dois temas, e reprova o build quando alguém baixa uma cor sem perceber.',
          'A primeira coisa que ele provou foi que um único passo da rampa não serve aos dois temas. O cinza de legenda dava 4,29 no claro e 4,47 no escuro, os dois abaixo do mínimo, e a solução foi ter dois valores em vez de um. Sem medir, esse par teria passado despercebido para sempre: ele parece certo.',
          'A tabela abaixo é o mesmo validador, portado para TypeScript, rodando neste site. Ele lê a cor que o seu navegador acabou de pintar em cada token e calcula a razão agora. Troque o tema no canto e os números mudam junto.',
        ],
      },
      density: {
        number: '07',
        title: 'Cinco faixas, uma tela por vez',
        body: [
          'Tabela financeira em celular é o problema difícil da interface densa. A saída não é rolagem horizontal, é mudar de forma: cartão no celular, coluna fixa no tablet, tabela inteira com barra lateral no desktop. Cinco faixas, de 360 a 1920 pixels.',
          'Arraste a alça abaixo e veja a mudança acontecer. Não é um desenho das faixas, é a tabela de verdade reagindo à largura do container.',
        ],
      },
      rules: {
        number: '08',
        title: 'As regras que saíram daqui',
        body: [
          'Nem toda decisão desse sistema serve só para ele. Algumas viraram regra, e nenhuma delas nasceu de leitura sobre design: todas vieram de um problema concreto na tela.',
        ],
        items: [
          {
            title: 'Escala com mais degraus que a marca divide passos da mesma matiz, não matizes diferentes',
            body: 'A régua de prazo dos ofícios tem cinco faixas e a marca tem quatro cores. No prazo ficou verde, crítico ficou vermelho, e os três avisos dividiram três passos do mesmo laranja. O que decidiu isso não foi estética: o selo da linha, na mesma tela, já pintava os três como aviso. Separá-los em matizes faria a tela afirmar duas coisas sobre o mesmo ofício.',
          },
          {
            title: 'z-index é escala semântica, não um número maior que o do vizinho',
            body: 'Menu, cabeçalho grudado, fundo de modal, modal, aviso, dica: cada camada tem nome e posição fixa. São 154 usos por token e nenhuma exceção. O último valor solto do sistema, um 200 escrito à mão, saiu, e com ele a discussão de qual componente ganha de qual.',
          },
          {
            title: 'Movimento comunica estado, ou não existe',
            body: 'Abriu, fechou, salvou, carregou. Entrada em 150 a 250 milissegundos e saída em cerca de 65% da entrada, porque sair devagar faz a interface parecer travada. A preferência por movimento reduzido derruba tudo para transição instantânea, e isso é obrigatório, não opcional.',
          },
          {
            title: 'O que não dá para medir não vira afirmação',
            body: 'Contraste e nome acessível passam por script antes de virarem promessa. É por isso que as seções anteriores trazem números e não adjetivos, e é a regra que eu levo inteira para a próxima interface.',
          },
        ],
      },
      outcome: {
        number: '09',
        title: 'O que ficou depois da entrega',
        body: [
          'A prestação de contas que vivia espalhada em planilhas virou um registro único. O sistema foi entregue em 2026 e a equipe o abre todo dia desde então. Hoje eu dou só suporte pontual, e essa é a medida que me interessa: sistema que precisa do autor toda semana não foi entregue, foi emprestado.',
          'O que sobrevive a mim ali não são as telas, é o método. A paleta continua derivando da marca, o contrato de sete estados continua valendo para todo controle novo, e o validador continua rodando. Regra escrita em documento depende de alguém lembrar dela na próxima sexta-feira. Regra que quebra o build não depende de ninguém.',
          'É a parte que eu levo inteira para a próxima interface, e você já está olhando para ela. Este site usa o mesmo contrato de estados e o mesmo validador, agora sobre a paleta dele. O relatório que você operou algumas seções acima não é imagem de um relatório: é a saída do script, calculada no seu navegador, no tema que você está usando agora.',
        ],
      },
    },
  },
}
