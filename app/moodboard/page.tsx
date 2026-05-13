"use client";
import { useEffect, useRef } from "react";
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

function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="w-full h-12 rounded-lg border border-white/10" style={{ background: color }} />
      <div className="text-xs font-medium text-text">{name}</div>
      <div className="font-mono text-xs text-muted">{hex}</div>
    </div>
  );
}

const directions = [
  {
    id: "01",
    label: "Option 1",
    name: "Current Design",
    tagline: "David's existing aesthetic, Dave-executed.",
    description: "The DreamCoach prototype's visual language executed with precision and production quality. Deep charcoal foundation, emerald as primary action colour, clean sans-serif throughout. Familiar but elevated — the same world David has been building, executed to agency standard.",
    mood: "Deep space at night — infinite potential, quiet focus. A premium coaching dashboard that takes itself seriously. The feeling of a well-designed app you return to every morning.",
    refs: ["Linear dark mode — card system, clean type, serious interface", "Woebot — psychological warmth in a dark interface", "Opal — streak gamification without visual excess"],
    palette: [
      { color: "#0D0F14", name: "Abyss", hex: "#0D0F14" },
      { color: "#161A22", name: "Deep Navy", hex: "#161A22" },
      { color: "#2ECC8A", name: "Emerald", hex: "#2ECC8A" },
      { color: "#4ECDC4", name: "Teal", hex: "#4ECDC4" },
      { color: "#E8EAF0", name: "Off-white", hex: "#E8EAF0" },
      { color: "#8B90A0", name: "Slate", hex: "#8B90A0" },
    ],
    typography: {
      headline: { font: "Inter 800", sample: "Your dream is real." },
      body: { font: "Inter 400", sample: "Did you take a step toward your dream today?" },
      label: { font: "Inter 500 · Uppercase · 2px tracking", sample: "DREAM COACH · ASSESSMENT" },
    },
    dos: ["Dark backgrounds always", "Emerald for primary actions only", "Uppercase tracking for section labels", "Generous card padding", "Clean sans-serif throughout"],
    donts: ["Light mode", "Pastel tones", "Decorative serif fonts", "Rounded corners above 12px", "Gradient backgrounds"],
    accent: "#2ECC8A",
    bgCard: "#161A22",
    bgBase: "#0D0F14",
  },
  {
    id: "02",
    label: "Option 2",
    name: "Enhanced Current",
    tagline: "Same DNA. Richer. More premium. More considered.",
    description: "The prototype's direction refined and deepened. Richer blacks push further into premium territory. A warmer emerald gains emotional resonance. DM Serif Display enters for emotional copy moments — not for UI — creating a tension between precision and warmth that positions DreamCoach closer to digital coaching than task management.",
    mood: "A therapist's office with excellent lighting. Intelligent, safe, measured. Premium dark-mode coaching tool — the kind of app you'd expect to cost £10/month and feel worth every penny.",
    refs: ["Notion dark mode — layered cards, precision spacing, quiet authority", "Fantastic — restrained type system, gold accents, intentional asymmetry", "Draftbit / Reflect — dark-first productivity with emotional depth"],
    palette: [
      { color: "#0A0C10", name: "Deep Void", hex: "#0A0C10" },
      { color: "#141820", name: "Card Dark", hex: "#141820" },
      { color: "#34D98A", name: "Warm Emerald", hex: "#34D98A" },
      { color: "#4ECDC4", name: "Teal Accent", hex: "#4ECDC4" },
      { color: "#F0F2F8", name: "Warm White", hex: "#F0F2F8" },
      { color: "#C9A84C", name: "Gold", hex: "#C9A84C" },
    ],
    typography: {
      headline: { font: "DM Serif Display (emotional) / Inter 800 (UI)", sample: "Turn your dreams into daily practice." },
      body: { font: "Inter 400", sample: "How did your dream show up for you today?" },
      label: { font: "Inter 500 · Uppercase · 1.5px tracking", sample: "DREAM COACH · 30 DAYS" },
    },
    dos: ["DM Serif for emotional headline moments only", "Gold as punctuation — sparingly", "Richer, deeper blacks than the prototype", "Inter for all UI and body", "Warm emerald (#34D98A) for primary actions"],
    donts: ["DM Serif in navigation or UI elements", "Gold for backgrounds or fills", "Mixing more than 2 type families", "Bright whites (use #F0F2F8 max)", "Any gradients"],
    accent: "#34D98A",
    bgCard: "#141820",
    bgBase: "#0A0C10",
    recommended: true,
  },
  {
    id: "03",
    label: "Option 3",
    name: "New Direction",
    tagline: "For the gallery owner. Editorial. Warm. Entirely different.",
    description: "A radical departure from dark-mode coaching conventions. Warm off-white as the base — like quality paper, like gallery walls. Deep forest green as the primary — the colour of old libraries, leather chairs, serious intention. Terracotta as the accent — human warmth, tactile, grounded. This is DreamCoach as a beautifully designed art journal meets precision coaching tool.",
    mood: "A beautifully designed journal from a Tokyo stationery shop. A gallery space with natural light. Craft and intention in every material choice. The kind of app a gallery owner would be proud to use.",
    refs: ["Aesop (retail) — restrained luxury, editorial typography, considered materials", "Are.na — archival, intellectual, anti-social-media aesthetic", "The Gentlewoman — editorial warmth, clean grids, confident white space"],
    palette: [
      { color: "#F5F0E8", name: "Cream", hex: "#F5F0E8" },
      { color: "#EDEAE0", name: "Paper", hex: "#EDEAE0" },
      { color: "#1B3A2A", name: "Forest", hex: "#1B3A2A" },
      { color: "#C4622D", name: "Terracotta", hex: "#C4622D" },
      { color: "#2C2C2C", name: "Ink", hex: "#2C2C2C" },
      { color: "#8A7F6E", name: "Stone", hex: "#8A7F6E" },
    ],
    typography: {
      headline: { font: "DM Serif Display (primary) / Inter 700 (UI)", sample: "You showed up today. That's not nothing." },
      body: { font: "Inter 400", sample: "Letting go isn't giving up. It's making room for what's next." },
      label: { font: "Inter 400 · Uppercase · 2px tracking", sample: "YOUR DREAM · DAY 47" },
    },
    dos: ["Cream/off-white as the primary surface", "Forest green for primary actions and headers", "Terracotta sparingly — emotional moments only", "DM Serif for headlines — this is where it earns its place", "Generous margins, editorial spacing"],
    donts: ["Dark backgrounds", "Bright greens or teals", "Heavy UI borders", "Dense card grids", "Any neon or high-saturation colours"],
    accent: "#1B3A2A",
    bgCard: "#EDEAE0",
    bgBase: "#F5F0E8",
    light: true,
  },
];

export default function Moodboard() {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-xl text-emerald">◆</span>
              <span className="font-semibold tracking-tight">DREAMCOACH</span>
            </Link>
            <span className="label text-muted hidden sm:block">· MOODBOARD</span>
          </div>
          <Link href="/" className="label text-muted hover:text-text transition-colors">← Proposal</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="label text-emerald mb-4">Design Directions · Three Options</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Where does<br />
            <span className="text-gradient-emerald">DreamCoach live?</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl leading-relaxed mb-4">
            Three distinct design directions for DreamCoach. Each is complete — palette, typography, tone, and guidelines. Each expresses a different truth about the product.
          </p>
          <p className="text-muted">Choose one. 3PR executes it at full production quality.</p>
        </FadeIn>
      </section>

      {/* Direction Cards */}
      {directions.map((dir, idx) => (
        <section key={dir.id} className={`py-20 px-6 border-t border-border ${idx === directions.length - 1 ? "border-b" : ""}`}>
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="label text-muted">{dir.label}</div>
                    {dir.recommended && (
                      <div className="bg-emerald/10 border border-emerald/30 rounded px-2 py-0.5">
                        <span className="text-xs text-emerald font-medium">3PR Recommendation</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">{dir.name}</h2>
                  <p className="text-muted mt-2 text-lg">{dir.tagline}</p>
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left: Description + Mood */}
              <FadeIn>
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-8">
                    <div className="label text-muted mb-4">Direction</div>
                    <p className="text-text leading-relaxed">{dir.description}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-8">
                    <div className="label text-muted mb-4">Mood</div>
                    <p className="text-teal italic leading-relaxed">&ldquo;{dir.mood}&rdquo;</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-8">
                    <div className="label text-muted mb-4">Feels Like</div>
                    <div className="space-y-3">
                      {dir.refs.map((r, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-muted">
                          <span className="text-muted/50 shrink-0 mt-0.5">{i + 1}.</span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Right: Live Preview */}
              <FadeIn delay={100}>
                <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
                  <div className="p-1 rounded-xl" style={{ background: dir.bgBase }}>
                    {/* Mock App Screen */}
                    <div className="rounded-lg p-6" style={{ background: dir.bgBase }}>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-xs font-mono tracking-widest mb-1" style={{ color: dir.light ? "#8A7F6E" : "#8B90A0" }}>DREAM COACH · DAY 47</div>
                          <div className="font-bold text-lg" style={{ color: dir.light ? "#2C2C2C" : "#F0F2F8" }}>
                            {dir.id === "03" ? (
                              <span style={{ fontFamily: "'DM Serif Display', serif" }}>Your dream is real.</span>
                            ) : "Your dream is real."}
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: dir.accent + "22", color: dir.accent }}>◆</div>
                      </div>

                      {/* Card */}
                      <div className="rounded-xl p-5 mb-4 border" style={{ background: dir.bgCard, borderColor: dir.light ? "#D6D0C2" : "#2A2F3D" }}>
                        <div className="text-xs tracking-widest font-medium mb-3" style={{ color: dir.light ? "#8A7F6E" : "#8B90A0" }}>WRITE A NOVEL</div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl font-black" style={{ color: dir.accent }}>47</div>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: dir.light ? "#2C2C2C" : "#F0F2F8" }}>Day streak</div>
                            <div className="text-xs" style={{ color: dir.light ? "#8A7F6E" : "#8B90A0" }}>1 grace day available</div>
                          </div>
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: dir.light ? "#5C5448" : "#8B90A0" }}>
                          "How did your dream show up for you today?"
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full py-3 rounded-lg font-semibold text-sm" style={{ background: dir.accent, color: dir.light ? "#FFFFFF" : "#0A0C10" }}>
                        Check In Today
                      </button>

                      {/* Team strip */}
                      <div className="mt-4 flex items-center gap-2">
                        {["DK", "AR", "LJ"].map((initials) => (
                          <div key={initials} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: dir.accent + "30", color: dir.accent }}>
                            {initials}
                          </div>
                        ))}
                        <div className="text-xs ml-1" style={{ color: dir.light ? "#8A7F6E" : "#8B90A0" }}>Dream Team · 3/5 checked in</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Palette + Typography + Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Palette */}
              <FadeIn>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-muted mb-5">Colour Palette</div>
                  <div className="grid grid-cols-3 gap-3">
                    {dir.palette.map((c) => (
                      <Swatch key={c.hex} color={c.color} name={c.name} hex={c.hex} />
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Typography */}
              <FadeIn delay={80}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-muted mb-5">Typography</div>
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs text-muted/60 mb-1">HEADLINE</div>
                      <div className="text-xs text-muted mb-2">{dir.typography.headline.font}</div>
                      <div className="text-lg font-black leading-tight" style={dir.id === "03" ? { fontFamily: "'DM Serif Display', serif", color: "#F0F2F8" } : {}}>
                        {dir.typography.headline.sample}
                      </div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="text-xs text-muted/60 mb-1">BODY</div>
                      <div className="text-xs text-muted mb-2">{dir.typography.body.font}</div>
                      <div className="text-sm text-muted leading-relaxed">{dir.typography.body.sample}</div>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="text-xs text-muted/60 mb-1">LABEL</div>
                      <div className="text-xs text-muted mb-2">{dir.typography.label.font}</div>
                      <div className="text-xs tracking-widest font-medium" style={{ color: dir.accent }}>{dir.typography.label.sample}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Guidelines */}
              <FadeIn delay={160}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="label text-muted mb-5">Brand Guidelines</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-medium text-emerald mb-2 tracking-wider">DO</div>
                      <ul className="space-y-1.5">
                        {dir.dos.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-muted">
                            <span className="text-emerald shrink-0">✓</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="text-xs font-medium text-red-400 mb-2 tracking-wider">DON&apos;T</div>
                      <ul className="space-y-1.5">
                        {dir.donts.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-muted">
                            <span className="text-red-400 shrink-0">×</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* Choose CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="label text-emerald mb-4">Make Your Choice</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Which direction is DreamCoach?</h2>
            <p className="text-muted text-lg mb-12 leading-relaxed">
              3PR&apos;s recommendation is Option 2 — Enhanced Current. It respects what David has built while elevating it into premium territory. The gold accents and DM Serif moments add emotional texture without abandoning the dark-first identity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {directions.map((d) => (
                <div key={d.id} className={`bg-card border rounded-xl p-6 text-left ${d.recommended ? "border-emerald/40" : "border-border"}`}>
                  <div className="label text-muted mb-2">{d.label}</div>
                  <div className="font-bold mb-2">{d.name}</div>
                  <div className="text-xs text-muted">{d.tagline}</div>
                  {d.recommended && <div className="mt-3 text-xs text-emerald">← 3PR Recommends</div>}
                </div>
              ))}
            </div>
            <Link href="/" className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg text-muted hover:text-text hover:border-emerald/50 transition-colors">
              ← Back to Proposal
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-emerald">◆</span>
            <span className="text-sm text-muted">DreamCoach Moodboard · 3PR · Confidential · 2026</span>
          </div>
          <span className="text-sm text-muted">Prepared for David King-Reubens</span>
        </div>
      </footer>
    </main>
  );
}
