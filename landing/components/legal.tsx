import React from "react";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <a href="/" className="text-[20px] font-black lowercase tracking-[-0.05em] text-ink">becipe</a>
        <h1 className="display mt-10 text-[clamp(2.2rem,6vw,3.4rem)] text-ink">{title}</h1>
        <p className="eyebrow mt-4 text-muted">Last updated {updated}</p>

        <div className="mt-6 rounded-2xl border border-ochre/30 bg-ochreSoft px-5 py-4 text-[13px] leading-relaxed text-inkSoft">
          <strong className="font-bold text-ink">Template notice.</strong> This document is a
          good-faith starting point written for Becipe's actual data practices, not legal
          advice. Have it reviewed by a qualified attorney before launch.
        </div>

        <article className="legal mt-12">{children}</article>

        <div className="mt-16 border-t border-border pt-8 text-[13px] text-muted">
          <a href="/" className="font-medium text-clay hover:underline">← Back to becipe</a>
        </div>
      </div>
    </main>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-inkSoft [&_a]:text-clay [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
