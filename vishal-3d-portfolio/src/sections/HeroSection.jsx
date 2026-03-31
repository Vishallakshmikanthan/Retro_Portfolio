import { useRef } from "react"
import RetroButton from "../components/RetroButton"
import DesktopIcon from "../components/DesktopIcon"

export default function HeroSection() {
  const sectionRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-desktop"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image with filters */}
      <img 
        src="/wallpaper.png" 
        alt="Windows XP Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "contrast(0.9) brightness(0.9)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      
      {/* Scanline Overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%)",
          backgroundSize: "100% 4px",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* Content wrapper */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        
        {/* TOP LEFT ROW: DESKTOP ICONS */}
        <div
          className="icons-row"
          style={{
            position: "absolute",
            top: "80px",
            left: "40px",
            display: "flex",
            gap: "28px",
          }}
        >
          <DesktopIcon index={0} icon="/icons/profile.png" label="Profile.sys" windowTitle="User_Profile.sys" onClick={() => scrollTo("about")} />
          <DesktopIcon index={1} icon="/icons/projects.png" label="Projects.exe" windowTitle="Projects.exe" onClick={() => scrollTo("projects")} />
          <DesktopIcon index={2} icon="/icons/skills.png" label="Skills.dll" windowTitle="System.Skills" onClick={() => scrollTo("skills")} />
          <DesktopIcon index={3} icon="/icons/contact.png" label="Contact.msg" windowTitle="Contact_User.msg" onClick={() => scrollTo("contact")} />
          <DesktopIcon index={4} icon="/icons/resume.png" label="Resume.pdf" onClick={() => window.open(`/resume.pdf?v=${Date.now()}`, "_blank")} />
        </div>

        {/* LEFT SIDE TEXT BLOCK (NOT A WINDOW) */}
        <div
          className="hero-text"
          style={{
            position: "absolute",
            top: "180px",
            left: "60px",
            maxWidth: "600px",
          }}
        >
          {/* SMALL SYSTEM LABEL */}
          <p style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "12px",
            color: "#000080",
            letterSpacing: "1px",
            marginBottom: "16px",
            textShadow: "1px 1px 0px rgba(255,255,255,0.8)",
          }}>
            SYSTEM_INFO: BE COMPUTER SCIENCE · SAIRAM
          </p>

          {/* NAME */}
          <h1 style={{
            fontFamily: "'Courier New', monospace",
            fontWeight: 900,
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            lineHeight: 1.1,
            color: "#000080",
            textTransform: "uppercase",
            marginBottom: "16px",
            textShadow: "2px 2px 0px rgba(255,255,255,0.8)",
          }}>
            VISHAL<br/>
            LAKSHMIKANTHAN
          </h1>
          
          <div style={{ height: "3px", background: "#000080", width: "100%", marginBottom: "24px" }} />

          {/* TAGLINE */}
          <p style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#000",
            marginBottom: "32px",
            maxWidth: "520px",
            fontWeight: "bold",
            textShadow: "1px 1px 0px rgba(255,255,255,0.7)",
          }}>
            ENGINEERING CIVIC-TECH SOLUTIONS AND COMPETITIVE SYSTEMS — 
            HACKATHON FINALIST, STATE-LEVEL ATHLETE, CGPA 9.13.
          </p>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
            <RetroButton onClick={() => scrollTo("projects")} className="px-6 py-2 text-sm" hoverLabel="EXECUTE.EXE">
              EXPLORE_WORK.EXE
            </RetroButton>
            <RetroButton href={`/resume.pdf?v=${Date.now()}`} download className="px-6 py-2 text-sm" hoverLabel="OPEN_FILE.PDF" onClickLabel="Opening RESUME.PDF...">
              RESUME.PDF
            </RetroButton>
          </div>

          {/* BADGES */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["IEEE Xtreme 18 & 19", "IBM SkillsBuild Finalist", "State-Level Boxer 🥊"].map((badge) => (
              <span key={badge} style={{
                background: "#c0c0c0",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                padding: "4px 8px",
                fontSize: "10px",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "#000"
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* COMPOSITED IMAGE LAYER (RIGHT SIDE) — no frame, no container */}
        <style>{`
          @keyframes heroFloat {
            from { transform: translateY(-50%) translateY(0px); }
            to   { transform: translateY(-50%) translateY(-6px); }
          }
        `}</style>
        <img
          src="/images/hero_composition.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "520px",
            width: "44vw",
            height: "auto",
            objectFit: "contain",
            /* Soft radial fade — no hard edges */
            maskImage: [
              "radial-gradient(ellipse 85% 80% at 55% 50%, black 45%, transparent 100%)",
              "linear-gradient(to left, transparent 0%, black 18%, black 82%, transparent 100%)",
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)"
            ].join(", "),
            WebkitMaskImage: [
              "radial-gradient(ellipse 85% 80% at 55% 50%, black 45%, transparent 100%)",
              "linear-gradient(to left, transparent 0%, black 18%, black 82%, transparent 100%)",
              "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)"
            ].join(", "),
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            /* Colour & depth matching to XP sky/grass palette */
            filter: [
              "brightness(1.05)",
              "contrast(0.88)",
              "saturate(1.1)",
              "drop-shadow(0 12px 28px rgba(0,0,0,0.22))",
              "blur(0.4px)"
            ].join(" "),
            /* Subtle float */
            animation: "heroFloat 4s ease-in-out infinite alternate",
            zIndex: 5,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* SYSTEM METADATA */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          right: "40px",
          fontFamily: "monospace",
          fontSize: "10px",
          color: "#000",
          opacity: 0.6,
          textAlign: "right",
          pointerEvents: "none",
          userSelect: "none"
        }}>
          SYS_STATUS: OPTIMAL<br/>
          MEMORY_ADDR: 0x00FF<br/>
          BUILD_VERSION: 1.0.42
        </div>

      </div>
    </section>
  )
}