import React, { useState, useEffect } from "react"
import gsap from "gsap"

const events = [
  "Background sync complete.",
  "Modules optimized.",
  "Garbage collection executed.",
  "Network ping: 12ms",
  "Cache cleared.",
  "Memory fragmented: 2%",
  "System health: Nominal.",
  "Allocating resources...",
  "VRAM paging OK",
  "Connection secured."
]

export default function MicroEventsManager() {
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    const triggerEvent = () => {
      const msg = events[Math.floor(Math.random() * events.length)]
      setActiveEvent(msg)
      
      // Animate in and out
      setTimeout(() => {
        gsap.fromTo(".micro-event", 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out",
            onComplete: () => {
              setTimeout(() => {
                gsap.to(".micro-event", { 
                  opacity: 0, 
                  y: -5,
                  duration: 0.3, 
                  onComplete: () => setActiveEvent(null) 
                })
              }, 2500)
            }
          })
      }, 50)
    }

    const interval = setInterval(() => {
      triggerEvent()
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  if (!activeEvent) return null

  return (
    <div className="micro-event fixed bottom-[40px] right-4 z-[9999] bg-[#000080] text-[#00ff00] px-3 py-1 font-mono text-[10px] border border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] pointer-events-none">
      SYS_EVENT: {activeEvent}
    </div>
  )
}
