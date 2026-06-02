"use client";

/**
 * Faithful, live recreations of Becipe's real app screens — rebuilt from the
 * actual RN components (FeedCard, MatchPill, RecipeCard, Plate, EditorialHeading,
 * cook.tsx, RatingDisplay) and lib/theme.ts. Pure Inter, like the product.
 *
 * Each screen animates on mount, and because the Showpiece keys them by stage,
 * those mount animations replay every time you scroll into a stage — so the
 * phone always feels alive, not static.
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate as mAnimate } from "framer-motion";

/* ── shared bits ───────────────────────────────────────────── */

const TINTS = [
  { bg: "#EDF1E6", deep: "#dce6d3", label: "#4A6B3E" }, // sage
  { bg: "#FBE7DF", deep: "#f5d0c3", label: "#C24A28" }, // clay
  { bg: "#F8EED5", deep: "#f0dfa8", label: "#C7902A" }, // ochre
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#FCFCFA" : "#0B0B0C";
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px]" style={{ color: c }}>
      <span className="font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />
        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.55 }} />
        <span className="inline-block h-2 w-5 rounded-[3px]" style={{ background: c, opacity: 0.85 }} />
      </div>
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: color }}>
      <span className="text-[11px] font-extrabold" style={{ color: "#F5E9D3" }}>{initials}</span>
    </div>
  );
}

/** Dish photo tile. With `img` it shows the real photo (Ken-Burns drift); the
 *  gradient + "no photo yet" placeholder is kept as a graceful fallback.
 *  `overlay` renders the recipe-hero treatment (scrim + title + label). */
function DishTile({
  title, tint, label = "no photo yet", img, overlay = false,
}: {
  title: string; tint: number; label?: string; img?: string; overlay?: boolean;
}) {
  const t = TINTS[tint % TINTS.length];

  if (img) {
    return (
      <div className="relative aspect-square w-full overflow-hidden" style={{ background: t.deep }}>
        <motion.img
          src={img}
          alt={title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: "easeOut" }}
        />
        {overlay && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white drop-shadow">{title}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">{label}</p>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-square w-full flex-col items-center justify-center gap-2.5 overflow-hidden px-8"
      style={{ background: `radial-gradient(120% 95% at 72% 18%, ${t.bg} 0%, ${t.deep} 78%, ${t.deep} 100%)` }}
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
        style={{ background: `radial-gradient(circle, #ffffff88 0%, transparent 70%)` }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-center text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "#0B0B0C", opacity: 0.55 }}>{title}</p>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: t.label }}>{label}</span>
    </div>
  );
}

function MatchPill({ score, delay = 0 }: { score: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 16, delay }}
      className="inline-flex items-center gap-1.5 self-start rounded-full bg-sageSoft px-2.5 py-1.5"
    >
      <span className="text-[10px] text-sage">◆</span>
      <span className="text-[11px] font-bold tracking-[-0.01em] text-sage">{score}% match</span>
    </motion.div>
  );
}

/** Round floating plate (matches components/Plate.tsx) with idle float + steam. */
function Plate({ tint, size = 188, steam = false, img }: { tint: number; size?: number; steam?: boolean; img?: string }) {
  const t = TINTS[tint % TINTS.length];
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ y: [0, -8, 0], rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {steam && (
        <div className="pointer-events-none absolute inset-x-0 -top-6 z-10 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-8 w-1.5 rounded-full bg-white blur-[3px]"
              animate={{ opacity: [0, 0.5, 0], y: [6, -16, -26], scaleY: [0.6, 1.1, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
            />
          ))}
        </div>
      )}
      <div
        className="h-full w-full overflow-hidden rounded-full shadow-[0_18px_36px_rgba(11,11,12,0.30)] ring-1 ring-inset ring-white/40"
        style={{ background: `radial-gradient(120% 95% at 68% 22%, ${t.bg} 0%, ${t.deep} 72%, ${t.deep} 100%)` }}
      >
        {img ? (
          <img src={img} alt="dish" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[24px]" style={{ color: t.label, opacity: 0.7 }}>◆</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CountUp({ to, duration = 1.1 }: { to: number; duration?: number }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(1));
  useEffect(() => {
    const c = mAnimate(mv, to, { duration, ease: "easeOut" });
    return c.stop;
  }, [mv, to, duration]);
  return <motion.span>{text}</motion.span>;
}

function FeedCardMock({
  initials, color, name, verb, time, title, tint, score, index = 0, img,
}: {
  initials: string; color: string; name: string; verb: string; time: string;
  title: string; tint: number; score: number; index?: number; img?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.1 + index * 0.14 }}
      className="mb-[18px] overflow-hidden rounded-[22px] border border-border bg-card shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
    >
      <div className="flex items-center gap-2.5 px-3.5 py-[11px]">
        <Avatar initials={initials} color={color} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold tracking-[-0.02em] text-ink">{name}</p>
          <p className="mt-px text-[11px] font-medium text-muted">{verb} · {time}</p>
        </div>
      </div>
      <DishTile title={title} tint={tint} img={img} />
      <div className="flex flex-col gap-[7px] px-3.5 pb-3.5 pt-[11px]">
        <p className="text-[16px] font-extrabold leading-5 tracking-[-0.025em] text-ink">{title}</p>
        <MatchPill score={score} delay={0.35 + index * 0.14} />
      </div>
    </motion.div>
  );
}

/* ── 1 · FEED ──────────────────────────────────────────────── */

export function FeedScreen() {
  return (
    <div className="flex h-full flex-col bg-bg">
      <StatusBar />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-4 pb-2.5 pt-1.5"
      >
        <span className="text-[20px] font-black lowercase tracking-[-0.04em] text-ink">becipe</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <span className="text-[13px] text-inkSoft">✉</span>
        </div>
      </motion.div>
      <div className="no-scrollbar flex-1 overflow-hidden px-4">
        <FeedCardMock index={0} initials="MR" color="#8B3A1F" name="maya" verb="cooked this" time="3h" title="Charred Miso Eggplant" tint={1} score={94} img="/dishes/miso-eggplant.jpg" />
        <FeedCardMock index={1} initials="DK" color="#4A6B3E" name="drew" verb="saved" time="6h" title="Lemon Pistachio Orzo" tint={0} score={88} img="/dishes/pistachio-orzo.jpg" />
      </div>
      <TabBar active={0} />
    </div>
  );
}

/* ── 2 · RECIPE DETAIL ─────────────────────────────────────── */

export function RecipeScreen() {
  const ingredients = ["2 globe eggplants", "3 tbsp white miso", "1 tbsp mirin", "Toasted sesame, scallion"];
  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="relative">
        <DishTile title="Charred Miso Eggplant" tint={1} label="serves 2 · 35 min" img="/dishes/miso-eggplant.jpg" overlay />
        <div className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-bone/90 backdrop-blur">
          <span className="text-[15px] text-ink">←</span>
        </div>
        <StatusBarOverlay />
      </div>
      <div className="no-scrollbar flex-1 overflow-hidden px-4 pt-3.5">
        <div className="mb-2 flex items-center gap-2.5">
          <MatchPill score={94} delay={0.15} />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[11px] font-medium text-muted">by maya</motion.span>
        </div>
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-[26px] font-bold text-ochre"><CountUp to={8.7} /></span>
          <span className="text-[13px] font-medium text-muted">/10</span>
          <span className="ml-1 text-[12px] font-medium text-muted">(24 tries)</span>
        </div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Ingredients</p>
        <ul className="space-y-1.5">
          {ingredients.map((i, n) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + n * 0.08 }}
              className="flex items-center gap-2.5 text-[13px] text-inkSoft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />{i}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="px-4 pb-5 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center rounded-full bg-clay py-3.5 shadow-[0_6px_12px_rgba(0,0,0,0.18)]"
        >
          <motion.span className="text-[14px] font-bold text-bone" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            Start cooking
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── 3 · COOK MODE (faithful to app/recipe/[id]/cook.tsx — light, centered) ── */

export function CookScreen() {
  const TOTAL = 6;
  const current = 2; // step 2 of 6
  return (
    <div className="flex h-full flex-col bg-bone">
      <StatusBar />
      {/* header: close · sage timer pill · spacer */}
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-[18px] text-inkSoft">×</div>
        <motion.div
          className="rounded-full bg-sage px-4 py-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[12px] font-bold tracking-wide text-white">⏱ 12:45</span>
        </motion.div>
        <div className="h-9 w-9" />
      </div>

      <div className="no-scrollbar flex flex-1 flex-col items-center overflow-hidden px-6 pt-2">
        {/* round floating plate w/ steam */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }}>
          <Plate tint={1} size={172} steam img="/dishes/miso-eggplant.jpg" />
        </motion.div>

        {/* step eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-sage"
        >
          Step 0{current} of 0{TOTAL}
        </motion.p>

        {/* editorial heading: medium base + black sage emphasis word */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, ease }}
          className="mt-2.5 text-center text-[27px] font-medium leading-[1.06] tracking-[-0.045em] text-ink"
        >
          Brush the eggplant generously with the miso{" "}
          <span className="font-black text-sage">glaze</span>.
        </motion.h2>

        {/* body */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="mt-3.5 max-w-[230px] text-center text-[13.5px] leading-[1.5] text-inkSoft"
        >
          Score a shallow crosshatch first so the glaze sinks in and caramelizes.
        </motion.p>

        {/* step dots — fill in sequence */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full"
              initial={{ backgroundColor: "#ECECE6", scale: 0.8 }}
              animate={{ backgroundColor: i <= current - 1 ? "#4A6B3E" : "#ECECE6", scale: i === current - 1 ? 1.25 : 1 }}
              transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 360, damping: 20 }}
            />
          ))}
        </div>

        {/* collapsed ingredient card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-6 w-full rounded-2xl border border-border bg-card"
        >
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Ingredients (6)</span>
            <span className="text-[10px] text-muted">▼</span>
          </div>
        </motion.div>
      </div>

      {/* footer: prev · sage next · claySoft mic */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="flex items-center gap-2.5 border-t border-border bg-bone px-5 pb-6 pt-3"
      >
        <div className="flex h-12 items-center justify-center rounded-full border border-border bg-card px-5 text-[16px] font-bold text-inkSoft">←</div>
        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-sage shadow-[0_6px_12px_rgba(0,0,0,0.18)]">
          <span className="text-[14px] font-bold tracking-wide text-white">next step →</span>
        </div>
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-claySoft"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[16px] text-ink">∿</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── 4 · LOG A TRY ─────────────────────────────────────────── */

export function TryScreen() {
  const rating = 8.7;
  const pct = (rating / 10) * 100;
  return (
    <div className="flex h-full flex-col bg-bg">
      <StatusBar />
      <div className="flex items-center gap-2.5 px-4 pb-1 pt-1">
        <span className="text-[15px] text-ink">←</span>
        <span className="text-[15px] font-bold tracking-[-0.02em] text-ink">Log a try</span>
      </div>
      <div className="flex-1 px-4 pt-3">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
          <DishCompact title="Charred Miso Eggplant" tint={1} img="/dishes/miso-eggplant.jpg" />
        </motion.div>
        <p className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">How was it?</p>
        <div className="flex items-baseline gap-1">
          <span className="text-[40px] font-bold leading-none text-ochre"><CountUp to={rating} duration={1.2} /></span>
          <span className="text-[14px] font-medium text-muted">/10</span>
        </div>
        <div className="mt-3.5 h-2.5 w-full overflow-visible rounded-full bg-border">
          <motion.div
            className="relative h-2.5 rounded-full bg-ochre"
            initial={{ width: "0%" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.span
              className="absolute -right-2 -top-[7px] h-6 w-6 rounded-full border-[3px] border-ochre bg-bone shadow"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-6 rounded-2xl border border-border bg-card p-3.5 text-[13px] leading-snug text-inkSoft"
        >
          Glaze caramelized perfectly. Will make again — maybe more mirin.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-3 flex items-center gap-2.5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-border bg-card text-[18px] text-muted">＋</div>
          <span className="text-[12px] font-medium text-muted">Add a photo of your plate</span>
        </motion.div>
      </div>
      <div className="px-4 pb-5 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex items-center justify-center rounded-full bg-clay py-3.5 shadow-[0_6px_12px_rgba(0,0,0,0.18)]"
        >
          <span className="text-[14px] font-bold text-bone">Post try</span>
        </motion.div>
      </div>
    </div>
  );
}

function DishCompact({ title, tint, img }: { title: string; tint: number; img?: string }) {
  const t = TINTS[tint % TINTS.length];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
      <div className="h-[68px] w-[68px] flex-shrink-0 overflow-hidden rounded-xl" style={{ background: `radial-gradient(120% 95% at 70% 20%, ${t.bg}, ${t.deep})` }}>
        {img && <img src={img} alt={title} className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-bold leading-5 tracking-[-0.02em] text-ink">{title}</p>
        <p className="mt-1 text-[11px] font-medium text-muted">you cooked this just now</p>
      </div>
    </div>
  );
}

function StatusBarOverlay() {
  return (
    <div className="absolute left-0 right-0 top-0">
      <div className="flex items-center justify-between px-5 pt-3 text-[11px] text-bone drop-shadow">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-bone/90" />
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-bone/60" />
          <span className="inline-block h-2 w-5 rounded-[3px] bg-bone/90" />
        </div>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const items = ["⌂", "⌕", "＋", "▦", "◔"];
  return (
    <div className="flex items-center justify-around border-t border-border bg-bone px-2 pb-5 pt-2.5">
      {items.map((g, i) =>
        i === 2 ? (
          <div key={i} className="-mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-clay shadow-[0_6px_12px_rgba(0,0,0,0.18)]">
            <span className="text-[20px] font-light text-bone">{g}</span>
          </div>
        ) : (
          <div key={i} className="flex h-9 w-9 items-center justify-center">
            <span className="text-[20px]" style={{ color: i === active ? "#4A6B3E" : "#8A8A93" }}>{g}</span>
          </div>
        )
      )}
    </div>
  );
}
