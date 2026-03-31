import { useEffect } from "react"
import { initHeroEntrance } from "../animations/heroEntrance"

export default function useHeroEntrance() {
  useEffect(() => {
    initHeroEntrance()
  }, [])
}