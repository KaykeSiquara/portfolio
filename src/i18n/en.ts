import type { Dict } from './types'

export const en: Dict = {
  meta: {
    title: 'Kayke Siquara Mendonça, front-end and UI/UX',
    description:
      'Front-end and UI/UX developer. React, TypeScript, an OKLCH design system, and accessibility verified by script.',
    caseTitle: 'INATOS Management System, case study',
  },

  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Site pages',
    themeToggle: 'Switch between light and dark theme',
    themeNowLight: 'Light theme active',
    themeNowDark: 'Dark theme active',
    langGroup: 'Language',
    langCurrent: 'current language',
    langPt: 'View the site in Portuguese',
    langEn: 'View the site in English',
    openMenu: 'Open the navigation menu',
    closeMenu: 'Close the navigation menu',
    closeDialog: 'Close the dialog',
    externalLink: 'opens in a new tab',
  },

  nav: {
    home: 'Home',
    profile: 'Profile',
    designSystem: 'Design system',
    case: 'INATOS',
    resume: 'Résumé',
    contact: 'Contact',
    current: 'current page',
  },

  hero: {
    role: 'Front-end and UI/UX developer',
    availability: 'Available for new roles',
    name: 'Kayke Siquara Mendonça',
    lede: 'I delivered the front-end of a management system now running in production, and the design system holding it up.',
    ctaPrimary: 'Read the case study',
    ctaSecondary: 'View résumé',

    demoLabel: 'Button, seven states',
    demoHint: 'This is the real button. Reach it with Tab.',
  },

  proof: {
    heading: 'By the numbers',
    note: 'Every number links to the section that proves it.',
    items: [
      { value: '117', label: 'screens in React and TypeScript', href: '/inatos#migracao' },
      { value: '13', label: 'UI primitives replacing 55 duplicates', href: '/design-system' },
      { value: '257/257', label: 'form fields with an accessible name', href: '/inatos#acessibilidade' },
      { value: '36', label: 'contrast pairs validated by script', href: '/inatos#contraste' },
    ],
  },

  resume: {
    heading: 'Résumé',
    lede: 'The same page that goes into the PDF, opened here. Switch the language or download the file.',
    download: 'Download as PDF',
    frameTitle: 'Résumé of Kayke Siquara Mendonça',
    langGroup: 'Résumé language',
    loading: 'Loading the résumé',
  },

  about: {
    heading: 'Profile',
    photoAlt: 'Portrait of Kayke Siquara Mendonça',
    photoPending: 'Photo not added yet',
    body: [
      'I designed and built the front-end and the design of an internal system the team at INATOS uses every day. INATOS is an NGO in Rio de Janeiro serving families in vulnerable situations, and the system replaced a web of spreadsheets with a single record of financial accountability: fifteen modules, five access roles, dense reconciliation screens. It is delivered and has been in use ever since; today I only provide occasional support.',
      'My work there started before the component. I derived the palette from the brand colors in OKLCH, wrote the state contract every control obeys, then built the primitives the screens stand on. What cannot be measured I do not claim: contrast and accessible names go through a script, not through my eyes.',
      'Before that I lived a year in New Zealand, studying and working in English. I finished a technology degree in Systems Analysis and Development at UNISUAM in 2026.',
    ],
  },

  playground: {
    heading: 'The design system, running',
    lede: 'Not a screenshot. The controls below are the same ones I built for production, with the same states and the same markup. Walk the whole section with Tab, without touching the mouse.',
    keyboardNote: 'Everything here works from the keyboard. Arrows move the list, Esc closes the dialog.',
    blocks: {
      statesTitle: 'Seven states, not one',
      statesBody:
        'Every interactive control ships default, hover, focus, active, disabled, loading, and error. A component with only the happy state is half a component, and the missing half is what breaks on first real use.',
      fieldTitle: 'Field with label, help, and error',
      fieldBody:
        'Visible label, properly associated. Persistent help text. The error sits below the field, wired through aria-describedby. A placeholder never stands in for a label: it disappears on the first keystroke.',
      badgeTitle: 'State is never carried by color alone',
      badgeBody:
        'Paid, pending, and disallowed are the system’s state vocabulary. Each carries a text label alongside the color, because anyone who cannot tell green from orange needs the same information.',
      comboboxTitle: 'A combobox with real keyboard support',
      comboboxBody:
        'Arrows to move, Home and End for the ends, type-ahead to jump, Enter to choose, Esc to back out. The active item is announced through aria-activedescendant, without pulling focus off the input.',
      tableTitle: 'A table that filters, sorts, and changes shape',
      tableBody:
        'Text and status filtering, keyboard sorting on any column with aria-sort, currency and dates formatted through Intl, and tabular figures so the amount column does not jump. Below 675px of container width each row becomes a card, with the label pulled from its own column header.',
      dialogTitle: 'A dialog that traps focus and gives it back',
      dialogBody:
        'Written by hand, no library, because the mechanism is the point. It opens with focus inside, Tab cycles, Esc closes, and focus returns to exactly the button that opened it.',
    },
  },

  caseTeaser: {
    eyebrow: 'Case study',
    heading: 'INATOS Management System',
    org: 'Instituto Nacional de Assistência, Trabalho, Oportunidades e Saúde',
    orgGloss: 'National Institute for Assistance, Work, Opportunity and Health',
    period: 'Delivered in 2026. In use, with occasional support.',
    body: 'An internal financial accountability system I cannot show in images, because the database holds data on the families served. So the case does not show screens. It runs the proof. The palette, the state contract, and the contrast validator are all executing inside this page.',
    cta: 'Read the case study',
    facts: [
      { key: '15', value: 'modules' },
      { key: '5', value: 'access roles' },
      { key: '247', value: 'audit findings traced' },
      { key: '0', value: 'TypeScript errors, from 30' },
    ],
  },

  skills: {
    heading: 'Skills',
    lede: 'What I use day to day, grouped by where it enters the work.',
    groups: [
      {
        title: 'Front-end',
        items:
          'TypeScript, JavaScript (ES2022), HTML5, CSS3. React 18 and 19 with hooks, context, and error boundaries. Vite 6, Tailwind CSS v4, Radix UI, Motion, Recharts. Python, SQL, and PowerShell across the rest of the system.',
      },
      {
        title: 'UI and UX',
        items:
          'Design systems and tokens, color in OKLCH, light and dark themes, typography and modular scale, responsive layout, microinteractions, UX writing in Portuguese, interface audits.',
      },
      {
        title: 'Accessibility',
        items:
          'WCAG 2.1 AA, accessible names, keyboard navigation, focus management in modals, aria and role, prefers-reduced-motion, color never as the only carrier of meaning.',
      },
      {
        title: 'Data and APIs',
        items:
          'REST, Fetch and streams, File System Access, localStorage, Intl for dates and currency in pt-BR. Loading and error states, long tables with filtering and sorting.',
      },
      {
        title: 'Tools',
        items: 'Git, Figma for Make and handoff, browser DevTools, VS Code.',
      },
    ],
  },

  projects: {
    heading: 'Projects',
    lede: 'What is running today. The next ones land here as they ship.',
    empty: 'More projects in progress.',
    viewCase: 'Read the case study',
    viewLive: 'See it running',
    viewCode: 'View the code',
    inProduction: 'In production',
    items: {
      inatos: {
        title: 'INATOS Management System',
        summary:
          'An internal financial accountability system for an NGO in Rio: fifteen modules, five access roles, dense reconciliation screens. I designed and built the front-end and the design system holding it up, from the color token to the state contract.',
      },
      'validador-contraste': {
        title: 'Contrast validator',
        summary:
          'A color library with no dependencies: sRGB, OKLab, OKLCH, and the WCAG 2.1 ratio. The same code runs in two places. As a gate it reads the token file and fails the build when a pair drops below the minimum, in both themes. Inside the page it measures the color the browser just painted and prints the table live.',
      },
    },
  },

  education: {
    heading: 'Education and languages',
    course: 'Technology degree in Systems Analysis and Development',
    school: 'UNISUAM, Rio de Janeiro',
    period: '2024 to 2026, completed',
    languages: [
      {
        name: 'English',
        level: 'Advanced',
        detail: 'A year of exchange in New Zealand, living and studying in English.',
      },
      { name: 'Portuguese', level: 'Native', detail: '' },
    ],
  },

  contact: {
    heading: 'Contact',
    lede: 'Open to front-end and UI/UX roles.',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    messageLabel: 'Message',
    messageHelp: 'What you are building and where I would fit.',
    submit: 'Send message',
    sending: 'Sending',
    sent: 'Message sent. I reply within one business day.',
    failed: 'I could not send it. Try again, or write straight to the address below.',
    errors: {
      nameRequired: 'Add your name so I know who I am talking to.',
      emailRequired: 'I need an email to reply to.',
      emailInvalid: 'That email looks incomplete. Check the at sign and the domain.',
      messageRequired: 'Write one line about what you need.',
      summary: 'Fix the fields below to send.',
    },
    mailtoNote:
      'The form opens your email app with the message ready. If you prefer, copy the address.',
    copyEmail: 'Copy email',
    copyPhone: 'Copy phone',
    copied: 'Copied',
    directLabel: 'Or reach me directly',
  },

  colophon: {
    heading: 'How this site was built',
    builtWith: 'Built with',
    stack: 'React 19, TypeScript, Vite 6, and Tailwind CSS v4.',
    fontsLabel: 'Typography',
    fonts: 'Geist and Geist Mono, served from this domain. No third-party requests.',
    colorLabel: 'Color',
    color:
      'Its own OKLCH palette, hue 205. The INATOS tokens appear only inside the case study, where they mean something.',
    contrastLabel: 'Contrast',
    contrastNote: 'pairs validated by script in both themes, at build time and on this page.',
    sourceLabel: 'Source',
    rights: 'Kayke Siquara Mendonça',
    year: '2026',
  },

  contrast: {
    heading: 'This page’s contrast, right now',
    lede: 'The table below is not a capture of a report. It reads the color your browser just painted for each token, computes the ratio per WCAG 2.1, and prints the result. Switch the theme and the numbers move.',
    columns: {
      pair: 'Pair',
      ratio: 'Ratio',
      min: 'Minimum',
      status: 'Status',
      usedIn: 'Where it appears',
    },
    pass: 'passes',
    fail: 'fails',
    summary: (total: number, theme: string) =>
      `${total} pairs measured in the ${theme} theme, in this session.`,
    themeName: { light: 'light', dark: 'dark' },
    kind: { text: 'text', indicator: 'indicator' },
  },

  demos: {
    button: {
      label: 'Save entry',
      loading: 'Saving',
      error: 'Try again',
      states: {
        default: 'default',
        hover: 'hover',
        focus: 'focus',
        active: 'active',
        disabled: 'disabled',
        loading: 'loading',
        error: 'error',
      },
      forcedNote: 'The states are forced through a prop, so you can inspect all of them at once.',
    },
    field: {
      label: 'Invoice amount',
      help: 'Use a comma for cents. The field formats to Brazilian reais on blur.',
      error: 'The amount has to be greater than zero.',
      hint: 'The first field is the real one: type zero into it and it goes into the error state on its own.',
      placeholder: '0,00',
    },
    badge: {
      paid: 'Paid',
      pending: 'Pending',
      rejected: 'Disallowed',
      review: 'Under review',
    },
    combobox: {
      label: 'Project goal',
      placeholder: 'Start typing',
      empty: 'No goal by that name.',
      hint: 'Arrows move, Enter selects, Esc closes.',
      /* Nomes inventados, então traduzem: não há nome legal a preservar como
         há em Instituto INATOS. */
      options: [
        'Seed Program, educational workshops',
        'Seed Program, beneficiary transport',
        'Open House, meals',
        'Open House, workshop supplies',
        'Central Hub, payroll',
        'Central Hub, building maintenance',
        'Solidarity Network, food parcels',
        'Solidarity Network, study grants',
      ],
    },
    dialog: {
      trigger: 'Attach receipt',
      title: 'Attach receipt',
      body: 'In the original system this dialog had a hidden file input behind a clickable div. Keyboard users simply could not attach anything. Here the button is a button, and focus stays trapped until you close it.',
      fileLabel: 'Receipt file',
      fileChoose: 'Choose file',
      fileNone: 'No file chosen',
      fileRemove: 'Remove the chosen file',
      confirm: 'Attach',
      cancel: 'Cancel',
      closed: 'Dialog closed. Focus went back to the button that opened it.',
    },
    table: {
      caption: 'Sample entries. The data is fictional.',
      /* O ramo traduz, o nome próprio fica. */
      suppliers: [
        'Aurora Stationery',
        'Vila Rica Distribution',
        'Bonsucesso Transport',
        'Meier Printing',
        'Penha Produce',
        'Irajá Metalwork',
        'Ramos Garments',
      ],
      filterLabel: 'Filter by supplier or goal',
      filterPlaceholder: 'Filter',
      statusFilterLabel: 'Filter by status',
      statusFilterHint: 'None selected shows everything. You can select more than one.',
      clearFilters: 'Clear filters',
      showing: (visible: number, total: number) =>
        visible === total
          ? `Showing all ${total} entries`
          : `Showing ${visible} of ${total} entries`,
      empty: 'No entries match that filter.',
      sortedAsc: 'sorted ascending',
      sortedDesc: 'sorted descending',
      sortable: 'activate to sort',
      columns: {
        supplier: 'Supplier',
        goal: 'Goal',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
      },
      resultCount: (n: number) => `${n} entr${n === 1 ? 'y' : 'ies'} listed`,
    },
    resize: {
      label: 'Width of the test area',
      hint: 'Drag the handle to narrow it. At 675 pixels the table becomes cards, exactly as it does on a phone.',
      handle: 'Resize the test area',
      current: (w: number) => `${w} pixels wide`,
      band: (name: string) => `${name} band`,
      bands: {
        base: 'phone, cards',
        sm: 'large phone, compact table',
        md: 'tablet, table with a pinned column',
        lg: 'desktop, full table',
        xl: 'wide desktop',
      },
    },
    palette: {
      heading: 'Where the color came from',
      lede: 'The four colors in the institute’s logo became the four semantic roles of the system. No color entered by taste: each already meant something before it became a token.',
      columns: { origin: 'Origin', hue: 'OKLCH hue', role: 'Role', meaning: 'Means' },
      rows: [
        { origin: 'Green in the logo', hue: '152.7°', role: 'success', meaning: 'paid, reconciled, posted' },
        { origin: 'Orange in the logo', hue: '51.6°', role: 'warning', meaning: 'pending, under review' },
        { origin: 'Red in the logo', hue: '26.8°', role: 'danger', meaning: 'disallowed, error, overdue' },
        { origin: 'Blue in the logo', hue: '234.8°', role: 'info', meaning: 'selection, primary action, focus' },
      ],
      tuningTitle: 'The adjustment that came from use',
      tuning:
        'A user reported not being able to tell orange from red in a 14 pixel number. I measured the perceptual distance in OKLab and the two hues were too close. I moved orange to 56 degrees and red to 20, which opened 36 degrees between them: 62 percent more distinct in the light theme and 80 percent in the dark one. Color stopped being a matter of taste and became a measured decision.',
      swatchLabel: (role: string) => `Swatch for the ${role} color`,
    },
  },

  caseStudy: {
    back: 'Back to top',
    eyebrow: 'Case study',
    title: 'INATOS Management System',
    subtitle: 'Front-end and UI/UX. Delivered in 2026, in use ever since.',
    intro:
      'INATOS is an NGO in Rio de Janeiro running social assistance programs for families in vulnerable situations. The system is internal, built for financial accountability, and the database holds data on the people served. None of it can become an image on a public page. So this case does not show screens. It runs the proof: the palette, the state contract, the contrast validator, and the responsive bands are all executing here, and you can operate each one.',
    toc: 'On this page',
    rail: [
      'The problem',
      'The migration',
      'The palette',
      'Seven states',
      'Accessibility',
      'Contrast',
      'Five bands',
      'The rules',
      'What remained',
    ],
    sections: {
      problem: {
        number: '01',
        title: 'The problem was the spreadsheet, not the screen',
        body: [
          'The institute’s financial reporting lived in a web of spreadsheets. Every program had its own, every month a copy, and the number that reached the final report came from a cell nobody could trace any more. When a transfer was questioned, the answer took days.',
          'The success criterion for the system was written like this, and still holds: the number on the screen is the number that goes into the report, and whoever looks at it knows where it came from.',
          'That decides the whole design. Fifteen modules, five access roles, and deliberately dense screens: someone reconciling invoice against invoice works six to eight hours a day on the same screen, and generous spacing turns into endless scrolling. Density here is not carelessness, it is a requirement.',
        ],
      },
      migration: {
        number: '02',
        title: 'From a Streamlit prototype to a daily tool',
        body: [
          'The system started as a Streamlit data prototype, useful for validating the math and terrible as a working tool. I migrated the front-end to React with TypeScript and took it to production as a product the team opens every day.',
          'The prototype’s inheritance was not only technical. The look that came with it was generic, chosen before anyone asked who the system was for: nothing in it came from the institute or from the work it does. I threw that look out and derived the whole interface from INATOS’s own brand.',
          'During the migration I found 4,292 color decisions written straight into components. They became roughly 40 token utilities. CSS dropped from 151 KB to 69 KB, from 21.8 KB to 13.4 KB compressed, and from then on changing a color meant changing one line in one file instead of hunting hex values across 117 screens.',
        ],
      },
      palette: {
        number: '03',
        title: 'The color came from the logo, then got measured',
        body: [
          'The institute’s logo is four human figures in a circle, in green, orange, red, and blue. I did not invent a palette: I took the four hues and gave each a semantic role. The system already spoke that vocabulary out loud, it just was not written down anywhere.',
          'The neutrals took a chroma of 0.01 at the institutional blue’s hue. The brand whispered, not declared. That keeps the interface calm without going dead gray, and makes color land when it actually shows up.',
        ],
      },
      states: {
        number: '04',
        title: 'Seven states, or the component is not finished',
        body: [
          'Every interactive control in the system ships all seven: default, hover, focus, active, disabled, loading, and error. A component with only the happy state is half a component, and the interface always breaks in front of the user on the state that was missing.',
          'The audit showed what not having that contract costs. 49 buttons used a solid fill with ink-colored text, which came out around 2.4 to 1, illegible in both themes. And the hierarchy was inverted: any action button took the color of its semantic context, so everything looked dangerous. I moved 79 buttons to primary and left 8 on danger, the ones that actually destroy data.',
        ],
      },
      a11y: {
        number: '05',
        title: 'Accessibility that went through a script',
        body: [
          'I ran an interface audit across every module, with 247 findings traced to root cause. Two of them were not conformance details, they were functional blockers: two attachment dialogs had a hidden file input reachable only by clicking a div. Keyboard users could not attach a file at all.',
          'The numbers below were measured by script over the components, not estimated by eye.',
        ],
        table: {
          caption: 'Accessibility audit results, measured by script.',
          columns: { metric: 'What was measured', before: 'Before', after: 'After' },
          rows: [
            { metric: 'Form fields with an accessible name', before: 'partial', after: '257 of 257' },
            { metric: 'Icon-only buttons with an accessible name', before: 'partial', after: '80 of 80' },
            { metric: 'Modals with Esc, focus trap, and focus return', before: '0', after: '56' },
            { metric: 'Clickables unreachable by keyboard', before: '5', after: '0' },
            { metric: 'Columns with aria-sort', before: '1 screen', after: '37 columns' },
            { metric: 'TypeScript errors', before: '30', after: '0' },
          ],
        },
        after:
          'The type debt went to zero and stayed as a baseline: any new error shows up clean in the diff instead of hiding among thirty old ones.',
      },
      contrast: {
        number: '06',
        title: 'The contrast validator',
        body: [
          'I wrote my own validator, with no dependencies, that walks the full path from sRGB through OKLab to OKLCH and computes the ratio per WCAG 2.1. It runs as a gate: 4.5 to 1 for text, 3 to 1 for indicators, in both themes, and it fails the build when someone lightens a color without noticing.',
          'The first thing it proved was that a single step of the ramp cannot serve both themes. The caption gray came out at 4.29 in light and 4.47 in dark, both under the minimum, and the fix was two values instead of one. Without measuring, that pair would have passed unnoticed forever: it looks right.',
          'The table below is that same validator, ported to TypeScript, running on this site. It reads the color your browser just painted for each token and computes the ratio now. Switch the theme in the corner and the numbers move with it.',
        ],
      },
      density: {
        number: '07',
        title: 'Five bands, one screen at a time',
        body: [
          'A financial table on a phone is the hard problem in dense interface work. The answer is not horizontal scrolling, it is changing shape: cards on a phone, a pinned column on a tablet, the full table with a sidebar on desktop. Five bands, from 360 to 1920 pixels.',
          'Drag the handle below and watch the change happen. This is not a drawing of the bands, it is the real table reacting to its container’s width.',
        ],
      },
      rules: {
        number: '08',
        title: 'The rules this left me with',
        body: [
          'Not every decision in this system stays with it. Some became rules, and none of them came from reading about design: every one came from a concrete problem on screen.',
        ],
        items: [
          {
            title: 'A scale with more steps than the brand has colors splits steps of one hue, not different hues',
            body: 'The deadline scale on official letters has five bands and the brand has four colors. On time went green, critical went red, and the three warnings split three steps of the same orange. What decided it was not taste: the row badge on the same screen already painted all three as a warning. Splitting them across hues would make the screen say two different things about the same letter.',
          },
          {
            title: 'z-index is a semantic scale, not a number bigger than the neighbour’s',
            body: 'Menu, sticky header, modal backdrop, modal, toast, tooltip: every layer has a name and a fixed position. That is 154 uses by token and no exceptions. The last loose value in the system, a hand-written 200, is gone, and with it the argument over which component wins.',
          },
          {
            title: 'Motion communicates state, or it does not exist',
            body: 'Opened, closed, saved, loaded. Entrances at 150 to 250 milliseconds and exits at about 65% of the entrance, because leaving slowly makes an interface feel stuck. Reduced-motion preference drops everything to an instant transition, and that is mandatory, not optional.',
          },
          {
            title: 'What cannot be measured does not become a claim',
            body: 'Contrast and accessible names go through a script before they turn into a promise. That is why the sections above carry numbers instead of adjectives, and it is the rule I take whole into the next interface.',
          },
        ],
      },
      outcome: {
        number: '09',
        title: 'What remained after delivery',
        body: [
          'The reporting that used to live scattered across spreadsheets became a single record. The system shipped in 2026 and the team has opened it every day since. Today I only give occasional support, and that is the measure I care about: a system that needs its author every week was not delivered, it was lent.',
          'What outlives me there is not the screens, it is the method. The palette still derives from the brand, the seven-state contract still holds for every new control, and the validator still runs. A rule written in a document depends on someone remembering it next Friday. A rule that breaks the build depends on no one.',
          'That is the part I carry whole into the next interface, and you are already looking at it. This site uses the same state contract and the same validator, now over its own palette. The report you operated a few sections above is not a picture of a report: it is the script output, computed in your browser, in the theme you are using right now.',
        ],
      },
    },
  },
}
