import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function initHeroScrollSync(modelRef) {
  // Text animation
  gsap.to(".hero-content", {
    y: -150,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })

  // 3D model push back
  if (modelRef?.current) {
    gsap.to(modelRef.current.position, {
      z: -2,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
  }
}