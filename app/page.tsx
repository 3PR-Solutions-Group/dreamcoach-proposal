"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedStat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-gradient-emerald">{count}{suffix}</div>
      <div className="label mt-2">{label}</div>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); } },
      { threshold: 0.1 }
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

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
      <AnimatedStat value={13} suffix="B" label="Market Size 2025" start={started} />
      <AnimatedStat value={50} suffix="B" label="Projected 2035" start={started} />
      <AnimatedStat value={14} suffix="%" label="Annual Growth Rate" start={started} />
      <AnimatedStat value={58} suffix="%" label="Apps Now AI-Integrated" start={started} />
    </div>
  );
}

const features = [
  {
    icon: "◆",
    title: "Dream Tracking",
    desc: "Define a dream with purpose and depth. Daily check-ins, a forgiving streak system with grace days, and a journal that captures the texture of your progress — not just the ticks.",
    color: "text-emerald",
  },
  {
    icon: "⬡",
    title: "Dream Teams",
    desc: "Create or join a team of up to 5. Different dreams, shared accountability. A private daily feed, team streaks, and gentle nudges — intimate enough to be real.",
    color: "text-teal",
  },
  {
    icon: "◇",
    title: "Letting Go System",
    desc: "The only feature of its kind. A structured, compassionate four-step pathway for releasing a dream that no longer serves you — reframing closure as growth, not failure.",
    color: "text-gold",
  },
  {
    icon: "◈",
    title: "AI Dream Coach",
    desc: "Conversational AI that asks the right questions. Surfaces blind spots, helps reframe resistance, and generates your personal weekly narrative. Warm intelligence, not empty encouragement.",
    color: "text-emerald",
  },
];

const competitors = [
  { name: "Habitica", type: "RPG task tracker", price: "Free + £4.99/mo", gap: "No dream-level framing. No psychological depth." },
  { name: "Streaks", type: "Minimalist habit", price: "£5.99 one-time", gap: "No social layer. Task-level only. iOS only." },
  { name: "Finch", type: "Self-care companion", price: "~£7.99/mo", gap: "Gimmick-dependent. No AI depth. No goal tracking." },
  { name: "Woebot", type: "CBT chatbot", price: "Free / Enterprise", gap: "Not a goal app. No streaks. No community." },
  { name: "Coach.me", type: "Coaching marketplace", price: "£15–500+/session", gap: "Human coaching doesn't scale. App itself is basic." },
];

const pricing = [
  {
    tier: "Free",
    price: "£0",
    period: "",
    color: "border-border",
    items: ["1 active dream", "Basic streak tracking with grace days", "Dream journal", "1 Dream Team (up to 5 people)", "Team feed & reactions", "Gentle nudge system"],
    cta: "Get Started",
    highlight: false,
  },
  {
    tier: "Premium",
    price: "£7.99",
    period: "/month",
    color: "border-emerald-subtle",
    items: ["Unlimited dreams", "AI Dream Coach — full conversations", "AI Letting Go guide", "Streak recovery AI", "Advanced analytics", "Weekly AI narrative", "Priority notifications"],
    cta: "Most Popular",
    highlight: true,
  },
  {
    tier: "Team",
    price: "£3.99",
    period: "/user/month",
    color: "border border-gold/30",
    items: ["Everything in Premium", "Team admin dashboard", "Shared team analytics", "Dream Team insights (AI)", "Priority support", "B2B billing"],
    cta: "For Groups",
    highlight: false,
  },
];

const phases = [
  { phase: "Phase 1", title: "MVP — Core Dream Engine", weeks: "Weeks 1–8", items: ["Dream creation & daily check-in", "Streak + grace day system", "Dream journal & dashboard", "Basic AI Dream Coach", "Stripe subscriptions (web)", "Push notifications"] },
  { phase: "Phase 2", title: "Dream Teams", weeks: "Weeks 9–12", items: ["Team creation & invite flow", "Real-time team feed", "Reactions & nudges", "Team streaks", "Mobile IAP (RevenueCat)", "Team analytics"] },
  { phase: "Phase 3", title: "Letting Go + Full AI", weeks: "Weeks 13–17", items: ["Full Letting Go 4-step ceremony", "AI Letting Go guide", "Streak recovery AI", "Weekly narrative generation", "Dream archetype assessment", "Resistance pattern coaching"] },
];

const deliverables = [
  "iOS app (App Store ready)", "Android app (Play Store ready)", "Web companion (dashboard + marketing)",
  "Supabase database + RLS policies", "AI Dream Coach integration", "AI Letting Go guide",
  "Stripe + RevenueCat subscriptions", "Push notification system", "PostHog analytics",
  "GitHub CI/CD pipelines", "Staging + production environments", "Design system (component library)",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl text-emerald">◆</span>
            <span className="font-semibold tracking-tight">DREAMCOACH</span>
            <span className="label text-muted hidden sm:block">· PROPOSAL</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/moodboard" className="label text-muted hover:text-text transition-colors">
              Moodboard →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="label text-emerald mb-4">3PR × DREAMCOACH · PROPOSAL 2026</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Turn your dreams into<br />
            <span className="text-gradient-emerald">daily practice.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl leading-relaxed mb-10">
            A psychologically sophisticated mobile app for ambitious people who take their dreams seriously — and want a tool that takes them seriously in return.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#vision" className="bg-emerald text-bg px-6 py-3 rounded-lg font-semibold hover:bg-emerald/90 transition-colors">
              View Proposal
            </a>
            <Link href="/moodboard" className="border border-border px-6 py-3 rounded-lg font-semibold text-muted hover:text-text hover:border-emerald/50 transition-colors">
              View Moodboard
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "21 weeks", label: "Full build timeline", note: "3 phases, production-ready" },
              { stat: "£13B", label: "Market size (2025)", note: "Growing at 14.4% CAGR" },
              { stat: "12.4x", label: "LTV:CAC base case", note: "Strong unit economics" },
            ].map((item) => (
              <div key={item.stat} className="bg-card border border-border rounded-xl p-6">
                <div className="text-3xl font-black text-gradient-emerald">{item.stat}</div>
                <div className="font-semibold mt-1">{item.label}</div>
                <div className="label text-muted mt-1">{item.note}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">01 · The Vision</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 max-w-3xl">
              The gap between people and their dreams isn't capability.
              <span className="text-muted"> It's daily consistency.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <FadeIn>
              <div>
                <h3 className="text-xl font-bold mb-4 text-text">What DreamCoach Is</h3>
                <p className="text-muted leading-relaxed mb-6">
                  DreamCoach is a dream operating system — not a habit tracker. While competitors track tasks and chores, DreamCoach operates at the level of meaning. It asks: <em className="text-teal not-italic">"What do you want your life to look like?"</em>
                </p>
                <p className="text-muted leading-relaxed">
                  That positions it closer to premium digital coaching than to habit tracking — unlocking a higher-value audience and a higher-value price point. The app is psychologically sophisticated, combining resistance archetypes, dream viability scoring, and AI-guided coaching into a dark, premium interface built for people who take themselves seriously.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div>
                <h3 className="text-xl font-bold mb-4 text-text">Why Now</h3>
                <p className="text-muted leading-relaxed mb-6">
                  The habit tracking market was £1.7B in 2024 and is projected to reach £5.5B by 2033 at 14.2% CAGR. 58% of new apps now integrate AI — but most are doing it superficially.
                </p>
                <p className="text-muted leading-relaxed mb-6">
                  The window for a psychologically grounded, AI-enhanced dream accountability app is open. The market is moving from toxic positivity toward genuine self-awareness tools. DreamCoach's psychological sophistication is ahead of where the market is going.
                </p>
                <div className="bg-card2 border border-border rounded-lg p-4">
                  <p className="text-sm italic text-teal leading-relaxed">
                    "No app in this market addresses the full lifecycle of a dream — from articulation, through daily accountability, to either celebration or compassionate release."
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-12 px-6 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-center text-muted mb-8">Market Data · Straits Research / Global Growth Insights 2025</div>
          </FadeIn>
          <StatsSection />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">02 · Core Features</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Built for the full<br />lifecycle of a dream.</h2>
            <p className="text-muted max-w-2xl mb-16">Four interconnected systems that work together. Miss one and the product doesn't land.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div className="bg-card border border-border rounded-xl p-8 card-hover h-full">
                  <div className={`text-3xl mb-4 ${f.color}`}>{f.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted leading-relaxed">{f.desc}</p>
                  {f.title === "Letting Go System" && (
                    <div className="mt-4 inline-block bg-gold/10 border border-gold/30 rounded px-3 py-1">
                      <span className="text-xs text-gold font-medium tracking-wider uppercase">Market Differentiator</span>
                    </div>
                  )}
                  {f.title === "AI Dream Coach" && (
                    <div className="mt-4 inline-block bg-teal/10 border border-teal/30 rounded px-3 py-1">
                      <span className="text-xs text-teal font-medium tracking-wider uppercase">Premium Feature</span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Feature detail: Letting Go */}
          <FadeIn delay={200}>
            <div className="mt-12 bg-card border border-gold/20 rounded-xl p-8 emerald-glow">
              <div className="label text-gold mb-4">The Letting Go System · Expanded</div>
              <h3 className="text-2xl font-bold mb-4">No other app does this.</h3>
              <p className="text-muted mb-8 max-w-2xl">A structured psychological pathway for releasing a dream that no longer fits. Reframes closure as growth — the first feature of its kind in the category.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "Reflection", desc: "Why this dream no longer serves you" },
                  { step: "02", title: "Recognition", desc: "What the dream taught you, what you gained" },
                  { step: "03", title: "Release Ceremony", desc: "A symbolic, personalised release ritual" },
                  { step: "04", title: "What's Next", desc: "Return to dreaming or step forward free" },
                ].map((s) => (
                  <div key={s.step} className="bg-bg rounded-lg p-4 border border-gold/10">
                    <div className="text-gold text-xs font-mono mb-2">STEP {s.step}</div>
                    <div className="font-semibold mb-1">{s.title}</div>
                    <div className="text-xs text-muted">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Market Opportunity */}
      <section id="market" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">03 · Market Opportunity</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12">A £13B market with a clear gap.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "TAM", value: "£13.06B", desc: "Total Addressable Market — all personal wellness, habit tracking, and digital coaching app users globally (2025).", note: "Personal wellness + habit + AI coaching combined" },
              { label: "SAM", value: "~£2.8B", desc: "English-speaking markets (UK, US, AU, CA) aged 22–45 with demonstrated interest in self-improvement.", note: "~21% of global market by population weighting" },
              { label: "SOM", value: "~£14M", desc: "Realistic Year 3 penetration: 175,000 active subscribers at £6.50/month net revenue.", note: "Conservative 3-year runway with freemium model" },
            ].map((m, i) => (
              <FadeIn key={m.label} delay={i * 100}>
                <div className="bg-card border border-border rounded-xl p-8 h-full">
                  <div className="label text-emerald mb-2">{m.label}</div>
                  <div className="text-4xl font-black text-text mb-3">{m.value}</div>
                  <p className="text-muted text-sm leading-relaxed mb-4">{m.desc}</p>
                  <div className="label text-xs text-muted/60">{m.note}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="label text-teal mb-4">Key Market Drivers</div>
                <ul className="space-y-3">
                  {[
                    "58% of habit apps now integrate AI — users expect personalisation",
                    "Community features increase 30-day retention by up to 3× (Strava, Duolingo data)",
                    "Gen Z + Millennial demand for psychological depth over toxic positivity",
                    "Corporate wellness adoption up 42% in 2024 — B2B expansion path built-in",
                    "36% of habit app users already pay for premium — market is demonstrably willing to pay",
                  ].map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="text-emerald mt-0.5 shrink-0">◆</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="label text-gold mb-4">The Critical Insight</div>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  52% of habit app users drop off within 30 days. This is the market-wide epidemic. DreamCoach's structural answer: grace days that prevent shame-churn, and Dream Teams that create relational accountability no solo tracker can match.
                </p>
                <div className="space-y-3 mt-6">
                  {[
                    { label: "D30 industry drop-off", value: "52%", bad: true },
                    { label: "DreamCoach target D30 retention", value: ">35%", bad: false },
                    { label: "Dream Teams uplift on retention", value: "Up to 3×", bad: false },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center text-sm border-b border-border pb-2">
                      <span className="text-muted">{s.label}</span>
                      <span className={`font-semibold ${s.bad ? "text-red-400" : "text-emerald"}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Competitive */}
      <section id="competitive" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">04 · Competitive Landscape</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">One position. Unoccupied.</h2>
            <p className="text-muted max-w-2xl mb-12">High psychological depth + social accountability. No direct competitor exists in this quadrant.</p>
          </FadeIn>

          {/* Positioning Matrix */}
          <FadeIn>
            <div className="bg-card border border-border rounded-xl p-8 mb-10">
              <div className="label text-muted mb-6">Positioning Matrix</div>
              <div className="relative aspect-square max-w-md mx-auto border border-border rounded-lg overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="border-r border-b border-border/50 p-4 flex items-center justify-center">
                    <span className="text-xs text-muted/50 text-center">Individual · Low Depth<br/><span className="text-muted/30 text-[10px]">Streaks, Done</span></span>
                  </div>
                  <div className="border-b border-border/50 p-4 flex items-center justify-center bg-emerald/5">
                    <div className="text-center">
                      <div className="text-emerald text-sm font-bold">◆ DreamCoach</div>
                      <div className="text-[10px] text-emerald/70 mt-1">Social · High Depth</div>
                    </div>
                  </div>
                  <div className="border-r border-border/50 p-4 flex items-center justify-center">
                    <span className="text-xs text-muted/50 text-center">Individual · High Depth<br/><span className="text-muted/30 text-[10px]">Woebot (clinical)</span></span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-xs text-muted/50 text-center">Social · Low Depth<br/><span className="text-muted/30 text-[10px]">BeReal, Habitica</span></span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50"></div>
              </div>
            </div>
          </FadeIn>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-6 label">Competitor</th>
                  <th className="text-left py-3 pr-6 label">Type</th>
                  <th className="text-left py-3 pr-6 label">Price</th>
                  <th className="text-left py-3 label">The Gap</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <FadeIn key={c.name} delay={i * 60}>
                    <tr className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="py-4 pr-6 font-medium">{c.name}</td>
                      <td className="py-4 pr-6 text-muted">{c.type}</td>
                      <td className="py-4 pr-6 text-teal font-mono text-xs">{c.price}</td>
                      <td className="py-4 text-muted/70 text-xs">{c.gap}</td>
                    </tr>
                  </FadeIn>
                ))}
              </tbody>
            </table>
          </div>

          <FadeIn delay={200}>
            <div className="mt-8 bg-emerald/10 border border-emerald/20 rounded-xl p-6">
              <div className="label text-emerald mb-3">DreamCoach's Unclaimed Position</div>
              <p className="text-text font-medium mb-2">The only app that treats your dreams with the same seriousness you do.</p>
              <p className="text-muted text-sm leading-relaxed">
                Dream-level accountability, not task-level tracking. Social intimacy without public performance. AI that asks the right questions. And — uniquely — a compassionate pathway for when letting go is the healthiest choice.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Monetisation */}
      <section id="monetisation" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">05 · Monetisation</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Freemium that converts.</h2>
            <p className="text-muted max-w-2xl mb-16">36% of habit app users already pay for premium features. The market is demonstrably willing to pay — DreamCoach's AI and social features are the conversion engine.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pricing.map((p, i) => (
              <FadeIn key={p.tier} delay={i * 80}>
                <div className={`bg-card rounded-xl p-8 h-full flex flex-col border ${p.highlight ? "border-emerald/40 emerald-glow" : "border-border"}`}>
                  {p.highlight && <div className="label text-emerald text-center mb-4">Recommended</div>}
                  <div className="label text-muted mb-2">{p.tier}</div>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-black text-text">{p.price}</span>
                    <span className="text-muted mb-1">{p.period}</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted">
                        <span className={`mt-0.5 shrink-0 ${p.highlight ? "text-emerald" : "text-muted/50"}`}>◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`text-center py-3 rounded-lg text-sm font-semibold ${p.highlight ? "bg-emerald text-bg" : "border border-border text-muted"}`}>
                    {p.cta}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="label text-gold mb-6">LTV Modelling — Base Case</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Freemium Conversion", value: "4.0%", note: "Category avg: 2–5%" },
                  { label: "Monthly Churn", value: "6%", note: "Category avg: 8–12%" },
                  { label: "Avg Subscription Tenure", value: "14 months", note: "Driven by Dream Teams" },
                  { label: "LTV:CAC Ratio", value: "12.4×", note: "3× = minimum viable" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-black text-gradient-gold">{m.value}</div>
                    <div className="label mt-1">{m.label}</div>
                    <div className="text-xs text-muted/60 mt-1">{m.note}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <div className="label text-muted mb-4">3-Year Revenue Trajectory (Base Case)</div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { year: "Year 1", arr: "£84K", mau: "35K MAU" },
                    { year: "Year 2", arr: "£420K", mau: "100K MAU" },
                    { year: "Year 3", arr: "£1.08M", mau: "220K MAU" },
                  ].map((y) => (
                    <div key={y.year} className="bg-bg rounded-lg p-4 text-center">
                      <div className="label text-muted mb-2">{y.year}</div>
                      <div className="text-xl font-bold text-emerald">{y.arr}</div>
                      <div className="text-xs text-muted mt-1">{y.mau}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Technical Architecture */}
      <section id="architecture" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">06 · Technical Architecture</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Built to scale. Built to last.</h2>
            <p className="text-muted max-w-2xl mb-16">Proven, modern stack. Every decision made with 0 → 100k MAU in mind. No rebuilds. No migrations.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { label: "Mobile", tech: "React Native (Expo)", reason: "Shared logic with web prototype. OTA updates bypass App Store review. Single codebase → iOS + Android." },
              { label: "Web Companion", tech: "Next.js 14 (App Router)", reason: "SSR for marketing pages. React Server Components for dashboard. Deployed to Vercel edge network." },
              { label: "Backend + Database", tech: "Supabase (PostgreSQL)", reason: "Real-time team feeds via pg_notify. Row-Level Security for dream data privacy. EU region for GDPR. Standard SQL — no vendor lock-in." },
              { label: "AI Layer", tech: "GPT-4o + Claude 3.5 Sonnet", reason: "Single Edge Function routes all AI. GPT-4o Moderation API for emotional content safety. Model-swappable by config." },
              { label: "Subscriptions", tech: "Stripe + RevenueCat", reason: "RevenueCat unifies App Store IAP + Stripe web payments into one entitlement state. No reconciliation required." },
              { label: "Analytics", tech: "PostHog", reason: "Session replay for UX iteration. Feature flags for phased AI rollout. GDPR-compliant EU cloud." },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 60}>
                <div className="bg-card border border-border rounded-xl p-6 card-hover">
                  <div className="label text-muted mb-2">{s.label}</div>
                  <div className="text-lg font-bold text-emerald mb-3">{s.tech}</div>
                  <p className="text-sm text-muted leading-relaxed">{s.reason}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Build Phases */}
          <FadeIn>
            <div className="label text-emerald mb-6">Build Phases</div>
            <div className="space-y-4">
              {phases.map((p, i) => (
                <div key={p.phase} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center text-emerald text-xs font-bold">{i + 1}</div>
                      <div>
                        <div className="label text-emerald">{p.phase}</div>
                        <div className="font-bold">{p.title}</div>
                      </div>
                    </div>
                    <div className="label text-muted">{p.weeks}</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-12">
                    {p.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-muted">
                        <span className="text-emerald text-xs">◆</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-8 bg-teal/10 border border-teal/20 rounded-xl p-6">
              <div className="label text-teal mb-3">Timeline Reality Check</div>
              <p className="text-text font-semibold mb-1">21 weeks. Not months, not a year — 21 weeks.</p>
              <p className="text-muted text-sm">Full production build with iOS + Android apps, web companion, AI integration, Stripe subscriptions, and CI/CD pipelines. 3PR builds fast because we've built this stack dozens of times.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GTM */}
      <section id="gtm" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">07 · Go-to-Market</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Dream Teams are the growth engine.</h2>
            <p className="text-muted max-w-2xl mb-16">Every user who creates a Dream Team must invite 1–4 people. Each invite is a referral with social proof embedded. The product grows itself.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <FadeIn>
              <div className="bg-card border border-border rounded-xl p-8 h-full">
                <div className="label text-emerald mb-4">Launch Channels (Priority Order)</div>
                <div className="space-y-4">
                  {[
                    { num: "01", title: "Dream Teams viral loop", desc: "Built-in referral engine. Each team invite = organic acquisition with social proof." },
                    { num: "02", title: "Instagram + TikTok organic", desc: "Dark, premium aesthetic stands out in pastel-saturated wellness content feeds." },
                    { num: "03", title: "Podcast advertising", desc: "Self-improvement + psychology shows. Diary of a CEO, Modern Wisdom. Start mid-tier." },
                    { num: "04", title: "Reddit community", desc: "r/selfimprovement (2.3M), r/productivity (2.1M). Founder-led, not promotional." },
                    { num: "05", title: "PR: The Letting Go angle", desc: "First app to offer structured goal release. Press-worthy counter-narrative." },
                  ].map((c) => (
                    <div key={c.num} className="flex gap-4">
                      <div className="text-emerald font-mono text-xs w-6 shrink-0 mt-0.5">{c.num}</div>
                      <div>
                        <div className="font-semibold text-sm">{c.title}</div>
                        <div className="text-xs text-muted mt-1">{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-teal mb-3">Launch Targets</div>
                  <div className="space-y-3">
                    {[
                      { milestone: "Month 1", kpi: "1,000 downloads · 120 Dream Teams" },
                      { milestone: "Month 3", kpi: "5,000 downloads · 250 paying users" },
                      { milestone: "Month 6", kpi: "15,000 downloads · 800 premium subscribers" },
                    ].map((t) => (
                      <div key={t.milestone} className="flex justify-between items-center text-sm border-b border-border pb-2">
                        <span className="text-muted">{t.milestone}</span>
                        <span className="text-text text-xs">{t.kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-gold mb-3">North Star Metric</div>
                  <div className="text-2xl font-black text-gold mb-2">Dream Teams Created / Week</div>
                  <p className="text-sm text-muted">Team formation predicts retention and acquisition simultaneously. One metric to rule them all.</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-muted mb-3">Pre-Launch Targets</div>
                  <div className="space-y-2 text-sm">
                    {[
                      "5,000 waitlist signups before launch",
                      "10–15 press placements at launch",
                      "Product Hunt Top 5 on Day 1",
                      "12 weeks founder content pre-launch",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-2 text-muted">
                        <span className="text-emerald text-xs">◆</span>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Build */}
      <section id="build" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="label text-emerald mb-4">08 · The Build</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">What 3PR delivers.</h2>
            <p className="text-muted max-w-2xl mb-16">End-to-end. From design system to App Store submission. No handoffs, no gaps.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FadeIn>
              <div>
                <div className="label text-teal mb-6">Deliverables</div>
                <div className="grid grid-cols-2 gap-3">
                  {deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-muted">
                      <span className="text-emerald text-xs">◆</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div>
                <div className="label text-teal mb-6">How We Work</div>
                <div className="space-y-4">
                  {[
                    { title: "Weekly delivery", desc: "Working software every week. Not a big-bang launch after 6 months." },
                    { title: "Design-first", desc: "lj-canvas delivers the complete design system before a line of code is written. No design debt." },
                    { title: "You own everything", desc: "GitHub, Supabase, Vercel, Stripe — all under David's accounts. 3PR never holds the keys." },
                    { title: "Documentation throughout", desc: "ARCHITECTURE.md, API docs, and deployment runbooks committed alongside the code." },
                    { title: "Phased delivery", desc: "Each phase reviewed and approved before the next begins. No scope creep without a decision." },
                  ].map((w) => (
                    <div key={w.title} className="bg-card border border-border rounded-lg p-4">
                      <div className="font-semibold text-sm mb-1">{w.title}</div>
                      <div className="text-xs text-muted">{w.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section id="next-steps" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="label text-emerald mb-4">09 · Next Steps</div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Ready to build<br />
              <span className="text-gradient-emerald">something real?</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              The market window is open. DreamCoach's core positioning — especially the Letting Go feature — is novel today and won't stay novel. Every week of delay is a week the category catches up.
            </p>
            <div className="bg-card border border-emerald/20 rounded-2xl p-10 mb-12 emerald-glow">
              <div className="label text-muted mb-6">Three things to agree, then we build</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { num: "01", title: "Sign off the brief", desc: "Review and confirm the project brief, architecture contract, and v1 scope. One call, one decision." },
                  { num: "02", title: "Choose your design direction", desc: "Review the three moodboard directions on the next page. Pick one. 3PR executes to production quality." },
                  { num: "03", title: "Start Phase 1", desc: "3PR begins the design system and Phase 1 build. First working software in Week 2." },
                ].map((s) => (
                  <div key={s.num} className="bg-bg rounded-xl p-6">
                    <div className="text-emerald font-mono text-xs mb-3">STEP {s.num}</div>
                    <div className="font-bold mb-2">{s.title}</div>
                    <div className="text-sm text-muted">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/moodboard" className="bg-emerald text-bg px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald/90 transition-colors">
                View Moodboard Directions →
              </Link>
              <a href="mailto:lj@3pr.studio" className="border border-border px-8 py-4 rounded-lg font-bold text-lg text-muted hover:text-text hover:border-emerald/50 transition-colors">
                Contact 3PR
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-emerald">◆</span>
            <span className="text-sm text-muted">DreamCoach · Proposal by 3PR · Confidential · 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/moodboard" className="text-sm text-muted hover:text-text transition-colors">Moodboard</Link>
            <span className="text-sm text-muted">Prepared for David King-Reubens</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
