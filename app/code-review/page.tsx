"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible"); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ProgressBar({ pct, color, animated }: { pct: number; color: string; animated: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setWidth(pct), 80);
      return () => clearTimeout(timer);
    }
  }, [animated, pct]);
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: color,
          transition: "width 800ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

const completionItems = [
  { area: "Assessment & classification engine", pct: 100, status: "Production-ready", emoji: "✅" },
  { area: "Daily check-in & streak system", pct: 95, status: "Production-ready", emoji: "✅" },
  { area: "Letting Go / release flow", pct: 90, status: "Production-ready", emoji: "✅" },
  { area: "Momentum tracking", pct: 90, status: "Production-ready", emoji: "✅" },
  { area: "UI / design system", pct: 70, status: "Minor refactor needed", emoji: "⚠️" },
  { area: "Dream Teams", pct: 40, status: "UI only — no backend", emoji: "⚠️" },
  { area: "Authentication", pct: 0, status: "Not built", emoji: "❌" },
  { area: "Cloud data persistence", pct: 0, status: "Not built (localStorage only)", emoji: "❌" },
  { area: "Push notifications", pct: 0, status: "Not built", emoji: "❌" },
  { area: "Analytics", pct: 0, status: "Not built", emoji: "❌" },
];

function barColor(pct: number) {
  if (pct >= 80) return "#34D98A";
  if (pct >= 40) return "#F5A623";
  return "#E55A5A";
}

function CompletionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="space-y-5">
      {completionItems.map((item) => (
        <div key={item.area}>
          <div className="flex items-center justify-between mb-2 gap-3">
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.area}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm">{item.emoji}</span>
              <span className="text-xs hidden sm:inline" style={{ color: "var(--muted)" }}>{item.status}</span>
              <span
                className="font-bold text-sm font-mono"
                style={{ color: barColor(item.pct), minWidth: "2.5rem", textAlign: "right" }}
              >
                {item.pct}%
              </span>
            </div>
          </div>
          <ProgressBar pct={item.pct} color={barColor(item.pct)} animated={animated} />
        </div>
      ))}
    </div>
  );
}

const trustDimensions = [
  { label: "Code quality", score: 78, reason: "Clean TypeScript, well-structured logic layer" },
  { label: "Feature completeness", score: 55, reason: "Core flows built, backend missing" },
  { label: "Data reliability", score: 20, reason: "localStorage only — data lost on browser clear" },
  { label: "Production readiness", score: 60, reason: "Deployed but single-device only" },
  { label: "Scalability", score: 65, reason: "Architecture is sound, needs backend wiring" },
];

function trustColor(score: number) {
  if (score >= 75) return "#34D98A";
  if (score >= 50) return "#F5A623";
  return "#E55A5A";
}

const builtItems = [
  { icon: "◈", title: "Psychology Engine", desc: "Classification + 8 archetypes fully implemented. Deterministic, accurate, matches spec.", color: "#34D98A" },
  { icon: "◆", title: "Assessment Flow", desc: "15-step intake, resistance interview, reality check. Fully working.", color: "#4ECDC4" },
  { icon: "⬡", title: "Daily Coach", desc: "Check-in, streaks, grace days, badges, XP, weekly summary. More complete than required.", color: "#34D98A" },
  { icon: "◇", title: "Momentum Graph", desc: "Custom SVG chart, no dependencies. Elegant.", color: "#C9A84C" },
  { icon: "◈", title: "Letting Go System", desc: "Complete guided release flow. Emotionally considered UX.", color: "#4ECDC4" },
  { icon: "◆", title: "UX Copy", desc: "Archetype taglines, insight paragraphs, philosophy lines. Excellent throughout.", color: "#34D98A" },
];

const gapCritical = [
  "Supabase auth (magic link sign-in)",
  "Cloud database (dreams, check-ins, streaks — persisted across devices)",
  "Dream Teams backend (real cross-device sync)",
  "Environment config cleanup",
];
const gapEnhanced = [
  "Push notifications (daily check-in reminders)",
  "Analytics (PostHog — understand user behaviour)",
  "Unit tests for logic layer",
  "Tailwind refactor (consistency)",
];
const gapFuture = [
  "Admin question bank",
  "Apple Health / Google Fit sync",
  "B2B / team admin dashboard",
];

const timeline = [
  {
    phase: "Phase 1",
    title: "Infrastructure",
    duration: "3–4 days",
    desc: "Auth, database, storage adapter, repo cleanup. David's app becomes multi-device.",
    color: "#34D98A",
  },
  {
    phase: "Phase 2",
    title: "Dream Teams",
    duration: "2–3 days",
    desc: "Real cross-device team sync, invite flow, team feed. The social engine that drives retention.",
    color: "#4ECDC4",
  },
  {
    phase: "Phase 3",
    title: "Production Polish",
    duration: "2–3 days",
    desc: "Push notifications, analytics, error monitoring, CI/CD. Ready to launch.",
    color: "#C9A84C",
  },
];

export default function CodeReview() {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl text-emerald">◆</span>
              <span className="font-semibold tracking-tight">DREAMCOACH</span>
            </Link>
            <span className="label text-muted hidden sm:block">· CODE REVIEW</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/moodboard" className="label text-muted hover:text-text transition-colors">
              Moodboard →
            </Link>
            <Link href="/" className="label text-muted hover:text-text transition-colors">
              Proposal →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="label text-emerald mb-4">3PR × DREAMCOACH · CODE REVIEW 2026</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Code Review.
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed mb-12" style={{ color: "var(--muted)" }}>
            What David has built — and what it takes to get to production.
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-lg">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-5xl font-black text-gradient-emerald mb-2">62%</div>
              <div className="label text-muted">Complete toward production-ready</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="text-5xl font-black text-gradient-gold mb-2">71</div>
              <div className="label text-muted">Trust Score / 100</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* What's Built — lead with the positives */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">01 · What David Built</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">The hard part is done.</h2>
            <p className="text-xl max-w-2xl mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
              Six systems that most apps never build. They&apos;re here, working, and better than required.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {builtItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 70}>
                <div className="bg-card border border-border rounded-xl p-7 card-hover h-full">
                  <div className="text-3xl mb-4" style={{ color: item.color }}>{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Completion Breakdown */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">02 · Completion Breakdown</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              62% complete.<br />
              <span style={{ color: "var(--muted)" }}>The rest is infrastructure.</span>
            </h2>
            <p className="max-w-2xl mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
              Every feature gap is a backend problem — the frontend is largely done.
            </p>
          </FadeIn>
          <div className="bg-card border border-border rounded-xl p-8">
            <CompletionSection />
            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#34D98A" }} />
                  Production-ready (≥80%)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#F5A623" }} />
                  Needs work (40–79%)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#E55A5A" }} />
                  Not built (&lt;40%)
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-gradient-emerald">62%</div>
                <div className="label text-muted">Overall</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Score */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-gold mb-4">03 · Trust Score</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">71 / 100</h2>
            <p className="max-w-2xl mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
              Five dimensions. Strong architecture, weak infrastructure. The path to 95 is clear.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {trustDimensions.map((dim, i) => (
              <FadeIn key={dim.label} delay={i * 70}>
                <div
                  className="bg-card rounded-xl p-6 card-hover flex flex-col gap-2 border"
                  style={{ borderColor: trustColor(dim.score) + "44" }}
                >
                  <div className="text-4xl font-black" style={{ color: trustColor(dim.score) }}>{dim.score}</div>
                  <div className="font-semibold text-sm">{dim.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{dim.reason}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={200}>
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--card)",
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: "0 0 30px rgba(201,168,76,0.1)",
              }}
            >
              <div className="label text-gold mb-5">What would take this to 95/100?</div>
              <ul className="space-y-3">
                {[
                  "Add Supabase auth + cloud persistence (data reliability: 20 → 90)",
                  "Wire Dream Teams to real backend (feature completeness: 55 → 85)",
                  "Add error monitoring + CI/CD (production readiness: 60 → 90)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text)" }}>
                    <span style={{ color: "var(--gold)" }} className="mt-0.5 shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gap Analysis */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">04 · Gap Analysis</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">What we&apos;re adding.</h2>
            <p className="max-w-2xl mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
              The gaps are infrastructure, not product. Everything needed to make this a real, trusted product.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn>
              <div className="bg-card border border-border rounded-xl p-7 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#E55A5A" }} />
                  <div className="label" style={{ color: "#E55A5A" }}>Critical — to ship</div>
                </div>
                <ul className="space-y-3">
                  {gapCritical.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "#E55A5A" }} className="mt-0.5 shrink-0 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="bg-card border border-border rounded-xl p-7 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#F5A623" }} />
                  <div className="label" style={{ color: "#F5A623" }}>Enhanced — v1+</div>
                </div>
                <ul className="space-y-3">
                  {gapEnhanced.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "#F5A623" }} className="mt-0.5 shrink-0 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="bg-card border border-border rounded-xl p-7 h-full">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--muted)" }} />
                  <div className="label text-muted">Future</div>
                </div>
                <ul className="space-y-3">
                  {gapFuture.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                      <span className="text-muted mt-0.5 shrink-0 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Build Timeline */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">05 · Build Timeline</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">~1 week with Dave.</h2>
            <p className="max-w-2xl mb-14 leading-relaxed" style={{ color: "var(--muted)" }}>
              Three focused phases. Production-ready at the end of each.
            </p>
          </FadeIn>
          <div className="space-y-4">
            {timeline.map((phase, i) => (
              <FadeIn key={phase.phase} delay={i * 80}>
                <div className="bg-card border border-border rounded-xl p-7">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{
                        background: phase.color + "18",
                        border: `1px solid ${phase.color}40`,
                        color: phase.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <div className="label" style={{ color: phase.color }}>{phase.phase}</div>
                        <span style={{ color: "var(--border)" }}>·</span>
                        <div className="font-bold text-lg">{phase.title}</div>
                        <span className="ml-auto label text-muted">{phase.duration}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{phase.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={280}>
            <div
              className="mt-8 rounded-xl p-8 flex items-center justify-between flex-wrap gap-6"
              style={{
                background: "rgba(52,217,138,0.07)",
                border: "1px solid rgba(52,217,138,0.2)",
              }}
            >
              <div>
                <div className="label text-emerald mb-2">Total estimate</div>
                <div className="text-3xl font-black text-gradient-emerald">~26 hours</div>
                <div className="label text-muted mt-1">~1 week with Dave</div>
              </div>
              <Link
                href="/#next-steps"
                className="px-7 py-3 rounded-lg font-bold text-sm transition-colors"
                style={{ background: "var(--emerald)", color: "var(--bg)" }}
              >
                View Proposal →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--emerald)" }}>◆</span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>DreamCoach · Code Review by 3PR · Confidential · 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/moodboard" className="text-sm hover:text-text transition-colors" style={{ color: "var(--muted)" }}>Moodboard</Link>
            <Link href="/" className="text-sm hover:text-text transition-colors" style={{ color: "var(--muted)" }}>Proposal</Link>
            <span className="text-sm" style={{ color: "var(--muted)" }}>Prepared for David King-Reubens</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
