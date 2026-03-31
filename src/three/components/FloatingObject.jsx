import { useRef, forwardRef } from "react"
import { useFrame } from "@react-three/fiber"

const FloatingObject = forwardRef(({ scrollScale = 1 }, ref) => {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4
      meshRef.current.position.y = Math.sin(t) * 0.2

      // Smooth scale interpolation
      meshRef.current.scale.lerp(
        { x: scrollScale, y: scrollScale, z: scrollScale },
        0.1
      )
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#00ffff"
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
  )
})

export default FloatingObject