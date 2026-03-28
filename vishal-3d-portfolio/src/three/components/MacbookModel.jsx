import { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// ── Shared mouse state (no React state, zero re-renders) ─────────────────────
const mouse = { x: 0, y: 0 }

function trackMouse(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

export default function MacbookModel() {
    const groupRef = useRef()
    const { scene } = useGLTF("/models/mackbook.glb")

    // ── Centre the model on load ─────────────────────────────────────────────
    useEffect(() => {
        if (!scene) return

        // Reset any existing transforms
        scene.rotation.set(0, 0, 0)
        scene.scale.set(1, 1, 1)

        // Compute bounding box and centre the model
        const box = new THREE.Box3().setFromObject(scene)
        const center = new THREE.Vector3()
        box.getCenter(center)
        scene.position.sub(center)

        scene.updateMatrixWorld(true)
    }, [scene])

    // ── Global mouse tracking for parallax tilt ──────────────────────────────
    useEffect(() => {
        window.addEventListener("mousemove", trackMouse)
        return () => window.removeEventListener("mousemove", trackMouse)
    }, [])

    // ── Idle float + subtle rotation + mouse parallax ────────────────────────
    const targetRotY = useRef(0)
    const targetRotX = useRef(0)

    useFrame(({ clock }) => {
        if (!groupRef.current) return

        const t = clock.elapsedTime

        // Smooth idle float on Y axis (±0.12 units over ~3 s)
        groupRef.current.position.y = Math.sin(t * 0.6) * 0.12

        // Slow self-rotation around Y (very subtle — ~4° full swing)
        const baseRotY = Math.sin(t * 0.3) * 0.07

        // Mouse parallax tilt targets
        targetRotY.current = THREE.MathUtils.lerp(
            targetRotY.current,
            mouse.x * 0.18 + baseRotY,
            0.04
        )
        targetRotX.current = THREE.MathUtils.lerp(
            targetRotX.current,
            -mouse.y * 0.10,
            0.04
        )

        groupRef.current.rotation.y = targetRotY.current
        groupRef.current.rotation.x = targetRotX.current
    })

    return (
        <group
            ref={groupRef}
            /*
             * Orientation to match reference image:
             *   Y = -0.55 rad → turns left side of laptop toward camera (~31°)
             *   X =  0.20 rad → tilts base/keyboard forward so it's prominent in view
             *   Z =  0.04 rad → very slight roll for natural perspective lean
             * Position shifted left so model sits right-of-center in the canvas.
             */
            position={[20, 0, 0]}
            rotation={[0.20, -0.55, 0.04]}
            scale={1.05}
        >
            <primitive object={scene} />
        </group>
    )
}

// Preload so there's no pop-in when Skills section scrolls into view
useGLTF.preload("/models/mackbook.glb")
