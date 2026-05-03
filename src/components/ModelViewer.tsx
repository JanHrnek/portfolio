"use client"

import { Suspense, useRef, useMemo, useLayoutEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei"
import { Box3, Vector3, PerspectiveCamera, Group } from "three"

function Loader() {
  return (
    <Html center>
      <div
        className="animate-spin"
        style={{
          width: 28,
          height: 28,
          border: "2px solid rgba(200,169,110,0.2)",
          borderTopColor: "#D97706",
          borderRadius: "50%",
        }}
      />
    </Html>
  )
}

interface SceneProps {
  path: string
  isMobile: boolean
  onComplete: () => void
}

function Scene({ path, isMobile, onComplete }: SceneProps) {
  const { scene } = useGLTF(path)
  const { camera, invalidate } = useThree()
  const ref = useRef<Group | null>(null)
  const controlsRef = useRef<any>(null)
  const autoRotate = useRef(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progress = useRef(0)
  const fired = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Compute bounding box synchronously — scene is available after Suspense resolves
  const { center, size, distance } = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new Box3().setFromObject(scene)
    const s = box.getSize(new Vector3())
    const c = box.getCenter(new Vector3())
    const maxDim = Math.max(s.x, s.y, s.z)
    // Must match Canvas fov={45}
    const fov = 45 * (Math.PI / 180)
    const dist = (maxDim / 2) / Math.tan(fov / 2) * 1.6
    return { center: c, size: s, distance: dist }
  }, [scene])

  // Set camera BEFORE first frame — useLayoutEffect fires before requestAnimationFrame
  useLayoutEffect(() => {
    const cam = camera as PerspectiveCamera
    camera.position.set(center.x, center.y + size.y * 0.05, center.z + distance)
    cam.near = distance / 100
    cam.far = distance * 100
    cam.updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.set(center.x, center.y, center.z)
      controlsRef.current.update()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  useFrame((_, delta) => {
    if (!ref.current || !autoRotate.current) return
    const d = Math.min(delta, 0.1) // clamp lag spikes
    const increment = (2 * Math.PI / 6) * d // 6 s per full rotation
    ref.current.rotation.y += increment
    progress.current += increment
    if (!fired.current && progress.current >= 2 * Math.PI) {
      fired.current = true
      autoRotate.current = false
      onCompleteRef.current()
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} />
      <Environment preset="city" background={false} />
      <primitive ref={ref} object={scene} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableZoom={!isMobile}
        minDistance={distance * 0.3}
        maxDistance={distance * 3}
        enablePan={false}
        onStart={() => {
          if (timer.current) clearTimeout(timer.current)
          autoRotate.current = false
        }}
        onEnd={() => {
          timer.current = setTimeout(() => {
            if (!fired.current) autoRotate.current = true
          }, 2000)
        }}
      />
    </>
  )
}

interface ModelViewerProps {
  path: string
  isMobile: boolean
  onComplete: () => void
}

export default function ModelViewer({ path, isMobile, onComplete }: ModelViewerProps) {
  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      onPointerDown={e => e.stopPropagation()}
      onPointerMove={e => e.stopPropagation()}
      onPointerUp={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
      onTouchMove={e => e.stopPropagation()}
      onTouchEnd={e => e.stopPropagation()}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<Loader />}>
          <Scene path={path} isMobile={isMobile} onComplete={onComplete} />
        </Suspense>
      </Canvas>
    </div>
  )
}
