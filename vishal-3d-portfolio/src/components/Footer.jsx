import { useRef } from "react"

const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
]

export default function Footer() {
    const scrollTo = (e, href) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: "instant", block: "start" })
    }

    return (
        <footer className="site-footer bg-[#c0c0c0] border-t-4 border-black py-12">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-black font-mono">
                    
                    {/* Brand */}
                    <div className="space-y-4">
                        <span className="bg-blue-900 text-white p-2 font-black text-xl">VL</span>
                        <p className="text-sm leading-relaxed uppercase">
                            BE COMPUTER SCIENCE<br />
                            SAIRAM ENGINEERING COLLEGE<br />
                            CGPA 9.13 · BATCH 2028
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <p className="font-bold border-b border-black pb-1">SYSTEM_LINKS</p>
                        <nav className="flex flex-col gap-2">
                            {quickLinks.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="hover:bg-blue-900 hover:text-white px-1 w-fit"
                                    onClick={(e) => scrollTo(e, href)}
                                >
                                    {label}.EXE
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Network */}
                    <div className="space-y-4">
                        <p className="font-bold border-b border-black pb-1">NETWORK_STATUS</p>
                        <div className="flex flex-col gap-2">
                            <a href="mailto:vishallakshmikanthan@gmail.com" className="hover:underline">EMAIL_ADMIN</a>
                            <a href="https://github.com/Vishallakshmikanthan" target="_blank" rel="noopener noreferrer" className="hover:underline">GITHUB_REPO</a>
                            <a href="https://www.linkedin.com/in/vishallakshmikanthan/" target="_blank" rel="noopener noreferrer" className="hover:underline">LINKEDIN_PROFILE</a>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-6 border-t border-gray-500 text-center text-xs opacity-60">
                    <p>© 2026 VISHAL LAKSHMIKANTHAN. BUILT FOR STABILITY. V98.0.1</p>
                </div>
            </div>
        </footer>
    )
}
