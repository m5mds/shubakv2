import type { Locale } from './i18n/context'

export interface LocaleField {
  ar: string
  en: string
}

export interface Service {
  slug: string
  num: string
  title: LocaleField
  tag: LocaleField
  description: LocaleField
  overview: LocaleField
  deliver: { ar: string[]; en: string[] }
  stack: string[]
  sample: LocaleField
}

export function localise(field: LocaleField, locale: Locale): string {
  return field[locale]
}

export const services: Service[] = [
  {
    slug: 'web',
    num: '01',
    title: {
      ar: 'منصّات وتطبيقات ويب',
      en: 'Web platforms & products',
    },
    tag: {
      ar: 'منتجات SaaS ولوحات تحكّم تشتغل فعلاً — مبنيّة لليوم الأول، ومهيّأة لما فريقك يكبر.',
      en: 'SaaS, consoles, and commerce surfaces. Sharp on day one, built to hold up as your team grows.',
    },
    description: {
      ar: 'منتجات SaaS ولوحات تحكّم مبنيّة تشتغل فعلًا. ليوم الإطلاق ولما بعده.',
      en: 'SaaS, dashboards, real products. Built to ship, built to scale.',
    },
    overview: {
      ar: "دفاعنا الأول React وNext.js وTypeScript — لكن التقنية تتبع المشكلة، لا العكس. نبدأ بهندسة معلومات نظيفة، نوصّل APIs مؤمّنة، ونطلّع نسخة شغّالة بأسابيع مو بأشهر. العربيّة أصيلة عندنا (RTL، أرقام، هجري) — مو إضافة.",
      en: "Default stack is React, Next.js, and TypeScript — but the tech follows the problem, not the other way around. Clean info architecture, secure APIs, a working slice in weeks. Arabic is first-class (RTL, numerals, Hijri), not an afterthought.",
    },
    deliver: {
      ar: [
        'تصميم تجربة كاملة + نظام مكوّنات',
        'تطوير Frontend وBackend وAPIs',
        'نشر على بنية سحابيّة جاهزة (Vercel / AWS)',
        'لوحة تحكّم إداريّة وأذونات',
        'توثيق + تسليم الكود للفريق',
      ],
      en: [
        'End-to-end UX + component system',
        'Frontend, backend, and API development',
        'Production deploy on managed infra (Vercel / AWS)',
        'Admin console and role-based access',
        'Documentation + full code handover',
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Node', 'Postgres', 'Redis', 'AWS / Vercel'],
    sample: {
      ar: '"منصّة تشغيل لشركة لوجستيك: لوحة مشغّل لحظيّة، بوّابة عملاء، وفواتير — استبدلت ٣ أنظمة. ٤ شهور، فريق ٥."',
      en: '"Ops platform for a logistics company: live dispatcher console, customer portal, and billing — replaced three separate systems. 4 months, team of five."',
    },
  },
  {
    slug: 'mobile',
    num: '02',
    title: {
      ar: 'تطبيقات الجوّال',
      en: 'Mobile applications',
    },
    tag: {
      ar: 'iOS وAndroid بحس أصيل — مو تطبيق ويب داخل إطار.',
      en: 'iOS and Android that feel native — not a web app in a wrapper.',
    },
    description: {
      ar: 'iOS وAndroid بجودة تحسها قبل ما تشوفها. تجربة تخليك تعلّق.',
      en: 'iOS and Android, feel it before you see it. Apps people actually keep open.',
    },
    overview: {
      ar: 'نبدأ بـReact Native وExpo للسرعة، وننزل Swift أو Kotlin لما الميزة تستاهل (كاميرا، بلوتوث، Apple Pay). نصمّم حول الاستخدام الحقيقي: ثانية واحدة للمهمّة المتكررة، شغل موثوق بدون نت، ودعم عربي كامل.',
      en: 'We default to React Native and Expo for speed, drop into Swift or Kotlin when it pays off (camera, Bluetooth, Apple Pay). One second for the most-used action. Trustworthy offline. Full Arabic on iOS 15+ and Android 10+.',
    },
    deliver: {
      ar: [
        'تصميم iOS وAndroid وفق إرشادات المنصّتين',
        'كود مشترك + أجزاء أصيلة عند الحاجة',
        'إشعارات فوريّة ومزامنة بلا اتصال',
        'نشر إلى App Store وGoogle Play',
        'دورات تحديث شهريّة ومراقبة الأعطال',
      ],
      en: [
        'iOS and Android design that respects each platform',
        'Shared codebase + native modules where needed',
        'Push notifications and offline-first sync',
        'App Store and Google Play submission',
        'Monthly release cadence + crash monitoring',
      ],
    },
    stack: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase', 'Sentry'],
    sample: {
      ar: '"تطبيق حجز لمزوّد خدمة ميداني: قائمة مهام مباشرة، توقيع إلكتروني، مزامنة أوفلاين. ٤.٧ نجمة، اتصالات الدعم نزلت ٣٨٪."',
      en: '"Field service booking app: live jobs, digital signatures, offline sync. 4.7★, 38% fewer support calls."',
    },
  },
  {
    slug: 'ai',
    num: '03',
    title: {
      ar: 'ذكاء اصطناعي تطبيقي',
      en: 'Applied AI',
    },
    tag: {
      ar: 'مساعدين ووكلاء مدمجين داخل منتجك — مو عرض تجريبي ما يشوف الإنتاج.',
      en: 'Assistants and agents embedded where they matter — not another demo that never ships.',
    },
    description: {
      ar: 'مساعدين ووكلاء داخل منتجك — ما هو عرض في شريحة PowerPoint.',
      en: 'Assistants and agents inside your product. Not a slide in a pitch deck.',
    },
    overview: {
      ar: 'نبدأ من حالة الاستخدام، مو من النموذج. RAG على مستنداتك، فاين-تيون لما يستاهل، أو وكلاء ينفّذون مهام متعدّدة — مع حدود واضحة، تقييم مستمر، وأرقام دقّة صريحة قبل الإطلاق. خبرتنا العميقة في معالجة العربي: صرف، تطبيع، ولهجات.',
      en: 'We start from the use case, not the model. RAG on your docs, fine-tune where it pays off, or agents that handle multi-step work — always with clear guardrails, evals, and honest numbers before we ship. Deep expertise in Arabic-native processing.',
    },
    deliver: {
      ar: [
        'تحديد حالة الاستخدام + معايير النجاح',
        'نموذج أوّلي قابل للاختبار خلال أسبوعين',
        'دمج في منتجك + واجهة استخدام',
        'مجموعة تقييم (evals) ومراقبة مستمرّة',
        'تدريب الفريق على تشغيل النظام',
      ],
      en: [
        'Use-case definition + success criteria',
        'Testable prototype within two weeks',
        'Production integration + user interface',
        'Evaluation suite and ongoing monitoring',
        'Team training to operate the system',
      ],
    },
    stack: ['OpenAI', 'Anthropic Claude', 'LangChain', 'LlamaIndex', 'pgvector', 'Pinecone', 'Hugging Face'],
    sample: {
      ar: '"مساعد عقود بالعربي لشركة محاماة: يقرأ العقد ويطلّع البنود الحرجة. المراجعة الأولى من ٤٥ دقيقة لـ٨."',
      en: '"Arabic contract assistant for a law firm: surfaces risk clauses automatically. First-pass review dropped 45 min → 8."',
    },
  },
  {
    slug: 'ux',
    num: '04',
    title: {
      ar: 'تصميم UX/UI',
      en: 'UX / UI design',
    },
    tag: {
      ar: 'بحث، نماذج، واختبار — حتى المنتج يصير بديهي بدون كتيّب تعليمات.',
      en: 'Research, prototypes, testing — until the product feels inevitable without a manual.',
    },
    description: {
      ar: 'تصاميم نظيفة ومدروسة — المستخدم يفهمها من أوّل ثانية.',
      en: 'Clean, deliberate design. Users get it in the first second.',
    },
    overview: {
      ar: "نشتغل كشريك تصميم، مو مورّد. نقابل مستخدمين حقيقيّين، نرسم الرحلة، ونختبر القرارات في Figma قبل أول سطر كود. اللي تطلع به: نظام تصميم حي (tokens، مكوّنات، إرشادات) — مو PDF يتركن.",
      en: "We embed as a design partner, not a vendor. Real user interviews, journey maps, and Figma pressure-testing before a single line of code. You leave with a living design system — tokens, components, editorial — not a PDF that collects dust.",
    },
    deliver: {
      ar: [
        'بحث مستخدمين ومقابلات موجّهة',
        'خرائط رحلة وخرائط خدمة',
        'نماذج تفاعليّة عالية الدقّة',
        'نظام تصميم كامل (Tokens + Components)',
        'اختبار قابليّة استخدام قبل التسليم',
      ],
      en: [
        'User research and structured interviews',
        'Journey mapping and service blueprints',
        'Interactive high-fidelity prototypes',
        'Full design system (tokens + components)',
        'Usability testing before handoff',
      ],
    },
    stack: ['Figma', 'FigJam', 'Maze', 'Dovetail', 'Storybook', 'Design Tokens'],
    sample: {
      ar: '"إعادة تصميم تسجيل الدخول لتطبيق بنكي: نسبة الإكمال طلعت من ٣٤٪ إلى ٧٨٪ بأسبوعين."',
      en: '"Banking sign-in redesign: completion jumped from 34% to 78% within two weeks of release."',
    },
  },
  {
    slug: 'auto',
    num: '05',
    title: {
      ar: 'أتمتة',
      en: 'Automation',
    },
    tag: {
      ar: 'ربط الأنظمة، تقاعد الشغل اليدوي، والتخلّص من إكسل الرعب — ساعات تتوفّر كل أسبوع.',
      en: 'Wire the stack, retire the manual work, kill the spreadsheet of doom — hours back every week.',
    },
    description: {
      ar: 'خلّ النظام يشتغل عنك. وفّر ساعات فريقك للشغل اللي يسوّي فرق.',
      en: "Let the system do the boring part. Give your team back the hours that matter.",
    },
    overview: {
      ar: "ندقّق العمليّات، نحدّد الخطوات اللي تاكل وقت فريقك بدون قيمة، ونبني تدفّقات تنفّذها لحالها. الفريق يقرّر — النظام ينفّذ. نستخدم n8n وMake للتنسيق، وAWS Lambda أو Temporal للثقيل، مع سجلّات كاملة لكل تنفيذ.",
      en: "We audit ops, find the steps draining your team's time, and build flows that run them. Your team decides — the system executes. n8n and Make for orchestration, Lambda or Temporal for heavy work, full logs on every run.",
    },
    deliver: {
      ar: [
        'تدقيق للعمليّات وتحديد أولويّات الأتمتة',
        'ربط أنظمتك الحاليّة عبر APIs',
        'سير عمل آلي مع تنبيهات وإعادة محاولة',
        'لوحة مراقبة + سجلّ تدقيق',
        'توثيق لأعضاء الفريق غير التقنيّين',
      ],
      en: [
        'Ops audit with prioritized automation list',
        'Integrations across your existing stack',
        'Automated workflows with alerts and retries',
        'Monitoring dashboard + audit trail',
        'Documentation for non-technical operators',
      ],
    },
    stack: ['n8n', 'Make', 'Temporal', 'AWS Lambda', 'Zapier', 'Webhooks', 'Airtable'],
    sample: {
      ar: '"مشغّل لوجستي: ملف إكسل كان يتحدّث ٨ مرات يومياً استبدلناه بتدفّق يربط ٥ أنظمة. ١٢ ساعة أسبوعياً استرجعت، صفر إدخال يدوي."',
      en: '"Logistics operator: replaced an Excel sheet updated 8×/day with a flow across 5 systems. 12 hours a week recovered, zero manual entry."',
    },
  },
  {
    slug: 'consult',
    num: '06',
    title: {
      ar: 'استشارات تقنيّة',
      en: 'Technical consulting',
    },
    tag: {
      ar: 'تقييم بنيتك، خارطة صريحة، واختيارات صح لفريقك — مو عروض تقديميّة حلوة.',
      en: 'A second opinion from people who actually shipped. No tech theater.',
    },
    description: {
      ar: 'رأي ثاني من فريق بنى منتجات فعلاً. بدون عروض تقديميّة طويلة.',
      en: 'A second opinion from people who actually shipped. No 80-slide decks.',
    },
    overview: {
      ar: "نقعد مع فريقك أسبوع لأربعة، نفحص الكود والبنية، ونطلّع تقرير مباشر: وش يشتغل، وش يستاهل إصلاح الحين، وش يمدي يتأجّل بأمان. تطلع بخطة ربعيّة مربوطة بأهدافك — وإذا بغيت، نرافقك بالتنفيذ.",
      en: "We sit with your team for a week to a month, inspect the code and architecture, and deliver a candid report: what works, what needs fixing now, what can safely wait. You leave with a quarterly execution plan tied to business goals — and if you want, we help execute it.",
    },
    deliver: {
      ar: [
        'تدقيق كود وبنية شامل',
        'خارطة طريق ٦–١٢ شهرًا بأولويّات واضحة',
        'توصيات تقنيّة مع بدائل مُقارنة',
        'تقييم الفريق واقتراحات التوظيف',
        'مرافقة تنفيذيّة اختياريّة',
      ],
      en: [
        'Comprehensive code and architecture audit',
        '6–12 month roadmap with clear priorities',
        'Technical recommendations with compared alternatives',
        'Team assessment and hiring recommendations',
        'Optional execution support',
      ],
    },
    stack: ['Architecture Review', 'Code Audit', 'Roadmapping', 'Tech Due Diligence', 'Hiring Support'],
    sample: {
      ar: '"فريق هندسة ١٢ شخص: خارطة ربعيّة قلّصت ديون الكود ٤٠٪ وضاعفت سرعة التسليم. بدون إعادة بناء كاملة."',
      en: '"12-person engineering org: quarterly roadmap cut tech debt 40% and doubled velocity. No rewrite required."',
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
