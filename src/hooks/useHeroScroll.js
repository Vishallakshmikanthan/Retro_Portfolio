import { useEffect } from "react"
import { initHeroScroll } from "../animations/heroScroll"

export default function useHeroScroll() {
  useEffect(() => {
    initHeroScroll()
  }, [])
}