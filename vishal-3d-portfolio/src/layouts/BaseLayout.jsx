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

gsap.registerPlugin(ScrollTrigger)

export default function BaseLayout() {
  useHeroScroll()
  const mainRef = useRef(null)

  useEffect(() => {
    const windows = mainRef.current?.querySelectorAll('.retro-window-container')
    
    windows?.forEach((win, i) => {
      gsap.fromTo(win, 
        { y: i % 2 === 0 ? 40 : -40 },
        {
          y: i % 2 === 0 ? -40 : 40,
          ease: "none",
          scrollTrigger: {
            trigger: win,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <>
      <ProgressBar />
      <Header />
      <main ref={mainRef}>
        <HeroSection />

        <div className="section-container relative z-10">
          <RetroWindow title="User_Profile.sys">
            <AboutSection />
          </RetroWindow>
          
          <RetroWindow title="System.Skills">
            <SkillsSection />
          </RetroWindow>
  
          <RetroWindow title="Projects.exe">
            <ProjectsSection />
          </RetroWindow>
  
        </div>

        {/* AchievementsSection is outside section-container so that neither
            overflow:hidden (from RetroWindow) nor GSAP y-transforms (applied to
            .retro-window-container elements above) block the scroll-pin. */}
        <AchievementsSection />

        <div className="section-container relative z-10">
          <RetroWindow title="Contact_User.msg">
            <ContactSection />
          </RetroWindow>
        </div>
      </main>
      <Footer />
    </>
  )
}