import { useEffect, useRef } from "react"
import gsap from "gsap"
import RetroButton from "../components/RetroButton"
import MediaPlayerFrame from "../components/MediaPlayerFrame"
import DesktopIcon from "../components/DesktopIcon"

export default function HeroSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

    tl.fromTo(left, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 })
      .fromTo(right, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.4")

    return () => tl.kill()
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" })
  }

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="hero-section h-screen relative flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: 'url("/wallpaper.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Icons - Top Horizontal Layout */}
      <div 
        className="desktop-icons-top absolute left-10 top-24 z-40 flex flex-row gap-8"
      >
        <DesktopIcon 
          icon="/icons/profile.png" 
          label="Profile.sys" 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
        />
        <DesktopIcon 
          icon="/icons/projects.png" 
          label="Projects.exe" 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
        />
        <DesktopIcon 
          icon="/icons/skills.png" 
          label="Skills.dll" 
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} 
        />
        <DesktopIcon 
          icon="/icons/contact.png" 
          label="Contact.msg" 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
        />
        <DesktopIcon 
          icon="/icons/resume.png" 
          label="Resume.pdf" 
          onClick={() => window.open(`/resume.pdf?v=${Date.now()}`, '_blank')} 
        />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 pt-20">
        
        {/* Left Column: Content */}
        <div ref={leftRef} className="flex flex-col space-y-8">
          <div>
            <p className="retro-overline mb-2" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px' }}>
              SYSTEM_INFO: BE COMPUTER SCIENCE · SAIRAM
            </p>
            <h1 className="text-5xl md:text-7xl font-black retro-heading">
              VISHAL<br />
              <span style={{ color: 'var(--primary)' }}>LAKSHMIKANTHAN</span>
            </h1>
          </div>

          <p className="text-lg text-black leading-relaxed" style={{ fontFamily: 'monospace' }}>
            ENGINEERING CIVIC-TECH SOLUTIONS AND COMPETITIVE SYSTEMS — 
            HACKATHON FINALIST, STATE-LEVEL ATHLETE, CGPA 9.13.
          </p>

          <div className="flex flex-wrap gap-4">
            <RetroButton onClick={scrollToProjects} className="px-8">
              EXPLORE_WORK.EXE
            </RetroButton>
            <RetroButton href={`/resume.pdf?v=${Date.now()}`} download className="px-8">
              RESUME.PDF
            </RetroButton>
          </div>

          <div className="flex flex-wrap gap-2">
            {["IEEE Xtreme 18 & 19", "IBM SkillsBuild Finalist", "State-Level Boxer 🥊"].map((badge) => (
              <span
                key={badge}
                className="skill-badge"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Frame */}
        <div ref={rightRef} className="flex justify-center items-center">
            <MediaPlayerFrame />
        </div>

      </div>

    </section>
  )
}