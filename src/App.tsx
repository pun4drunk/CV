const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

const LINKEDIN_URL = 'https://www.linkedin.com/in/vladislavsss'
/** Corporate / org GitHub profile */
const GITHUB_CORPORATE_URL = 'https://github.com/vladislavs-luminati'

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

/** Employer / product marks (official assets) */
const BRIGHT_DATA_LOGO =
  'data:image/png;base64,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'
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

const experience = [
  {
    company: 'Bright Data',
    brand: {
      kind: 'image' as const,
      src: BRIGHT_DATA_LOGO,
      alt: 'Bright Data',
      wide: true,
      noBackground: true,
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
      kind: 'initials' as const,
      text: 'PC',
      className: 'bg-violet-950/85 text-violet-200 ring-violet-400/35',
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
      />
    )
    if (brand.noBackground) {
      return (
        <span
          className={
            brand.alt === 'Bright Data' || brand.alt === 'Spiral Solutions'
              ? 'inline-flex items-center rounded-sm ring-1 ring-white/20'
              : 'inline-flex items-center'
          }
        >
          {img}
        </span>
      )
    }
    if (brand.onLight) {
      return (
        <div
          className={`flex shrink-0 items-center rounded-md bg-white px-2 py-0.5 ring-1 ring-black/10 ${brand.wide ? 'min-h-8' : 'h-7'}`}
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
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--color-surface)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-4 md:px-8 lg:justify-between lg:gap-4">
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
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-teal-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={GITHUB_CORPORATE_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-teal-300"
              aria-label="Corporate GitHub (vladislavs-luminati)"
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
          <div className="relative z-10 mx-auto grid max-w-5xl items-start gap-10 px-5 py-20 md:grid-cols-[1fr_minmax(0,17rem)] md:items-center md:gap-12 md:px-8 md:py-28 lg:grid-cols-[1fr_minmax(0,19rem)]">
            <div>
              <p className="font-mono text-sm text-teal-400/90">Haifa, Israel</p>
              <h1 className="text-gradient-brand mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl md:leading-[1.1]">
                Vladislav Sokolov
              </h1>
              <p className="mt-3 text-xl text-zinc-400 md:text-2xl">
                Software Architect & Technical Lead
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                14+ years building scalable products, microservices, and
                cross-platform clients—from protocol work and backends to mobile
                and TV apps.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/15 px-5 py-2.5 text-sm font-medium text-teal-200 ring-1 ring-teal-400/45 transition hover:from-teal-500/30 hover:to-emerald-500/25 hover:shadow-[0_0_24px_-4px_rgba(45,212,191,0.35)]"
                >
                  Get in touch
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
                  <dd className="mt-1 text-zinc-300">14+ years</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-zinc-300">Haifa, Israel</dd>
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
                    {g.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li key={item}>
                        <span
                          className={`inline-block rounded-md px-2.5 py-1 font-mono text-xs ${skillChipClass[g.variant]}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
          <SectionTitle
            id="experience"
            eyebrow="Timeline"
            title="Experience"
          />
          <ol className="relative list-none space-y-12 border-l border-white/[0.08] pl-8 md:pl-10 [&>li]:list-none">
            {experience.map((job) => (
              <li key={job.company} className="relative list-none">
                <span className="absolute -left-[10px] top-1.5 h-3 w-3 rounded-full border-2 border-teal-400/90 bg-gradient-to-br from-teal-500/40 to-violet-600/50 shadow-[0_0_12px_rgba(45,212,191,0.35)] md:-left-[12px]" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex items-start gap-3">
                    <CompanyBrandMark brand={job.brand} />
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">
                        {job.company}
                      </h3>
                      <p className="text-zinc-400">{job.role}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-zinc-500">
                    {job.period}
                    <span className="hidden sm:inline"> · </span>
                    <span className="block sm:inline">{job.location}</span>
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-zinc-400">
                  {job.highlights.map((h) => (
                    <p key={h} className="leading-relaxed">
                      {h}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-white/[0.06] bg-gradient-to-b from-zinc-950/40 to-transparent">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <SectionTitle id="projects" eyebrow="Highlights" title="Key projects" />
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-6 shadow-[0_0_50px_-20px_rgba(45,212,191,0.12)] ring-1 ring-teal-500/15 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={BRIGHT_DATA_LOGO}
                    alt="Bright Data"
                    className="h-8 w-auto max-w-[min(100%,11rem)] shrink-0 rounded-sm object-contain object-left ring-1 ring-white/20"
                    loading="lazy"
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
                <h3 className="text-lg font-semibold text-zinc-100">
                  Leadership & mentorship
                </h3>
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
              Open to conversations about architecture, platform engineering, and
              technical leadership. References available on request.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="mailto:v0538276702@gmail.com"
                className="inline-flex items-center gap-2 text-teal-300 underline decoration-teal-500/40 underline-offset-4 transition hover:decoration-teal-400"
              >
                v0538276702@gmail.com
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href="tel:+972538276702"
                className="text-zinc-300 transition hover:text-teal-300"
              >
                +972 53-827-6702
              </a>
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-zinc-400 ring-1 ring-zinc-700 transition hover:bg-white/5 hover:text-teal-300"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={GITHUB_CORPORATE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-zinc-400 ring-1 ring-zinc-700 transition hover:bg-white/5 hover:text-teal-300"
              >
                <GitHubIcon className="h-4 w-4" />
                <span className="flex flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-2">
                  <span>Corporate GitHub</span>
                  <span className="font-mono text-xs text-zinc-500 sm:text-sm">
                    @vladislavs-luminati
                  </span>
                </span>
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
