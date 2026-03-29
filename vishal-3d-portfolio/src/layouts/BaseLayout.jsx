import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "../sections/HeroSection"
import AboutSection from "../sections/AboutSection"
import SkillsSection from "../sections/SkillsSection"
import ProjectsSection from "../sections/ProjectsSection"
import AchievementsSection from "../sections/AchievementsSection"
import ContactSection from "../sections/ContactSection"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useHeroScroll from "../hooks/useHeroScroll"
import ProgressBar from "../components/ProgressBar"
import RetroWindow from "../components/RetroWindow"
import useRetroOSLayout from "../hooks/useRetroOSLayout"
import Taskbar from "../components/Taskbar"
import RetroBackground from "../components/backgrounds/RetroBackground"
import AmbientIcons from "../components/AmbientIcons"
import SystemMetrics from "../components/SystemMetrics"
import SystemContextMsg from "../components/SystemContextMsg"
import { useWindow } from "../context/WindowContext"

gsap.registerPlugin(ScrollTrigger)

export default function BaseLayout() {
  useHeroScroll()
  useRetroOSLayout()
  const mainRef = useRef(null)
  const { zIndices, focusWindow } = useWindow()

  useEffect(() => {
    const handleRefresh = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("load", handleRefresh)
    const timers = [100, 500, 1500, 3000].map(delay => setTimeout(handleRefresh, delay))
    window.addEventListener("resize", handleRefresh)

    // Window-open entrance animations for each RetroWindow
    const windows = document.querySelectorAll(".retro-window-container")
    windows.forEach((win) => {
      gsap.fromTo(
        win,
        { scale: 0.95, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: win,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      )
    })

    // Background Reactivity
    gsap.to(".parallax-bg", {
      y: "-2vh",
      filter: "brightness(0.85)",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    })

    // Depth Layering for active sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach(sec => {
      gsap.set(sec, { opacity: 0.85, filter: "contrast(1)" })
      gsap.to(sec, {
        opacity: 1,
        filter: "contrast(1.1)",
        duration: 0.3,
        scrollTrigger: {
          trigger: sec,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse"
        }
      })
    })

    return () => {
      window.removeEventListener("load", handleRefresh)
      window.removeEventListener("resize", handleRefresh)
      timers.forEach(clearTimeout)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <>
      <RetroBackground />
      <AmbientIcons />
      <SystemContextMsg />
      <SystemMetrics />
      <ProgressBar />
      <Header />
      <main ref={mainRef} className="parent-container">
        <HeroSection />

        {/* Stacked window layout — no gap-[20vh], clean 40px gaps */}
        <div className="stack-layout">
          <RetroWindow
            title="User_Profile.sys"
            style={{ zIndex: zIndices["User_Profile.sys"] }}
            onClick={() => focusWindow("User_Profile.sys")}
            id="about"
            className="window-main"
          >
            <AboutSection />
          </RetroWindow>

          <RetroWindow
            title="System.Skills"
            style={{ zIndex: zIndices["System.Skills"] }}
            onClick={() => focusWindow("System.Skills")}
            id="skills"
            className="window-secondary"
          >
            <SkillsSection />
          </RetroWindow>

          <RetroWindow
            title="Projects.exe"
            style={{ zIndex: zIndices["Projects.exe"] }}
            onClick={() => focusWindow("Projects.exe")}
            id="projects"
            className="window-main"
          >
            <ProjectsSection />
          </RetroWindow>
        </div>

        <AchievementsSection />

        <div className="stack-layout">
          <RetroWindow
            title="Contact_User.msg"
            style={{ zIndex: zIndices["Contact_User.msg"] }}
            onClick={() => focusWindow("Contact_User.msg")}
            id="contact"
            className="window-secondary"
          >
            <ContactSection />
          </RetroWindow>
        </div>
      </main>
      <Taskbar />
      <Footer />
    </>
  )
}