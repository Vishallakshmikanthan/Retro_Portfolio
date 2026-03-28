import { useEffect, useRef, useState } from "react"

const INTERACTIVE_SELECTOR = "a, button, .project-card, [data-project-card], .magnetic"

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const scaleRef = useRef(1)
  const scaleTargetRef = useRef(1)
  const magneticRefs = useRef([])
  const [enabled, setEnabled] = useState(false)
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer:fine)").matches
    setEnabled(finePointer)
    if (!finePointer) return

    const styleEl = document.createElement("style")
    styleEl.setAttribute("data-custom-cursor", "true")
    styleEl.textContent = `
      @media (pointer:fine) {
        html, body, body * { cursor: none !important; }
      }
    `
    document.head.appendChild(styleEl)

    return () => {
      styleEl.remove()
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const cursorEl = cursorRef.current
    if (!cursorEl) return

    const collectMagneticElements = () => {
      magneticRefs.current = Array.from(document.querySelectorAll(".magnetic")).map((el) => ({
        el,
        baseTransform: el.style.transform || "",
        rect: el.getBoundingClientRect(),
      }))
    }

    const updateMagneticRects = () => {
      magneticRefs.current = magneticRefs.current.map((item) => ({
        ...item,
        rect: item.el.getBoundingClientRect(),
      }))
    }

    const onMouseMove = (event) => {
      targetRef.current.x = event.clientX
      targetRef.current.y = event.clientY

      magneticRefs.current.forEach((item) => {
        const { el, rect, baseTransform } = item
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = targetRef.current.x - centerX
        const dy = targetRef.current.y - centerY
        const distance = Math.hypot(dx, dy)
        const radius = Math.max(rect.width, rect.height)

        if (distance < radius) {
          const strength = 1 - distance / radius
          const tx = clamp(dx * 0.2 * strength, -10, 10)
          const ty = clamp(dy * 0.2 * strength, -10, 10)
          el.style.transform = `${baseTransform} translate3d(${tx}px, ${ty}px, 0)`
        } else {
          el.style.transform = baseTransform
        }
      })
    }

    const onPointerOver = (event) => {
      const interactive = event.target.closest(INTERACTIVE_SELECTOR)
      if (interactive) {
        scaleTargetRef.current = 2
        setIsHoveringInteractive(true)
      }
    }

    const onPointerOut = (event) => {
      const interactive = event.target.closest(INTERACTIVE_SELECTOR)
      if (!interactive) return

      const related = event.relatedTarget
      if (related && related.closest && related.closest(INTERACTIVE_SELECTOR)) return

      scaleTargetRef.current = 1
      setIsHoveringInteractive(false)
    }

    const tick = () => {
      const cursor = cursorRef.current
      if (!cursor) return

      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18
      scaleRef.current += (scaleTargetRef.current - scaleRef.current) * 0.18

      cursor.style.transform = `translate3d(${currentRef.current.x - 9}px, ${currentRef.current.y - 9}px, 0) scale(${scaleRef.current})`
      rafRef.current = window.requestAnimationFrame(tick)
    }

    collectMagneticElements()

    targetRef.current.x = window.innerWidth / 2
    targetRef.current.y = window.innerHeight / 2
    currentRef.current.x = targetRef.current.x
    currentRef.current.y = targetRef.current.y

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("pointerover", onPointerOver)
    window.addEventListener("pointerout", onPointerOut)
    window.addEventListener("resize", updateMagneticRects, { passive: true })
    window.addEventListener("scroll", updateMagneticRects, { passive: true })

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("pointerover", onPointerOver)
      window.removeEventListener("pointerout", onPointerOut)
      window.removeEventListener("resize", updateMagneticRects)
      window.removeEventListener("scroll", updateMagneticRects)

      magneticRefs.current.forEach(({ el, baseTransform }) => {
        el.style.transform = baseTransform
      })
      magneticRefs.current = []
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[999999] h-[18px] w-[18px] rounded-full border-2 transition-[border-color,box-shadow] duration-200 will-change-transform ${
        isHoveringInteractive
          ? "border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.55)]"
          : "border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.35)]"
      }`}
      style={{ transform: "translate3d(-100px,-100px,0) scale(1)" }}
    />
  )
}