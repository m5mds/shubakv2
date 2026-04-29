import type { Dict } from './ar'

export const en: Dict = {
  site: {
    brand: 'shubak',
  },
  nav: {
    brand: 'shubak',
    services: 'Services',
    about: 'Approach',
    contact: 'Contact',
    startProject: "Let's build",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
  },
  hero: {
    eyebrow: 'Product Studio',
    headingLine1: "We don't build websites.",
    headingLine2: 'We ship products.',
    description:
      'Arabic-native by design. We take founders and companies from idea to launch — and stick around after.',
    ctaPrimary: "Let's build",
    ctaSecondary: 'See our work',
    badge1: 'Design',
    badge2: 'Build',
    badge3: 'Ship',
  },
  services: {
    sectionTag: 'What we do',
    heading: 'One team.',
    headingAccent: ' Idea to launch.',
    openWindow: 'Open window',
  },
  process: {
    sectionTag: 'How we work',
    heading: 'Four steps.',
    headingAccent: ' Idea to launch.',
    steps: [
      {
        name: 'Discovery',
        description:
          'Business first, pixels later. You leave with a clear scope and real targets.',
      },
      {
        name: 'Design',
        description:
          'We prototype and pressure-test before we write code. Decisions get made in Figma, not production.',
      },
      {
        name: 'Development',
        description:
          'Weekly cycles, live demos you can touch. No three-month silences.',
      },
      {
        name: 'Launch',
        description:
          'We deploy, monitor, and stick around after launch. The real product starts on day one.',
      },
    ],
  },
  projects: {
    sectionTag: 'Shipped',
    heading: 'Products we',
    headingAccent: ' shipped.',
    placeholder: 'Coming soon',
    items: [
      {
        category: 'Logistics',
        year: '2025',
        title: 'Najm — supplier network',
        description:
          '1,200 suppliers on one network. Orders and invoicing run themselves.',
      },
      {
        category: 'Education',
        year: '2024',
        title: 'Fahm — teacher copilot',
        description: 'An AI that preps the class. 4,200 teachers use it daily.',
      },
      {
        category: 'Healthcare',
        year: '2024',
        title: 'Iyadah — clinic OS',
        description:
          '28 clinics on one OS. Bookings, records, billing. No paperwork.',
      },
      {
        category: 'Automation',
        year: '2023',
        title: 'Rafd — sales console',
        description:
          'Weekly report: 6 hours → 12 minutes. Same team, same data.',
      },
    ],
  },
  cta: {
    eyebrow: 'Ready?',
    headingMain: "Let's open",
    headingAccent: ' your window.',
    subtitle:
      "Four quick questions. We'll reply in one business day with a candid answer.",
    trustLine: 'We reply within 24 hours',
  },
  contact: {
    intro: {
      eyebrow: 'Get in touch',
      heading: "Let's open your window.",
      sub: "Tell us what you're building. We'll give you a straight answer on fit, timeline, and cost — within 24 hours.",
    },
    sla: {
      label: 'We reply within 24 hours',
    },
    next: {
      title: 'What happens next',
      steps: [
        { name: 'Discovery call', desc: 'We schedule a 30-minute call within 24 hours of your submission.' },
        { name: 'Scope + estimate', desc: 'We send a detailed scope and fixed-price estimate within 3 business days.' },
        { name: 'Kickoff or honest no', desc: "If we're not the right fit, we'll tell you — and point you toward someone who is." },
      ],
    },
    wizard: {
      steps: {
        reason: 'Reason',
        product: 'Product',
        budget: 'Budget',
        contact: 'Contact',
      },
      step1: {
        kicker: 'Step 1 of 4',
        q: 'How can we help?',
        hint: "Pick what fits best — you can change it later.",
      },
      step2: {
        kicker: 'Step 2 of 4',
        q: 'What kind of product?',
        hint: 'Pick one or more — we combine specialties.',
      },
      step3: {
        kicker: 'Step 3 of 4',
        q: 'Rough budget?',
        hint: "We just need the range — nothing binding.",
      },
      step4: {
        kicker: 'Step 4 of 4',
        q: 'How do we reach you?',
        hint: 'We reply within one business day — no spam.',
      },
      reasons: {
        idea: { title: 'Clear idea', desc: "I've got the idea. I need a team to ship it." },
        consult: { title: 'Still cooking', desc: "Let's shape it together before we ship." },
        revamp: { title: 'Existing product', desc: "I've got a product. Let's level it up." },
        other: { title: 'Something else', desc: 'Tell us the story in the last step.' },
      },
      products: {
        web: 'Web platform',
        mobile: 'Mobile app',
        ai: 'AI / assistant',
        design: 'UX / UI design',
        automation: 'Automation',
        consult: 'Tech consulting',
      },
      budgets: {
        lt10: 'Under 10,000 SAR',
        b1020: '10,000 — 20,000 SAR',
        b2050: '20,000 — 50,000 SAR',
        b50200: '50,000 — 200,000 SAR',
        gt200: '200,000+ SAR',
        unsure: 'Not sure — help me scope',
      },
      fields: {
        name: 'Your name',
        email: 'Email',
        company: 'Company (if any)',
        phone: 'Phone',
        brief: 'Tell us more',
      },
      back: 'Back',
      next: 'Next',
      submit: 'Open the window',
      doneTitle: 'Window opened ✦',
      doneHint: "Got it. We'll reply within one business day.",
      restart: 'Send another',
      errorRequired: 'Fill in all required fields.',
      errorEmail: 'Invalid email address.',
      errorServer: 'Something went wrong. Please try again.',
      counterTotal: '4',
    },
  },
  footer: {
    tagline: 'A Saudi product studio. We build products that work.',
    location: 'Tabuk · Saudi Arabia',
    global: 'Remote-friendly worldwide',
    servicesCol: 'Services',
    companyCol: 'Company',
    connectCol: 'Connect',
    contactLink: 'Start a project',
    marquee: 'SHUBAK',
    connectItems: [
      { label: 'hello@shubak.ai', href: 'mailto:hello@shubak.ai', icon: 'mail' as const },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/shubak', icon: 'linkedin' as const },
    ],
    copyright: '© Shubak 2026',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    backHome: 'Back to home',
  },
}
