import gsap from "gsap"

export function initHeroEntrance() {
  const tl = gsap.timeline()

  tl.from(".hero-panel", {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out",
  })

  tl.from(
    ".hero-title",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.6"
  )

  tl.from(
    ".hero-subtitle",
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.8"
  )
}