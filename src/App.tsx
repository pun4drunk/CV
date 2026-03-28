import { useCallback, useEffect, useId, useState } from 'react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

const LINKEDIN_URL = 'https://www.linkedin.com/in/vladislavsss'
/** GitHub profile */
const GITHUB_URL = 'https://github.com/vladislavs-luminati'

const CONTACT_EMAIL = 'v0538276702@gmail.com'

/** WhatsApp chat — same number as +972 53-827-6702 */
const WHATSAPP_URL = 'https://wa.me/972538276702'

const ORITHMIC_MARK = `${import.meta.env.BASE_URL}orithmic-mark.svg`
/** Orithmic Software on GitHub */
const ORITHMIC_ORG_URL = 'https://github.com/OrithmicSoftware'

function OrithmicLogoImg({
  className,
  size = 36,
}: {
  className?: string
  size?: number
}) {
  return (
    <img
      src={ORITHMIC_MARK}
      alt=""
      width={size}
      height={size}
      className={className}
      decoding="async"
    />
  )
}

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

/** Bright SDK marketing site */
const BRIGHT_SDK_URL = 'https://bright-sdk.com/'

/** BrightSDK org on GitHub — samples, plugins, docs, tooling */
const BRIGHT_SDK_ORG_URL = 'https://github.com/orgs/BrightSDK'

/** Some slugs 404 on cdn.simpleicons.org; pin icons to match stack logos (see microsoftazure). */
const SIMPLE_ICONS_ICONS_BASE =
  'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons'

type BrightSdkPlatformChip = {
  iconSlug: string
  color: string
  label: string
  vendor?: string
  deprecated?: boolean
  /** Icon hex for `theme="card"` when the default `color` is too dark on zinc chips */
  cardIconColor?: string
  /** Use when cdn.simpleicons.org has no asset for `iconSlug` (e.g. Amazon, Windows). */
  iconSrc?: string
  /** iconsOnly: popover copy (order-of-magnitude; not audited) */
  popoverBlurb: string
  /** iconsOnly: approximate reach; shown bold next to blurb */
  popoverDevicesBold: string
}

const brightSdkApplePlatform: BrightSdkPlatformChip = {
  iconSlug: 'apple',
  color: '000000',
  label: 'Apple',
  cardIconColor: 'E8E8ED',
  popoverBlurb: 'iOS, iPadOS & macOS through one Apple SDK surface.',
  popoverDevicesBold: '~2B+ active Apple ecosystem devices',
}

/** Native client targets — simpleicons CDN (slug + hex, no #) */
const brightSdkNativePlatforms: readonly BrightSdkPlatformChip[] = [
  {
    iconSlug: 'android',
    color: '3DDC84',
    label: 'Android',
    popoverBlurb: 'Phones, tablets & embedded Android worldwide.',
    popoverDevicesBold: '~3B+ active devices',
  },
  {
    iconSlug: 'amazon',
    color: 'FF9900',
    label: 'Amazon',
    iconSrc: `${SIMPLE_ICONS_ICONS_BASE}/amazon.svg`,
    popoverBlurb: 'Fire OS, Fire TV, tablets & Amazon Appstore footprint.',
    popoverDevicesBold: '~200M+ Amazon-device reach',
  },
  {
    iconSlug: 'windows',
    color: '0078D4',
    label: 'Windows',
    iconSrc: `${SIMPLE_ICONS_ICONS_BASE}/windows.svg`,
    popoverBlurb: 'Desktops, laptops & embedded Windows installs.',
    popoverDevicesBold: '~1.5B+ Windows 10/11 PCs',
  },
  brightSdkApplePlatform,
]

/** TV / OTT targets */
const brightSdkTvPlatforms: readonly BrightSdkPlatformChip[] = [
  {
    iconSlug: 'lg',
    color: 'A50034',
    label: 'webOS',
    vendor: 'LG',
    popoverBlurb: 'LG smart TVs & set-tops running webOS.',
    popoverDevicesBold: '~200M+ webOS TVs (cumulative)',
  },
  {
    iconSlug: 'samsung',
    color: '1428A0',
    label: 'TizenOS',
    vendor: 'Samsung',
    popoverBlurb: 'Samsung TVs, wearables & IoT on Tizen.',
    popoverDevicesBold: '~250M+ Tizen devices',
  },
  {
    iconSlug: 'roku',
    color: '662D91',
    label: 'Roku',
    deprecated: true,
    popoverBlurb: 'Legacy streaming OS; integration path deprecated.',
    popoverDevicesBold: '~80M+ active accounts',
  },
]

/** Smart TV targets for integration utilities (excludes deprecated Roku). */
const brightSdkTvPlatformsWithoutRoku: readonly BrightSdkPlatformChip[] =
  brightSdkTvPlatforms.filter((p) => p.iconSlug !== 'roku')

/** Game engines, hybrid stacks & build tooling in BrightSDK integration utility repos. */
const brightSdkIntegrationUtilityFrameworkChips: readonly BrightSdkPlatformChip[] =
  [
    {
      iconSlug: 'unity',
      color: '000000',
      label: 'Unity',
      cardIconColor: 'FFFFFF',
      popoverBlurb:
        'Unity projects using Bright SDK plugins and sample integrations.',
      popoverDevicesBold: 'leading engine for cross-platform games & apps',
    },
    {
      iconSlug: 'unrealengine',
      color: '0E1128',
      label: 'Unreal Engine',
      cardIconColor: 'E8E8ED',
      popoverBlurb:
        'Unreal Engine builds where Bright SDK ships as a native integration.',
      popoverDevicesBold: 'major AAA & indie desktop and mobile pipeline',
    },
    {
      iconSlug: 'react',
      color: '61DAFB',
      label: 'React Native',
      popoverBlurb:
        'React Native apps via the Bright SDK bridge, plugin, and samples.',
      popoverDevicesBold: 'large cross-platform mobile developer base',
    },
    {
      iconSlug: 'electron',
      color: '47848F',
      label: 'Electron',
      cardIconColor: 'E8E8ED',
      popoverBlurb:
        'Desktop apps built with Electron and embedded web views where applicable.',
      popoverDevicesBold: 'very wide desktop app distribution',
    },
    {
      iconSlug: 'capacitor',
      color: '119EFF',
      label: 'Capacitor',
      popoverBlurb:
        'Capacitor hybrid apps combining web UI with native Bright SDK plugins.',
      popoverDevicesBold: 'strong Ionic & web-to-native mobile footprint',
    },
    {
      iconSlug: 'webpack',
      color: '8DD6F9',
      label: 'Webpack',
      popoverBlurb:
        'Web samples and JS bundles built and shipped through Webpack-style pipelines.',
      popoverDevicesBold: 'ubiquitous web app bundling toolchain',
    },
    {
      iconSlug: 'gradle',
      color: '02303A',
      label: 'Gradle',
      cardIconColor: 'E8E8ED',
      popoverBlurb:
        'Android and multi-module native builds wired with Gradle where Bright SDK ships.',
      popoverDevicesBold: 'default build system for Android & JVM ecosystems',
    },
  ]

/** Project card: one 4-column grid (avoids 4 / 2 / broken rows across separate lists). */
const brightSdkIntegrationUtilityCardPlatforms: readonly BrightSdkPlatformChip[] =
  [
    ...brightSdkNativePlatforms,
    ...brightSdkTvPlatformsWithoutRoku,
    ...brightSdkIntegrationUtilityFrameworkChips,
  ]

const brightSdkNodePlatform: BrightSdkPlatformChip = {
  iconSlug: 'nodedotjs',
  color: '339933',
  label: 'Node.js',
  popoverBlurb: 'Server-side tooling, CLIs & build pipelines.',
  popoverDevicesBold: 'millions of hosts & dev machines',
}

const brightSdkJavaScriptPlatform: BrightSdkPlatformChip = {
  iconSlug: 'javascript',
  color: 'F7DF1E',
  label: 'JavaScript',
  popoverBlurb: 'Browsers, WebViews & embedded JS runtimes.',
  popoverDevicesBold: '~5B+ browser-capable devices',
}

/** Resolve a platform/framework chip for integration-utility repo rows (modal list). */
function brightSdkIntegrationUtilityChipBySlug(
  slug: string,
): BrightSdkPlatformChip {
  const pool: readonly BrightSdkPlatformChip[] = [
    ...brightSdkNativePlatforms,
    ...brightSdkTvPlatformsWithoutRoku,
    ...brightSdkIntegrationUtilityFrameworkChips,
  ]
  const found = pool.find((p) => p.iconSlug === slug)
  if (found == null) {
    throw new Error(
      `brightSdkIntegrationUtilityChipBySlug: unknown slug "${slug}"`,
    )
  }
  return found
}

const brightSdkIntegrationUtilityRepos: readonly {
  slug: string
  description: string
  platforms: readonly BrightSdkPlatformChip[]
}[] = [
  {
    slug: 'bright-sdk-integration',
    description:
      'Universal tool to streamline BrightSDK integration, written in Node.js.',
    platforms: [brightSdkNodePlatform, brightSdkJavaScriptPlatform],
  },
  {
    slug: 'react-native-plugin',
    description:
      'React Native plugin bridging BrightSDK with native Android and Windows.',
    platforms: [
      brightSdkIntegrationUtilityChipBySlug('react'),
      brightSdkIntegrationUtilityChipBySlug('android'),
      brightSdkIntegrationUtilityChipBySlug('windows'),
    ],
  },
  {
    slug: 'packages',
    description: 'Bright SDK distribution packages and release artifacts.',
    platforms: [
      ...brightSdkNativePlatforms,
      ...brightSdkTvPlatformsWithoutRoku,
    ],
  },
  {
    slug: 'react-native-sample',
    description: 'Sample React Native app demonstrating Bright SDK integration.',
    platforms: [
      brightSdkIntegrationUtilityChipBySlug('react'),
      brightSdkIntegrationUtilityChipBySlug('android'),
      brightSdkApplePlatform,
      brightSdkIntegrationUtilityChipBySlug('windows'),
    ],
  },
  {
    slug: 'bright-sdk-external-consent',
    description:
      'External consent screen implementation for Bright SDK partners.',
    platforms: [
      brightSdkJavaScriptPlatform,
      brightSdkIntegrationUtilityChipBySlug('webpack'),
    ],
  },
  {
    slug: 'web-sample',
    description: 'Sample web app demonstrating Bright SDK JavaScript integration.',
    platforms: [
      brightSdkJavaScriptPlatform,
      brightSdkIntegrationUtilityChipBySlug('webpack'),
    ],
  },
  {
    slug: 'unity-sample',
    description:
      'Sample Unity project with Bright SDK for Android, macOS, iOS, and Windows.',
    platforms: [
      brightSdkIntegrationUtilityChipBySlug('unity'),
      brightSdkIntegrationUtilityChipBySlug('android'),
      brightSdkApplePlatform,
      brightSdkIntegrationUtilityChipBySlug('windows'),
    ],
  },
  {
    slug: 'unity-plugin',
    description:
      'Unity plugin for integrating Bright SDK on Android, iOS, macOS, and Windows.',
    platforms: [
      brightSdkIntegrationUtilityChipBySlug('unity'),
      brightSdkIntegrationUtilityChipBySlug('android'),
      brightSdkApplePlatform,
      brightSdkIntegrationUtilityChipBySlug('windows'),
    ],
  },
  {
    slug: 'external-consent-wizard',
    description:
      'Step-by-step consent wizard for Bright SDK partner app integration.',
    platforms: [
      brightSdkJavaScriptPlatform,
      brightSdkIntegrationUtilityChipBySlug('webpack'),
      brightSdkNodePlatform,
    ],
  },
  {
    slug: 'bright-sdk-settings-dialog',
    description:
      'Customizable settings dialog component for Bright SDK consent and configuration.',
    platforms: [
      brightSdkIntegrationUtilityChipBySlug('android'),
      brightSdkIntegrationUtilityChipBySlug('gradle'),
      brightSdkJavaScriptPlatform,
    ],
  },
  {
    slug: 'bright-sdk-integration-helper',
    description:
      'Helper utilities for streamlining Bright SDK integration in partner apps.',
    platforms: [
      brightSdkNodePlatform,
      brightSdkJavaScriptPlatform,
      brightSdkIntegrationUtilityChipBySlug('gradle'),
    ],
  },
]

function brightSdkPlatformChipAriaLabel(p: BrightSdkPlatformChip): string {
  let s = p.label
  if (p.vendor != null) s += ` (${p.vendor})`
  if (p.deprecated) s += ' (deprecated)'
  return s
}

function BrightSdkPlatformChips({
  platforms,
  theme,
  className = '',
  ariaLabel,
  iconsOnly = false,
  iconsOnlyFourCols = false,
  popoverPlacement = 'adjacent',
  showIconPopovers = true,
}: {
  platforms: readonly BrightSdkPlatformChip[]
  theme: 'article' | 'card'
  className?: string
  ariaLabel: string
  /** Projects card: logos only, several per row */
  iconsOnly?: boolean
  /** When `iconsOnly`, use a fixed 4-column grid (Projects section). */
  iconsOnlyFourCols?: boolean
  /**
   * `adjacent` — popover floats beside/above the chip (Projects).
   * `inline` — popover expands below the chip in layout (avoids clipping in scroll parents, e.g. utilities modal).
   */
  popoverPlacement?: 'adjacent' | 'inline'
  /** When `iconsOnly`, hover/focus platform copy (off inside crowded dialogs). */
  showIconPopovers?: boolean
}) {
  const platformPopoverBaseId = useId().replace(/:/g, '')
  const chipLabeledArticleClass =
    'flex w-full items-center gap-2 rounded-md border border-stone-300 bg-white/90 px-2.5 py-1.5 shadow-sm'
  const chipLabeledCardClass =
    'flex w-full items-center gap-2 rounded-lg bg-zinc-800/60 px-2.5 py-1.5 ring-1 ring-zinc-600/60'
  const chipIconOnlyCardClass =
    'flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60 ring-1 ring-zinc-600/60 sm:size-11'
  const titleClass =
    theme === 'article'
      ? 'text-[13px] font-medium text-stone-800'
      : 'text-sm font-medium text-zinc-100'
  const metaClass =
    theme === 'article' ? 'text-[11px] text-stone-600' : 'text-xs text-zinc-500'

  return (
    <ul
      className={
        iconsOnly
          ? iconsOnlyFourCols
            ? `inline-grid w-max max-w-full grid-cols-4 gap-x-1.5 gap-y-1.5 ${className}`
            : `flex flex-wrap gap-2 ${className}`
          : `flex w-full flex-col gap-2 ${className}`
      }
      role="list"
      aria-label={ariaLabel}
    >
      {platforms.map((p, chipIndex) => {
        const iconHex =
          theme === 'card' && p.cardIconColor != null ? p.cardIconColor : p.color
        const src =
          p.iconSrc ?? `https://cdn.simpleicons.org/${p.iconSlug}/${iconHex}`
        const invertOnDarkCard =
          theme === 'card' && p.iconSrc != null
        const chipClass = iconsOnly
          ? chipIconOnlyCardClass
          : theme === 'article'
            ? chipLabeledArticleClass
            : chipLabeledCardClass
        const imgClass = iconsOnly
          ? `h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${invertOnDarkCard ? 'brightness-0 invert' : ''}`
          : `h-5 w-5 shrink-0 ${invertOnDarkCard ? 'brightness-0 invert' : ''}`
        const imgSize = iconsOnly ? 28 : 20

        if (iconsOnly) {
          if (!showIconPopovers) {
            return (
              <li
                key={`${p.iconSlug}-${p.label}`}
                className={p.deprecated ? 'opacity-75' : ''}
                aria-label={brightSdkPlatformChipAriaLabel(p)}
              >
                <div className={chipClass}>
                  <img
                    src={src}
                    alt=""
                    width={imgSize}
                    height={imgSize}
                    className={imgClass}
                    loading="lazy"
                  />
                </div>
              </li>
            )
          }

          const popoverId = `${platformPopoverBaseId}-${chipIndex}`
          const bigIconClass = `h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16 ${invertOnDarkCard ? 'brightness-0 invert' : ''}`
          const popoverCoverageNote =
            'Rough scale of this platform’s global footprint (order-of-magnitude, from public estimates).'
          const popoverHeading = (
            <p className="mb-2 text-left text-sm font-bold leading-tight text-zinc-100 sm:text-[15px]">
              {p.label}
              {p.vendor != null ? (
                <span className="font-semibold text-zinc-400"> ({p.vendor})</span>
              ) : null}
              {p.deprecated ? (
                <span className="font-semibold text-zinc-500"> (deprecated)</span>
              ) : null}
            </p>
          )
          const popoverInner = (
            <div className="flex items-start gap-3">
              <img
                src={src}
                alt=""
                width={64}
                height={64}
                className={bigIconClass}
                loading="lazy"
              />
              <div className="min-w-0 flex-1 pt-0.5">
                {popoverHeading}
                <p className="mb-2 border-b border-zinc-600/60 pb-2 text-left text-[11px] leading-snug text-zinc-500 sm:text-xs">
                  {popoverCoverageNote}
                </p>
                <p className="text-left text-[13px] leading-snug text-zinc-400 sm:text-sm">
                  {p.popoverBlurb}{' '}
                  <strong className="font-semibold text-zinc-100">
                    {p.popoverDevicesBold}
                  </strong>
                </p>
              </div>
            </div>
          )
          const popoverShellClass =
            'w-[min(18.5rem,calc(100vw-2rem))] rounded-xl border border-zinc-500/50 bg-zinc-900/98 p-3.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.75)] ring-1 ring-teal-500/20 backdrop-blur-md'

          if (popoverPlacement === 'inline') {
            return (
              <li
                key={`${p.iconSlug}-${p.label}`}
                className={`group flex flex-col items-start gap-1.5 ${p.deprecated ? 'opacity-75' : ''}`}
                tabIndex={0}
                aria-label={brightSdkPlatformChipAriaLabel(p)}
                aria-describedby={popoverId}
              >
                <span className="sr-only">
                  {brightSdkPlatformChipAriaLabel(p)}. {popoverCoverageNote}{' '}
                  {p.popoverBlurb} {p.popoverDevicesBold}
                </span>
                <div className={chipClass}>
                  <img
                    src={src}
                    alt=""
                    width={imgSize}
                    height={imgSize}
                    className={imgClass}
                    loading="lazy"
                  />
                </div>
                <div
                  id={popoverId}
                  role="tooltip"
                  className={`${popoverShellClass} hidden group-hover:block group-focus-within:block`}
                >
                  {popoverInner}
                </div>
              </li>
            )
          }

          return (
            <li
              key={`${p.iconSlug}-${p.label}`}
              className={`group relative ${chipClass} ${p.deprecated ? 'opacity-75' : ''}`}
              tabIndex={0}
              aria-label={brightSdkPlatformChipAriaLabel(p)}
              aria-describedby={popoverId}
            >
              <span className="sr-only">
                {brightSdkPlatformChipAriaLabel(p)}. {popoverCoverageNote}{' '}
                {p.popoverBlurb} {p.popoverDevicesBold}
              </span>
              <img
                src={src}
                alt=""
                width={imgSize}
                height={imgSize}
                className={imgClass}
                loading="lazy"
              />
              <div
                id={popoverId}
                role="tooltip"
                className={`pointer-events-none absolute z-[200] ${popoverShellClass} opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 bottom-full left-1/2 mb-2 -translate-x-1/2 md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-3 md:-translate-y-1/2 md:translate-x-0`}
              >
                {popoverInner}
              </div>
            </li>
          )
        }

        return (
          <li
            key={`${p.iconSlug}-${p.label}`}
            className={`${chipClass} ${p.deprecated ? 'opacity-75' : ''}`}
          >
            <img
              src={src}
              alt=""
              width={20}
              height={20}
              className={imgClass}
              loading="lazy"
            />
            <span className="min-w-0 leading-tight">
              <span className={titleClass}>
                {p.label}
                {p.vendor != null ? <span className={metaClass}> ({p.vendor})</span> : null}
                {p.deprecated ? <span className={metaClass}> (deprecated)</span> : null}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function BrightSdkArticleModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px] transition-opacity"
        aria-label="Close article"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bright-sdk-article-title"
        className="relative z-10 flex max-h-[min(92dvh,880px)] w-full max-w-2xl flex-col rounded-t-2xl border border-stone-300/90 bg-[#f2efe6] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.55)] sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-stone-300/80 bg-[#ebe6db] px-4 py-3 sm:px-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-600">
            Technical brief · informal
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 font-mono text-xs font-medium text-stone-700 ring-1 ring-stone-400/60 transition hover:bg-stone-200/80"
          >
            Close
          </button>
        </div>
        <article className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 pb-10 font-serif text-[15px] leading-[1.65] text-stone-900 sm:px-8 sm:py-8 sm:text-base sm:leading-relaxed">
          <header className="border-b border-double border-stone-400 pb-5 text-center">
            <h2
              id="bright-sdk-article-title"
              className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
            >
              Bright SDK: concept and implementation
            </h2>
            <p className="mt-2 text-sm italic text-stone-600">
              What it is, how it sits in the product, and how capacity scales.
            </p>
            <p className="mt-3 font-mono text-[11px] text-stone-500">
              DOI: N/A · companion to projects entry ·{' '}
              <time dateTime="2026">2026</time>
            </p>
          </header>

          <section className="mt-6">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              Abstract
            </h3>
            <p className="mt-2 border-l-2 border-teal-700/40 pl-3 text-sm italic text-stone-800">
              Bright SDK is a native software development kit that publishers embed
              in consumer applications and connected-TV experiences. It provides an
              additional, consent-based monetization path while a distributed
              residential network supplies capacity at scale. This note summarizes
              architecture, observed scale, and platform scope in the style of a
              short technical article.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              1. Problem framing
            </h3>
            <p className="mt-2 text-stone-800">
              Free and freemium products need revenue without degrading retention.
              Classical advertising competes for attention; alternative models must
              preserve UX, respect policy, and remain operationally transparent.
              The SDK sits in this design space: optional participation, clear
              disclosure, and background execution constrained by device resources.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              2. System topology
            </h3>
            <p className="mt-2 text-stone-800">
              Operationally, traffic flows from the partner binary through the SDK
              into Bright Data&apos;s network fabric. Control-plane and release
              mechanics (updates, compatibility, store policies) sit alongside the
              data path sketched below. Beyond desktop and mobile, work also covered
              smart-TV stacks—LG webOS and Samsung TizenOS.
            </p>
            <figure className="mt-5 rounded-md border border-stone-300 bg-white/60 p-4 shadow-sm">
              <svg
                viewBox="0 0 440 120"
                className="mx-auto h-auto w-full max-w-md text-stone-800"
                aria-hidden
              >
                <defs>
                  <marker
                    id="bright-sdk-fig1-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
                  </marker>
                </defs>
                <rect
                  x="8"
                  y="28"
                  width="112"
                  height="64"
                  rx="6"
                  fill="#e7e2d8"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <text x="64" y="58" textAnchor="middle" className="fill-stone-800 font-sans text-[11px] font-semibold">
                  Partner app
                </text>
                <text x="64" y="76" textAnchor="middle" className="fill-stone-600 font-sans text-[9px]">
                  mobile / desktop / TV
                </text>
                <line
                  x1="124"
                  y1="60"
                  x2="168"
                  y2="60"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#bright-sdk-fig1-arrow)"
                />
                <rect
                  x="172"
                  y="24"
                  width="108"
                  height="72"
                  rx="6"
                  fill="#ccfbf1"
                  stroke="#0d9488"
                  strokeWidth="1.5"
                />
                <text x="226" y="56" textAnchor="middle" className="fill-teal-900 font-sans text-[11px] font-bold">
                  Bright SDK
                </text>
                <text x="226" y="74" textAnchor="middle" className="fill-teal-800 font-sans text-[9px]">
                  native library
                </text>
                <line
                  x1="284"
                  y1="60"
                  x2="328"
                  y2="60"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#bright-sdk-fig1-arrow)"
                />
                <rect
                  x="332"
                  y="20"
                  width="100"
                  height="80"
                  rx="6"
                  fill="#ede9fe"
                  stroke="#7c3aed"
                  strokeWidth="1.25"
                />
                <text x="382" y="52" textAnchor="middle" className="fill-violet-950 font-sans text-[11px] font-semibold">
                  Network
                </text>
                <text x="382" y="70" textAnchor="middle" className="fill-violet-900 font-sans text-[9px]">
                  residential IP pool
                </text>
                <text x="382" y="88" textAnchor="middle" className="fill-violet-800 font-sans text-[8px]">
                  routing · policy · ops
                </text>
              </svg>
              <figcaption className="mt-3 text-center font-mono text-[10px] leading-snug text-stone-600">
                Fig. 1. High-level data path: partner surface → SDK → Bright Data
                network (schematic, not a literal sequence diagram).
              </figcaption>
            </figure>
          </section>

          <section className="mt-8">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              3. Scale (projects context)
            </h3>
            <p className="mt-2 text-stone-800">
              During intensive growth phases, engineering work on the SDK and
              surrounding platform coincided with residential capacity reaching on
              the order of{' '}
              <strong className="font-semibold text-teal-900">~11M</strong> distinct
              IPs observed per day, over roughly{' '}
              <strong className="font-semibold text-teal-900">three years</strong>.
              The chart below encodes only order-of-magnitude intuition, not audited
              time series.
            </p>
            <figure className="mt-5 rounded-md border border-stone-300 bg-white/60 p-4 shadow-sm">
              <svg
                viewBox="0 0 360 140"
                className="mx-auto h-auto w-full max-w-sm"
                aria-hidden
              >
                <text
                  x="180"
                  y="18"
                  textAnchor="middle"
                  className="fill-stone-700 font-sans text-[10px] font-semibold"
                >
                  Order of magnitude (illustrative)
                </text>
                <line x1="48" y1="120" x2="320" y2="120" stroke="#78716c" strokeWidth="1" />
                <rect x="64" y="88" width="44" height="32" fill="#99f6e4" stroke="#0f766e" rx="2" />
                <text x="86" y="108" textAnchor="middle" className="fill-stone-800 font-mono text-[9px]">
                  10⁶
                </text>
                <rect x="152" y="64" width="44" height="56" fill="#5eead4" stroke="#0f766e" rx="2" />
                <text x="174" y="98" textAnchor="middle" className="fill-stone-900 font-mono text-[9px]">
                  10⁷
                </text>
                <rect x="240" y="36" width="44" height="84" fill="#14b8a6" stroke="#115e59" rx="2" />
                <text x="262" y="82" textAnchor="middle" className="fill-white font-mono text-[9px] font-bold">
                  ~11M
                </text>
                <text x="262" y="134" textAnchor="middle" className="fill-stone-600 font-sans text-[8px]">
                  peak daily IPs (ref.)
                </text>
              </svg>
              <figcaption className="mt-3 text-center font-mono text-[10px] leading-snug text-stone-600">
                Fig. 2. Stylized magnitude ladder; numeric label reflects projects
                narrative, not a certified report.
              </figcaption>
            </figure>
          </section>

          <section className="mt-8">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              4. Quantitative summary
            </h3>
            <div className="mt-3 overflow-x-auto rounded-md border border-stone-300 bg-white/70">
              <table className="w-full min-w-[280px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-300 bg-stone-200/50 font-sans text-[10px] uppercase tracking-wider text-stone-700">
                    <th className="px-3 py-2 font-semibold">Quantity</th>
                    <th className="px-3 py-2 font-semibold">Estimate / note</th>
                  </tr>
                </thead>
                <tbody className="text-stone-800">
                  <tr className="border-b border-stone-200/80">
                    <td className="align-top px-3 py-2 font-medium">Native platforms</td>
                    <td className="px-3 py-2">
                      <p className="mb-2 text-stone-800">
                        4 (Android, Amazon, Windows, Apple)
                      </p>
                      <BrightSdkPlatformChips
                        platforms={brightSdkNativePlatforms}
                        theme="article"
                        ariaLabel="Bright SDK native platforms"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-stone-200/80">
                    <td className="align-top px-3 py-2 font-medium">
                      TV &amp; OTT platforms
                    </td>
                    <td className="px-3 py-2">
                      <p className="mb-2 text-stone-800">
                        Additional targets beyond the four native platforms above.
                      </p>
                      <BrightSdkPlatformChips
                        platforms={brightSdkTvPlatforms}
                        theme="article"
                        ariaLabel="Bright SDK TV and OTT platforms"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-stone-200/80">
                    <td className="px-3 py-2 font-medium">Residential IPs / day</td>
                    <td className="px-3 py-2">up to ~11M at peak (projects)</td>
                  </tr>
                  <tr className="border-b border-stone-200/80">
                    <td className="px-3 py-2 font-medium">Horizon</td>
                    <td className="px-3 py-2">~3 years of scaling narrative</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Disclosure model</td>
                    <td className="px-3 py-2">Opt-in UX; policy-aligned stores</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 border-t border-stone-300 pt-5">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-700">
              References
            </h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 font-mono text-xs text-stone-700">
              <li>
                Bright SDK product site:{' '}
                <a
                  href={BRIGHT_SDK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-teal-800 underline decoration-teal-600/50 underline-offset-2 hover:text-teal-950"
                >
                  {BRIGHT_SDK_URL}
                </a>
              </li>
            </ol>
          </section>
        </article>
      </div>
    </div>
  )
}

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
  'px-1.5 py-0.5 text-[10px] leading-tight sm:px-2 sm:text-[11px]',
  'px-2 py-0.5 text-[11px] sm:px-2.5 sm:py-1 sm:text-xs',
  'px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm',
  'px-2.5 py-1 text-sm font-semibold tracking-tight sm:px-3.5 sm:py-1.5 sm:text-base',
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
      className="rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-4 sm:p-5 md:p-8"
      onPointerLeave={() => setActiveKey(null)}
    >
      <ul
        className="flex flex-wrap content-start justify-center gap-x-1 gap-y-1.5 sm:gap-x-1.5 sm:gap-y-2 md:gap-x-2 md:gap-y-2.5"
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
                      ? 'relative z-10 scale-[1.12] brightness-125 shadow-[0_0_28px_-2px_rgba(45,212,191,0.55)] sm:scale-[1.28]'
                      : dimOthers
                        ? 'scale-[0.85] opacity-50 saturate-50 sm:scale-[0.78]'
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
      logoScale: 2,
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
    <div id={id} className="mb-8 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:mb-10 md:scroll-mt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gradient-eyebrow sm:text-xs sm:tracking-[0.2em]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl md:text-3xl">
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

function BookOpenIcon({ className }: { className?: string }) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ListIcon({ className }: { className?: string }) {
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
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function BrightSdkIntegrationUtilitiesModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px] transition-opacity"
        aria-label="Close repository list"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bright-sdk-integration-utilities-title"
        className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl border border-white/[0.1] bg-zinc-900/95 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-teal-500/10 sm:max-w-xl sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2
              id="bright-sdk-integration-utilities-title"
              className="text-base font-semibold tracking-tight text-zinc-100 sm:text-lg"
            >
              BrightSDK integration utilities
            </h2>
            <p className="mt-0.5 font-mono text-[10px] text-zinc-500 sm:text-[11px]">
              Public repos on GitHub · short descriptions
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs font-medium text-zinc-300 ring-1 ring-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-100"
          >
            Close
          </button>
        </div>
        <ul className="min-h-0 list-none overflow-y-auto overscroll-contain px-4 py-2 sm:px-5">
          {brightSdkIntegrationUtilityRepos.map((repo) => (
            <li
              key={repo.slug}
              className="border-b border-white/[0.06] py-3.5 last:border-b-0"
            >
              <a
                href={`https://github.com/BrightSDK/${repo.slug}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[13px] text-teal-300 underline decoration-teal-500/30 underline-offset-2 transition hover:text-teal-200 hover:decoration-teal-400/50"
              >
                {repo.slug}
              </a>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-zinc-400">
                {repo.description}
              </p>
              <BrightSdkPlatformChips
                platforms={repo.platforms}
                theme="card"
                iconsOnly
                showIconPopovers={false}
                className="mt-2.5"
                ariaLabel={`Target platforms for ${repo.slug}`}
              />
            </li>
          ))}
        </ul>
        <div className="shrink-0 border-t border-white/[0.08] px-4 py-3 sm:px-5">
          <a
            href={BRIGHT_SDK_ORG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-300/95 transition hover:text-teal-200"
          >
            <GitHubIcon className="h-4 w-4 shrink-0 opacity-90" />
            <span>View organization on GitHub</span>
            <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  )
}

const contactIconBtnClass =
  'inline-flex items-center justify-center rounded-lg p-1.5 text-zinc-400 ring-1 ring-zinc-700 transition hover:bg-white/5 hover:text-teal-300 sm:p-2'

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
      /** Experience timeline: multiply default image logo dimensions (e.g. 2 = double) */
      logoScale?: 2
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
    const scale = brand.logoScale === 2 ? 2 : 1
    const sizeClass = brand.readable
      ? scale === 2
        ? 'h-16 max-w-[min(100%,20rem)] sm:h-[4.5rem] sm:max-w-[26rem]'
        : 'h-8 max-w-[min(100%,10rem)] sm:h-9 sm:max-w-[13rem]'
      : brand.wide
        ? scale === 2
          ? 'h-12 max-w-[min(100%,15rem)] sm:h-14 sm:max-w-[18rem]'
          : 'h-6 max-w-[min(100%,7.5rem)] sm:h-7 sm:max-w-[9rem]'
        : scale === 2
          ? 'h-10 max-w-[11rem]'
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
      className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] border-b border-white/[0.06] bg-gradient-to-b from-teal-500/[0.03] to-transparent md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-5 sm:py-12 md:px-8 md:py-14">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-gradient-eyebrow sm:mb-8 sm:text-xs sm:tracking-[0.2em]">
          Stack & platforms
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="logo-marquee-track flex w-max items-center gap-6 sm:gap-10 md:gap-14">
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
  const [brightSdkArticleOpen, setBrightSdkArticleOpen] = useState(false)
  const closeBrightSdkArticle = useCallback(() => setBrightSdkArticleOpen(false), [])
  const [brightSdkIntegrationUtilitiesOpen, setBrightSdkIntegrationUtilitiesOpen] =
    useState(false)
  const closeBrightSdkIntegrationUtilities = useCallback(
    () => setBrightSdkIntegrationUtilitiesOpen(false),
    []
  )

  return (
    <div className="page-bg min-h-svh min-w-0 overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-gradient-to-b from-violet-950/[0.16] via-zinc-950/80 to-zinc-950/90 pt-[env(safe-area-inset-top,0px)] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.4)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/75">
        <div className="relative mx-auto flex max-w-5xl items-center gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 md:px-8 lg:justify-between lg:gap-4">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2 rounded-lg py-0.5 pl-0.5 pr-1 ring-1 ring-transparent transition hover:bg-white/[0.04] hover:ring-white/10 sm:gap-2.5 sm:pr-2"
            aria-label="Orithmic Software — home"
          >
            <OrithmicLogoImg className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-white/10" size={40} />
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="font-mono text-[13px] font-semibold tracking-tight text-zinc-100">
                orithmic
                <span className="font-normal text-zinc-500">-software</span>
              </span>
            </span>
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
            className="-mx-0.5 flex min-w-0 flex-1 gap-0.5 overflow-x-auto overscroll-x-contain px-0.5 text-[11px] text-zinc-500 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 sm:text-xs lg:hidden [&::-webkit-scrollbar]:hidden"
            aria-label="Sections"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="shrink-0 rounded-md px-1.5 py-1 transition-colors hover:bg-white/5 hover:text-teal-300 sm:px-2"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={contactIconBtnClass}
              aria-label={`Email ${CONTACT_EMAIL}`}
            >
              <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={contactIconBtnClass}
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
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
          <div className="relative z-10 w-full overflow-hidden py-12 sm:py-14 md:py-[5.04rem]">
            <div
              className="pointer-events-none absolute inset-0 bg-white/5"
              aria-hidden
            />
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
              <div className="grid min-w-0 items-start gap-8 sm:gap-10 md:grid-cols-[1fr_minmax(0,17rem)] md:items-center md:gap-12 lg:grid-cols-[1fr_minmax(0,19rem)]">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-teal-400/90 sm:text-sm">
                    Haifa, Israel - Worldwide
                  </p>
                  <h1 className="text-gradient-brand mt-3 max-w-[22rem] text-[1.65rem] font-semibold leading-tight tracking-tight min-[400px]:max-w-none min-[400px]:text-3xl sm:mt-4 sm:text-4xl md:text-5xl md:leading-[1.1]">
                    Vladislav Sokolov
                  </h1>
                  <p className="mt-2 text-pretty text-lg leading-snug text-zinc-400 sm:mt-3 sm:text-xl md:text-2xl">
                    Software Architect & Technical Lead
                  </p>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                    Over 16 years building scalable products, microservices, and
                    cross-platform clients—from protocol work and backends to mobile
                    and TV apps.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:mt-4 sm:text-base md:text-lg">
                    Building strong R&amp;D teams—hands-on in recruiting, ramp-up, and
                    ongoing technical mentoring.
                  </p>
                  <div className="mt-8 flex min-w-0 flex-wrap gap-3 sm:mt-10 sm:gap-4">
                    <a
                      href="#contact"
                      className="inline-flex min-h-11 min-w-[44px] flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500/20 to-emerald-500/15 px-4 py-2.5 text-sm font-medium text-teal-200 ring-1 ring-teal-400/45 transition hover:from-teal-500/30 hover:to-emerald-500/25 hover:shadow-[0_0_24px_-4px_rgba(45,212,191,0.35)] sm:flex-none sm:px-5"
                    >
                      Connect
                    </a>
                    <a
                      href="#experience"
                      className="inline-flex min-h-11 min-w-[44px] flex-1 items-center justify-center rounded-lg bg-zinc-900/40 px-4 py-2.5 text-sm font-medium text-zinc-300 ring-1 ring-zinc-600/80 transition hover:bg-white/[0.06] hover:ring-violet-500/25 sm:flex-none sm:px-5"
                    >
                      View experience
                    </a>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[min(100%,17rem)] md:mx-0 md:max-w-none">
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

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
          <SectionTitle
            id="about"
            eyebrow="Profile"
            title="What I focus on"
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-12">
            <div className="min-w-0 space-y-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
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
            <aside className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/50 to-zinc-950/90 p-5 shadow-[0_0_40px_-16px_rgba(139,92,246,0.12)] ring-1 ring-violet-500/10 sm:p-6 lg:max-w-none">
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

        <section className="mx-auto max-w-5xl px-4 py-14 font-mono text-xs leading-relaxed sm:px-5 sm:py-16 sm:text-sm md:px-8 md:py-24 md:text-[0.9375rem]">
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
                        {job.company === 'Private company' ? (
                          <>
                            <h3 className="text-base font-semibold tracking-tight text-zinc-100 break-words md:text-lg">
                              {job.company}
                            </h3>
                            <p className="mt-0.5 text-pretty break-words text-zinc-400">
                              {job.role}
                            </p>
                          </>
                        ) : (
                          <h3 className="text-base font-semibold tracking-tight text-zinc-100 break-words md:text-lg">
                            {job.role}
                          </h3>
                        )}
                      </div>
                    </div>
                    <p className="shrink-0 text-[11px] text-zinc-500 sm:text-xs sm:text-right md:text-sm">
                      {job.period}
                      <span className="hidden sm:inline"> · </span>
                      <span className="block max-w-full break-words sm:inline">
                        {job.location}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 space-y-2 text-zinc-400">
                    {job.highlights.map((h) => (
                      <p key={h} className="text-pretty break-words">
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

        <section className="border-y border-white/[0.06] bg-gradient-to-b from-violet-950/[0.12] via-transparent to-teal-950/[0.08]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
            <SectionTitle id="skills" eyebrow="Toolkit" title="Skills" />
            <SkillsTagCloud />
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-gradient-to-b from-zinc-950/40 to-transparent">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
            <SectionTitle id="projects" eyebrow="Work" title="Projects" />
            <div className="flex flex-col gap-6 sm:gap-8">
              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-5 shadow-[0_0_50px_-20px_rgba(45,212,191,0.12)] ring-1 ring-teal-500/15 sm:p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                  <div className="flex w-full shrink-0 flex-col gap-3 md:max-w-[min(100%,18rem)]">
                    <img
                      src={BRIGHT_SDK_ICON}
                      alt="Bright SDK"
                      title="Bright SDK — official wordmark"
                      className="h-10 w-auto max-w-[min(100%,16rem)] object-contain object-left sm:h-11"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col gap-y-1.5">
                      <BrightSdkPlatformChips
                        platforms={brightSdkNativePlatforms}
                        theme="card"
                        iconsOnly
                        iconsOnlyFourCols
                        ariaLabel="Bright SDK native platforms"
                      />
                      <BrightSdkPlatformChips
                        platforms={brightSdkTvPlatforms}
                        theme="card"
                        iconsOnly
                        iconsOnlyFourCols
                        ariaLabel="Bright SDK TV and OTT platforms"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-100 sm:text-xl">
                        Bright SDK
                      </h3>
                      <span className="rounded-md bg-teal-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-200/90 ring-1 ring-teal-400/25">
                        Featured
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-xs text-zinc-500">
                      Bright Data · Android, Amazon, Windows, Apple · SDK & platform
                      integration
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                      Multi-platform SDK that brings Bright Data’s network and
                      tooling into partner apps and devices—shipping native
                      clients, release pipelines, and reliability work end to end.
                      TV-class stacks included LG webOS and Samsung TizenOS.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-teal-300/90">
                      Helped scale the residential proxy network to up to ~11M
                      daily IPs within three years.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setBrightSdkArticleOpen(true)}
                        aria-haspopup="dialog"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800/80 px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-zinc-600/80 transition hover:bg-zinc-800 hover:ring-zinc-500/50"
                      >
                        <BookOpenIcon className="h-4 w-4 shrink-0 text-zinc-400" />
                        More
                      </button>
                      <a
                        href={BRIGHT_SDK_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500/15 px-4 py-2.5 text-sm font-medium text-teal-200 ring-1 ring-teal-400/40 transition hover:bg-teal-500/25 hover:ring-teal-400/55"
                      >
                        <ExternalLinkIcon className="h-4 w-4 shrink-0 text-teal-400/90" />
                        Website
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-5 shadow-[0_0_50px_-20px_rgba(45,212,191,0.1)] ring-1 ring-teal-500/12 sm:p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                  <div className="flex w-full shrink-0 flex-col gap-3 md:max-w-[min(100%,18rem)]">
                    <img
                      src={BRIGHT_SDK_ICON}
                      alt="Bright SDK"
                      title="Bright SDK — official wordmark"
                      className="h-10 w-auto max-w-[min(100%,16rem)] object-contain object-left sm:h-11"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <BrightSdkPlatformChips
                      platforms={brightSdkIntegrationUtilityCardPlatforms}
                      theme="card"
                      iconsOnly
                      iconsOnlyFourCols
                      ariaLabel="BrightSDK integration utilities — platforms and tooling"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-100 sm:text-xl">
                        BrightSDK integration utilities
                      </h3>
                      <span className="rounded-md bg-zinc-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-300/90 ring-1 ring-zinc-500/30">
                        Open source
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-xs text-zinc-500">
                      BrightSDK on GitHub · integration samples, native plugins,
                      and partner tooling
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                      Public repositories that support SDK adoption: platform
                      samples (Unity, React Native, web), distribution packages,
                      and consent UX helpers for partners.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setBrightSdkIntegrationUtilitiesOpen(true)}
                        aria-haspopup="dialog"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800/80 px-4 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-zinc-600/80 transition hover:bg-zinc-800 hover:ring-zinc-500/50"
                      >
                        <ListIcon className="h-4 w-4 shrink-0 text-zinc-400" />
                        More
                      </button>
                      <a
                        href={BRIGHT_SDK_ORG_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500/15 px-4 py-2.5 text-sm font-medium text-teal-200 ring-1 ring-teal-400/40 transition hover:bg-teal-500/25 hover:ring-teal-400/55"
                      >
                        <GitHubIcon className="h-4 w-4 shrink-0 text-teal-400/90" />
                        Website
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/45 to-zinc-950/95 p-5 shadow-[0_0_50px_-20px_rgba(139,92,246,0.1)] ring-1 ring-violet-500/15 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <img
                    src={PRIVATE_COMPANY_LOGO}
                    alt="Medical articles platform"
                    title="Medical articles platform (NDA)"
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

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-24">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-2">
            <div className="min-w-0">
              <SectionTitle
                id="education"
                eyebrow="Education"
                title="Degrees"
              />
              <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/40 to-zinc-950/90 p-5 ring-1 ring-white/5 sm:p-6">
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
            <div className="min-w-0">
              <div className="mb-8 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:mb-10 md:scroll-mt-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gradient-eyebrow sm:text-xs sm:tracking-[0.2em]">
                  Credentials
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl md:text-3xl">
                  Certifications
                </h2>
              </div>
              <ul className="columns-1 gap-x-6 text-sm text-zinc-400 min-[480px]:columns-2 min-[480px]:gap-x-8">
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
          className="scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] border-t border-white/[0.06] bg-gradient-to-b from-violet-950/[0.15] via-transparent to-[var(--color-surface)] md:scroll-mt-28"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-5 sm:py-16 md:px-8 md:py-20">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <OrithmicLogoImg className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-white/10 sm:h-11 sm:w-11" size={44} />
              <h2 className="text-gradient-brand text-xl font-semibold tracking-tight sm:text-2xl">
                Contact
              </h2>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
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
                <MailIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className={contactIconBtnClass}
                aria-label="GitHub"
              >
                <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-zinc-600 sm:py-8 sm:pb-[max(2rem,env(safe-area-inset-bottom))] sm:text-sm md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <a
            href={ORITHMIC_ORG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 text-zinc-500 ring-1 ring-transparent transition hover:text-zinc-400 hover:ring-white/10"
          >
            <OrithmicLogoImg className="h-8 w-8 rounded-md ring-1 ring-white/10" size={32} />
            <span className="text-left font-mono text-[11px] leading-tight sm:text-xs">
              <span className="block font-medium text-zinc-400">Orithmic Software</span>
              <span className="text-zinc-600">GitHub org</span>
            </span>
          </a>
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} Vladislav Sokolov
          </p>
        </div>
      </footer>

      <BrightSdkArticleModal open={brightSdkArticleOpen} onClose={closeBrightSdkArticle} />
      <BrightSdkIntegrationUtilitiesModal
        open={brightSdkIntegrationUtilitiesOpen}
        onClose={closeBrightSdkIntegrationUtilities}
      />
    </div>
  )
}
