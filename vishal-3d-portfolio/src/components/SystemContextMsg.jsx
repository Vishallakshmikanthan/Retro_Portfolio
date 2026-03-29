import React, { useEffect, useState } from "react"

export default function SystemContextMsg() {
  const [msg, setMsg] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    let timeoutId

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) {
              setMsg(`> ${id.toUpperCase()}.EXE initialized...`)
              setIsVisible(true)
              clearTimeout(timeoutId)
              timeoutId = setTimeout(() => {
                setIsVisible(false)
              }, 2500)
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    // Wait a tick for DOM to render
    setTimeout(() => {
      const sections = document.querySelectorAll("section[id], .window-main, .window-secondary")
      sections.forEach((s) => {
        if (s.id) observer.observe(s)
      })
    }, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-24 left-4 z-[9999] pointer-events-none bg-black/60 border border-[#00ff00]/30 p-2 font-mono text-[10px] text-[#00ff00] uppercase tracking-widest backdrop-blur-sm overflow-hidden whitespace-nowrap">
      <div className="animate-[typing_1s_steps(30,end)]">
        {msg}
      </div>
    </div>
  )
}
