"use client";

/**
 * atlantics.dev — Landing
 * --------------------------------------------------------------
 * Stack: React 18 + TypeScript + Tailwind CSS + Framer Motion
 * Style: Dark Minimal Premium (bilingüe ES / EN secundario)
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  Zap,
  Code2,
  Cpu,
  Database,
  Wallet,
  ShoppingBag,
  MessageSquare,
  Building2,
  Dice5,
  Plug,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TYPES                                                             */
/* ------------------------------------------------------------------ */

type Lang = "es" | "en";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

type Project = {
  id: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  url?: string;
  image?: string;
  stack: string[];
  outcomes: string[];
  icon: React.ReactNode;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    id: "paybot",
    name: "Paybot · CRM Integration",
    tag: "Fintech · CRM",
    tagline: "Cobros automáticos dentro del CRM.",
    description:
      "Integración nativa con Kommo CRM que dispara cobros, links de pago y reconciliación automática. Convertimos el pipeline de ventas en un motor de revenue.",
    url: "https://kommo.paybot.app",
    image: "/images/paybot.png",
    stack: ["Next.js", "Node.js", "Kommo API", "Stripe", "Mercado Pago"],
    outcomes: [
      "+38% conversión post-quote",
      "Reconciliación en tiempo real",
      "0 toques manuales por cobro",
    ],
    icon: <Wallet className="size-5" />,
    accent: "from-lime-300/70 to-emerald-400/40",
  },
  {
    id: "ecommerce-integrations",
    name: "VTEX & Tienda Nube",
    tag: "E-commerce · Integraciones",
    tagline: "Catálogos, stock y pagos en una sola fuente de verdad.",
    description:
      "Integraciones bidireccionales con VTEX y Tienda Nube. Sincronización de productos, órdenes, stock multi-canal y conectores de pago a medida.",
    image: "/images/vtex-tiendanube.png",
    stack: ["VTEX IO", "Tienda Nube API", "Node.js", "PostgreSQL", "Redis"],
    outcomes: [
      "Sync sub-segundo entre canales",
      "Stock unificado multi-tienda",
      "Reduce 90% errores de overselling",
    ],
    icon: <ShoppingBag className="size-5" />,
    accent: "from-sky-400/70 to-indigo-400/40",
  },
  {
    id: "kaury",
    name: "Kaury · E-commerce propio",
    tag: "E-commerce · Producto",
    tagline: "De cero a tienda online optimizada para conversión.",
    description:
      "Desarrollo end-to-end del e-commerce de Kaury. UX orientada a CRO, checkout sin fricción y panel de administración pensado para el equipo de operaciones.",
    image: "/images/kaury.png",
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Vercel"],
    outcomes: [
      "LCP < 1.2s en mobile",
      "Checkout en 3 pasos",
      "Stack 100% propio y escalable",
    ],
    icon: <ShoppingBag className="size-5" />,
    accent: "from-fuchsia-400/70 to-pink-400/40",
  },
  {
    id: "crossup",
    name: "Crossup · Integración de proveedores",
    tag: "Logistics · API",
    tagline: "Un solo puente para múltiples proveedores externos.",
    description:
      "Servicios prestados a Crossup: capa de integración con proveedores externos, normalización de payloads, manejo de errores con retries inteligentes y dashboards de observabilidad.",
    image: "/images/crossup.png",
    stack: ["Node.js", "TypeScript", "REST/SOAP", "BullMQ", "Grafana"],
    outcomes: [
      "Onboarding de proveedor en horas",
      "99.95% uptime de pipeline",
      "Visibilidad end-to-end de cada request",
    ],
    icon: <Plug className="size-5" />,
    accent: "from-amber-300/70 to-orange-400/40",
  },
  {
    id: "salvatto",
    name: "Salvatto · Real Estate Online",
    tag: "Real Estate · Producto",
    tagline: "Inmobiliaria digital con búsqueda inteligente.",
    description:
      "Plataforma de inmobiliaria online: listings con búsqueda geoespacial, gestión de leads, panel para corredores y portal público optimizado para SEO.",
    image: "/images/salvatto.png",
    stack: ["Next.js", "PostgreSQL", "PostGIS", "Algolia", "Vercel"],
    outcomes: [
      "Indexado completo en Google",
      "Lead-to-call en 1 click",
      "Búsqueda por mapa fluida",
    ],
    icon: <Building2 className="size-5" />,
    accent: "from-cyan-300/70 to-teal-400/40",
  },
  {
    id: "payments",
    name: "Payment Stack",
    tag: "Fintech · Pagos",
    tagline: "Yuno, Mercado Pago y Stripe bajo una sola abstracción.",
    description:
      "Capa de pagos agnóstica que enruta transacciones por mejor tasa, maneja webhooks, refunds y disputes. Un solo SDK para hablarle a todos los procesadores.",
    image: "/images/payment-stack.png",
    stack: ["Yuno", "Mercado Pago", "Stripe", "Node.js", "Webhooks"],
    outcomes: [
      "Failover automático entre PSPs",
      "Cobertura LATAM + USA + EU",
      "Reconciliación nightly automática",
    ],
    icon: <Wallet className="size-5" />,
    accent: "from-emerald-300/70 to-lime-400/40",
  },
  {
    id: "finance-system",
    name: "Sistema Financiero · Contable",
    tag: "Fintech · Backoffice",
    tagline: "Contabilidad que se escribe sola.",
    description:
      "Sistema financiero y contable interno: doble partida, asientos automáticos desde eventos de negocio, reportes fiscales y exportación a contadores externos.",
    image: "/images/sistema-financiero.png",
    stack: ["Node.js", "PostgreSQL", "Prisma", "Next.js", "Excel/CSV"],
    outcomes: [
      "Cierre mensual en 1 día",
      "0 errores de doble partida",
      "Reportes fiscales listos para AFIP",
    ],
    icon: <Database className="size-5" />,
    accent: "from-violet-400/70 to-purple-400/40",
  },
  {
    id: "masterbet",
    name: "Masterbet · iGaming Platform",
    tag: "iGaming · Casino",
    tagline: "Plataforma de casino y juegos online de alto rendimiento.",
    description:
      "Plataforma de casino online y juegos: integración con providers, wallet en tiempo real, KYC, antifraude y panel de operaciones 24/7.",
    url: "https://masterbet.club",
    image: "/images/masterbet.png",
    stack: ["Next.js", "Node.js", "Redis", "WebSockets", "Provider APIs"],
    outcomes: [
      "Latencia < 80ms en wallet",
      "Onboarding KYC en minutos",
      "Operación 24/7 sin downtime",
    ],
    icon: <Dice5 className="size-5" />,
    accent: "from-red-400/70 to-rose-400/40",
  },
];

/* Partners (logos como SVG inline para mantener todo en un archivo) */
const PARTNERS = [
  "Meta",
  "Kommo",
  "VTEX",
  "Tienda Nube",
  "Stripe",
  "Mercado Pago",
  "Yuno",
  "Vercel",
  "WhatsApp Business",
  "AWS",
];

/* Tech stack — con metadata de logos */

/* Custom logos para marcas no presentes en Simple Icons */
const CUSTOM_LOGOS = {
  "framer-motion": (
    <svg viewBox="0 0 32 32" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="fmg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff0080" />
          <stop offset="1" stopColor="#7928ca" />
        </linearGradient>
      </defs>
      <path fill="url(#fmg)" d="M8 4h16v8H16zM8 12h16l-8 8zM8 20l8 8V20z" />
    </svg>
  ),
  rest: (
    <svg viewBox="0 0 32 32" className="size-full" fill="none" stroke="#60a5fa" strokeWidth={2} aria-hidden>
      <circle cx="16" cy="16" r="11" />
      <path d="M5 16h22M16 5c3 3 4.5 7 4.5 11s-1.5 8-4.5 11M16 5c-3 3-4.5 7-4.5 11s1.5 8 4.5 11" />
    </svg>
  ),
  postgis: (
    <svg viewBox="0 0 32 32" className="size-full" aria-hidden>
      <ellipse cx="16" cy="9" rx="10" ry="3.5" fill="#336791" />
      <path d="M6 9v13c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V9" fill="none" stroke="#336791" strokeWidth={2} />
      <circle cx="16" cy="17" r="4" fill="#22c55e" />
      <path d="M16 13v8M12 17h8" stroke="#fff" strokeWidth={1.2} />
    </svg>
  ),
  yuno: (
    <svg viewBox="0 0 32 32" className="size-full" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#5B5BD6" />
      <text x="16" y="22" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight={800} fill="#fff">
        y.
      </text>
    </svg>
  ),
  kommo: (
    <svg viewBox="0 0 32 32" className="size-full" aria-hidden>
      <rect width="32" height="32" rx="8" fill="#0B72FF" />
      <text x="16" y="22" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight={800} fill="#fff">
        k
      </text>
    </svg>
  ),
} as const;

type CustomKey = keyof typeof CUSTOM_LOGOS;

type TechMeta =
  | { type: "si"; slug: string; color?: string }
  | { type: "custom"; key: CustomKey };

const TECH: Record<string, TechMeta> = {
  "Next.js": { type: "si", slug: "nextdotjs", color: "white" },
  React: { type: "si", slug: "react" },
  TypeScript: { type: "si", slug: "typescript" },
  Tailwind: { type: "si", slug: "tailwindcss" },
  "Framer Motion": { type: "custom", key: "framer-motion" },
  "Node.js": { type: "si", slug: "nodedotjs" },
  NestJS: { type: "si", slug: "nestjs" },
  tRPC: { type: "si", slug: "trpc" },
  REST: { type: "custom", key: "rest" },
  GraphQL: { type: "si", slug: "graphql" },
  PostgreSQL: { type: "si", slug: "postgresql" },
  MongoDB: { type: "si", slug: "mongodb" },
  Redis: { type: "si", slug: "redis" },
  Prisma: { type: "si", slug: "prisma", color: "white" },
  PostGIS: { type: "custom", key: "postgis" },
  Vercel: { type: "si", slug: "vercel", color: "white" },
  AWS: { type: "si", slug: "amazonwebservices", color: "FF9900" },
  Docker: { type: "si", slug: "docker" },
  "GitHub Actions": { type: "si", slug: "githubactions" },
  Sentry: { type: "si", slug: "sentry" },
  Stripe: { type: "si", slug: "stripe", color: "635BFF" },
  "Mercado Pago": { type: "si", slug: "mercadopago" },
  Yuno: { type: "custom", key: "yuno" },
  Kommo: { type: "custom", key: "kommo" },
  HubSpot: { type: "si", slug: "hubspot" },
  VTEX: { type: "si", slug: "vtex" },
  "Tienda Nube": { type: "si", slug: "tiendanube" },
  Shopify: { type: "si", slug: "shopify" },
  "WhatsApp Cloud API": { type: "si", slug: "whatsapp", color: "25D366" },
};

const STACK = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "NestJS", "tRPC", "REST", "GraphQL"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "PostGIS"] },
  { group: "Infra & DevX", items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Sentry"] },
  { group: "Pagos & CRM", items: ["Stripe", "Mercado Pago", "Yuno", "Kommo", "HubSpot"] },
  { group: "Comercio", items: ["VTEX", "Tienda Nube", "Shopify", "WhatsApp Cloud API"] },
];

const FEATURED_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js", "NestJS", "GraphQL",
  "PostgreSQL", "MongoDB", "Redis", "Prisma", "Vercel", "AWS", "Docker", "Sentry",
  "Stripe", "Mercado Pago", "Yuno", "Kommo", "HubSpot", "VTEX", "Tienda Nube",
  "Shopify", "WhatsApp Cloud API",
];

const siUrl = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? "/" + color : ""}`;

const TechLogo: React.FC<{ name: string; size?: number }> = ({ name, size = 20 }) => {
  const meta = TECH[name];
  if (!meta) return null;
  if (meta.type === "si") {
    return (
      <img
        src={siUrl(meta.slug, meta.color)}
        alt={name}
        loading="lazy"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span className="inline-grid place-items-center" style={{ width: size, height: size }}>
      {CUSTOM_LOGOS[meta.key]}
    </span>
  );
};

const SERVICES = [
  {
    icon: <Layers className="size-5" />,
    title: "Producto digital end-to-end",
    en: "End-to-end digital product",
    desc: "Diseñamos, construimos y operamos plataformas web. Del wireframe al deploy, con foco en performance, UX y conversión.",
  },
  {
    icon: <Plug className="size-5" />,
    title: "Integraciones & APIs",
    en: "Integrations & APIs",
    desc: "Conectamos tu stack con CRMs, e-commerce, pasarelas de pago y proveedores externos. Sin parches: arquitectura limpia y mantenible.",
  },
  {
    icon: <Zap className="size-5" />,
    title: "Automatización & AI",
    en: "Automation & AI",
    desc: "Automatizamos procesos de cobros, soporte, ventas y backoffice. Workflows con IA que reducen costos y aceleran la operación.",
  },
  {
    icon: <Cpu className="size-5" />,
    title: "Plataformas a medida",
    en: "Custom platforms",
    desc: "Cuando lo enlatado no alcanza, construimos tu plataforma propia. Escalable, observable y pensada para crecer.",
  },
];

const STATS = [
  { value: "9+", label: "Proyectos en producción", en: "Live products" },
  { value: "6", label: "Países con clientes", en: "Countries" },
  { value: "99.95%", label: "Uptime promedio", en: "Avg uptime" },
  { value: "24/7", label: "Operaciones críticas", en: "Mission-critical ops" },
];

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                        */
/* ------------------------------------------------------------------ */

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Eyebrow: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur">
    <span className="size-1.5 rounded-full bg-[#C2FF3D] shadow-[0_0_12px_#C2FF3D]" />
    {children}
  </span>
);

const SectionHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  en?: string;
}> = ({ eyebrow, title, subtitle, en }) => (
  <div className="mx-auto mb-14 max-w-3xl text-center">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-pretty text-base text-white/60 md:text-lg">
        {subtitle}
        {en && <span className="ml-1 text-white/30">· {en}</span>}
      </p>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/*  NAV                                                               */
/* ------------------------------------------------------------------ */

const Nav: React.FC<{ lang: Lang; setLang: (l: Lang) => void }> = ({ lang, setLang }) => (
  <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
      <a href="#top" className="group flex items-center gap-2.5">
        <LogoMark />
        <span className="text-sm font-semibold tracking-tight text-white">
          atlantics<span className="text-[#C2FF3D]">.dev</span>
        </span>
        <span className="ml-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/50">
          v1.0
        </span>
      </a>
      <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
        <a href="#stack" className="transition hover:text-white">Stack</a>
        <a href="#services" className="transition hover:text-white">Servicios</a>
        <a href="#projects" className="transition hover:text-white">Proyectos</a>
        <a href="#partners" className="transition hover:text-white">Partners</a>
        <a href="#contact" className="transition hover:text-white">FAQ</a>
      </nav>
      <div className="flex items-center gap-3">
        <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] font-medium sm:flex">
          {(["es", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2.5 py-1 uppercase transition ${
                lang === l
                  ? "bg-[#C2FF3D] text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
        >
          <Calendar className="size-3.5 text-[#C2FF3D]" />
          Contactar
        </a>
      </div>
    </div>
  </header>
);

/* Atlantics — 3 swooshes azules (logo oficial) — SVG fallback */
const AtlanticsLogo: React.FC<{ className?: string }> = ({ className = "size-7" }) => (
  <svg
    viewBox="0 0 200 140"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Atlantics"
    role="img"
  >
    <defs>
      <linearGradient id="atl-front" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#0FA7D6" />
        <stop offset="1" stopColor="#26C6F0" />
      </linearGradient>
      <linearGradient id="atl-mid" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#2E8AA8" />
        <stop offset="1" stopColor="#4DB5CF" />
      </linearGradient>
      <linearGradient id="atl-back" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#173E5C" />
        <stop offset="1" stopColor="#2A6280" />
      </linearGradient>
    </defs>
    {/* Back swoosh — smallest, darkest navy */}
    <path
      d="M 28 88 C 50 52, 85 42, 118 48 C 92 58, 60 75, 34 100 Z"
      fill="url(#atl-back)"
    />
    {/* Middle swoosh — teal */}
    <path
      d="M 38 108 C 70 58, 125 38, 162 46 C 128 60, 75 88, 44 120 Z"
      fill="url(#atl-mid)"
    />
    {/* Front swoosh — largest, brightest cyan */}
    <path
      d="M 14 128 C 65 52, 145 18, 196 18 C 145 48, 70 100, 20 138 Z"
      fill="url(#atl-front)"
    />
  </svg>
);

/* LogoMark — usa /transparentatlantic.png; cae al SVG si no carga */
const LogoMark: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "sm" }) => {
  const sz =
    size === "lg" ? "h-10 w-14" : size === "md" ? "h-8 w-11" : "h-7 w-10";
  const [imgError, setImgError] = React.useState(false);
  return (
    <span className={`relative inline-block ${sz}`}>
      {!imgError && (
        <img
          src="/transparentatlantic.png"
          alt="Atlantics"
          className="size-full object-contain"
          onError={() => setImgError(true)}
        />
      )}
      {imgError && <AtlanticsLogo className="size-full" />}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  HERO                                                              */
/* ------------------------------------------------------------------ */

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
      {/* Background grid + glow + logo watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)",
          }}
        />
        {/* Logo watermark detrás del hero */}
        <img
          src="/transparentatlantic.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[58%] w-[900px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] select-none"
        />
        <div className="absolute left-1/2 top-1/3 -z-10 size-[640px] -translate-x-1/2 rounded-full bg-[#C2FF3D]/15 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 -z-10 size-[420px] rounded-full bg-[#4F9CFF]/15 blur-[120px]" />
      </div>

      <Container>
        <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>Digital Agency · Buenos Aires → Global</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.025em] text-white md:text-7xl"
          >
            Construimos el software que{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#C2FF3D] via-[#9FF2D8] to-[#4F9CFF] bg-clip-text text-transparent">
                mueve negocios digitales
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/65 md:text-xl"
          >
            Atlantics.dev integra, automatiza y escala plataformas de
            <span className="text-white"> e-commerce, fintech y CRM</span>. De la
            idea al deploy, sin fricción.
            <span className="mt-1 block text-sm text-white/35">
              From idea to deploy — frictionless.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#C2FF3D] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
            >
              Hablemos de tu proyecto
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Ver proyectos
            </a>
          </motion.div>

          {/* Tiny meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-[#C2FF3D]" /> Equipos full-stack
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-[#C2FF3D]" /> Sprints semanales
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3 text-[#C2FF3D]" /> Ownership end-to-end
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MARQUEE — clients/partners                                        */
/* ------------------------------------------------------------------ */

const Marquee: React.FC = () => (
  <section aria-label="Partners trust" className="relative border-y border-white/[0.06] bg-black/40 py-8">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#07070A] to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#07070A] to-transparent" />
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-14 pr-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {[...PARTNERS, ...PARTNERS].map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="whitespace-nowrap text-2xl font-semibold tracking-tight text-white/30 transition hover:text-white/80"
          >
            {p}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  SERVICES                                                          */
/* ------------------------------------------------------------------ */

const Services: React.FC = () => (
  <section id="services" className="relative py-28 md:py-36">
    <Container>
      <SectionHeader
        eyebrow="Qué hacemos · What we do"
        title={
          <>
            Una agencia construida como{" "}
            <span className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-transparent">
              producto
            </span>
            .
          </>
        }
        subtitle="No vendemos horas. Resolvemos problemas de negocio con software, integraciones y automatización."
        en="We don't sell hours. We ship products."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition hover:border-white/20"
          >
            <div className="mb-5 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#C2FF3D]">
              {s.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/30">{s.en}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{s.desc}</p>
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#C2FF3D]/0 via-transparent to-[#4F9CFF]/0 opacity-0 transition group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------------------------------------------ */
/*  PROJECTS — Stacked sticky cards                                   */
/* ------------------------------------------------------------------ */

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <Container>
        <SectionHeader
          eyebrow="Proyectos · Case studies"
          title={
            <>
              Casos reales, en{" "}
              <span className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-transparent">
                producción
              </span>
              .
            </>
          }
          subtitle="Un recorrido por las plataformas que construimos para nuestros clientes — fintech, e-commerce, real estate y más."
          en="A scroll through the platforms we've shipped."
        />
      </Container>

      {/* Stacked cards container */}
      <div className="relative">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; total: number }> = ({
  project,
  index,
  total,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale + opacity for the stacking effect — earlier cards shrink slightly as next ones come in
  const scale = useTransform(scrollYProgress, [0.4, 0.9], [1, 0.92]);
  const opacityOut = useTransform(scrollYProgress, [0.7, 0.95], [1, 0.5]);

  // Sticky offset increases per card so they stack
  const topOffset = 96 + index * 28;

  return (
    <div ref={ref} className="relative" style={{ minHeight: "90vh" }}>
      <div
        className="sticky px-6 md:px-10"
        style={{ top: `${topOffset}px` }}
      >
        <motion.article
          style={{ scale, opacity: opacityOut }}
          className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0F0F12]/95 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:grid-cols-12"
        >
          {/* Left: copy */}
          <div className="flex flex-col justify-between gap-8 p-8 md:col-span-5 md:p-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  {project.icon}
                  {project.tag}
                </span>
                <span className="font-mono text-xs text-white/30">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-3 text-pretty text-lg text-white/65 md:text-xl">
                {project.tagline}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55">
                {project.description}
              </p>

              {/* Outcomes */}
              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {project.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#C2FF3D] shadow-[0_0_10px_#C2FF3D]" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.06] pt-6">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-white/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#C2FF3D] transition hover:text-white"
                >
                  Visitar
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative md:col-span-7">
            <div
              className={`relative h-80 w-full overflow-hidden bg-gradient-to-br ${project.accent} md:h-full md:min-h-[520px]`}
            >
              {/* Grid overlay sutil sobre el gradient */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.25) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Imagen real del proyecto (si existe) — contenida completa */}
              {project.image && (
                <div className="absolute inset-0 flex items-center justify-center p-6 pb-20 md:p-10 md:pb-24">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Fallback icon (solo si no hay imagen) */}
              {!project.image && (
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    initial={{ opacity: 0.3, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid size-28 place-items-center rounded-3xl border border-black/20 bg-black/30 text-white backdrop-blur"
                  >
                    <span className="scale-[2.4]">{project.icon}</span>
                  </motion.div>
                </div>
              )}

              {/* Mock window con URL */}
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-black/60 p-3 backdrop-blur">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-white/40" />
                  <span className="size-2 rounded-full bg-white/40" />
                  <span className="size-2 rounded-full bg-white/40" />
                  <span className="ml-2 truncate font-mono text-[10px] text-white/70">
                    {project.url ?? "atlantics.dev / case-study"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PARTNERS                                                          */
/* ------------------------------------------------------------------ */

/* Integrations grid — estilo ramiro.dev: plug icon + nombre, 4 columnas */
const INTEGRATIONS: { name: string; highlighted?: boolean }[] = [
  { name: "Kommo CRM", highlighted: true },
  { name: "Meta Conversions API" },
  { name: "WhatsApp Cloud API" },
  { name: "VTEX APIs" },
  { name: "Tienda Nube API" },
  { name: "NubeSDK" },
  { name: "Shopify APIs", highlighted: true },
  { name: "Stripe" },
  { name: "Mercado Pago" },
  { name: "Yuno" },
  { name: "Vercel API" },
  { name: "AWS SDK" },
  { name: "Cloudflare API" },
  { name: "HubSpot" },
  { name: "Auth0" },
  { name: "SoftSwiss" },
  { name: "A8R Games" },
  { name: "Claude SDK" },
  { name: "OpenTelemetry" },
  { name: "New Relic" },
];

const Partners: React.FC = () => (
  <section id="partners" className="relative py-28 md:py-36">
    <Container>
      <SectionHeader
        eyebrow="Integraciones"
        title={
          <>
            APIs que ya integramos —{" "}
            <span className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-transparent">
              y volveríamos a integrar
            </span>
            .
          </>
        }
        subtitle="Cada una con su webhook, sus retries y su observabilidad. Conectamos atlantics.dev con las plataformas que tu negocio ya usa."
        en="Each one with its own webhooks, retries and observability."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRATIONS.map((it, i) => (
          <motion.div
            key={it.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.02 }}
            className={`group relative flex items-center gap-3 rounded-xl border bg-gradient-to-b px-4 py-4 transition ${
              it.highlighted
                ? "border-[#C2FF3D]/40 from-[#C2FF3D]/[0.06] to-transparent"
                : "border-white/[0.08] from-white/[0.03] to-white/[0.01] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-lg border ${
                it.highlighted
                  ? "border-[#C2FF3D]/40 bg-[#C2FF3D]/10 text-[#C2FF3D]"
                  : "border-white/10 bg-white/[0.04] text-white/60"
              }`}
            >
              <Plug className="size-4" />
            </div>
            <span
              className={`text-sm font-medium ${
                it.highlighted ? "text-white" : "text-white/75"
              }`}
            >
              {it.name}
            </span>
            <ArrowUpRight className="ml-auto size-3.5 text-white/20 transition group-hover:text-white/60" />
          </motion.div>
        ))}
      </div>

      {/* Featured partner badges (Meta · Kommo · VTEX · Vercel) — refuerzo visual */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-white/[0.06] pt-12">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">
          Partners destacados
        </span>
        <MetaLogo />
        <BrandText label="Kommo" />
        <BrandText label="VTEX" />
        <BrandText label="Tienda Nube" />
        <BrandText label="Stripe" />
        <VercelLogo />
        <BrandText label="Mercado Pago" />
      </div>
    </Container>
  </section>
);

/* Small brand placeholders --------------------------------------- */
const BrandText: React.FC<{ label: string }> = ({ label }) => (
  <span className="text-xl font-semibold tracking-tight text-white/70 transition hover:text-white">
    {label}
  </span>
);
const MetaLogo: React.FC = () => (
  <svg viewBox="0 0 287 191" className="h-6 w-auto text-white/70 transition hover:text-white" fill="currentColor" aria-hidden>
    <path d="M31 121c0 13 6 23 16 23 11 0 19-7 33-26 14-19 21-30 26-37-8-12-15-19-23-19-15 0-28 18-52 59zm197-60c-13 0-25 9-39 28 14 23 24 39 32 48 9 10 18 14 28 14 24 0 24-32 13-69-7-15-19-21-34-21zm-85 19c-15-20-29-30-46-30C42 50 0 116 0 158c0 23 11 33 27 33 24 0 41-17 67-58-12-19-22-34-28-43z" />
  </svg>
);
const VercelLogo: React.FC = () => (
  <svg viewBox="0 0 256 222" className="h-5 w-auto text-white/70 transition hover:text-white" fill="currentColor" aria-hidden>
    <path d="M128 0L256 221.703H0z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  STACK                                                             */
/* ------------------------------------------------------------------ */

const Stack: React.FC = () => (
  <section id="stack" className="relative py-28 md:py-36">
    <Container>
      <SectionHeader
        eyebrow="Stack · Tecnologías"
        title={
          <>
            Un stack moderno, elegido para{" "}
            <span className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-transparent">
              durar
            </span>
            .
          </>
        }
        subtitle="Elegimos tecnologías que escalan con tu negocio. Performance, observabilidad y developer experience como base."
        en="Modern, observable, scalable."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition hover:border-white/20"
          >
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40">
              <Code2 className="size-3.5" /> {group.group}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((it) => (
                <span
                  key={it}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <TechLogo name={it} size={20} />
                  <span>{it}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured logos grid — visual emphasis on brand recognition */}
      <div className="mt-12 border-t border-white/[0.06] pt-12">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-[#C2FF3D] shadow-[0_0_10px_#C2FF3D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Tecnologías que dominamos
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {FEATURED_STACK.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.02 }}
              title={name}
              className="group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              <div className="transition group-hover:scale-110">
                <TechLogo name={name} size={28} />
              </div>
              <span className="truncate text-[10px] text-white/40 transition group-hover:text-white/80">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

/* ------------------------------------------------------------------ */
/*  STATS                                                             */
/* ------------------------------------------------------------------ */

const Stats: React.FC = () => (
  <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-16">
    <Container>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-white/60">{s.label}</div>
            <div className="text-xs text-white/30">{s.en}</div>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

/* ------------------------------------------------------------------ */
/*  CTA                                                               */
/* ------------------------------------------------------------------ */

const CTA: React.FC = () => (
  <section id="contact" className="relative py-28 md:py-36">
    <Container>
      <div className="relative isolate overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 md:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[#C2FF3D]/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-[420px] rounded-full bg-[#4F9CFF]/15 blur-[120px]" />

        <div className="relative grid items-end gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Construyamos algo grande</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              ¿Tenés un proyecto que necesita{" "}
              <span className="bg-gradient-to-r from-[#C2FF3D] to-[#4F9CFF] bg-clip-text text-transparent">
                moverse
              </span>
              ?
            </h2>
            <p className="mt-4 max-w-md text-pretty text-white/60">
              Contanos qué estás construyendo. Te respondemos en menos de 24h con
              una primera lectura del problema y un plan de acción.
              <span className="mt-1 block text-sm text-white/35">
                Tell us what you&apos;re building. We reply within 24h.
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:info@atlantics.dev"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="size-4 text-[#C2FF3D]" />
                info@atlantics.dev
              </span>
              <ArrowUpRight className="size-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
            <a
              href="#"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3 text-sm text-white/70">
                <Calendar className="size-4 text-[#C2FF3D]" />
                Agendar una llamada de 30 min
              </span>
              <ArrowUpRight className="size-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C2FF3D] px-5 py-4 text-sm font-semibold text-black transition hover:bg-white"
            >
              Empezar un proyecto
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

/* ------------------------------------------------------------------ */
/*  FOOTER                                                            */
/* ------------------------------------------------------------------ */

const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.06] py-12">
    <Container>
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <div>
            <div className="text-sm font-semibold text-white">
              atlantics<span className="text-[#C2FF3D]">.dev</span>
            </div>
            <div className="text-xs text-white/40">© {new Date().getFullYear()} · Buenos Aires</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
          <a href="#services" className="transition hover:text-white">Servicios</a>
          <a href="#projects" className="transition hover:text-white">Proyectos</a>
          <a href="#partners" className="transition hover:text-white">Partners</a>
          <a href="#stack" className="transition hover:text-white">Stack</a>
          <a href="#contact" className="transition hover:text-white">Contacto</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            href="#"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:info@atlantics.dev"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
            aria-label="Email"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </Container>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  ROOT                                                              */
/* ------------------------------------------------------------------ */

export default function Landing() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <main
      data-lang={lang}
      className="relative min-h-screen overflow-x-hidden bg-[#07070A] font-sans text-white antialiased selection:bg-[#C2FF3D]/30 selection:text-white"
    >
      {/* ambient noise overlay (optional) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Nav lang={lang} setLang={setLang} />
      <Hero />
      <Marquee />
      <Services />
      <Projects />
      <Stats />
      <Partners />
      <Stack />
      <CTA />
      <Footer />
    </main>
  );
}
