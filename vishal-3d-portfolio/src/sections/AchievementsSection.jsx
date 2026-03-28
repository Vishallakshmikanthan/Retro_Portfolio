import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ─────────────────────────────────────────────── */
const timelineItems = [
  {
    year: "2026",
    title: "Impact AI India Buildathon",
    org: "GUVI × HCL",
    description: "Built an AI-Generated Voice Detection system using Python, FastAPI, and Scikit-learn to classify voice samples as AI or Human with high precision.",
    type: "hackathon",
    icon: "🎙️"
  },
  {
    year: "2026",
    title: "AI for Bharat Prompt Challenge",
    org: "AWS & Hack2skill",
    description: "Designed a prompt-driven system for 'The Multilingual Mandi', focusing on real-time negotiation mediation and fair price discovery in local Indian markets using Kiro.",
    type: "hackathon",
    icon: "🇮🇳"
  },
  {
    year: "2025",
    title: "Build for Billions Hackathon",
    org: "Team Smart Visionaries",
    description: "Participated in a 24-hour coding sprint focused on building scalable solutions using IndiaStack, exploring innovation in digital public infrastructure.",
    type: "hackathon",
    icon: "🧱"
  },
  { year: "2024", title: "IEEE Xtreme 18.0 & 19.0", org: "IEEE · Global Programming Competition", description: "Participated in one of the world's largest student programming marathons — a 24-hour competitive coding event hosted by IEEE, competing alongside thousands of teams globally.", type: "hackathon", icon: "⚡" },
  { year: "2025", title: "IBM SkillsBuild Hackathon", org: "IBM SkillsBuild — Finalist", description: "Reached the finalist stage of IBM's national hackathon, pitching an innovative tech solution through IBM's SkillsBuild programme.", type: "hackathon", icon: "🏆" },
  { year: "2025", title: "IdeaXchange", org: "IdeaXchange — Finalist", description: "Selected as a finalist for the IdeaXchange innovation challenge, showcasing problem-solving capabilities and ideation skills under competitive conditions.", type: "hackathon", icon: "💡" },
  { year: "2025", title: "Mumbai Hacks", org: "Mumbai Hacks — Finalist", description: "Reached the finalist round at Mumbai Hacks, one of India's leading student hackathons, competing with teams from top engineering institutions.", type: "hackathon", icon: "🚀" },
  { year: "2025", title: "Bharatiya Antariksh Hackathon", org: "Indian Space Research Organisation (ISRO)", description: "Participated in the ISRO-backed national space-tech hackathon, exploring innovative applications for India's space and satellite ecosystem.", type: "hackathon", icon: "🛰️" },
  { year: "2018-2024", title: "State-Level Boxing", org: "Tamil Nadu State Boxing Association", description: "Won Gold and Silver medals at state-level boxing championships, demonstrating elite athletic discipline, competitive drive, and mental fortitude.", type: "sport", icon: "🥊" },
  { year: "2020-2024", title: "District Football", org: "District Sports Board — Winner", description: "Led the team to a district championship victory in football, showcasing teamwork, strategy, and leadership under pressure.", type: "sport", icon: "⚽" },
  { year: "2018–2024", title: "Athletics Events", org: "School & District Athletics Meets", description: "Competed across multiple athletics disciplines — long-distance running, shot put, and discus — in district and inter-school competitions.", type: "sport", icon: "🏅" },
]

const CARD_W = 360
const CARD_GAP = 24

/* ─── Component ─────────────────────────────────────────── */
export default function AchievementsSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Wait one frame so layout is settled
    const id = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const travelX = -(track.scrollWidth - window.innerWidth + 200)

        gsap.to(track, {
          x: travelX,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.abs(travelX)}`,
            pin: true,
            pinSpacing: true,   // let GSAP add the spacer normally
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }, section)

      return () => ctx.revert()
    })

    return () => {
      cancelAnimationFrame(id)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section
      id="milestones"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",          // only on the section itself
        backgroundImage: "url(/images/achievements_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderTop: "2px solid white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ── Retro Title Bar (decorative) ── */}
      <div
        style={{
          width: "100%",
          background: "#000080",
          padding: "3px 2px 3px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'Courier New', monospace",
          fontWeight: "bold",
          color: "white",
          fontSize: "14px",
          height: "28px",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <span>EVENTS_AND_MILESTONES.LOG</span>
        <div style={{ display: "flex", gap: 2 }}>
          {["_", "□", "×"].map(l => (
            <button key={l} style={{ width: 18, height: 18, background: "#c0c0c0", border: "1px solid #000", fontSize: 10, fontWeight: "bold", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem", marginTop: "28px", zIndex: 2 }}>
        <div style={{ display: "inline-block", background: "rgba(0,0,0,0.55)", border: "2px solid rgba(255,255,255,0.25)", padding: "1.25rem 2rem" }}>
          <p style={{ color: "#fff", fontWeight: "bold", marginBottom: "0.4rem", fontFamily: "monospace", letterSpacing: "2px", fontSize: "0.75rem" }}>SYSTEM_LOG: EVENTS_AND_MILESTONES</p>
          <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
            EVENTS_MILESTONES.EXE
          </h2>
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#fff", fontFamily: "monospace", opacity: 0.8 }}>
            HORIZONTAL_SCROLL_MODE: HACKATHONS · EVENTS · MILESTONES
          </p>
        </div>
      </div>

      {/* ── Card Track Wrapper (forces start alignment) ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: CARD_GAP,
            paddingLeft: "max(6vw, 1.5rem)",
            paddingRight: "max(6vw, 1.5rem)",
            willChange: "transform",
            flexShrink: 0,
          }}
        >
          {timelineItems.map(({ year, title, org, description, type, icon }, i) => (
            <AchCard key={title} index={i} year={year} title={title} org={org} description={description} icon={icon} type={type} total={timelineItems.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Card ──────────────────────────────────────────────── */
function AchCard({ index, year, title, org, description, icon, type, total }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: CARD_W,
        background: "#e0e0e0",
        border: "2px solid #808080",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span style={{ background: "#000080", color: "#fff", padding: "2px 8px", fontSize: "0.7rem", fontFamily: "monospace", fontWeight: "bold", textTransform: "uppercase" }}>{type}</span>
        <span style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "monospace" }}>{year}</span>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "1.8rem" }}>{icon}</span>
        <h3 style={{ fontSize: "1rem", fontWeight: "bold", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{title}</h3>
      </div>
      <p style={{ color: "#000080", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "0.75rem", fontFamily: "monospace" }}>{org}</p>
      <p style={{ fontSize: "0.85rem", lineHeight: "1.6", fontFamily: "monospace" }}>{description}</p>
      <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", fontSize: "0.65rem", opacity: 0.5, fontFamily: "monospace" }}>
        {index + 1} / {total}
      </div>
    </div>
  )
}