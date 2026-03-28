import { useState } from 'react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

const LINKEDIN_URL = 'https://www.linkedin.com/in/vladislavsss'
/** GitHub profile */
const GITHUB_URL = 'https://github.com/vladislavs-luminati'

const CONTACT_EMAIL = 'v0538276702@gmail.com'

/** WhatsApp chat — same number as +972 53-827-6702 */
const WHATSAPP_URL = 'https://wa.me/972538276702'

/** Brand-colored logos — cdn.simpleicons.org (slug+hex); `src` overrides when CDN slug 404s */
const stackLogos = [
  { slug: 'nodedotjs', label: 'Node.js', color: '339933' },
  { slug: 'react', label: 'React', color: '61DAFB' },
  { slug: 'docker', label: 'Docker', color: '2496ED' },
  { slug: 'kubernetes', label: 'Kubernetes', color: '326CE5' },
  { slug: 'mongodb', label: 'MongoDB', color: '47A248' },
  { slug: 'postgresql', label: 'PostgreSQL', color: '4169E1' },
  { slug: 'go', label: 'Go', color: '00ADD8' },
  { slug: 'flutter', label: 'Flutter', color: '02569B' },
  { slug: 'swift', label: 'Swift', color: 'F05138' },
  { slug: 'kotlin', label: 'Kotlin', color: '7F52FF' },
  { slug: 'redux', label: 'Redux', color: '764ABC' },
  { slug: 'googlecloud', label: 'Google Cloud', color: '4285F4' },
  {
    slug: 'microsoftazure',
    label: 'Azure',
    color: '0078D4',
    /** simpleicons CDN returns 404 for this slug; use npm package SVG */
    src: 'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/microsoftazure.svg',
  },
  { slug: 'webpack', label: 'Webpack', color: '8DD6F9' },
  { slug: 'git', label: 'Git', color: 'F05032' },
] as const

const skillGroups = [
  {
    title: 'Languages',
    variant: 'teal' as const,
    items: ['Node.js', 'Java', 'Go', 'Python', 'C#', 'Swift', 'Kotlin', 'Dart'],
  },
  {
    title: 'Data & APIs',
    variant: 'sky' as const,
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'MS SQL Server', 'REST', 'HTTP', 'JSON'],
  },
  {
    title: 'Web & mobile',
    variant: 'violet' as const,
    items: ['React', 'Redux', 'React Native', 'Flutter', 'AJAX', 'SSL'],
  },
  {
    title: 'Platform',
    variant: 'emerald' as const,
    items: ['Kubernetes', 'Docker', 'Microservices', 'CI/CD', 'Performance'],
  },
  {
    title: 'Practice',
    variant: 'amber' as const,
    items: ['OOP', 'Design patterns', 'TDD', 'Agile', 'Cryptography', 'Protocols'],
  },
  {
    title: 'Tooling',
    variant: 'rose' as const,
    items: ['Selenium', 'Webdriver.io', 'Appium', 'Babel', 'NPM', 'Gulp', 'Webpack', 'Mocha', 'Chai'],
  },
] as const

/** Bright Data mark (hotlinked; may break if the host changes policy) */
const BRIGHT_DATA_LOGO =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT9Hi3kkQHcEa1hdjOmUf0i17FG3WBI-YklQ&s'

/** Official Bright SDK wordmark (light variant for dark UI) */
const BRIGHT_SDK_ICON =
  'https://media.bright-sdk.com/2025/12/brightsdk_logo_light.svg'

/** Simple mark for NDA role — medical / health articles theme */
const PRIVATE_COMPANY_LOGO = `${import.meta.env.BASE_URL}private-company-medical-logo.svg`

const HOLA_LOGO =
  'https://cdn4.hola.org/www/hola/pub/img/hola_logo_letters.svg?ver=1.251.541'
const SPIRAL_LOGO =
  'https://www.spiralsolutions.com/wp-content/uploads/2017/06/spiral_logo_small_500.png'

const skillChipClass: Record<
  (typeof skillGroups)[number]['variant'],
  string
> = {
  teal: 'bg-teal-500/15 text-teal-100 ring-1 ring-teal-400/25',
  violet: 'bg-violet-500/15 text-violet-100 ring-1 ring-violet-400/25',
  sky: 'bg-sky-500/15 text-sky-100 ring-1 ring-sky-400/25',
  emerald: 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/25',
  amber: 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/25',
  rose: 'bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/25',
}

/** Stable hash for deterministic tag sizing / order (article-style keyword cloud). */
function skillTagHash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const skillTagSizeClass = [
  'px-2 py-0.5 text-[11px] leading-tight',
  'px-2.5 py-1 text-xs',
  'px-3 py-1 text-sm',
  'px-3.5 py-1.5 text-base font-semibold tracking-tight',
] as const

function SkillsTagCloud() {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const tags = skillGroups.flatMap((g, gi) =>
    g.items.map((item) => {
      const key = `${g.title}:${item}`
      const h = skillTagHash(key)
      return {
        key,
        item,
        variant: g.variant,
        sizeIdx: (skillTagHash(`${g.title}\0${item}`) + gi * 17) % 4,
        sortKey: skillTagHash(item),
        floatDelayS: (h % 90) / 10,
        floatDurationS: 9 + (h % 5),
      }
    }),
  )
  tags.sort((a, b) => a.sortKey - b.sortKey)

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-5 md:p-8"
      onPointerLeave={() => setActiveKey(null)}
    >
      <ul
        className="flex flex-wrap content-start justify-center gap-x-1.5 gap-y-2 md:gap-x-2 md:gap-y-2.5"
        aria-label="Skills keyword cloud"
      >
        {tags.map(
          ({ key, item, variant, sizeIdx, floatDelayS, floatDurationS }) => {
            const isActive = activeKey === key
            const dimOthers = activeKey !== null && !isActive
            return (
              <li
                key={key}
                className="skills-tag-float inline-block will-change-transform"
                style={{
                  animationDuration: `${floatDurationS}s`,
                  animationDelay: `${floatDelayS}s`,
                }}
              >
                <span
                  onPointerEnter={() => setActiveKey(key)}
                  className={[
                    'inline-block cursor-default rounded-full font-mono',
                    'transition-[transform,opacity,filter] duration-300 ease-out',
                    skillTagSizeClass[sizeIdx],
                    skillChipClass[variant],
                    isActive
                      ? 'relative z-10 scale-[1.28] brightness-125 shadow-[0_0_28px_-2px_rgba(45,212,191,0.55)]'
                      : dimOthers
                        ? 'scale-[0.78] opacity-50 saturate-50'
                        : 'scale-100 opacity-100 saturate-100',
                  ].join(' ')}
                >
                  {item}
                </span>
              </li>
            )
          },
        )}
      </ul>
    </div>
  )
}

const experience = [
  {
    company: 'Bright Data',
    brand: {
      kind: 'image' as const,
      src: BRIGHT_DATA_LOGO,
      alt: 'Bright Data',
      wide: true,
      readable: true,
      noBackground: true,
      hotlink: true,
    },
    role: 'Software Engineer → Technical Account Manager → R&D Team Leader',
    period: 'Nov 2018 — Present',
    location: 'Netanya, Israel',
    highlights: [
      'Architected and implemented Bright SDK, EarnApp, and BrightVideo, expanding platform capabilities.',
      'Led backend development with Node.js, MongoDB, and Docker for scalable microservices.',
      'Delivered mobile and TV apps across Java, Kotlin, Dart, JS, Swift, and C#.',
      'Raised reliability through CI/CD and TDD.',
    ],
  },
  {
    company: 'Hola Networks',
    brand: {
      kind: 'image' as const,
      src: HOLA_LOGO,
      alt: 'Hola',
      onLight: true,
      wide: true,
    },
    role: 'Software Engineer',
    period: '2017 — 2018',
    location: 'Netanya, Israel',
    highlights: [
      'Built server-side applications with Node.js.',
      'Shipped hybrid apps with React Native for faster release cycles.',
      'Used AngularJS, React, and NPM for web delivery.',
      'Applied secure web patterns (AJAX, REST, SSL).',
    ],
  },
  {
    company: 'Private company',
    brand: {
      kind: 'image' as const,
      src: PRIVATE_COMPANY_LOGO,
      alt: 'Medical articles platform',
      wide: true,
      noBackground: true,
    },
    role: 'Growth Team Leader',
    period: '2016 — 2019',
    location: 'New York, USA (remote)',
    highlights: [
      'Led a team of 6 developers on scalable web solutions.',
      'Built QA automation with Selenium and Webdriver.io; reduced bug incidence by ~40%.',
      'Owned product integration; improved user engagement by ~20%.',
    ],
  },
  {
    company: 'Spiral Solutions',
    brand: {
      kind: 'image' as const,
      src: SPIRAL_LOGO,
      alt: 'Spiral Solutions',
      wide: true,
      readable: true,
      noBackground: true,
    },
    role: 'Senior Web Developer',
    period: '2015 — 2017',
    location: 'Carmiel, Israel',
    highlights: [
      'Developed web apps with Node.js, PHP, HTML, and CSS; targeted 99.9% uptime.',
      'Delivered with Agile, Gulp, Webpack, and Mocha.',
      'Worked with MySQL, MS-SQL, PostgreSQL, MongoDB, CouchBase, and Redis.',
      'Automated testing to improve deployment efficiency by ~30%.',
    ],
  },
] as const

const certifications = [
  'Advanced iOS Development',
  'Concurrent Programming in Android',
  'Ethical Hacking',
  'iOS Development with Firebase',
  'iOS Network Development',
  'Python for Data Science',
  'Cloud Development',
  'Google CCE',
  'Google Cloud Development',
  'Web Development with Go',
  'Microsoft Azure',
  'Object-Oriented Design',
] as const

function SectionTitle({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string
  title: string
  id: string
}) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gradient-eyebrow">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
        {title}
      </h2>
    </div>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

const contactIconBtnClass =
  'inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 ring-1 ring-zinc-700 transition hover:bg-white/5 hover:text-teal-300'

type CompanyBrand =
  | { kind: 'icon'; slug: string; color: string }
  | { kind: 'initials'; text: string; className: string }
  | {
      kind: 'image'
      src: string
      alt: string
      /** No pill background — logo sits on page (use with transparent PNG/SVG) */
      noBackground?: boolean
      onLight?: boolean
      wide?: boolean
      /** Larger mark when using noBackground or chip */
      readable?: boolean
      /** Third-party image URLs that block cross-site Referer */
      hotlink?: boolean
    }

function CompanyBrandMark({ brand }: { brand: CompanyBrand }) {
  if (brand.kind === 'icon') {
    return (
      <img
        src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color}`}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 rounded-lg bg-white/[0.06] p-1 ring-1 ring-white/10"
      />
    )
  }
  if (brand.kind === 'image') {
    const sizeClass = brand.readable
      ? 'h-9 max-w-[13rem]'
      : brand.wide
        ? 'h-7 max-w-[9rem]'
        : 'h-5 max-w-[5.5rem]'
    const img = (
      <img
        src={brand.src}
        alt={brand.alt}
        className={`w-auto shrink-0 object-contain object-left ${sizeClass}`}
        loading="lazy"
        referrerPolicy={brand.hotlink ? 'no-referrer' : undefined}
      />
    )
    if (brand.noBackground) {
      return <span className="inline-flex items-center">{img}</span>
    }
    if (brand.onLight) {
      return (
        <div
          className={`flex shrink-0 items-center rounded-md bg-white px-2 py-0.5 ring-1 ring-black/10 ${brand.readable ? 'min-h-9' : brand.wide ? 'min-h-8' : 'h-7'}`}
        >
          {img}
        </div>
      )
    }
    return (
      <div
        className={`flex shrink-0 items-center rounded-md bg-white/[0.06] px-1.5 py-0.5 ring-1 ring-white/10 ${brand.wide ? 'min-h-8' : 'h-7'}`}
      >
        {img}
      </div>
    )
  }
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-semibold ring-1 ${brand.className}`}
    >
      {brand.text}
    </span>
  )
}

function TechLogoStrip() {
  const loop = [...stackLogos, ...stackLogos]
  return (
    <section
      id="stack"
      className="scroll-mt-20 border-b border-white/[0.06] bg-gradient-to-b from-teal-500/[0.03] to-transparent"
    >
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-14">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-gradient-eyebrow">
          Stack & platforms
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="logo-marquee-track flex w-max items-center gap-10 md:gap-14">
            {loop.map((logo, i) => {
              const src =
                'src' in logo && logo.src
                  ? logo.src
                  : `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`
              const fromJsdelivr = 'src' in logo && Boolean(logo.src)
              return (
              <div
                key={`${logo.slug}-${i}`}
                className="flex shrink-0 items-center gap-2.5 opacity-[0.88]"
              >
                <img
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className={
                    fromJsdelivr
                      ? 'h-8 w-8 brightness-0 invert opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]'
                      : 'h-8 w-8 drop-shadow-[0_0_12px_rgba(45,212,191,0.15)]'
                  }
                />
                <span className="whitespace-nowrap font-mono text-sm text-zinc-500">
                  {logo.label}
                </span>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="page-bg min-h-svh">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-gradient-to-b from-violet-950/[0.16] via-zinc-950/80 to-zinc-950/90 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/75">
        <div className="relative mx-auto flex max-w-5xl items-center gap-3 px-5 py-4 md:px-8 lg:justify-between lg:gap-4">
          <a
            href="#top"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500/25 via-zinc-800/50 to-violet-600/25 font-mono text-sm font-semibold tracking-tight text-zinc-100 ring-1 ring-white/10 transition hover:ring-teal-400/30"
          >
            VS
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-400 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-teal-300 hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.35)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <nav
            className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1 text-xs text-zinc-500 lg:hidden"
            aria-label="Sections"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="shrink-0 rounded-md px-2 py-1 transition-colors hover:bg-white/5 hover:text-teal-300"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={contactIconBtnClass}
              aria-label={`Email ${CONTACT_EMAIL}`}
            >
              <MailIcon className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="top"
          className="relative overflow-hidden border-b border-white/[0.06]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 85% 55% at 50% -25%, oklch(0.52 0.14 195 / 0.4), transparent 55%)',
            }}
          />
          <div
            className="pointer-events-none absolute -right-32 top-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, oklch(0.5 0.2 290 / 0.45), transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, oklch(0.55 0.12 195 / 0.4), transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-zinc-950/55 via-zinc-950/35 to-zinc-950/60"
            aria-hidden
          />
          <div className="relative z-10 w-full overflow-hidden py-[3.6rem] md:py-[5.04rem]">
            <div
              className="pointer-events-none absolute inset-0 bg-white/5"
              aria-hidden
            />
            <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
              <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,17rem)] md:items-center md:gap-12 lg:grid-cols-[1fr_minmax(0,19rem)]">
                <div>
                  <p className="font-mono text-sm text-teal-400/90">
                    Haifa, Israel - Worldwide
                  </p>
                  <h1 className="text-gradient-brand mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.1]">
                    Vladislav Sokolov
                  </h1>
                  <p className="mt-3 text-xl text-zinc-400 md:text-2xl">
                    Software Architect & Technical Lead
                  </p>
                  <p className="mt-2 max-w-2xl text-lg leading-relaxed text-zinc-400">
                    Over 16 years building scalable products, microservices, and
                    cross-platform clients—from protocol work and backends to mobile
                    and TV apps.
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
                    Building strong R&amp;D teams—hands-on in recruiting, ramp-up, and
                    ongoing technical mentoring.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/15 px-5 py-2.5 text-sm font-medium text-teal-200 ring-1 ring-teal-400/45 transition hover:from-teal-500/30 hover:to-emerald-500/25 hover:shadow-[0_0_24px_-4px_rgba(45,212,191,0.35)]"
                    >
                      Connect
                    </a>
                    <a
                      href="#experience"
                      className="inline-flex items-center justify-center rounded-lg bg-zinc-900/40 px-5 py-2.5 text-sm font-medium text-zinc-300 ring-1 ring-zinc-600/80 transition hover:bg-white/[0.06] hover:ring-violet-500/25"
                    >
                      View experience
                    </a>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[17rem] md:mx-0 md:max-w-none">
                  <img
                    src={`${import.meta.env.BASE_URL}portrait.png`}
                    alt="Vladislav Sokolov"
                    width={456}
                    height={608}
                    className="aspect-[3/4] w-full rounded-2xl object-cover object-top shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechLogoStrip />

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <SectionTitle
            id="about"
            eyebrow="Profile"
            title="What I focus on"
          />
          <div className="grid gap-8 md:grid-cols-[1fr_280px] md:gap-12">
            <div className="space-y-4 text-lg leading-relaxed text-zinc-400">
              <p>
                Results-driven architect and technical lead with a track record
                across research, hands-on development, and team leadership. I
                care about scalable designs, measurable performance, and
                shipping reliably—with CI/CD and tests as first-class citizens.
              </p>
              <p>
                Recent work centers on distributed backends, SDKs, and
                multi-platform clients, with deep exposure to cryptography and
                protocol-oriented development where the problem demands it.
              </p>
            </div>
            <aside className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/50 to-zinc-950/90 p-6 shadow-[0_0_40px_-16px_rgba(139,92,246,0.12)] ring-1 ring-violet-500/10">
              <h3 className="text-sm font-semibold text-zinc-200">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    Experience
                  </dt>
                  <dd className="mt-1 text-zinc-300">Over 16 years</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-zinc-300">Haifa, Israel - Worldwide</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    Current
                  </dt>
                  <dd className="mt-1 text-zinc-300">Bright Data · R&D</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-gradient-to-b from-violet-950/[0.12] via-transparent to-teal-950/[0.08]">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <SectionTitle id="skills" eyebrow="Toolkit" title="Skills" />
            <SkillsTagCloud />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 font-mono text-sm leading-relaxed md:px-8 md:py-24 md:text-[0.9375rem]">
          <SectionTitle
            id="experience"
            eyebrow="Timeline"
            title="Experience"
          />
          <div className="relative mt-2" role="list">
            <div
              className="pointer-events-none absolute bottom-2 left-3 top-3 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-teal-500/45 via-zinc-600/65 to-zinc-700/45"
              aria-hidden
            />
            {experience.map((job) => (
              <div
                key={job.company}
                role="listitem"
                className="relative z-10 flex gap-4 pb-14 last:pb-2 md:gap-5"
              >
                <div className="flex w-6 shrink-0 justify-center pt-1 md:w-7">
                  <span
                    className="size-3 shrink-0 rounded-full border-2 border-teal-400/90 bg-zinc-950 shadow-[0_0_14px_rgba(45,212,191,0.35)] ring-2 ring-zinc-950"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <CompanyBrandMark brand={job.brand} />
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight text-zinc-100 md:text-lg">
                          {job.company}
                        </h3>
                        <p className="mt-0.5 text-zinc-400">{job.role}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-xs text-zinc-500 sm:text-right md:text-sm">
                      {job.period}
                      <span className="hidden sm:inline"> · </span>
                      <span className="block sm:inline">{job.location}</span>
                    </p>
                  </div>
                  <div className="mt-4 space-y-2 text-zinc-400">
                    {job.highlights.map((h) => (
                      <p key={h}>
                        <span className="select-none text-teal-500/70">* </span>
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-gradient-to-b from-zinc-950/40 to-transparent">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <SectionTitle id="projects" eyebrow="Highlights" title="Key projects" />
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-6 shadow-[0_0_50px_-20px_rgba(45,212,191,0.12)] ring-1 ring-teal-500/15 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={BRIGHT_SDK_ICON}
                    alt="Bright SDK"
                    className="h-9 w-auto max-w-[min(100%,14rem)] shrink-0 object-contain object-left"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-lg font-semibold text-zinc-100">
                    Bright SDK
                  </h3>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  Bright Data · Android, macOS, iOS, Windows
                </p>
                <p className="mt-4 text-zinc-400">
                  Multi-platform SDK integrating Bright Data capabilities into
                  partner products.
                </p>
                <p className="mt-3 text-sm text-teal-300/90">
                  Helped scale the residential proxy network to up to ~8M daily
                  IPs within two years.
                </p>
              </article>
              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-6 shadow-[0_0_50px_-20px_rgba(139,92,246,0.1)] ring-1 ring-violet-500/15 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={PRIVATE_COMPANY_LOGO}
                    alt="Medical articles platform"
                    className="h-9 w-9 shrink-0 object-contain object-left"
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold text-zinc-100">
                    Leadership & mentorship
                  </h3>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  Private company · 6 developers · QA automation
                </p>
                <p className="mt-4 text-zinc-400">
                  Led a cross-functional team, mentored juniors, and pushed
                  adoption of modern tooling and practices.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionTitle
                id="education"
                eyebrow="Education"
                title="Degrees"
              />
              <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/40 to-zinc-950/90 p-6 ring-1 ring-white/5">
                <h3 className="font-semibold text-zinc-100">
                  MA in Creative Arts and Producing
                </h3>
                <p className="mt-1 text-zinc-400">
                  Institute of Modern Knowledge · Minsk, Belarus
                </p>
                <p className="mt-2 font-mono text-sm text-zinc-500">
                  Sep 2000 — Jul 2005
                </p>
              </div>
            </div>
            <div>
              <div className="mb-10 scroll-mt-24">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gradient-eyebrow">
                  Credentials
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
                  Certifications
                </h2>
              </div>
              <ul className="columns-1 gap-x-8 text-sm text-zinc-400 sm:columns-2">
                {certifications.map((c) => (
                  <li key={c} className="mb-2 break-inside-avoid">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-white/[0.06] bg-gradient-to-b from-violet-950/[0.15] via-transparent to-[var(--color-surface)]"
        >
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="text-gradient-brand text-2xl font-semibold tracking-tight">
              Contact
            </h2>
            <p className="mt-2 max-w-xl text-zinc-400">
              Happy to share experience on architecture, platform engineering,
              and technical leadership—and to explore collaboration when there is
              a good fit.
            </p>
            <div
              className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
              aria-label="Contact links"
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={contactIconBtnClass}
                aria-label={`Email ${CONTACT_EMAIL}`}
              >
                <MailIcon className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="GitHub"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} Vladislav Sokolov</p>
      </footer>
    </div>
  )
}
