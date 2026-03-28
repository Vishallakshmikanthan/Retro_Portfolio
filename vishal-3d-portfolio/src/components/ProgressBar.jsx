import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ProgressBar() {
    const barRef = useRef(null)

    useEffect(() => {
        const bar = barRef.current
        if (!bar) return

        // scaleX: 0 → 1 driven entirely by scroll position
        // transformOrigin left ensures it grows from the left edge
        const tween = gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,          // reverses automatically on scroll-up
                },
            }
        )

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
        }
    }, [])

    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                zIndex: 9999,
                pointerEvents: "none",
                /* Faint track so the bar is readable on any bg */
                background: "rgba(255,255,255,0.05)",
            }}
        >
            <div
                ref={barRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    transformOrigin: "left center",
                    scaleX: 0,                              /* GSAP will drive this */
                    background: "var(--primary)",
                }}
            />
        </div>
    )
}
