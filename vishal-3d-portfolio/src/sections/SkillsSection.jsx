import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    category: "PROGRAMMING.EXE",
    colorStyle: "bg-[#e0e0e0]",
    skills: [
      { name: "Python", desc: "Used in FastAPI backend, ML workflows" },
      { name: "C", desc: "System level programming & memory management" },
      { name: "Java", desc: "Enterprise application development" }
    ],
  },
  {
    category: "WEB_STACK.DLL",
    colorStyle: "bg-[#d9e8f5]",
    skills: [
      { name: "HTML5", desc: "Semantic web structure" },
      { name: "CSS3", desc: "Styling and responsive design" },
      { name: "JavaScript", desc: "Dynamic client-side scripting" },
      { name: "React", desc: "Component-based UI development" },
      { name: "Next.js", desc: "React framework for production" },
      { name: "FastAPI", desc: "High performance Python web framework" },
      { name: "Node.js", desc: "JavaScript runtime environment" }
    ],
  },
  {
    category: "DATABASES.DB",
    colorStyle: "bg-[#dcf0d5]",
    skills: [
      { name: "PostgreSQL", desc: "Advanced open source relational DB" },
      { name: "MongoDB", desc: "NoSQL document database" },
      { name: "MySQL", desc: "Popular open source relational DB" }
    ],
  },
  {
    category: "TOOLS.SYS",
    colorStyle: "bg-[#d0d0d0]",
    skills: [
      { name: "Git", desc: "Version control system" },
      { name: "GitHub", desc: "Code hosting and collaboration" },
      { name: "Bitbucket", desc: "Git repository management" },
      { name: "Docker Desktop", desc: "Containerization platform" },
      { name: "Prisma", desc: "Next-generation ORM" },
      { name: "PGAdmin", desc: "PostgreSQL administration" },
      { name: "VS Code", desc: "Primary code editor" },
      { name: "Jupyter", desc: "Interactive computing environments" }
    ],
  },
  {
    category: "CORE_CS.SYS",
    colorStyle: "bg-[#b0b0b0]",
    skills: [
      { name: "Data Structures", desc: "Efficient data organization" },
      { name: "OOP", desc: "Object-oriented paradigm" },
      { name: "DBMS", desc: "Database management concepts" },
      { name: "Operating Systems", desc: "OS architecture and principles" }
    ],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const [bootText, setBootText] = useState("")
  
  const [cpuLoad, setCpuLoad] = useState("███░░ 65%")
  const [memLoad, setMemLoad] = useState("████░ 78%")

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll(".module-card"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        }
      }
    )

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        const lines = [
          "> Initializing skill modules...",
          "> Loading dependencies...",
          "> All systems operational."
        ]
        let currentLine = 0
        let currentChar = 0
        let textStr = ""
        
        const typeChar = () => {
          if (currentLine < lines.length) {
            if (currentChar < lines[currentLine].length) {
              textStr += lines[currentLine][currentChar]
              setBootText(textStr)
              currentChar++
              setTimeout(typeChar, 30)
            } else {
              textStr += "\n"
              setBootText(textStr)
              currentLine++
              currentChar = 0
              setTimeout(typeChar, 300)
            }
          }
        }
        typeChar()
      },
      once: true
    })

    const interval = setInterval(() => {
      const cpuVariations = ["███░░ 65%", "███▒░ 68%", "████░ 72%", "██▒░░ 54%", "███░░ 61%", "████░ 79%", "█████ 88%"]
      const memVariations = ["████░ 78%", "████▒ 81%", "████░ 75%", "█████ 92%", "████░ 80%", "████░ 77%"]
      setCpuLoad(cpuVariations[Math.floor(Math.random() * cpuVariations.length)])
      setMemLoad(memVariations[Math.floor(Math.random() * memVariations.length)])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative overflow-hidden font-mono text-black"
      style={{
        backgroundColor: "#008080",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5rem 1rem",
        borderTop: "2px solid white",
        position: "relative"
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'crtDrift 30s linear infinite'
      }} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes crtDrift {
          0% { background-position: 0 0; }
          100% { background-position: 400px 400px; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fakeLoad {
          0% { content: "[-]"; }
          25% { content: "[\\\\]"; }
          50% { content: "[|]"; }
          75% { content: "[/]"; }
          100% { content: "[-]"; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
        .loading-indicator::after {
          content: "[-]";
          animation: fakeLoad 0.5s infinite;
          display: inline-block;
          width: 3ch;
        }
        .module-card {
          transition: transform 0.15s ease;
          border: 2px solid;
          border-color: #dfdfdf #404040 #404040 #dfdfdf;
          box-shadow: 1px 1px 0px 1px black;
        }
        .module-card:hover {
          transform: translateY(-2px);
        }
        .module-card:active {
          border-color: #404040 #dfdfdf #dfdfdf #404040;
        }
        .module-card:focus-visible {
          outline: 2px dashed black;
          outline-offset: 2px;
        }
        .win-title-bar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          padding: 2px 6px;
          font-weight: bold;
          font-size: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .skill-chip {
          border: 2px solid;
          border-color: #dfdfdf #808080 #808080 #dfdfdf;
          transition: all 0.1s;
          cursor: default;
          position: relative;
        }
        .skill-chip:active {
          border-color: #808080 #dfdfdf #dfdfdf #808080;
        }
        .skill-chip:hover {
          background-color: #000080 !important;
          color: white !important;
        }
        .skill-chip:focus-visible {
          outline: 1px dotted black;
          outline-offset: -4px;
        }
        .skill-tooltip {
          visibility: hidden;
          background-color: #ffffe1;
          color: black;
          text-align: center;
          padding: 4px 8px;
          border: 1px solid black;
          position: absolute;
          z-index: 50;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.2s;
          font-size: 0.75rem;
          white-space: nowrap;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.2);
          pointer-events: none;
        }
        .skill-chip:hover .skill-tooltip {
          visibility: visible;
          opacity: 1;
        }
      `}} />

      <div className="absolute top-4 left-4 text-white text-xs md:text-sm font-mono whitespace-pre drop-shadow-md z-10" style={{ textShadow: "1px 1px 0px black" }}>
        {bootText}
        <span className="blinking-cursor">_</span>
      </div>

      <div className="section-container relative z-10" style={{ width: "100%", maxWidth: "1200px" }}>
        
        <div className="mb-12 w-full max-w-2xl mx-auto bg-[#c0c0c0] border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div className="win-title-bar mb-1">
            <span>[SYSTEM MODULE ACTIVE]</span>
            <span className="loading-indicator px-1 text-xs"></span>
          </div>
          <div className="p-4 md:p-6 text-center bg-black text-[#00ff00] border-2 border-t-[#404040] border-l-[#404040] border-b-[#dfdfdf] border-r-[#dfdfdf]">
            <h2 className="text-2xl md:text-4xl font-black tracking-widest uppercase mb-3">
              TECHNICAL_ARSENAL.SYS <span className="blinking-cursor">▮</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4 opacity-80">
              <div className="h-px bg-[#00ff00] flex-1 max-w-[100px]"></div>
              <span className="text-sm tracking-widest text-center hidden md:inline">CORE_CAPABILITIES LOADED</span>
              <span className="text-sm tracking-widest text-center md:hidden ">LOADED</span>
              <div className="h-px bg-[#00ff00] flex-1 max-w-[100px]"></div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-6 text-sm md:text-base border border-[#00ff00]/30 p-2 bg-[#002200]">
              <div className="whitespace-pre">CPU: {cpuLoad}</div>
              <div className="whitespace-pre">MEMORY: {memLoad}</div>
              <div className="text-yellow-400">MODULES: ACTIVE</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-black">
          {skillCategories.map(({ category, colorStyle, skills }) => (
            <div
              key={category}
              className={`module-card flex flex-col ${colorStyle}`}
              tabIndex={0}
            >
              <div className="win-title-bar cursor-default">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-white border border-gray-400 shadow-[1px_1px_rgba(0,0,0,0.5)]" style={{backgroundImage: "linear-gradient(135deg, white 50%, #c0c0c0 50%)"}}></span>
                  {category}
                </span>
                <div className="flex gap-1">
                  <button className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-black text-xs font-bold leading-none active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-gray-200 focus:outline-none">_</button>
                  <button className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-black text-xs font-bold leading-none active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-gray-200 focus:outline-none">□</button>
                  <button className="w-5 h-5 bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black flex items-center justify-center text-black text-xs font-bold leading-none active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-gray-200 focus:outline-none">×</button>
                </div>
              </div>
              <div className="p-5 flex-1 border-t border-t-white border-l border-l-white">
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-chip bg-[#c0c0c0] px-3 py-1 text-sm font-bold shadow-[1px_1px_rgba(0,0,0,0.2)]"
                      tabIndex={0}
                    >
                      {skill.name}
                      <span className="skill-tooltip leading-snug">{skill.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}