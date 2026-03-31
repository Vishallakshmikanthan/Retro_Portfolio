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
        <footer className="site-footer bg-[#c0c0c0] border-t-2 border-white py-4 font-mono">
            <div className="section-container flex flex-col md:flex-row justify-between items-center opacity-80 text-xs text-black border-t border-b border-black py-2 px-4 shadow-[inset_1px_1px_0px_0px_#808080]">
                <div>SYS STATUS: <span className="text-[#000080] font-bold">ONLINE</span></div>
                <div className="hidden md:block text-[#808080]">|</div>
                <div>BUILD VERSION: V98.0.1</div>
                <div className="hidden md:block text-[#808080]">|</div>
                <div>YEAR: 2026</div>
                <div className="hidden md:block text-[#808080]">|</div>
                <div className="flex gap-4">
                    <a href="https://github.com/Vishallakshmikanthan" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#000080]">GITHUB</a>
                    <a href="https://www.linkedin.com/in/vishallakshmikanthan/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#000080]">LINKEDIN</a>
                </div>
            </div>
            <div className="text-center mt-2 text-[10px] opacity-50">
                VISHAL LAKSHMIKANTHAN. BUILT FOR STABILITY.
            </div>
        </footer>
    )
}
