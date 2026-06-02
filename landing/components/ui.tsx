"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* Foundational fade + rise on scroll into view */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/* Top scroll-progress bar */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-clay"
    />
  );
}

export function Eyebrow({
  children,
  tone = "clay",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "clay" | "sage" | "ochre" | "muted" | "bone";
  className?: string;
}) {
  const color =
    tone === "clay" ? "text-clay"
    : tone === "sage" ? "text-sage"
    : tone === "ochre" ? "text-ochre"
    : tone === "bone" ? "text-bone/70"
    : "text-muted";
  return (
    <div className={`eyebrow flex items-center gap-3 ${color} ${className}`}>
      <span className="h-px w-7 bg-current opacity-50" />
      {children}
    </div>
  );
}

/* Phone bezel shell — the chrome lives here so screens stay focused */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[300/620] w-[300px] rounded-[44px] bg-[#111114] p-[10px] shadow-[0_40px_90px_-20px_rgba(11,11,12,0.55),0_8px_24px_rgba(11,11,12,0.25)] ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[120px] h-12 w-[3px] rounded-l bg-[#111114]" />
      <span className="absolute -right-[2px] top-[100px] h-16 w-[3px] rounded-r bg-[#111114]" />
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-bg">
        {/* notch / dynamic island */}
        <div className="absolute left-1/2 top-2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#111114]" />
        {children}
      </div>
    </div>
  );
}

export function ProgressDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          animate={{
            width: i === active ? 26 : 7,
            backgroundColor: i === active ? "#C24A28" : "#d8d8d0",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          style={{ height: 7 }}
        />
      ))}
    </div>
  );
}

export function PillButton({
  children,
  variant = "ink",
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "ink" | "clay" | "ghost" | "bone";
  href?: string;
  className?: string;
}) {
  const styles =
    variant === "clay"
      ? "bg-clay text-bone hover:bg-clayDeep"
      : variant === "ghost"
      ? "bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/35"
      : variant === "bone"
      ? "bg-bone text-ink hover:bg-white"
      : "bg-ink text-bone hover:bg-[#22222a]";
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold tracking-[-0.01em] transition-all duration-300 ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

/* App Store badge (placeholder slot — swap href at launch) */
export function AppStoreBadge({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href="#waitlist"
      className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 ${
        dark ? "bg-bone text-ink" : "bg-ink text-bone"
      }`}
    >
      <svg viewBox="0 0 384 512" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] opacity-70">Coming soon to the</span>
        <span className="text-[15px] font-semibold tracking-[-0.02em]">App Store</span>
      </span>
    </a>
  );
}
