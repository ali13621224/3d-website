import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Grid, MeshDistortMaterial, Stars } from '@react-three/drei'

const SHARDS = [
  { position: [-3.2, 1.6, -1.2], scale: 0.42, color: '#22d3ee', kind: 'octa', speed: 1.5 },
  { position: [3.4, 0.9, -0.8], scale: 0.55, color: '#a855f7', kind: 'ico', speed: 1.1 },
  { position: [-2.4, -1.3, 0.6], scale: 0.3, color: '#f472b6', kind: 'tetra', speed: 1.8 },
  { position: [2.7, -1.6, 0.4], scale: 0.36, color: '#38bdf8', kind: 'torus', speed: 1.3 },
  { position: [0.4, 2.3, -2.2], scale: 0.28, color: '#c4b5fd', kind: 'octa', speed: 2 },
]

/** Page scroll position as 0 → 1, kept in a ref so the render loop never re-renders React. */
function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

function Orb() {
  const mesh = useRef()

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.16
    mesh.current.rotation.x += delta * 0.05
  })

  return (
    <mesh ref={mesh} position={[0, 0.6, 0]}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <MeshDistortMaterial
        color="#0ea5b7"
        emissive="#0e7490"
        emissiveIntensity={0.5}
        roughness={0.15}
        metalness={0.75}
        distort={0.35}
        speed={1.4}
      />
    </mesh>
  )
}

function OrbitRing() {
  const ring = useRef()

  useFrame((_, delta) => {
    if (!ring.current) return
    ring.current.rotation.z += delta * 0.25
    ring.current.rotation.x += delta * 0.12
  })

  return (
    <mesh ref={ring} position={[0, 0.6, 0]}>
      <torusKnotGeometry args={[2.15, 0.02, 240, 8]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
    </mesh>
  )
}

function Shard({ position, scale, color, kind, speed }) {
  return (
    <Float speed={speed} rotationIntensity={1.6} floatIntensity={1.3}>
      <mesh position={position} scale={scale}>
        {kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {kind === 'octa' && <octahedronGeometry args={[1, 0]} />}
        {kind === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
        {kind === 'torus' && <torusGeometry args={[0.85, 0.3, 16, 40]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.25}
          metalness={0.6}
          flatShading
        />
      </mesh>
    </Float>
  )
}

/** Camera rig: lerps toward a target driven by cursor position and scroll progress. */
function World({ scroll }) {
  const group = useRef()

  useFrame((state, delta) => {
    const progress = scroll.current
    const camera = state.camera

    const targetX = state.pointer.x * 0.9
    const targetY = 0.6 + progress * 0.9 - state.pointer.y * 0.5
    const targetZ = 7 - progress * 2.6

    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05
    camera.lookAt(0, 0.6 + progress * 1.7, 0)

    if (group.current) {
      group.current.rotation.y += delta * 0.07
      group.current.rotation.z = progress * 0.35
      group.current.position.y = progress * 3.4
    }
  })

  return (
    <group ref={group}>
      <Orb />
      <OrbitRing />
      {SHARDS.map((shard, index) => (
        <Shard key={index} {...shard} />
      ))}
    </group>
  )
}

export default function Scene3D() {
  const scroll = useScrollProgress()

  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 7], fov: 45 }} gl={{ antialias: true }}>
        <fog attach="fog" args={['#05060a', 9, 30]} />
        <ambientLight intensity={0.5} />
        <hemisphereLight args={['#93c5fd', '#05060a', 0.5]} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} color="#e0f2fe" />
        <pointLight position={[-6, -2, -3]} intensity={45} distance={30} color="#a855f7" />
        <pointLight position={[6, 3, 2]} intensity={35} distance={30} color="#22d3ee" />
        <Stars radius={70} depth={45} count={2200} factor={3.5} saturation={0} fade speed={0.5} />
        <World scroll={scroll} />
        <Grid
          position={[0, -2.6, 0]}
          args={[40, 40]}
          cellSize={0.7}
          cellThickness={0.6}
          cellColor="#1e293b"
          sectionSize={3.5}
          sectionThickness={1}
          sectionColor="#2f4f63"
          fadeDistance={34}
          fadeStrength={1.4}
          infiniteGrid
        />
      </Canvas>
    </div>
  )
}
