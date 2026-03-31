import { memo } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import HologramDeveloper from "../components/HologramDeveloper"

const SceneLights = memo(function SceneLights() {
  return (
    <>
      <ambientLight intensity={2.0} />
      <directionalLight position={[10, 20, 10]} intensity={2.5} />
      <pointLight position={[-10, 10, -10]} intensity={2.0} />
    </>
  )
})

function BaseScene() {
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 2.5, 14], fov: 45 }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Suspense fallback={null}>
        <SceneLights />
        <HologramDeveloper />
      </Suspense>
    </Canvas>
  )
}

export default memo(BaseScene)