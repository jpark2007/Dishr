"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { Reveal, Eyebrow, PillButton, AppStoreBadge } from "./ui";

/* ── decorative ─────────────────────────────────────────────── */

function Rings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} fill="none" aria-hidden>
      {[300, 240, 180, 120, 60].map((r) => (
        <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="1" opacity={0.5} />
      ))}
    </svg>
  );
}

function Dust({ tone = "#C7902A" }: { tone?: string }) {
  const dots = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((i) => {
        const left = (i * 53) % 100;
        const top = (i * 31) % 100;
        const size = (i % 3) + 1;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, background: tone, opacity: 0.35 }}
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.13 }}
          />
        );
      })}
    </div>
  );
}

/* ── nav ────────────────────────────────────────────────────── */

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-[22px] font-black lowercase tracking-[-0.05em] text-ink">becipe</a>
        <div className="hidden items-center gap-8 text-[13px] font-medium text-inkSoft md:flex">
          <a href="#how" className="transition-colors hover:text-ink">How it works</a>
          <a href="#features" className="transition-colors hover:text-ink">Features</a>
          <a href="/privacy/" className="transition-colors hover:text-ink">Privacy</a>
        </div>
        <PillButton href="#waitlist" variant="ink" className="!px-5 !py-2.5 !text-[13px]">
          Get early access
        </PillButton>
      </div>
    </nav>
  );
}

/* ── hero ───────────────────────────────────────────────────── */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <header
      id="top"
      ref={ref}
      className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
      style={{ background: "radial-gradient(130% 100% at 50% 0%, #F5E9D3 0%, #F4F4F0 55%, #FCFCFA 100%)" }}
    >
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sageSoft opacity-55 blur-[80px]" />
      <Rings className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] text-ochre opacity-[0.13]" />
      <Dust tone="#C7902A" />

      {/* drifting recipe chips */}
      <FloatChip className="left-[6%] top-[24%] hidden lg:flex" delay={0} bg="#EDF1E6" fg="#4A6B3E" icon="◆" label="92% palate match" />
      <FloatChip className="right-[7%] top-[30%] hidden lg:flex" delay={1.1} bg="#F8EED5" fg="#C7902A" icon="★" label="8.9 · 41 tries" />
      <FloatChip className="left-[11%] bottom-[15%] hidden lg:flex" delay={0.6} bg="#FBE7DF" fg="#C24A28" icon="✦" label="imported from TikTok" />
      <FloatChip className="left-[8%] top-[54%] hidden lg:flex" delay={1.7} bg="#EDF1E6" fg="#4A6B3E" icon="◆" label="95% match" />
      <FloatChip className="right-[9%] bottom-[22%] hidden lg:flex" delay={0.9} bg="#F8EED5" fg="#C7902A" icon="★" label="9.2 · 28 tries" />
      <FloatChip className="right-[14%] top-[15%] hidden lg:flex" delay={2.1} bg="#FBE7DF" fg="#C24A28" icon="✦" label="3 friends cooked this" />

      <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Eyebrow tone="clay" className="justify-center">Becipe · the social cookbook</Eyebrow>
        </Reveal>
        <h1 className="display mt-7 text-[clamp(3rem,9vw,6.5rem)] text-ink">
          <span className="block overflow-hidden pb-[0.22em] -mb-[0.16em]">
            <motion.span className="block" initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
              Cooking, but
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.22em] -mb-[0.16em]">
            <motion.span className="block" initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}>
              make it <span className="italic text-clay">social</span>.
            </motion.span>
          </span>
        </h1>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-inkSoft">
            Save recipes from anywhere, cook them step-by-step, and share every try with the people who actually cook.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PillButton href="#waitlist" variant="clay">Get early access →</PillButton>
            <PillButton href="#how" variant="ghost">See how it works</PillButton>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-6 text-[13px] font-medium text-muted">Free to join · iPhone &amp; web · launching 2026</p>
        </Reveal>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: fade }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-ink/25 p-1.5">
          <span className="h-2 w-1 rounded-full bg-clay" />
        </div>
      </motion.div>
    </header>
  );
}

function FloatChip({ className = "", delay = 0, bg, fg, icon, label }: { className?: string; delay?: number; bg: string; fg: string; icon: string; label: string }) {
  return (
    <motion.div
      className={`absolute z-10 items-center gap-2 rounded-full bg-card px-3.5 py-2 shadow-[0_16px_40px_-12px_rgba(11,11,12,0.3)] ring-1 ring-black/5 ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full text-[12px]" style={{ background: bg, color: fg }}>{icon}</span>
      <span className="text-[12px] font-semibold tracking-[-0.01em] text-ink">{label}</span>
    </motion.div>
  );
}

/* ── kinetic ticker band ────────────────────────────────────── */

const TICKER = [
  "Charred Miso Eggplant", "Lemon Pistachio Orzo", "Brown Butter Gnocchi",
  "Thai Green Curry", "Smash Burger Tacos", "Saffron Risotto",
  "Gochujang Wings", "Burrata & Peach", "Cacio e Pepe", "Harissa Salmon",
];

export function Ticker({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const row = [...TICKER, ...TICKER];
  return (
    <div className={`relative overflow-hidden border-y py-5 ${dark ? "border-[#23232a] bg-ink" : "border-border bg-bone"}`}>
      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap [will-change:transform]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={`text-[26px] font-medium tracking-[-0.02em] ${dark ? "text-bone" : "text-ink"}`} style={{ fontFamily: "var(--font-display)" }}>
              {t}
            </span>
            <span className="text-[14px] text-clay">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── problem beat (dark) ────────────────────────────────────── */

const SCATTER = [
  { label: "📷 screenshot_4821.png", top: "4%", left: "2%", r: -7 },
  { label: "tiktok.com/@chef/video…", top: "0%", left: "46%", r: 5 },
  { label: "“mom's pasta — call me”", top: "34%", left: "54%", r: -4 },
  { label: "23 open recipe tabs", top: "62%", left: "6%", r: 8 },
  { label: "saved to… somewhere?", top: "74%", left: "42%", r: -3 },
  { label: "that reel you lost", top: "38%", left: "0%", r: 6 },
];

export function Problem() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-bone md:py-40">
      <Dust tone="#C24A28" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <Reveal><Eyebrow tone="clay">The problem</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] text-bone">
              Your recipes live in twelve different places.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#b9b9be]">
              Screenshots you'll never find. TikToks you saved and forgot. A text from your mom. Forty open tabs. And no one to actually cook it with. Becipe pulls it all into one place — and gives it a pulse.
            </p>
          </Reveal>
        </div>
        <div className="relative h-[360px]">
          {SCATTER.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="absolute whitespace-nowrap rounded-xl border border-[#2a2a30] bg-[#161619] px-4 py-3 text-[13px] text-[#9a9aa2] shadow-xl"
              style={{ top: s.top, left: s.left, rotate: `${s.r}deg` }}
            >
              {s.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── features grid ──────────────────────────────────────────── */

const FEATURES = [
  { icon: "link", accent: "clay" as const, title: "Import from anywhere", body: "Paste a link, a TikTok, or a Reel. Becipe parses the ingredients and steps into a clean, cookable recipe." },
  { icon: "palate", accent: "sage" as const, title: "Palate matching", body: "Take a 60-second taste quiz. Every recipe gets scored for you, so discovery feels personal from day one." },
  { icon: "flame", accent: "clay" as const, title: "Cook mode", body: "Big steps, screen-awake, ingredient check-off, and hands-free voice control for when your hands are messy." },
  { icon: "star", accent: "ochre" as const, title: "Log your tries", body: "Rate it 0–10, photo your plate, leave a note. Build a private record of everything you've actually made." },
  { icon: "people", accent: "sage" as const, title: "Follow real cooks", body: "A feed of people whose taste you trust — not influencers. See what they cooked, saved, and rated." },
  { icon: "albums", accent: "ochre" as const, title: "Albums & kitchen", body: "Organize saves into albums, keep drafts, and track your fridge so dinner is one tap away." },
];

type Accent = "sage" | "clay" | "ochre";

const ACCENT_TILE: Record<Accent, string> = {
  sage: "bg-sageSoft text-sageDeep",
  clay: "bg-claySoft text-clayDeep",
  ochre: "bg-ochreSoft text-[#9a6c12]",
};
const ACCENT_GLOW: Record<Accent, string> = {
  sage: "rgba(74,107,62,0.13)",
  clay: "rgba(194,74,40,0.13)",
  ochre: "rgba(199,144,42,0.15)",
};

/** Idle motion applied to the whole icon, per type. */
const IDLE: Record<string, { animate: any; transition: any; origin?: string }> = {
  link:   { animate: { rotate: [0, 0, 4, 0] },        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } },
  palate: { animate: { scale: [1, 1.1, 1] },          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } },
  flame:  { animate: { scaleY: [1, 1.14, 0.96, 1], skewX: [0, -2, 2, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, origin: "50% 100%" },
  star:   { animate: { rotate: [0, 14, -8, 0] },      transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" } },
  people: { animate: { y: [0, -1.5, 0] },             transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
  albums: { animate: { rotate: [0, -3, 0] },          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
};

const drawPath = (i = 0): any => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: "easeInOut", delay: 0.15 + i * 0.18 },
});

function AnimatedIcon({ name }: { name: string }) {
  const idle = IDLE[name] ?? { animate: {}, transition: {} };
  const p = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const inner = () => {
    switch (name) {
      case "link":
        return (<><motion.path d="M10 13a4 4 0 0 0 5.66 0l2.5-2.5a4 4 0 0 0-5.66-5.66l-1.2 1.2" {...drawPath(0)} /><motion.path d="M14 11a4 4 0 0 0-5.66 0l-2.5 2.5a4 4 0 0 0 5.66 5.66l1.2-1.2" {...drawPath(1)} /></>);
      case "palate":
        return (<><motion.path d="M12 3.2 15.4 12 12 20.8 8.6 12Z" {...drawPath(0)} /><motion.path d="m18.2 6.6.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6Z" fill="currentColor" stroke="none" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 12 }} /></>);
      case "flame":
        return (<motion.path d="M12 3c.8 2.6-1.8 3.6-1.8 6.2A1.8 1.8 0 0 0 13.8 9c.4 1.7 1.7 2.6 1.7 4.6a3.5 3.5 0 1 1-7 0c0-3 3-4.8 3.5-10.6Z" {...drawPath(0)} />);
      case "star":
        return (<motion.path d="M12 3.6l2.47 5.01 5.53.8-4 3.9.94 5.49L12 16.2l-4.94 2.6.94-5.49-4-3.9 5.53-.8z" {...drawPath(0)} />);
      case "people":
        return (<><motion.circle cx="9" cy="8.5" r="3.2" {...drawPath(0)} /><motion.path d="M3.4 19a5.6 5.6 0 0 1 11.2 0" {...drawPath(1)} /><motion.path d="M16.2 6a3.2 3.2 0 0 1 0 6.2" {...drawPath(2)} /><motion.path d="M17.6 14a5.6 5.6 0 0 1 3 4" {...drawPath(2)} /></>);
      case "albums":
        return (<><motion.rect x="3" y="8" width="14" height="11.5" rx="2.2" {...drawPath(0)} /><motion.path d="M7 8V6.4A1.6 1.6 0 0 1 8.6 4.8h2.6l1.8 1.8H18a2 2 0 0 1 2 2v8" {...drawPath(1)} /></>);
      default:
        return null;
    }
  };
  return (
    <motion.svg {...p} animate={idle.animate} transition={idle.transition} style={{ transformOrigin: idle.origin ?? "50% 50%", overflow: "visible" }}>
      {inner()}
    </motion.svg>
  );
}

function FeatureCard({ f, i }: { f: (typeof FEATURES)[number]; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, ${ACCENT_GLOW[f.accent]}, transparent 72%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: (i % 3) * 0.1 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="group relative flex h-full flex-col overflow-hidden bg-card p-8 transition-colors duration-300 hover:bg-bone"
    >
      {/* cursor-following accent spotlight */}
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />

      <motion.span
        whileHover={{ rotate: -6, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${ACCENT_TILE[f.accent]}`}
      >
        <AnimatedIcon name={f.icon} />
      </motion.span>

      <h3 className="relative mt-6 text-[19px] font-extrabold tracking-[-0.02em] text-ink">{f.title}</h3>
      <p className="relative mt-2.5 text-[14px] leading-relaxed text-inkSoft">{f.body}</p>

      <span className="pointer-events-none absolute right-5 top-5 font-display text-[80px] leading-none text-ink opacity-[0.04] transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-[0.08]">
        {String(i + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative bg-bg py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal><Eyebrow tone="sage">What's inside</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-6 max-w-2xl text-[clamp(2.2rem,5vw,3.8rem)] text-ink">
            Everything a cook needs. Nothing they don't.
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── "alive" social beat ────────────────────────────────────── */

const LIVE = [
  { initials: "MR", color: "#8B3A1F", name: "maya", action: "rated Charred Miso Eggplant", meta: "9.1 · just now" },
  { initials: "JP", color: "#3E2F20", name: "jpark", action: "cooked Lemon Pistachio Orzo", meta: "2m ago" },
  { initials: "SL", color: "#3A5468", name: "sam", action: "saved Brown Butter Gnocchi", meta: "5m ago" },
];

export function Alive() {
  return (
    <section className="relative overflow-hidden bg-bone py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <div className="eyebrow flex items-center gap-2.5 text-clay">
              <motion.span className="inline-block h-2 w-2 rounded-full bg-clay" animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
              Live
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,3.8rem)] text-ink">
              Cooking feels better with company.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-inkSoft">
              Every try posts to your friends' feeds. Recipes ripple through a circle of people who actually cook — so you're never deciding what's for dinner alone.
            </p>
          </Reveal>
        </div>
        <div className="relative">
          <div className="space-y-3">
            {LIVE.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.18 }}
                className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: l.color }}>
                  <span className="text-[12px] font-extrabold" style={{ color: "#F5E9D3" }}>{l.initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-ink"><span className="font-bold">{l.name}</span> {l.action}</p>
                  <p className="mt-0.5 text-[12px] font-medium text-muted">{l.meta}</p>
                </div>
                <span className="text-[14px] font-bold text-ochre">{l.meta.includes("·") ? l.meta.split(" ")[0] : "♥"}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── closer / waitlist (dark) ──────────────────────────────── */

export function Closer() {
  return (
    <section id="waitlist" className="grain relative overflow-hidden bg-ink py-32 text-bone md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay opacity-25 blur-[90px]" />
      <Dust tone="#C7902A" />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <Reveal><Eyebrow tone="bone" className="justify-center">Join the table</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-6 text-[clamp(2.6rem,7vw,5rem)] text-bone">
            Be first in the kitchen.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#b9b9be]">
            Get early access to Becipe and help shape it. We'll email you the moment it's ready — no spam, just an invite.
          </p>
        </Reveal>
        <Reveal delay={0.22} className="w-full">
          <WaitlistProof />
        </Reveal>
        <Reveal delay={0.3} className="w-full">
          <WaitlistForm />
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <span className="text-[12px] font-medium text-[#8a8a92]">or grab it when it drops</span>
            <AppStoreBadge dark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const PROOF_AVATARS = [
  { initials: "MR", color: "#8B3A1F" },
  { initials: "JP", color: "#3E2F20" },
  { initials: "SL", color: "#3A5468" },
  { initials: "DK", color: "#4A6B3E" },
  { initials: "AO", color: "#8A6320" },
];

function CountUpInt({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
      return c.stop;
    }
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{out}</motion.span>;
}

function WaitlistProof() {
  return (
    <div className="mt-9 flex flex-col items-center gap-3">
      <div className="flex items-center -space-x-2.5">
        {PROOF_AVATARS.map((a, i) => (
          <motion.div
            key={a.initials}
            initial={{ opacity: 0, scale: 0, x: -8 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 320, damping: 16, delay: i * 0.09 }}
            className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-ink"
            style={{ background: a.color }}
          >
            <span className="text-[11px] font-extrabold" style={{ color: "#F5E9D3" }}>{a.initials}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: PROOF_AVATARS.length * 0.09 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-clay ring-2 ring-ink"
        >
          <span className="text-[11px] font-bold text-bone">+</span>
        </motion.div>
      </div>
      <p className="flex items-center gap-2 text-[14px] text-[#b9b9be]">
        <span className="font-bold text-bone"><CountUpInt to={2481} /></span> cooks already in line
        <span className="ml-1 inline-flex items-center gap-1.5 text-[12px] text-sage">
          <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          joining now
        </span>
      </p>
    </div>
  );
}

function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [val, setVal] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Netlify Forms-compatible POST; gracefully degrades to a thank-you state.
    const body = new URLSearchParams({ "form-name": "waitlist", email: val }).toString();
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body }).catch(() => {});
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="relative mx-auto mt-10 flex max-w-md items-center justify-center gap-3 overflow-hidden rounded-full bg-sage px-6 py-4 text-bone"
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-sage"
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1, repeat: 2, ease: "easeOut" }}
        />
        <motion.span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-bone text-[13px] font-bold text-sage"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.15 }}
        >
          ✓
        </motion.span>
        <span className="text-[15px] font-semibold">You're in line — welcome to the table.</span>
      </motion.div>
    );
  }

  return (
    <form
      name="waitlist"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
      <input
        type="email"
        name="email"
        required
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-full border border-[#2a2a30] bg-[#161619] px-5 py-4 text-[15px] text-bone placeholder:text-[#6a6a72] outline-none transition-colors focus:border-clay"
      />
      <button
        type="submit"
        className="rounded-full bg-clay px-6 py-4 text-[15px] font-bold text-bone transition-colors duration-300 hover:bg-clayDeep"
      >
        Get early access
      </button>
    </form>
  );
}

/* ── footer ─────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="bg-ink pb-12 pt-4 text-bone">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t border-[#23232a] px-6 pt-10 md:flex-row md:items-center">
        <div>
          <p className="text-[22px] font-black lowercase tracking-[-0.05em]">becipe</p>
          <p className="mt-1 text-[13px] text-[#8a8a92]">Cooking, but make it social.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-[#b9b9be]">
          <a href="#how" className="hover:text-bone">How it works</a>
          <a href="#features" className="hover:text-bone">Features</a>
          <a href="/privacy/" className="hover:text-bone">Privacy</a>
          <a href="/terms/" className="hover:text-bone">Terms</a>
          <a href="mailto:hello@becipe.app" className="hover:text-bone">Contact</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-6 text-[12px] text-[#6a6a72]">© 2026 Becipe. All rights reserved.</p>
    </footer>
  );
}
