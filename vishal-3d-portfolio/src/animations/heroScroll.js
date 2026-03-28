import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function initHeroScroll() {
  gsap.to(".hero-section h1", {
    y: -100,
    opacity: 0.5,
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })

  gsap.to(".hero-section p", {
    y: -60,
    opacity: 0.4,
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })
}