import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "../data/projects"
import RetroAlertWindow from "../components/RetroAlertWindow"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleProjects = isExpanded ? projects : projects.slice(0, 6)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const heading = section.querySelector(".projects-heading")
    
    gsap.fromTo(
      heading,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, 
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    )
  }, [])

  // Re-trigger animations when projects expand
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const projectCards = section.querySelectorAll(".project-card")
    
    gsap.fromTo(
      projectCards,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    )
  }, [isExpanded])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative min-h-screen flex flex-col justify-center py-24 border-t-2 border-white"
      style={{
        backgroundImage: 'url(/images/projects_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="section-container">
        {/* Heading */}
        <div className="section-header projects-heading mb-16 text-center bg-black/40 backdrop-blur-sm p-6 border-2 border-white/20 inline-block mx-auto">
          <p className="retro-overline mb-2" style={{ color: 'white', fontWeight: 'bold' }}>PROJECT_ARCHIVE: 2026</p>
          <h2 className="text-5xl md:text-6xl font-black retro-heading" style={{ color: 'white' }}>
            FEATURED_PROJECTS.DLL
          </h2>
          <p className="mt-4 text-lg font-mono opacity-80" style={{ color: 'white' }}>
            STATUS: ACTIVE · INTELLIGENT · OPEN-SOURCE
          </p>
        </div>

         {/* Project grid */}
         <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {visibleProjects.map(({ title, description, tech, github, image }) => (
              <div key={title} className="project-card flex">
                <RetroAlertWindow
                  title={title}
                  description={description}
                  tech={tech}
                  github={github}
                  image={image}
                />
              </div>
           ))}
         </div>

         {/* Toggle Button */}
         {projects.length > 6 && (
           <div className="mt-16 flex justify-center w-full">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-10 py-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-lg hover:scale-[0.98] active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-mono tracking-widest text-black flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {isExpanded ? "COLLAPSE_DIRECTORY.EXE" : "VIEW_ALL_RECORDS.EXE"}
              </button>
           </div>
         )}
      </div>
    </section>
  )
}