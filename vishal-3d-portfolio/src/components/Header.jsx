import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import RetroButton from "./RetroButton"
import { useSystemHUD } from "../context/SystemHUDContext"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Events & Milestones", href: "#milestones" },
    { label: "Contact", href: "#contact" },
]

function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}

export default function Header() {
    const headerRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState("hero")
    
    const { enableDeveloperMode, setIsExplorerOpen, dispatchMessage } = useSystemHUD()
    const [logoClicks, setLogoClicks] = useState(0)

    useEffect(() => {
        document.title = `Vishal.exe - [${active.toUpperCase()}]`
    }, [active])

    useEffect(() => {
        const header = headerRef.current
        if (!header) return
        
        // Entrance animation
        gsap.fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 })

        // 2. Progressive Reveal for Links
        const links = header.querySelectorAll('.nav-link, .logo-monogram, .logo-name')
        if (links.length) {
            gsap.fromTo(links, 
                { opacity: 0, y: 5 }, 
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.3 }
            )
        }

        // 3. HEADER SHRINK: Navbar reduces size on scroll
        const inner = header.querySelector('.header-inner')
        const logo = header.querySelector('.logo-monogram')

        const ctx = gsap.context(() => {
            gsap.to(inner, {
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "100px top", // Shrinks within first 100px of scroll
                    scrub: true
                }
            })

            if (logo) {
                gsap.to(logo, {
                    scale: 0.85,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "100px top",
                        scrub: true
                    }
                })
            }

            // Scroll-spy for nav links
            const sectionIds = ["hero", "about", "skills", "projects", "milestones", "contact"];
            sectionIds.forEach((id) => {
                const triggerEl = document.getElementById(id);
                if (triggerEl) {
                    ScrollTrigger.create({
                        trigger: triggerEl,
                        start: "top center",
                        end: "bottom center",
                        onToggle: (self) => {
                            if (self.isActive) {
                                setActive(id);
                            }
                        }
                    });
                }
            });
        })

        return () => ctx.revert()
    }, [])

    const scrollTo = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        const target = document.querySelector(href)
        if (target) {
            // Add slight 100ms delay to give tactile feedback of click down
            setTimeout(() => {
                target.scrollIntoView({ behavior: "instant", block: "start" })
                setActive(href.replace("#", ""))
            }, 100);
        }
    }

    return (
        <header ref={headerRef} className="site-header">
            <div className="header-inner">
                <a
                    href="#hero"
                    className="header-logo"
                    onClick={(e) => {
                        scrollTo(e, "#hero");
                        setLogoClicks(c => {
                            const newC = c + 1;
                            if (newC === 5) {
                                enableDeveloperMode();
                                return 0;
                            }
                            return newC;
                        });
                    }}
                >
                    <span className="logo-monogram">VL</span>
                    <span className="logo-name">Vishal<span className="logo-dot">.</span>exe</span>
                </a>

                <nav className="header-nav hidden md:flex">
                    {navLinks.map(({ label, href }) => {
                        const id = href.replace("#", "")
                        return (
                            <a
                                key={href}
                                href={href}
                                className={`nav-link retro-interactive ${active === id ? "nav-link--active" : ""}`}
                                onClick={(e) => scrollTo(e, href)}
                            >
                                {label}
                            </a>
                        )
                    })}
                </nav>

                <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="hidden lg:flex" style={{ gap: "0.5rem" }}>
                        <a
                            href="https://github.com/Vishallakshmikanthan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-retro"
                            style={{ color: "var(--primary)" }}
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vishallakshmikanthan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-retro"
                            style={{ color: "var(--primary)" }}
                        >
                            <LinkedInIcon />
                        </a>
                    </div>

                    <RetroButton 
                        href="/resume.pdf" 
                        download 
                        className="hidden sm:flex"
                        hoverLabel="OPEN_FILE.PDF"
                        onClickLabel="Opening RESUME.PDF..."
                    >
                        RESUME.PDF
                    </RetroButton>

                    <button 
                        onClick={() => {
                            dispatchMessage("> Initializing SYSTEM_EXPLORER.EXE...");
                            setIsExplorerOpen(true);
                        }}
                        className="hidden md:flex items-center justify-center bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] px-3 py-1 font-bold text-xs hover:bg-[#e0e0e0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
                    >
                        <span className="mr-2">📁</span>EXPLORER
                    </button>

                    <button
                        className="hamburger md:hidden"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav className="mobile-nav">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="mobile-nav-link"
                            onClick={(e) => scrollTo(e, href)}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    )
}