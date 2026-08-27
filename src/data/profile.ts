export const PROFILE = {
  name: 'Kayke Siquara Mendonça',
  email: 'kayke.siquara99@gmail.com',
  phone: '+55 21 97431-7594',
  phoneDisplay: '(21) 97431-7594',
  github: 'https://github.com/KaykeSiquara',
  linkedin: 'https://linkedin.com/in/kaykesiquaramendonca',

  resume: {
    pt: { html: 'curriculo-kayke-siquara.html', pdf: 'curriculo-kayke-siquara.pdf' },
    en: { html: 'resume-kayke-siquara.html', pdf: 'resume-kayke-siquara.pdf' },
  },
  photo: 'kayke.webp',

  // Sem endpoint o formulário cai para mailto.
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
} as const
