import { useRef } from "react"
import ScanOverlay from "../components/ScanOverlay"
import RevealOnScroll from "../components/RevealOnScroll"

const highlights = [
  { icon: "🎓", label: "BE Computer Science Engineering", sub: "Sri Sairam Engineering College · CGPA 9.13 · 2024–2028" },
  { icon: "🏆", label: "Hackathon Finalist", sub: "IEEE Xtreme · IBM SkillsBuild · MumbaiHacks · IdeaXchange" },
  { icon: "🥊", label: "State-Level Athlete", sub: "Gold & Silver Boxer · District Football · Athletics" },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative"
      style={{
        backgroundImage: "url(/images/about_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 85%",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "5rem 1rem",
        borderTop: "2px solid white",
      }}
    >
      <ScanOverlay />
      
      <div
        className="about-grid section-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "start",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* LEFT: Text content */}
        <div className="about-text-col">
          <RevealOnScroll delay={0}>
            <p className="retro-overline mb-2" style={{ color: "var(--primary)", fontWeight: "bold" }}>
              USER_PROFILE: 001
            </p>
            <h2 className="text-5xl font-black retro-heading mb-8">
              VISHAL LAKSHMIKANTHAN
            </h2>
          </RevealOnScroll>

          <div className="space-y-6 text-black font-mono relative">
            <RevealOnScroll delay={0.1}>
              <p className="about-bio bg-white/80 p-2 border-l-4 border-blue-600">
                I'm a first-year Computer Science undergraduate at{" "}
                <strong>Sri Sairam Engineering College</strong>, Chennai,
                pursuing my BE with a CGPA of <strong>9.13</strong>. I build
                systems that solve real civic and everyday problems.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="about-bio bg-white/80 p-2 border-l-4 border-blue-600">
                My approach is discipline-first: the same focus that earns me
                medals on the boxing ring drives how I approach code —
                structured, persistent, and always iterating.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p className="about-bio italic opacity-70 bg-white/60 p-2">
                When I'm not building, I'm on the field — district football
                champion, state-level boxer, and track athlete.
              </p>
            </RevealOnScroll>

            <div className="absolute -top-12 -left-8 text-6xl text-white opacity-20 font-serif">""</div>
          </div>
        </div>

        {/* RIGHT: Profile window + education + achievements stacked */}
        <div
          className="about-highlights-col"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {/* ── PROFILE WINDOW ── */}
          <RevealOnScroll delay={0.1}>
            <div className="relative group" style={{ width: "100%", maxWidth: "340px" }}>
              <div className="bg-[#c0c0c0] border-2 border-white border-b-black border-r-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider">IDENTITY_SCANNER.EXE</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-[#c0c0c0] border border-black text-[8px] flex items-center justify-center text-black">_</div>
                    <div className="w-3 h-3 bg-[#c0c0c0] border border-black text-[8px] flex items-center justify-center text-black">×</div>
                  </div>
                </div>

                <div className="relative bg-black transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden">
                  <img
                    src="/images/profile_photo.jpg"
                    alt="Vishal"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-[#00ff00] text-black text-[10px] font-bold px-3 py-1 shadow-md z-30">
                SCAN COMPLETE: 100%
              </div>
            </div>
          </RevealOnScroll>

          {/* Education + Achievements stacked */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", marginTop: "1.5rem" }}>
            {highlights.map(({ icon, label, sub }, idx) => (
              <RevealOnScroll key={label} delay={0.2 + idx * 0.1}>
                <div className="retro-card about-highlight p-4 border-2 border-gray-dark bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e0e0e0] transition-colors duration-200">
                  <div className="flex gap-3 items-center">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <p className="font-bold text-blue-900 uppercase text-sm">{label}</p>
                      <p className="text-gray-600 text-xs mt-1">{sub}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}

            {/* Decorative code block */}
            <RevealOnScroll delay={0.6}>
              <div className="p-4 border-2 border-gray-dark bg-black text-green-500 font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <pre>{`const vishal = {\n  college: "Sairam Engg",\n  cgpa: 9.13,\n  sport: "Boxing 🥊",\n  status: "Coding..."\n}`}</pre>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}