"use client"

import { useRef, useMemo, useLayoutEffect, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Html } from "@react-three/drei"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion"
import * as THREE from "three"

const MODEL_PATH = "/models/axiscore/AxisCore.glb"

// ─── Stop data ─────────────────────────────────────────────────────────────

const STOPS = [
  {
    title: "AxisCore Gimbal",
    description:
      "2-axis camera stabilizer built from scratch. Every component designed, printed and assembled by hand.",
    camZMult: 1.2,  camYMult: 0,      camXMult: 0,     targetYMult: 0,     rotY: 0,
  },
  {
    title: "MagSafe Mount",
    description:
      "Universal phone attachment compatible with all MagSafe accessories. Designed for tool-free swap.",
    camZMult: 0.6,  camYMult: 0.38,   camXMult: 0,     targetYMult: 0.38,  rotY: 0,
  },
  {
    title: "Manual Control",
    description:
      "Joystick controls pan and tilt. Three buttons: left, right, and home position reset.",
    camZMult: 0.65, camYMult: -0.04,  camXMult: 0.22,  targetYMult: -0.04, rotY: Math.PI * 0.55,
  },
  {
    title: "PETG Structure",
    description:
      "6 generations of printed parts. Each iteration refined balance, rigidity and servo clearance.",
    camZMult: 0.65, camYMult: -0.1,   camXMult: -0.12, targetYMult: -0.1,  rotY: Math.PI * 1.1,
  },
  {
    title: "Arduino Nano Core",
    description:
      "Servomotors driven by Arduino Nano. Designed for PID — built for reality.",
    camZMult: 1.2,  camYMult: 0,      camXMult: 0,     targetYMult: 0,     rotY: Math.PI * 1.75,
  },
]

// Scroll keyframes: progress → fractional stop index [0..4]
const SCROLL_KEYS = [0,    0.16, 0.20, 0.36, 0.40, 0.56, 0.60, 0.76, 0.82, 1.0]
const STOP_KEYS   = [0,    0,    1,    1,    2,    2,    3,    3,    4,    4  ]

const ACTIVE_RANGES: [number, number][] = [
  [0.01, 0.16],
  [0.20, 0.36],
  [0.40, 0.56],
  [0.60, 0.76],
  [0.82, 1.00],
]

// 3D anchor per stop — fractions of half-extents [x, y, z] in model-local space
const ANCHOR_FRACS: [number, number, number][] = [
  [ 0,     0,     0  ], // overview — model center
  [ 0,     0.45,  0  ], // MagSafe — top of model
  [ 0.15, -0.28,  0  ], // Joystick — lower-right
  [ 0,    -0.05,  0  ], // PETG — body center
  [ 0,    -0.12,  0  ], // Arduino — slightly below center
]

// ─── Module-level temp vectors ─────────────────────────────────────────────
const _tmpVec = new THREE.Vector3()
const _Y_AXIS = new THREE.Vector3(0, 1, 0)

// ─── Helpers ───────────────────────────────────────────────────────────────

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function getStopFraction(progress: number): number {
  const p = Math.max(0, Math.min(1, progress))
  for (let i = 0; i < SCROLL_KEYS.length - 1; i++) {
    if (p <= SCROLL_KEYS[i + 1]) {
      const s = SCROLL_KEYS[i], e = SCROLL_KEYS[i + 1]
      if (e === s) return STOP_KEYS[i]
      const raw = (p - s) / (e - s)
      const eased = STOP_KEYS[i] !== STOP_KEYS[i + 1] ? easeInOut(raw) : raw
      return STOP_KEYS[i] + (STOP_KEYS[i + 1] - STOP_KEYS[i]) * eased
    }
  }
  return STOP_KEYS[STOP_KEYS.length - 1]
}

function getActiveStop(progress: number): number | null {
  for (let i = 0; i < ACTIVE_RANGES.length; i++) {
    const [s, e] = ACTIVE_RANGES[i]
    if (progress >= s && progress <= e) return i
  }
  return null
}

function lerpAngle(a: number, b: number, t: number): number {
  const d = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI
  return a + d * t
}

function computeTarget(progress: number, dist: number, sizeY: number, sizeX: number) {
  const f  = getStopFraction(progress)
  const lo = Math.max(0, Math.min(STOPS.length - 1, Math.floor(f)))
  const hi = Math.max(0, Math.min(STOPS.length - 1, Math.ceil(f)))
  const t  = f - lo
  const a  = STOPS[lo], b = STOPS[hi]
  const lerp = (x: number, y: number) => x + (y - x) * t
  return {
    camPos: new THREE.Vector3(
      lerp(a.camXMult, b.camXMult) * sizeX,
      lerp(a.camYMult, b.camYMult) * sizeY,
      lerp(a.camZMult, b.camZMult) * dist,
    ),
    camTarget: new THREE.Vector3(0, lerp(a.targetYMult, b.targetYMult) * sizeY, 0),
    modelRotY: lerpAngle(a.rotY, b.rotY, t),
  }
}

// Compute a tight bounding box using only visible mesh geometry.
// GLB exports often include invisible helper objects (coordinate markers, mate
// references, etc.) that inflate Box3.setFromObject — this avoids that.
function meshOnlyBox(root: THREE.Object3D): THREE.Box3 {
  root.updateMatrixWorld(true)
  const box = new THREE.Box3()
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh || !mesh.geometry) return
    const geo = mesh.geometry
    if (!geo.boundingBox) geo.computeBoundingBox()
    if (geo.boundingBox && !geo.boundingBox.isEmpty()) {
      const local = geo.boundingBox.clone().applyMatrix4(mesh.matrixWorld)
      box.union(local)
    }
  })
  if (box.isEmpty()) new THREE.Box3().setFromObject(root) // fallback
  return box
}

// ─── R3F: Main scene ───────────────────────────────────────────────────────

function ModelScene({
  scrollRef,
  activeStopRef,
  anchorPixelRef,
}: {
  scrollRef: React.MutableRefObject<number>
  activeStopRef: React.MutableRefObject<number | null>
  anchorPixelRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const { scene }  = useGLTF(MODEL_PATH)
  const { camera } = useThree()
  const groupRef   = useRef<THREE.Group>(null)
  const floatTick  = useRef(0)
  const floatYRef  = useRef(0)

  // Use mesh-only bounding box so invisible export helpers don't skew centering
  const { dist, offset, sizeY, sizeX, sizeZ } = useMemo(() => {
    const box = meshOnlyBox(scene)
    const s   = box.getSize(new THREE.Vector3())
    const c   = box.getCenter(new THREE.Vector3())
    const max = Math.max(s.x, s.y, s.z)
    // 2× margin ensures the model is fully visible even with camZMult < 1
    const d   = (max / 2) / Math.tan((45 * Math.PI) / 360) * 2.0
    return { dist: d, offset: c, sizeY: s.y, sizeX: s.x, sizeZ: s.z }
  }, [scene])

  const cloned = useMemo(() => scene.clone(true), [scene])

  const curPos    = useRef(new THREE.Vector3(0, 0, 10))
  const curTarget = useRef(new THREE.Vector3())
  const curRotY   = useRef(0)

  // Initialise camera exactly at stop-0 position so first frame is correct
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    const initZ = STOPS[0].camZMult * dist
    const initY = STOPS[0].camYMult * sizeY
    const tgtY  = STOPS[0].targetYMult * sizeY
    cam.position.set(0, initY, initZ)
    cam.near = dist / 100
    cam.far  = dist * 100
    cam.lookAt(0, tgtY, 0)
    cam.updateProjectionMatrix()
    curPos.current.set(0, initY, initZ)
    curTarget.current.set(0, tgtY, 0)
  }, [camera, dist, sizeY])

  useFrame((state, delta) => {
    const T = 1 - Math.pow(0.05, delta)

    const { camPos, camTarget, modelRotY } = computeTarget(
      scrollRef.current, dist, sizeY, sizeX
    )
    curPos.current.lerp(camPos, T)
    state.camera.position.copy(curPos.current)
    curTarget.current.lerp(camTarget, T)
    state.camera.lookAt(curTarget.current)
    curRotY.current = lerpAngle(curRotY.current, modelRotY, T)

    floatTick.current += delta * 0.3
    floatYRef.current = Math.sin(floatTick.current) * dist * 0.011

    if (groupRef.current) {
      groupRef.current.rotation.y = curRotY.current
      groupRef.current.position.y = floatYRef.current
    }

    // Project the stop's 3D anchor to screen pixels for the callout line
    const ai = activeStopRef.current
    if (ai !== null && ai < ANCHOR_FRACS.length) {
      const [fx, fy, fz] = ANCHOR_FRACS[ai]
      _tmpVec.set(fx * sizeX * 0.5, fy * sizeY * 0.5, fz * sizeZ * 0.5)
      _tmpVec.applyAxisAngle(_Y_AXIS, curRotY.current)
      _tmpVec.y += floatYRef.current
      _tmpVec.project(state.camera)
      anchorPixelRef.current = {
        x: (_tmpVec.x + 1) / 2 * state.size.width,
        y: (1 - _tmpVec.y) / 2 * state.size.height,
      }
    }
  })

  return (
    <>
      {/* Soft neutral lighting for clean look on light background */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]}  intensity={0.45} />
      <directionalLight position={[-3, 3, -3]} intensity={0.22} />
      <group ref={groupRef}>
        <group position={[-offset.x, -offset.y, -offset.z]}>
          <primitive object={cloned} />
        </group>
      </group>
    </>
  )
}

// ─── Loading spinner ───────────────────────────────────────────────────────

function SceneLoader({ accent }: { accent: string }) {
  return (
    <Html center>
      <div
        className="animate-spin"
        style={{
          width: 28, height: 28,
          border: `1.5px solid rgba(0,0,0,0.08)`,
          borderTopColor: accent,
          borderRadius: "50%",
        }}
      />
    </Html>
  )
}

// ─── Callout overlay ───────────────────────────────────────────────────────

function CalloutOverlay({
  anchorRef,
  activeStop,
  accent,
}: {
  anchorRef: React.RefObject<{ x: number; y: number }>
  activeStop: number | null
  accent: string
}) {
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [W, setW] = useState(1440)

  useEffect(() => {
    const update = () => setW(window.innerWidth)
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  // Read projected anchor after camera has settled at the new stop
  useEffect(() => {
    if (activeStop === null) return
    const timer = setTimeout(() => {
      const v = anchorRef.current
      if (v && v.x > 0) setAnchor({ x: v.x, y: v.y })
    }, 520)
    return () => clearTimeout(timer)
  }, [activeStop, anchorRef])

  const visible = activeStop !== null
  const x1 = anchor.x || W * 0.43
  const y1 = anchor.y || 300
  // Line terminates just left of the annotation card (~71% from left)
  const x2 = W * 0.71
  const d  = `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${(x2 - 18).toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y1.toFixed(1)}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
      width={W}
      height="100%"
    >
      <AnimatePresence>
        {visible && (
          <>
            <motion.circle
              key={`ring-${activeStop}`}
              cx={x1} cy={y1} r={9}
              fill="none" stroke={accent} strokeWidth={0.75}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: `${x1}px ${y1}px` }}
            />
            <motion.circle
              key={`dot-${activeStop}`}
              cx={x1} cy={y1} r={3.5}
              fill={accent}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.25, delay: 0.06 }}
              style={{ transformOrigin: `${x1}px ${y1}px` }}
            />
            <motion.path
              key={`line-${activeStop}`}
              d={d}
              fill="none" stroke={accent} strokeWidth={0.75}
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.55, ease: [0.25, 0, 0.35, 1], delay: 0.12 },
                opacity: { duration: 0.3 },
              }}
            />
          </>
        )}
      </AnimatePresence>
    </svg>
  )
}

// ─── Annotation card ───────────────────────────────────────────────────────

function AnnotationCard({
  stop,
  accent,
}: {
  stop: (typeof STOPS)[number]
  accent: string
}) {
  return (
    <div
      style={{
        position: "relative",
        padding: "20px 24px 22px",
        maxWidth: 286,
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "3px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}
    >
      {/* Technical corner — top-left */}
      <div style={{ position: "absolute", top: -1, left: -1, pointerEvents: "none" }} aria-hidden>
        <svg width={16} height={16} fill="none">
          <path d="M1 15 L1 1 L15 1" stroke={accent} strokeWidth={1.5} />
        </svg>
      </div>
      {/* Technical corner — bottom-right */}
      <div style={{ position: "absolute", bottom: -1, right: -1, pointerEvents: "none" }} aria-hidden>
        <svg width={10} height={10} fill="none">
          <path d="M1 9 L9 9 L9 1" stroke="var(--color-border)" strokeWidth={1} />
        </svg>
      </div>

      <p style={{
        fontSize: "0.52rem",
        fontFamily: "var(--font-heading)",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: accent,
        marginBottom: "0.5rem",
      }}>
        Component
      </p>
      <h3 style={{
        fontFamily: "var(--font-heading)",
        fontWeight: 600,
        fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "var(--color-text)",
        marginBottom: "0.6rem",
      }}>
        {stop.title}
      </h3>
      <p style={{
        fontSize: "0.78rem",
        lineHeight: 1.7,
        color: "var(--color-muted)",
      }}>
        {stop.description}
      </p>
    </div>
  )
}

// ─── Progress dots ─────────────────────────────────────────────────────────

function ProgressDots({ active, accent }: { active: number | null; accent: string }) {
  return (
    <div style={{
      position: "absolute",
      right: "clamp(1rem, 1.8vw, 1.5rem)",
      top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 10, zIndex: 20, pointerEvents: "none",
    }}>
      {STOPS.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: active === i ? 1 : 0.6,
            backgroundColor: active === i ? accent : "var(--color-border)",
            boxShadow: active === i ? `0 0 8px ${accent}60` : "none",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ width: 6, height: 6, borderRadius: "50%" }}
        />
      ))}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function AxisCoreScrollViewer({ accent }: { accent: string }) {
  const sectionRef     = useRef<HTMLDivElement>(null)
  const scrollRef      = useRef(0)
  const activeStopRef  = useRef<number | null>(0)
  const anchorPixelRef = useRef({ x: 0, y: 0 })
  const [activeStop, setActiveStop] = useState<number | null>(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const progressBarW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const hintOpacity  = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v
    const s = getActiveStop(v)
    activeStopRef.current = s
    setActiveStop(s)
  })

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "550vh" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        backgroundColor: "var(--color-bg)",
      }}>
        {/* 3D Canvas — transparent so the bg color above shows through */}
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
        >
          <Suspense fallback={<SceneLoader accent={accent} />}>
            <ModelScene
              scrollRef={scrollRef}
              activeStopRef={activeStopRef}
              anchorPixelRef={anchorPixelRef}
            />
          </Suspense>
        </Canvas>

        {/* Callout SVG overlay — desktop only */}
        <div
          className="hidden lg:block"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 14 }}
        >
          <CalloutOverlay
            anchorRef={anchorPixelRef}
            activeStop={activeStop}
            accent={accent}
          />
        </div>

        {/* Annotation card — desktop */}
        <div
          className="hidden lg:block"
          style={{
            position: "absolute",
            right: "clamp(2.5rem, 5.5vw, 4.5rem)",
            top: "50%", transform: "translateY(-50%)",
            zIndex: 15,
          }}
        >
          <AnimatePresence mode="wait">
            {activeStop !== null && (
              <motion.div
                key={activeStop}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnnotationCard stop={STOPS[activeStop]} accent={accent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Annotation card — mobile */}
        <div
          className="lg:hidden"
          style={{
            position: "absolute",
            bottom: "clamp(4rem, 11vh, 7rem)",
            left: "clamp(1.5rem, 5vw, 3rem)",
            right: "clamp(1.5rem, 5vw, 3rem)",
            zIndex: 15,
          }}
        >
          <AnimatePresence mode="wait">
            {activeStop !== null && (
              <motion.div
                key={activeStop}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32 }}
              >
                <AnnotationCard stop={STOPS[activeStop]} accent={accent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section label */}
        <div style={{
          position: "absolute",
          top: "clamp(1.5rem, 3.5vh, 2.5rem)",
          left: "clamp(1.5rem, 4vw, 4rem)",
          zIndex: 20,
        }}>
          <p style={{
            fontSize: "0.6rem",
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: accent,
            opacity: 0.75,
          }}>
            Interaktivní model
          </p>
        </div>

        <ProgressDots active={activeStop} accent={accent} />

        {/* Top progress bar */}
        <motion.div aria-hidden style={{
          position: "absolute", top: 0, left: 0,
          height: 1.5, width: progressBarW,
          background: `linear-gradient(to right, transparent 0%, ${accent} 40%)`,
          opacity: 0.7,
          zIndex: 20,
        }} />

        {/* Scroll hint */}
        <motion.div aria-hidden style={{
          position: "absolute",
          bottom: "clamp(1.25rem, 4vh, 2.5rem)",
          left: "50%", x: "-50%",
          opacity: hintOpacity,
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 8, pointerEvents: "none", zIndex: 20,
        }}>
          <div style={{
            width: 1, height: 28,
            background: `linear-gradient(to bottom, ${accent}, transparent)`,
          }} />
          <span style={{
            fontSize: "0.55rem",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-subtle)",
          }}>
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}

useGLTF.preload(MODEL_PATH)
