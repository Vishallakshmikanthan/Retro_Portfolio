import { useEffect, useRef } from "react"
import gsap from "gsap"

const highlights = [
  { icon: "🎓", label: "BE Computer Science Engineering", sub: "Sri Sairam Engineering College · CGPA 9.13 · 2024–2028" },
  { icon: "🏆", label: "Hackathon Finalist", sub: "IEEE Xtreme · IBM SkillsBuild · MumbaiHacks · IdeaXchange" },
  { icon: "🥊", label: "State-Level Athlete", sub: "Gold & Silver Boxer · District Football · Athletics" },
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll(".about-highlight, .about-bio, .about-title")

    gsap.fromTo(elements, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }}
    )
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative min-h-screen flex items-center py-24 border-t-2 border-white"
      style={{
        backgroundImage: 'url(/images/about_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 85%',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}
    >
      {/* ── Y2K DECORATIVE LAYER ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Subtle decorative quote or grain if needed, otherwise lean into images */}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">

        {/* LEFT: Text content */}
        <div className="about-text-col">
          <p className="retro-overline mb-2" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>USER_PROFILE: 001</p>
          <h2 className="text-5xl md:text-6xl font-black retro-heading mb-8">
            VISHAL LAKSHMIKANTHAN
          </h2>

          <div className="space-y-6 text-black font-mono relative">
            <p className="about-bio bg-white/80 p-2 border-l-4 border-blue-600">
              I'm a first-year Computer Science undergraduate at{" "}
              <strong>Sri Sairam Engineering College</strong>, Chennai,
              pursuing my BE with a CGPA of <strong>9.13</strong>. I build
              systems that solve real civic and everyday problems.
            </p>
            <p className="about-bio bg-white/80 p-2 border-l-4 border-blue-600">
              My approach is discipline-first: the same focus that earns me
              medals on the boxing ring drives how I approach code —
              structured, persistent, and always iterating.
            </p>
            <p className="about-bio italic opacity-70 bg-white/60 p-2">
              When I'm not building, I'm on the field — district football
              champion, state-level boxer, and track athlete.
            </p>

            {/* Quote decoration from target design */}
            <div className="absolute -top-12 -left-8 text-6xl text-white opacity-20 font-serif">""</div>
          </div>

        </div>

        {/* RIGHT: Face Detection / Profile Photo (Integrated with highlights) */}
        <div className="about-highlights-col space-y-6 flex flex-col items-center lg:items-end">
          
          {/* ── PROFILE WINDOW (Y2K FACE DETECTION) ── */}
          <div className="relative mb-8 group">
            {/* The Windows Container */}
            <div className="bg-[#c0c0c0] border-2 border-white border-b-black border-r-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[340px]">
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
                
                {/* Subtle digital noise overlay */}
                <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Design elements from screenshot: Floating tags */}
            <div className="absolute -bottom-4 -left-4 bg-[#00ff00] text-black text-[10px] font-bold px-3 py-1 shadow-md z-30">
               SCAN COMPLETE: 100%
            </div>
          </div>

          <div className="w-full space-y-4">
            {highlights.map(({ icon, label, sub }) => (
            <div key={label} className="retro-card p-6 border-2 border-gray-dark bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex gap-4 items-center">
                <span className="text-4xl">{icon}</span>
                <div>
                  <p className="font-bold text-blue-900 uppercase">{label}</p>
                  <p className="text-gray-600 text-xs mt-1">{sub}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Decorative code block */}
          <div className="p-6 border-2 border-gray-dark bg-black text-green-500 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <pre>{`const vishal = {\n  college: "Sairam Engg",\n  cgpa: 9.13,\n  sport: "Boxing 🥊",\n  status: "Coding..."\n}`}</pre>
          </div>

          </div>
        </div>

      </div>
    </section>
  )
}