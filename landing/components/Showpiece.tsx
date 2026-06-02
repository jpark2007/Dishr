"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { PhoneFrame, ProgressDots, Eyebrow } from "./ui";
import { FeedScreen, RecipeScreen, CookScreen, TryScreen } from "./screens";

const STAGES = [
  {
    screen: FeedScreen,
    eyebrow: "01 · Discover",
    title: "A feed that actually feeds you.",
    line: "Follow the cooks you trust. Every post is something you could realistically make tonight — not aspirational noise.",
  },
  {
    screen: RecipeScreen,
    eyebrow: "02 · Match",
    title: "Every recipe, scored to your palate.",
    line: "Becipe learns what you love and rates each dish for your taste, so the right recipe finds you first.",
  },
  {
    screen: CookScreen,
    eyebrow: "03 · Cook",
    title: "Cook mode keeps up with you.",
    line: "Step-by-step, screen stays awake, ingredients check off as you go — and go hands-free when your hands are covered.",
  },
  {
    screen: TryScreen,
    eyebrow: "04 · Share",
    title: "Log the try. Grow your taste.",
    line: "Rate it, snap your plate, post it. Each try sharpens your matches and shows up in your friends' feeds.",
  },
];

const N = STAGES.length;

export function Showpiece() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [idx, setIdx] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  // 3D tilt + parallax driven continuously by scroll (the "3js feel")
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const rotateY = useTransform(smooth, [0, 1], [14, -12]);
  const rotateX = useTransform(smooth, [0, 1], [7, -5]);
  const phoneY = useTransform(smooth, [0, 1], [40, -40]);
  const chipA = useTransform(smooth, [0, 1], [70, -90]);
  const chipB = useTransform(smooth, [0, 1], [-50, 80]);
  const chipC = useTransform(smooth, [0, 1], [110, -60]);

  const Screen = STAGES[idx].screen;

  return (
    <section ref={ref} style={{ height: `${(N + 1) * 100}vh` }} className="relative bg-bone">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* ambient stage glow — static (no per-frame repaint during scroll) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sageSoft opacity-45 blur-[90px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-8">
          {/* narration */}
          <div className="order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Eyebrow tone="clay">{STAGES[idx].eyebrow}</Eyebrow>
                <h3 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-ink">
                  {STAGES[idx].title}
                </h3>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-inkSoft">
                  {STAGES[idx].line}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-9">
              <ProgressDots count={N} active={idx} />
            </div>
          </div>

          {/* phone */}
          <div className="order-1 flex justify-center md:order-2" style={{ perspective: 1400 }}>
            <motion.div style={{ rotateY, rotateX, y: phoneY, transformStyle: "preserve-3d", willChange: "transform" }} className="relative">
              {/* floating chips — scroll-driven parallax (outer) + idle bob (inner) */}
              <motion.div style={{ y: chipA }} className="absolute -left-12 top-10 z-20 hidden sm:block">
                <FloatBob dur={4.2}><Chip bg="#EDF1E6" fg="#4A6B3E" icon="◆" label="94% match" /></FloatBob>
              </motion.div>
              <motion.div style={{ y: chipB }} className="absolute -right-10 top-32 z-20 hidden sm:block">
                <FloatBob dur={5.1} delay={0.6}><Chip bg="#F8EED5" fg="#C7902A" icon="★" label="8.7 · 24 tries" /></FloatBob>
              </motion.div>
              <motion.div style={{ y: chipC }} className="absolute -right-14 bottom-24 z-20 hidden sm:block">
                <FloatBob dur={4.7} delay={1.1}><Chip bg="#FBE7DF" fg="#C24A28" icon="+" label="maya started following you" /></FloatBob>
              </motion.div>

              {/* idle float so the phone feels alive even when still */}
              <motion.div
                animate={{ y: [0, -12, 0], rotateZ: [-0.6, 0.6, -0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96, rotateY: 18 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.03, rotateY: -14 }}
                    transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <PhoneFrame>
                      <Screen />
                    </PhoneFrame>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatBob({ children, dur, delay = 0 }: { children: React.ReactNode; dur: number; delay?: number }) {
  return (
    <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
}

function Chip({ bg, fg, icon, label }: { bg: string; fg: string; icon: string; label: string }) {
  return (
    <div
      className="flex max-w-[180px] items-center gap-2 rounded-full bg-card px-3.5 py-2 shadow-[0_12px_30px_-8px_rgba(11,11,12,0.35)] ring-1 ring-black/5"
    >
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[12px]" style={{ background: bg, color: fg }}>
        {icon}
      </span>
      <span className="text-[12px] font-semibold leading-tight tracking-[-0.01em] text-ink">{label}</span>
    </div>
  );
}
