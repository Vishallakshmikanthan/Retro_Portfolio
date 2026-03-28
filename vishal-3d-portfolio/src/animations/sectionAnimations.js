import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register once — safe to import multiple times (GSAP deduplicates)
gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/** Returns true when the device is mobile-width (< 768px). */
const isMobile = () => window.innerWidth < 768

// ─────────────────────────────────────────────────────────────
// SECTION ENTRY ANIMATIONS
// ─────────────────────────────────────────────────────────────

/**
 * Cinematic fade-up entrance for headings / text elements.
 * Elements slide in from y:60, opacity:0 → y:0, opacity:1.
 *
 * @param {string}  selector  - CSS selector
 * @param {Element} triggerEl - ScrollTrigger anchor element
 * @param {number}  delay     - Additional delay before animation starts (s)
 * @param {number}  stagger   - Stagger between multiple matched elements (s)
 */
export function fadeUpOnScroll(selector, triggerEl, delay = 0, stagger = 0.12) {
    gsap.fromTo(
        selector,
        { opacity: 0, y: 60, willChange: "transform, opacity" },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power4.out",
            stagger,
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        }
    )
}

/**
 * Scale + fade cards in with stagger on scroll.
 * Cards enter from y:70, scale:0.94 → y:0, scale:1.
 *
 * @param {string}  selector  - CSS selector targeting the cards
 * @param {Element} triggerEl - DOM element used as the scroll trigger
 * @param {number}  stagger   - Stagger amount between each card (s)
 */
export function staggerCardsOnScroll(selector, triggerEl, stagger = 0.13) {
    gsap.fromTo(
        selector,
        { opacity: 0, y: 70, scale: 0.94, willChange: "transform, opacity" },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger,
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 78%",
                toggleActions: "play none none none",
            },
        }
    )
}

/**
 * Slide elements in from left or right on scroll.
 * Used for alternating timeline items.
 *
 * @param {Element|string} el        - Target element or CSS selector
 * @param {Element}        triggerEl - ScrollTrigger anchor
 * @param {"left"|"right"} direction - Which side to enter from
 * @param {number}         delay     - Optional extra delay (s)
 */
export function slideInFromSide(el, triggerEl, direction = "left", delay = 0) {
    const xFrom = direction === "left" ? -80 : 80

    gsap.fromTo(
        el,
        { opacity: 0, x: xFrom, willChange: "transform, opacity" },
        {
            opacity: 1,
            x: 0,
            duration: 0.85,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: triggerEl || el,
                start: "top 82%",
                toggleActions: "play none none none",
            },
        }
    )
}

/**
 * Stagger-fade individual badges inside a container on scroll.
 *
 * @param {string}  selector  - CSS selector for badge elements
 * @param {Element} triggerEl - Parent container used as trigger
 */
export function staggerBadgesOnScroll(selector, triggerEl) {
    gsap.fromTo(
        selector,
        { opacity: 0, y: 18, scale: 0.88 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        }
    )
}

// ─────────────────────────────────────────────────────────────
// SCROLL SCRUB / PARALLAX
// ─────────────────────────────────────────────────────────────

/**
 * Subtle parallax background element on scroll.
 * Disabled on mobile to avoid performance issues.
 *
 * @param {Element} el           - Element to parallax
 * @param {number}  yAmount      - Y travel distance in px (default ‑80)
 */
export function parallaxOnScroll(el, yAmount = -80) {
    if (!el) return
    if (isMobile()) return   // no heavy parallax on mobile

    gsap.to(el, {
        y: yAmount,
        ease: "none",
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
        },
    })
}

/**
 * Scrub-based timeline center-line growth.
 * The line height grows proportionally as the user scrolls through the section.
 *
 * @param {Element} lineEl    - Vertical line DOM element
 * @param {Element} sectionEl - Parent section (defines scrub range)
 */
export function timelineLineGrow(lineEl, sectionEl) {
    if (!lineEl) return

    gsap.fromTo(
        lineEl,
        { scaleY: 0, transformOrigin: "top center" },
        {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: sectionEl || lineEl,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1.2,
            },
        }
    )
}

/**
 * Subtle section exit: as the user scrolls past, content gently scales down
 * and reduces opacity. Creates a cinematic depth illusion.
 *
 * @param {Element} el         - Section container element
 * @param {Object}  [opts]
 * @param {number}  [opts.scaleEnd=0.97]    - Final scale on exit
 * @param {number}  [opts.opacityEnd=0.75]  - Final opacity on exit
 */
export function sectionExitFade(el, { scaleEnd = 0.97, opacityEnd = 0.75 } = {}) {
    if (!el) return

    gsap.to(el, {
        scale: scaleEnd,
        opacity: opacityEnd,
        ease: "none",
        scrollTrigger: {
            trigger: el,
            start: "bottom 60%",
            end: "bottom top",
            scrub: 1.5,
        },
    })
}

// ─────────────────────────────────────────────────────────────
// MICRO-INTERACTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Attach a premium hover lift animation to a card element.
 * Lifts, scales, and adds a subtle 3D tilt on mouseenter;
 * reverses on mouseleave. Returns a cleanup function.
 *
 * @param {Element} cardEl           - Card DOM element
 * @param {Object}  [opts]
 * @param {number}  [opts.y=-10]     - Y lift in px
 * @param {number}  [opts.scale=1.03]
 * @param {number}  [opts.rotateX=3] - degrees
 * @returns {Function} cleanup       - Call on component unmount
 */
export function cardHoverLift(cardEl, { y = -10, scale = 1.03, rotateX = 3 } = {}) {
    if (!cardEl) return () => { }

    const onEnter = () =>
        gsap.to(cardEl, {
            y,
            scale,
            rotateX,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
        })

    const onLeave = () =>
        gsap.to(cardEl, {
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
        })

    cardEl.addEventListener("mouseenter", onEnter)
    cardEl.addEventListener("mouseleave", onLeave)

    return () => {
        cardEl.removeEventListener("mouseenter", onEnter)
        cardEl.removeEventListener("mouseleave", onLeave)
    }
}

/**
 * Attach a hover animation to a button element.
 * Scale up + glow enhancement on hover. Returns cleanup function.
 *
 * @param {Element} btnEl
 * @returns {Function} cleanup
 */
export function animateBtnHover(btnEl) {
    if (!btnEl) return () => { }

    const onEnter = () =>
        gsap.to(btnEl, { scale: 1.06, duration: 0.25, ease: "power2.out", overwrite: "auto" })

    const onLeave = () =>
        gsap.to(btnEl, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" })

    btnEl.addEventListener("mouseenter", onEnter)
    btnEl.addEventListener("mouseleave", onLeave)

    return () => {
        btnEl.removeEventListener("mouseenter", onEnter)
        btnEl.removeEventListener("mouseleave", onLeave)
    }
}

/**
 * Pulse-pop a dot element on reveal (scale 0 → 1.4 → 1).
 *
 * @param {Element} dotEl    - Dot element to animate
 * @param {Element} triggerEl - Scroll trigger anchor
 * @param {number}  delay     - Extra delay (s)
 */
export function popDotOnReveal(dotEl, triggerEl, delay = 0) {
    if (!dotEl) return

    gsap.fromTo(
        dotEl,
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: triggerEl || dotEl,
                start: "top 82%",
                toggleActions: "play none none none",
            },
        }
    )
}
