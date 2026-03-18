import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "@config/routes";
import { useAuth } from "@app/providers/AuthProvider";
import { LanguageSwitcher } from "@shared/components/ui";
import { PageSEO } from "@shared/components/seo/PageSEO";
import catLuna from "@assets/images/pets/cat-luna.jpg";
import dogMax from "@assets/images/pets/dog-max.jpg";
import dogBuddy from "@assets/images/pets/dog-buddy.jpg";
import dogLocation from "@assets/images/pets/dog-location.jpg";
import catsChat from "@assets/images/pets/cats-chat.jpg";
import dogProfile from "@assets/images/pets/dog-profile.jpg";

const HOME_JSON_LD = [
  {
    "@type": "WebSite",
    "@id": "https://zommie.asia/#website",
    "url": "https://zommie.asia/",
    "name": "Zommie",
    "description": "The #1 pet dating app — swipe, match, and arrange playdates for your pets",
    "inLanguage": ["en", "vi"],
  },
  {
    "@type": "SoftwareApplication",
    "name": "Zommie",
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "VND" },
    "url": "https://zommie.asia/",
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent">
            Zommie
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
            {t("home.nav.howItWorks")}
          </a>
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors">
            {t("home.nav.features")}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link to={ROUTES.LOGIN} className="text-sm font-semibold text-gray-700 hover:text-violet-600 transition-colors">
            {t("home.nav.logIn")}
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 text-sm font-bold text-white shadow-md hover:opacity-90 hover:shadow-violet-200 hover:shadow-lg transition-all"
          >
            {t("home.nav.createAccount")}
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Pet Card Mockup ──────────────────────────────────────────────────────────

interface PetCardProps {
  name: string;
  age: string;
  distance: string;
  image: string;
  rotate: number;
  zIndex: number;
}

function PetCard({ name, age, distance, image, rotate, zIndex }: PetCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className="absolute w-64 rounded-3xl bg-white shadow-2xl overflow-hidden"
      style={{ left: "50%", transform: `translateX(-50%) rotate(${rotate}deg)`, zIndex }}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute bottom-3 right-3 rounded-full bg-white/30 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
          {t("home.hero.cardNew")}
        </div>
      </div>
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">{name}</span>
          <span className="text-base text-gray-500">{age}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {t("home.hero.away", { distance })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 px-5 py-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-100 text-gray-300 hover:border-red-300 hover:text-red-400 transition-colors shadow-sm">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity">
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-100 text-gray-300 hover:border-yellow-300 hover:text-yellow-400 transition-colors shadow-sm">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FB923C]">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-400/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-pink-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[300px] w-[300px] rounded-full bg-orange-300/20 blur-3xl" />

      {/* Decorative sparkles */}
      <div className="pointer-events-none absolute top-24 left-[8%] text-2xl opacity-70 animate-pulse">✨</div>
      <div className="pointer-events-none absolute top-48 right-[12%] text-xl opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }}>⭐</div>
      <div className="pointer-events-none absolute bottom-40 left-[15%] text-lg opacity-50 animate-pulse" style={{ animationDelay: "1s" }}>✨</div>
      <div className="pointer-events-none absolute top-36 left-1/2 text-sm opacity-40 animate-pulse" style={{ animationDelay: "1.5s" }}>💫</div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 pt-28 pb-24 lg:flex-row lg:items-center lg:pt-32">
        {/* Left — copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20">
            <span>🐾</span>
            <span>{t("home.hero.badge")}</span>
            <span>✨</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            {t("home.hero.title1")}
            <br />
            <span className="text-yellow-200 drop-shadow-lg">{t("home.hero.title2")}</span>
            <br />
            {t("home.hero.title3")}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85 lg:text-xl">
            {t("home.hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to={ROUTES.REGISTER}
              className="w-full rounded-full bg-white px-8 py-4 text-center text-base font-bold text-violet-700 shadow-lg shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-900/30 hover:scale-105 transition-all sm:w-auto"
            >
              {t("home.hero.cta")}
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="w-full rounded-full border-2 border-white/50 px-8 py-4 text-center text-base font-semibold text-white hover:bg-white/15 transition-colors sm:w-auto"
            >
              {t("home.hero.login")}
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/60">
            {t("home.hero.social")}
          </p>
        </div>

        {/* Right — card stack */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative h-[420px] w-[340px]">
            <PetCard
              name="Luna"
              age="1y"
              distance="1.2km"
              image={catLuna}
              rotate={8}
              zIndex={10}
            />
            <PetCard
              name="Max"
              age="3y"
              distance="0.8km"
              image={dogMax}
              rotate={-4}
              zIndex={20}
            />
            <PetCard
              name="Buddy"
              age="2y"
              distance="0.5km"
              image={dogBuddy}
              rotate={0}
              zIndex={30}
            />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 80L60 74.7C120 69.3 240 58.7 360 53.3C480 48 600 48 720 53.3C840 58.7 960 69.3 1080 69.3C1200 69.3 1320 58.7 1380 53.3L1440 48V80H0Z" fill="#FAF5FF" />
        </svg>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  const { t } = useTranslation();

  const STATS = [
    { value: "50K+", label: t("home.stats.happyPets"),   icon: "🐾" },
    { value: "30K+", label: t("home.stats.matchesMade"), icon: "💖" },
    { value: "120+", label: t("home.stats.cities"),      icon: "📍" },
  ];

  return (
    <section className="bg-violet-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-violet-100 shadow-sm sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col items-center gap-3 bg-gradient-to-br p-10 text-center ${
              i === 0 ? "from-violet-50 to-purple-50" :
              i === 1 ? "from-pink-50 to-rose-50" :
                        "from-orange-50 to-amber-50"
            }`}>
              <span className="text-4xl">{stat.icon}</span>
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent">
                {stat.value}
              </span>
              <span className="text-base font-medium text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const { t } = useTranslation();

  const STEPS = [
    {
      step: "01",
      icon: "📸",
      title: t("home.howItWorks.step1Title"),
      desc:  t("home.howItWorks.step1Desc"),
      color: "from-violet-500 to-purple-600",
    },
    {
      step: "02",
      icon: "👆",
      title: t("home.howItWorks.step2Title"),
      desc:  t("home.howItWorks.step2Desc"),
      color: "from-pink-500 to-rose-500",
    },
    {
      step: "03",
      icon: "💬",
      title: t("home.howItWorks.step3Title"),
      desc:  t("home.howItWorks.step3Desc"),
      color: "from-orange-400 to-amber-400",
    },
  ];

  return (
    <section id="how-it-works" className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-3 text-4xl">🌸</div>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{t("home.howItWorks.title")}</h2>
          <p className="mt-4 text-lg text-gray-500">{t("home.howItWorks.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              {/* Step number watermark */}
              <div className="absolute -top-4 -right-2 text-8xl font-extrabold text-gray-50 select-none pointer-events-none">
                {s.step}
              </div>
              <div className="relative mb-6">
                <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-2xl shadow-lg`}>
                  {s.icon}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{s.title}</h3>
              <p className="leading-relaxed text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature Rows ─────────────────────────────────────────────────────────────

function MockupBlock({ image, label }: { image: string; label: string }) {
  return (
    <div className="relative h-80 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
      <img src={image} alt={label} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-5 left-0 right-0 text-center text-lg font-semibold text-white drop-shadow">
        {label}
      </div>
    </div>
  );
}

const FEATURE_CHECK_BASE = "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs text-white font-bold";

function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl space-y-32 px-6">

        {/* Row 1 — Location Matching */}
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 lg:pr-12">
            <div className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700">
              {t("home.features.row1Badge")}
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {t("home.features.row1Title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              {t("home.features.row1Desc")}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                t("home.features.row1Check1"),
                t("home.features.row1Check2"),
                t("home.features.row1Check3"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <span className={`${FEATURE_CHECK_BASE} bg-gradient-to-br from-violet-500 to-pink-500`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <MockupBlock image={dogLocation} label={t("home.features.row1Mockup")} />
          </div>
        </div>

        {/* Row 2 — Real-time Chat */}
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
          <div className="flex-1 flex justify-center">
            <MockupBlock image={catsChat} label={t("home.features.row2Mockup")} />
          </div>
          <div className="flex-1 lg:pl-12">
            <div className="mb-4 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-600">
              {t("home.features.row2Badge")}
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {t("home.features.row2Title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              {t("home.features.row2Desc")}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                t("home.features.row2Check1"),
                t("home.features.row2Check2"),
                t("home.features.row2Check3"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <span className={`${FEATURE_CHECK_BASE} bg-gradient-to-br from-[#EC4899] to-[#FB923C]`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3 — Pet Profiles */}
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 lg:pr-12">
            <div className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
              {t("home.features.row3Badge")}
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {t("home.features.row3Title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              {t("home.features.row3Desc")}
            </p>
            <ul className="mt-8 space-y-3">
              {[
                t("home.features.row3Check1"),
                t("home.features.row3Check2"),
                t("home.features.row3Check3"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600">
                  <span className={`${FEATURE_CHECK_BASE} bg-gradient-to-br from-[#FB923C] to-yellow-400`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <MockupBlock image={dogProfile} label={t("home.features.row3Mockup")} />
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FB923C] py-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-pink-300/10 blur-2xl" />

      {/* Sparkles */}
      <div className="pointer-events-none absolute top-10 left-[20%] text-2xl opacity-60 animate-pulse">✨</div>
      <div className="pointer-events-none absolute bottom-10 right-[20%] text-xl opacity-50 animate-pulse" style={{ animationDelay: "0.7s" }}>💫</div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="text-6xl">🐾</span>
        <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
          {t("home.cta.title")}
        </h2>
        <p className="mt-5 text-xl text-white/80">
          {t("home.cta.subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to={ROUTES.REGISTER}
            className="rounded-full bg-white px-10 py-4 text-base font-bold text-violet-700 shadow-xl shadow-violet-900/20 hover:scale-105 hover:shadow-2xl transition-all"
          >
            {t("home.cta.createAccount")}
          </Link>
          <Link
            to={ROUTES.LOGIN}
            className="rounded-full border-2 border-white/50 px-10 py-4 text-base font-semibold text-white hover:bg-white/15 transition-colors"
          >
            {t("home.cta.alreadyHaveAccount")}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("home.footer.company"),
      links: [t("home.footer.about"), t("home.footer.careers"), t("home.footer.press"), t("home.footer.contact")],
    },
    {
      title: t("home.footer.product"),
      links: [t("home.footer.features"), t("home.footer.safety"), t("home.footer.pricing"), t("home.footer.blog")],
    },
    {
      title: t("home.footer.support"),
      links: [t("home.footer.helpCenter"), t("home.footer.community"), t("home.footer.faq")],
    },
    {
      title: t("home.footer.legal"),
      links: [t("home.footer.privacy"), t("home.footer.terms"), t("home.footer.cookiePolicy")],
    },
  ];

  return (
    <footer className="bg-[#1A0A2E] text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-lg font-extrabold text-transparent">
                Zommie
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              {t("home.footer.tagline")}
            </p>
          </div>

          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-violet-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm">{t("home.footer.copyright")}</p>
          <div className="flex items-center gap-5">
            {["🐦", "📘", "📸"].map((icon, i) => (
              <a key={i} href="#" className="text-xl hover:opacity-70 transition-opacity">{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { i18n } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to={ROUTES.SWIPE} replace />;

  const description = i18n.language === "vi"
    ? "Kết nối thú cưng yêu quý với những người bạn hoàn hảo gần đây. Vuốt, kết đôi và sắp xếp buổi vui chơi. Tham gia cùng 50.000+ thú cưng trên Zommie."
    : "Connect your dog or cat with perfectly matched pets near you. Swipe, match, and arrange the cutest playdates ever. Join 50,000+ happy pets on Zommie.";

  return (
    <>
      <PageSEO canonical="/" description={description} jsonLd={HOME_JSON_LD} />
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
