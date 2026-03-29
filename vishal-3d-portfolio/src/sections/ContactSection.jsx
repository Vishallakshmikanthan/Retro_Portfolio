import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RetroButton from "../components/RetroButton"

gsap.registerPlugin(ScrollTrigger)

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Vishallakshmikanthan",
    icon: "GIT",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishallakshmikanthan/",
    icon: "IN",
  },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(section.querySelectorAll(".contact-animate"),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    )
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => setStatus("sent"), 800)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section"
      style={{
        backgroundImage: "url(/images/contact_bg.jpg)",
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
      <div className="section-container" style={{ width: "100%" }}>
        {/* Heading */}
        <div
          className="section-header text-center mb-12 contact-animate bg-black/40 backdrop-blur-sm p-4 inline-block mx-auto border-2 border-white/20"
          style={{ display: "block" }}
        >
          <p className="retro-overline mb-2" style={{ color: "white", fontWeight: "bold" }}>
            COMMS_CHANNEL: EXTERNAL
          </p>
          <h2 className="text-5xl md:text-6xl font-black retro-heading" style={{ color: "white" }}>
            CONNECT.EXE
          </h2>
          <p className="mt-4 text-lg font-mono opacity-80" style={{ color: "white" }}>
            COLLABORATIONS · HACKATHONS · INTERNSHIPS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="contact-animate retro-card bg-[#e0e0e0] border-2 border-gray-dark p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {status === "sent" ? (
              <div className="text-center py-12">
                <p className="text-2xl font-bold font-mono text-blue-900 mb-4">&gt; Message sent successfully.</p>
                <RetroButton onClick={() => setStatus("idle")}>SEND_ANOTHER</RetroButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase mb-2 block text-gray-700">Name:</label>
                    <input type="text" className="retro-input w-full p-2 border-2 border-gray-dark bg-white font-mono" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase mb-2 block text-gray-700">Email:</label>
                    <input type="email" className="retro-input w-full p-2 border-2 border-gray-dark bg-white font-mono" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase mb-2 block text-gray-700">Message:</label>
                  <textarea rows={5} className="retro-input w-full p-2 border-2 border-gray-dark bg-white font-mono resize-none" required />
                </div>
                <RetroButton type="submit" className="w-full py-4 uppercase" disabled={status === "sending"}>
                  {status === "sending" ? "> Transmitting message..." : "SEND_MESSAGE"}
                </RetroButton>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="contact-animate space-y-8 lg:pl-8">
            <div className="retro-card border-2 border-gray-dark bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-bold uppercase opacity-50 mb-2">Primary_Email:</p>
              <a href="mailto:vishallakshmikanthan@gmail.com" className="text-xl font-bold text-blue-900 hover:underline break-all">
                vishallakshmikanthan@gmail.com
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase opacity-50 mb-4">Network_Links:</p>
              <div className="flex flex-col gap-4">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <span className="w-12 h-12 flex items-center justify-center bg-blue-900 text-white font-bold border-2 border-black group-hover:bg-blue-700">
                      {icon}
                    </span>
                    <span className="font-bold uppercase group-hover:underline">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-dark bg-[#c0c0c0]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-600 animate-pulse border border-black" />
                <p className="text-sm font-bold uppercase opacity-70">AVAILABLE_FOR_HIRE: TRUE</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}