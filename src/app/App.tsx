import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import elevationLogo from "@/imports/Elevation-Logo-Main.png";
import { Menu, X, ArrowRight, Lock, ChevronRight, ArrowUpRight, Zap, Shield, Activity, Users } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";

// ─── helpers ──────────────────────────────────────────────────────────────────
const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const IMGS = {
  surgeryWide:  UNSPLASH("photo-1514416309827-bfb0cf433a2d", 1400, 600),
  surgeonA:     UNSPLASH("photo-1640876777002-badf6aee5bcc", 400, 300),
  surgeonB:     UNSPLASH("photo-1639154968821-6dbc3efb8d23", 400, 300),
  doctorTablet: UNSPLASH("photo-1582750433449-648ed127bb54", 700, 840),
  doctorPortal: "https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568508/akram-huseyn-brbF5FSnSgI-unsplash_uigy0k.jpg",
  biomedical:   UNSPLASH("photo-1614935151651-0bea6508db6b", 700, 500),
};

const outfit: React.CSSProperties = { fontFamily: "'Outfit', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

// ─── Nav ──────────────────────────────────────────────────────────────────────
// Fixed nav — only visible after scrolling past the hero
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Home", "Products", "About", "Distributors"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(15,23,42,0.07)",
        transform: scrolled ? "translateY(0)" : "translateY(-100%)",
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">
        <a href="#" className="shrink-0">
          <ImageWithFallback src={elevationLogo} alt="Elevation Spine" className="h-7 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href="#" className="transition-colors duration-200 hover:text-foreground text-sm"
              style={{ ...inter, color: "rgba(15,23,42,0.6)" }}>{l}</a>
          ))}
        </nav>
        <a href="#" className="hidden md:inline-flex items-center rounded-full px-5 py-2 text-sm text-white transition-all duration-200 hover:opacity-90"
          style={{ ...inter, background: "#0F172A" }}>
          Get in touch
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-border px-8 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-foreground/70" style={inter}>{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_PILLS = [
  { icon: <Zap size={12} />, text: "SABER-C™ system" },
  { icon: <Shield size={12} />, text: "FDA 510(k) cleared" },
  { icon: <Activity size={12} />, text: "Zero-profile design" },
];

function Hero() {
  return (
    <section className="relative flex overflow-hidden bg-white" style={{ height: "100dvh", minHeight: 600 }}>
      {/* ── Scroll-dot keyframe ── */}
      <style>{`
        @keyframes scrollDot {
          0%,100% { transform: translateY(0); opacity: 0.9; }
          50%      { transform: translateY(9px); opacity: 0.2; }
        }
      `}</style>

      {/* ══ LEFT PANEL: logo + hero copy ══════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col justify-between bg-white px-10 py-8 lg:px-14 lg:py-10"
        style={{ width: "42%", minWidth: 340, flexShrink: 0 }}>

        {/* Logo */}
        <div>
          <ImageWithFallback
            src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183221/Elevation-Logo-Main_bnnwsd.png"
            alt="Elevation Spine"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Hero content — vertically centered */}
        <div className="flex flex-col gap-6">
          {/* Badge row */}
          <div className="flex items-center gap-2.5">
            <span className="block h-px w-6 flex-shrink-0" style={{ background: "#3B7FE8" }} />
            <span className="text-xs font-medium" style={{ ...inter, color: "#3B7FE8" }}>
              Medical device · FDA cleared
            </span>
            <span className="block h-px w-6 flex-shrink-0" style={{ background: "#3B7FE8" }} />
          </div>

          {/* Heading */}
          <h1 className="font-bold text-foreground leading-[1.0]"
            style={{ ...outfit, fontWeight: 700, fontSize: "clamp(2.6rem, 4.5vw, 4.4rem)" }}>
            Spinal fusion,<br />redefined.
          </h1>

          {/* Body */}
          <p className="text-sm leading-relaxed" style={{ ...inter, color: "#64748B", maxWidth: 340 }}>
            Personalized spinal fusion technology designed to improve outcomes, restore mobility, and support recovery with professional-grade instrumentation.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3 pt-1">
            <a href="#"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md"
              style={{ ...inter, background: "#0F172A" }}>
              Book a consultation
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <ArrowRight size={12} />
              </span>
            </a>
          </div>
        </div>

        {/* Mouse scroll indicator */}
        <div className="flex flex-col items-center gap-2 self-center">
          <div style={{
            width: 26, height: 40, borderRadius: 13,
            border: "2px solid rgba(15,23,42,0.22)",
            display: "flex", justifyContent: "center", paddingTop: 8,
          }}>
            <div style={{
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(15,23,42,0.45)",
              animation: "scrollDot 1.7s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      {/* ══ RIGHT PANEL: nav + photo + floats ════════════════════════════════ */}
      <div className="relative flex flex-col flex-1 py-6 px-8 overflow-hidden"
        style={{
          background: "#EFF4FB",
          borderRadius: "2.8rem 0 0 2.8rem",
          marginLeft: -1, /* slight overlap to hide seam */
        }}>

        {/* In-hero navigation */}
        <nav className="flex items-center justify-end gap-7 mb-5 flex-shrink-0">
          {["Home", "Products", "About", "Distributors"].map((l) => (
            <a key={l} href="#"
              className="text-sm transition-colors duration-200 hover:text-foreground hidden md:block"
              style={{ ...inter, color: "rgba(15,23,42,0.55)" }}>
              {l}
            </a>
          ))}
          <a href="#"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
            style={{ ...inter, background: "#0F172A" }}>
            Get in touch
          </a>
        </nav>

        {/* Photo/Video container — fills remaining height */}
        <div className="relative flex-1 rounded-3xl overflow-hidden min-h-0">
          <video
            src="https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4"
            className="w-full h-full object-cover object-top"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Dark overlay gradient at bottom */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(7,8,12,0.35) 0%, transparent 50%)" }} />

          {/* ── Floating pills — right side ── */}
          <div className="absolute right-5 top-1/4 flex flex-col gap-3">
            {HERO_PILLS.map((pill, i) => (
              <div key={i}
                className="flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg"
                style={{
                  background: "rgba(7,8,12,0.82)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  animationDelay: `${i * 0.12}s`,
                }}>
                <span className="flex-shrink-0" style={{ color: "#3B7FE8" }}>{pill.icon}</span>
                <span className="text-xs font-medium text-white whitespace-nowrap" style={inter}>
                  {pill.text}
                </span>
              </div>
            ))}
          </div>

          {/* ── Bottom floating card ── */}
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
            style={{ background: "rgba(255,255,255,0.94)", backdropFilter: "blur(12px)" }}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-100 flex-shrink-0">
              <img src={IMGS.surgeonB} alt="Surgeon" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground" style={inter}>48+ Happy Surgeons</div>
              <div className="text-[10px]" style={{ ...inter, color: "#64748B" }}>Top Rated Care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Animated word reveal ─────────────────────────────────────────────────────
// Words that should render in accent blue (matched by position in full word list)
const BLUE_WORDS = new Set(["fusion,", "stability,", "and", "recovery"]);

function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when top of element is at 85% of screen, 1 when top is at 10%
      const p = (vh * 0.85 - top) / (height + vh * 0.45);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className="font-semibold leading-tight mb-12 max-w-3xl"
      style={{ ...outfit, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 600 }}
    >
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        const raw =
          progress <= wordStart
            ? 0
            : progress >= wordEnd
            ? 1
            : (progress - wordStart) / (wordEnd - wordStart);
        const opacity = 0.2 + raw * 0.8;
        const isBlue = BLUE_WORDS.has(word);

        return (
          <span
            key={i}
            style={{
              opacity,
              color: isBlue ? "#3B7FE8" : undefined,
              display: "inline",
              transition: "opacity 0.05s linear",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </h2>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-3">
          <span className="text-xs font-medium" style={{ ...inter, color: "#64748B" }}>
            About us
          </span>
        </div>

        <AnimatedHeading text="Professional spine specialists working together to enable better fusion, stability, and recovery" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            {
              stat: "1200+",
              label: "Surgeries",
              desc: "Documented procedures using Saber implant technology across partner institutions.",
              dark: false,
            },
            {
              stat: "40+",
              label: "Hospitals",
              desc: "Active hospital and ASC accounts supported by our distributor network.",
              dark: false,
            },
            {
              stat: "98%",
              label: "Compliance",
              desc: "Surgeon-reported satisfaction with workflow and instrumentation design.",
              dark: true,
            },
          ].map(({ stat, label, desc, dark }) => (
            <div
              key={label}
              className="rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: dark ? "#0F172A" : "#F4F8FF",
                border: dark ? "none" : "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <div
                className="text-4xl font-bold mb-1"
                style={{ ...outfit, color: dark ? "#fff" : "#0F172A" }}
              >
                {stat}
              </div>
              <div className="text-sm font-semibold mb-2" style={{ ...inter, color: dark ? "rgba(255,255,255,0.7)" : "#3B7FE8" }}>
                {label}
              </div>
              <p className="text-sm leading-relaxed" style={{ ...inter, color: dark ? "rgba(255,255,255,0.55)" : "#64748B" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ height: 420 }}>
          <ImageWithFallback
            src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783558935/El_Spine_products-7_s0qshq.jpg"
            alt="Spine surgery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Stacked scroll cards ──────────────────────────────────────────────────────
const STACKED_CARDS = [
  {
    label: "Available now",
    title: "SABER-C™",
    body: "Integrated cervical interbody fusion system designed for maximum stability with minimal anatomic disruption.",
    right: "grid",
    gridItems: [
      { top: "85%", bot: "Porosity" },
      { top: "1-Step", bot: "Insertion" },
      { top: "Zero", bot: "Profile" },
      { top: "FDA", bot: "Cleared" },
    ],
  },
  {
    label: "Clinical advantage",
    title: "85% porosity",
    body: "Optimized bone ingrowth scaffold for long-term fusion stability and osseointegration performance.",
    right: "porosity",
  },
  {
    label: "Surgical workflow",
    title: "Single-step in-line",
    body: "Eliminates multi-stage deployment. Fewer tool changes mean reduced fluoroscopy and less operative time.",
    right: "benefits",
    benefits: [
      { icon: "⚡", text: "Reduced OR time" },
      { icon: "🛡", text: "Immediate stability" },
      { icon: "🔬", text: "Lower radiation exposure" },
    ],
  },
  {
    label: "Pipeline development",
    title: "SABER-XA™",
    body: "Next-generation lateral access fixation undergoing final validation and clinical advisory review.",
    right: "status",
  },
];

const N_CARDS = STACKED_CARDS.length;
const CARD_DECK_OFFSET = 13; // px vertical stacking offset per card

function StackedCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / totalScroll)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    // Section height: (N-1) viewports for cards 1-3 to slide in + ~0.4 viewport hold, then exit
    <section
      ref={sectionRef}
      style={{ height: `${N_CARDS * 75}vh`, background: "#030812" }}
      id="products"
    >
      {/* Sticky viewport — stays pinned while cards stack */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div className="max-w-6xl mx-auto px-8 h-full flex flex-col">

          {/* Static title — never moves */}
          <div className="pt-16 pb-8 flex-shrink-0">
            <span className="text-xs font-medium" style={{ ...inter, color: "rgba(255,255,255,0.4)" }}>
              Product platform
            </span>
            <h2
              className="text-white font-bold mt-2"
              style={{ ...outfit, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700 }}
            >
              The Saber technology platform
            </h2>
          </div>

          {/* Cards stacking area */}
          <div className="relative flex-1">
            {STACKED_CARDS.map((card, i) => {
              // Card 0 is pre-placed. Cards 1–(N-1) animate during progress 0→ANIM_END.
              // The remaining scroll (ANIM_END→1) is a hold where the full deck stays visible.
              const ANIM_END = (N_CARDS - 1) / N_CARDS; // 0.75 for 4 cards
              const animProgress = Math.min(progress, ANIM_END) / ANIM_END; // 0→1 within anim phase
              const slideIn = i === 0
                ? 1
                : Math.max(0, Math.min(1, animProgress * (N_CARDS - 1) - (i - 1)));
              const ty = (1 - slideIn) * 100;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: i * CARD_DECK_OFFSET,
                    left: 0,
                    right: 0,
                    transform: `translateY(${ty}vh)`,
                    zIndex: i + 1,
                    background: "#0B1D35",
                    border: "1px solid rgba(59,127,232,0.28)",
                    borderRadius: 28,
                    padding: "36px 40px",
                    boxShadow: "0 16px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,127,232,0.08)",
                  }}
                >
                  <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Left */}
                    <div className="flex-1">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-medium mb-4"
                        style={{ background: "rgba(59,127,232,0.15)", color: "#3B7FE8", ...inter }}
                      >
                        {card.label}
                      </span>
                      <h3
                        className="font-bold text-white mb-3"
                        style={{ ...outfit, fontSize: "clamp(1.7rem,2.8vw,2.6rem)", fontWeight: 700, lineHeight: 1.05 }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6" style={{ ...inter, color: "rgba(255,255,255,0.6)" }}>
                        {card.body}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Interbody fusion", "Cervical", "Minimally invasive"].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 text-xs"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", ...inter }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="lg:w-[42%] flex-shrink-0">
                      {card.right === "grid" && (
                        <div className="grid grid-cols-2 gap-3">
                          {card.gridItems!.map((item, j) => (
                            <div
                              key={j}
                              className="rounded-2xl p-5 text-center"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <div className="text-2xl font-bold text-white mb-1" style={outfit}>{item.top}</div>
                              <div className="text-xs" style={{ ...inter, color: "rgba(255,255,255,0.5)" }}>{item.bot}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.right === "porosity" && (
                        <div
                          className="rounded-2xl p-8 text-center"
                          style={{ background: "rgba(59,127,232,0.1)", border: "1px solid rgba(59,127,232,0.3)" }}
                        >
                          <div
                            className="font-bold mb-3"
                            style={{ ...outfit, fontSize: "5rem", color: "#3B7FE8", lineHeight: 1, textShadow: "0 0 40px rgba(59,127,232,0.5)" }}
                          >
                            85%
                          </div>
                          <div className="text-sm mb-4" style={{ ...inter, color: "rgba(255,255,255,0.5)" }}>
                            Open porosity for bone ingrowth
                          </div>
                          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <div className="h-2 rounded-full" style={{ width: "85%", background: "#3B7FE8" }} />
                          </div>
                        </div>
                      )}

                      {card.right === "benefits" && card.benefits && (
                        <div className="flex flex-col gap-3">
                          {card.benefits.map((b, j) => (
                            <div
                              key={j}
                              className="rounded-2xl px-5 py-4 flex items-center gap-4"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <span className="text-xl">{b.icon}</span>
                              <span className="text-sm font-medium text-white" style={inter}>{b.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {card.right === "status" && (
                        <div
                          className="rounded-2xl p-6"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <div className="text-xs mb-4" style={{ ...inter, color: "rgba(255,255,255,0.4)" }}>
                            Development status
                          </div>
                          <div className="flex flex-col gap-3">
                            {[
                              { label: "Design validation", done: true },
                              { label: "Cadaveric study", done: true },
                              { label: "Clinical advisory review", done: false },
                              { label: "Commercial launch", done: false },
                            ].map((step, j) => (
                              <div key={j} className="flex items-center gap-3">
                                <div
                                  className="w-4 h-4 rounded-full flex-shrink-0"
                                  style={{ background: step.done ? "#3B7FE8" : "rgba(255,255,255,0.1)" }}
                                />
                                <span
                                  className="text-sm"
                                  style={{ ...inter, color: step.done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
                                >
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 text-xs italic" style={{ ...inter, color: "rgba(255,255,255,0.35)" }}>
                            "Expected Q4 commercial availability pending final review."
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Clinical features grid ───────────────────────────────────────────────────
const FEATURES = [
  { Icon: Zap, title: "Reduced fluoroscopy", desc: "Fewer tool changes decrease radiation exposure for team and patient." },
  { Icon: Shield, title: "Immediate stability", desc: "Divergent screw paths provide rigid fixation without supplemental plating." },
  { Icon: Activity, title: "Streamlined OR time", desc: "Single-pass deployment eliminates secondary instrumentation steps." },
  { Icon: Users, title: "Surgeon-first design", desc: "Low-profile instrumentation designed for minimally invasive approaches." },
  { Icon: ArrowUpRight, title: "Scalable distribution", desc: "Strategic territory rights with dedicated training and support." },
  { Icon: Lock, title: "Clinical data access", desc: "Secure portal with IFU library, technique animations, and biomechanical data." },
];

function FeaturesGrid() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-3">
          <span className="text-xs font-medium" style={{ ...inter, color: "#64748B" }}>
            Clinical features
          </span>
        </div>
        <h2
          className="font-bold mb-12 max-w-xl"
          style={{ ...outfit, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700 }}
        >
          Built for the demands of modern spine surgery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
              style={{ background: "#F4F8FF" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(59,127,232,0.1)" }}
              >
                <Icon size={18} style={{ color: "#3B7FE8" }} />
              </div>
              <h3 className="font-semibold text-foreground mb-2" style={{ ...outfit, fontSize: "1.05rem" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ ...inter, color: "#64748B" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow timeline ─────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Prepare access corridor", desc: "Establish standard lateral or anterior approach with retractor system in place.", side: "left" },
  { n: "02", title: "Single-step insertion", desc: "Advance the SABER-C implant and integrated screw system in one smooth pass.", side: "right" },
  { n: "03", title: "In-line fixation", desc: "Screws deploy divergently within the implant body — no secondary plating required.", side: "left" },
  { n: "04", title: "Incision closure", desc: "Remove retractor and proceed with standard layered closure. Reduced operative time.", side: "right" },
];

function Workflow() {
  return (
    <section className="py-24" style={{ background: "#07080C" }} id="workflow">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-3">
          <span className="text-xs font-medium" style={{ ...inter, color: "rgba(255,255,255,0.35)" }}>
            Surgical process
          </span>
        </div>
        <h2
          className="text-white font-bold mb-16"
          style={{ ...outfit, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700 }}
        >
          The Saber surgical workflow
        </h2>

        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: "rgba(59,127,232,0.25)" }}
          />

          <div className="flex flex-col gap-12">
            {STEPS.map(({ n, title, desc, side }) => (
              <div key={n} className={`flex items-center gap-8 ${side === "right" ? "flex-row-reverse" : ""}`}>
                <div className="flex-1 hidden lg:block" />

                {/* Number circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10 hidden lg:flex"
                  style={{ background: "#3B7FE8", ...inter }}
                >
                  {n}
                </div>

                <div
                  className="flex-1 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mb-4 lg:hidden"
                    style={{ background: "#3B7FE8", ...inter }}
                  >
                    {n}
                  </div>
                  <h3 className="font-semibold text-white mb-2" style={{ ...outfit, fontSize: "1.05rem" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ ...inter, color: "rgba(255,255,255,0.5)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Distributors + Portal ────────────────────────────────────────────────────
function Distributors() {
  return (
    <section className="py-24 bg-white" id="distributors">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <span className="text-xs font-medium" style={{ ...inter, color: "#64748B" }}>
              Distribution network
            </span>
            <h2
              className="font-bold mt-3 mb-6"
              style={{ ...outfit, fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700 }}
            >
              Ready to scale?
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ ...inter, color: "#64748B" }}>
              We partner with independent spine distributors and regional reps to bring Saber technology to surgeons in their territory. We provide full clinical training and commercial support.
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {[
                "Exclusive or co-exclusive territory rights available",
                "Dedicated clinical education and cadaveric lab access",
                "Surgeon-facing portal with IFU library and technique videos",
                "Competitive commission structure with milestone incentives",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ ...inter, color: "#64748B" }}>
                  <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#3B7FE8" }} />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ ...inter, background: "#0F172A" }}
            >
              Inquire about distribution <ArrowRight size={15} />
            </a>
          </div>

          {/* Portal card */}
          <div
            className="rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ background: "#F4F8FF" }}
          >
            <div className="overflow-hidden h-56">
              <ImageWithFallback
                src={IMGS.doctorPortal}
                alt="Distributor portal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={14} style={{ color: "#3B7FE8" }} />
                <span className="text-xs font-medium" style={{ ...inter, color: "#3B7FE8" }}>
                  Secure portal
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2" style={{ ...outfit, fontSize: "1.05rem" }}>
                Distributor login
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ ...inter, color: "#64748B" }}>
                Access IFU documents, technique animations, biomechanical data, and territory performance dashboards.
              </p>
              <a
                href="#"
                className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ ...inter, background: "#0F172A" }}
              >
                Sign in to portal <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="py-24" style={{ background: "#F4F8FF" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-medium tracking-wide mb-6 block" style={{ ...inter, color: "#64748B" }}>
              Surgeon testimonial
            </span>
            <blockquote
              className="font-semibold leading-snug mb-8"
              style={{ ...outfit, fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#0F172A" }}
            >
              "The single-step insertion of SABER-C genuinely changed our cervical workflow. We're closing 20 minutes faster on average."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-card border border-border">
                <ImageWithFallback
                  src={IMGS.surgeonA}
                  alt="Dr. Marcus Reid"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground" style={inter}>Dr. Marcus Reid</div>
                <div className="text-xs" style={{ ...inter, color: "#64748B" }}>Spine surgeon, Midwest Neurosurgical Group</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ height: 380 }}>
            <ImageWithFallback
              src={IMGS.biomedical}
              alt="Biomedical research"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-16 border-t border-border bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <ImageWithFallback
              src={elevationLogo}
              alt="Elevation Spine"
              className="h-6 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed max-w-xs" style={{ ...inter, color: "#64748B" }}>
              Elevation Spine is a medical device company commercializing the Saber interbody fusion platform through a network of independent distributors.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold mb-4" style={{ ...inter, color: "#0F172A" }}>
              Company
            </div>
            {["About", "Distributors", "Careers", "Contact"].map((l) => (
              <a key={l} href="#" className="block text-sm mb-2 transition-colors duration-200 hover:text-foreground" style={{ ...inter, color: "#64748B" }}>
                {l}
              </a>
            ))}
          </div>

          <div>
            <div className="text-xs font-semibold mb-4" style={{ ...inter, color: "#0F172A" }}>
              Resources
            </div>
            {["IFU library", "Technique guides", "Surgeon portal", "Clinical data"].map((l) => (
              <a key={l} href="#" className="block text-sm mb-2 transition-colors duration-200 hover:text-foreground" style={{ ...inter, color: "#64748B" }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ ...inter, color: "#64748B" }}>
            © {new Date().getFullYear()} Elevation Spine Inc. All rights reserved.
          </p>
          <p className="text-xs" style={{ ...inter, color: "#64748B" }}>
            SABER-C™ is FDA cleared. Rx only. For IFU and prescribing information contact your representative.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-white text-foreground min-h-screen" style={inter}>
      <Nav />
      <Hero />
      <About />
      <StackedCards />
      <FeaturesGrid />
      <Workflow />
      <Distributors />
      <Testimonial />
      <Footer />
    </div>
  );
}
