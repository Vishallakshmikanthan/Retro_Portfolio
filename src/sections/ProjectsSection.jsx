import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import useProjects from "../hooks/useProjects"
import RetroAlertWindow from "../components/RetroAlertWindow"
import RevealOnScroll from "../components/RevealOnScroll"
import ScanOverlay from "../components/ScanOverlay"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const { allProjects, featuredProjects, loading } = useProjects()

  // Initial state: exact 6 featured projects in configured order
  // Expanded state: full portfolio dataset from allProjects
  const visibleProjects = isExpanded ? allProjects : featuredProjects

  // Track which card is in view → set as active & refresh ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const projectCards = section.querySelectorAll(".project-card")

    // Intersection Observer for active card detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx)
            setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.6 }
    )

    projectCards.forEach((card) => observer.observe(card))

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      observer.disconnect()
      clearTimeout(refreshTimer)
    }
  }, [isExpanded, loading, visibleProjects.length])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative"
      style={{
        backgroundImage: "url(/images/projects_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5rem 1rem",
        borderTop: "2px solid white",
      }}
    >
      <ScanOverlay />
      
      {/* SYSTEM METADATA */}
      <div style={{
        position: "absolute",
        top: "40px",
        right: "40px",
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#fff",
        opacity: 0.4,
        textAlign: "right",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10
      }}>
        PAGE_MEM: 1024KB<br/>
        RENDER_MODE: HARDWARE<br/>
        SYS_TICK: {activeIndex}<br/>
        RECORDS: {visibleProjects.length}/{allProjects.length || visibleProjects.length}
      </div>

      <div className="section-container" style={{ width: "100%" }}>
        {/* Heading */}
        <RevealOnScroll delay={0}>
          <div
            className="section-header projects-heading mb-12 text-center bg-black/40 backdrop-blur-sm p-6 border-2 border-white/20 inline-block mx-auto"
            style={{ display: "block" }}
          >
            <p className="retro-overline mb-2" style={{ color: "white", fontWeight: "bold" }}>
              PROJECT_ARCHIVE: 2026
            </p>
            <h2 className="text-5xl md:text-6xl font-black retro-heading" style={{ color: "white" }}>
              FEATURED_PROJECTS.DLL
            </h2>
            <p className="mt-4 text-lg font-mono opacity-80" style={{ color: "white" }}>
              STATUS: ACTIVE · INTELLIGENT · OPEN-SOURCE
            </p>
          </div>
        </RevealOnScroll>

        {/* Loading State */}
        {loading && (
          <div className="my-12 flex justify-center w-full">
            <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black max-w-md w-full p-4 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              <div className="bg-[#000080] text-white px-2 py-1 font-bold text-xs tracking-wider mb-4 flex items-center justify-between">
                <span>PROJECTS.EXE - INITIALIZING</span>
                <span className="animate-pulse">●</span>
              </div>
              <div className="text-left space-y-1 text-xs leading-relaxed">
                <p className="font-bold text-gray-700">----------------------------------------</p>
                <p className="text-[#000080] font-bold">CONNECTING TO GITHUB...</p>
                <p className="text-green-800 font-bold">LOADING PROJECT DATABASE...</p>
                <p className="font-bold tracking-widest text-[#000080]">[████████░░░░░░]</p>
                <p className="font-bold text-gray-700">----------------------------------------</p>
              </div>
            </div>
          </div>
        )}

        {/* Project grid */}
        {!loading && (
          <div ref={gridRef} className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {visibleProjects.map((project, idx) => (
              <RevealOnScroll key={project.id || project.repoName || project.title} delay={idx * 0.05}>
                <div
                  className={`project-card flex${idx === activeIndex ? " active" : ""}`}
                  data-idx={idx}
                >
                  <RetroAlertWindow {...project} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Toggle Button */}
        {!loading && allProjects.length > featuredProjects.length && (
          <RevealOnScroll delay={0.1}>
            <div className="mt-12 flex justify-center w-full">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="retro-interactive px-10 py-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black font-bold text-lg font-mono tracking-widest text-black flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {isExpanded ? "COLLAPSE_DIRECTORY.EXE" : "VIEW_ALL_RECORDS.EXE"}
              </button>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  )
}