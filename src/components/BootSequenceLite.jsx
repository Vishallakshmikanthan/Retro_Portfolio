import React, { useState, useEffect } from "react"
import gsap from "gsap"

export default function BootSequenceLite({ onComplete }) {
  const [lines, setLines] = useState([])
  
  useEffect(() => {
    localStorage.setItem('hasBootedLocally', 'true')
    
    // Lock scroll briefly
    document.body.style.overflow = 'hidden'

    const sequence = [
      "> Initializing VISHAL.EXE...",
      "> Loading modules...",
      "> System Ready."
    ]
    
    let currentLine = 0
    const interval = setInterval(() => {
      setLines(prev => [...prev, sequence[currentLine]])
      currentLine++
      if (currentLine >= sequence.length) {
        clearInterval(interval)
        setTimeout(() => {
          gsap.to(".boot-lite-container", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              document.body.style.overflow = ''
              onComplete()
            }
          })
        }, 300)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="boot-lite-container fixed inset-0 z-[99999] bg-black text-[#00ff00] font-mono p-8 flex flex-col justify-center items-center pointer-events-auto">
      <div className="text-left w-full max-w-lg text-[14px] md:text-[16px] leading-loose flex flex-col gap-2">
        {lines.map((l, i) => (
          <div key={i} className="animate-[typing_0.2s_steps(20,end)] overflow-hidden whitespace-nowrap">
            {l}
          </div>
        ))}
        {lines.length === 3 && (
          <div className="w-4 h-5 mt-1 bg-[#00ff00] animate-pulse" />
        )}
      </div>
    </div>
  )
}
