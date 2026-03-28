import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    category: "Programming",
    skills: ["Python", "Java", "C", "JavaScript"],
  },
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "SQL", "DBMS"],
  },
  {
    category: "CS Fundamentals",
    skills: ["Data Structures", "OOP", "OS", "Networks"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll(".skill-category-card"),
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, scale: 1, stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    )
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative min-h-screen flex flex-col justify-center py-24 border-t-2 border-white"
      style={{
        backgroundImage: 'url(/images/skills_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="section-container">
        <div className="section-header skills-heading mb-16 text-center bg-black/40 backdrop-blur-sm p-6 border-2 border-white/20 inline-block mx-auto">
          <p className="retro-overline mb-2" style={{ color: 'white', fontWeight: 'bold' }}>SYSTEM_MANIFEST: CAPABILITIES</p>
          <h2 className="text-5xl md:text-6xl font-black retro-heading" style={{ color: 'white' }}>
            TECHNICAL_ARSENAL.SYS
          </h2>
          <p className="mt-4 text-lg font-mono opacity-80" style={{ color: 'white' }}>
            CORE_COMPETENCIES // STACK_OPERATIONS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ category, skills }) => (
            <div
              key={category}
              className="skill-category-card retro-card border-2 border-gray-dark bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-lg font-bold mb-4 text-blue-900 border-b border-gray-300 pb-2 uppercase">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-badge bg-[#c0c0c0] border border-gray-dark px-2 py-1 text-xs font-bold font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}