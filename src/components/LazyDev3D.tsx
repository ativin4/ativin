"use client"
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Environment, ContactShadows, Html } from '@react-three/drei'
import { Group, PointLight } from 'three'
import LoadingSpinner from './LoadingSpinner'

function Model({ isProcessing }: { isProcessing: boolean }) {
  const recliner = useRef<Group>(null)
  const laptop = useRef<Group>(null)
  const processingLight = useRef<PointLight>(null)

  useFrame((state) => {
    if (isProcessing && processingLight.current) {
      processingLight.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <group position-y={-2} rotation={[0,-2.5,0]}>
      {/* Recliner */}
      <group ref={recliner} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 0.3, 2]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>

        {/* Seat Cushion */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.15, 1.8]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>

        {/* Back Rest */}
        <group position={[0, 0.6, 0.8]} rotation={[Math.PI * 0.25, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 1.2, 0.2]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
          {/* Back Cushion */}
          <mesh position={[0, 0, -0.15]}>
            <boxGeometry args={[0.7, 1, 0.15]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        </group>

        {/* Armrests */}
        <mesh position={[-0.5, 0.4, 0]}>
          <boxGeometry args={[0.2, 0.4, 1.6]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>
        <mesh position={[0.5, 0.4, 0]}>
          <boxGeometry args={[0.2, 0.4, 1.6]} />
          <meshStandardMaterial color="#1a202c" />
        </mesh>

        {/* Footrest */}
        <group position={[0, -0.1, -1]} rotation={[Math.PI * 0.15, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.15, 0.8]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
          {/* Footrest Cushion */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.7, 0.1, 0.7]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        </group>
      </group>
      
      {/* Developer Body */}
      <group position={[0, 1.2, 0.2]} rotation={[Math.PI * 0.25, Math.PI, 0]}>
        {/* Torso */}
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.25, 0.6, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        
        {/* Head */}
        <group position={[0, 0.8, 0.1]} rotation={[-Math.PI * 0.15, Math.PI, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#FFB7B7" />
          </mesh>
          
          {/* Eye Cover */}
          <mesh position={[0, 0, -0.2]} rotation={[0.3, Math.PI, 0]}>
            <boxGeometry args={[0.45, 0.12, 0.1]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        </group>

        {/* Arms */}
        <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI * 0.8]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI * 0.8]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>

        {/* Legs */}
        {/* Thighs */}
        <mesh position={[-0.15, -0.5, 0.25]} rotation={[-Math.PI * 0.15, Math.PI, 0]}>
          <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh position={[0.15, -0.5, 0.25]} rotation={[-Math.PI * 0.15, Math.PI, 0]}>
          <capsuleGeometry args={[0.1, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>

        {/* Calves */}
        <mesh position={[-0.15, -1.0, 0.4]} rotation={[-Math.PI * 0.05, Math.PI * 0.30, 0]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh position={[0.15, -1.0, 0.4]} rotation={[-Math.PI * 0.05, Math.PI * 0.50, 0]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>

        {/* Laptop */}
        <group ref={laptop} position={[-0.05, -0.4, 0.4]} rotation={[1, 0, 0]}>
          {/* Base */}
          <mesh>
            <boxGeometry args={[0.6, 0.02, 0.4]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
          
          {/* Screen */}
          <mesh position={[0, 0.2, 0.2]} rotation={[-Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.6, 0.4, 0.02]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
          
          {/* Screen Content */}
          <mesh position={[0, 0.2, 0.19]} rotation={[-Math.PI / 6, 0, 0]}>
            <planeGeometry args={[0.55, 0.35]} />
            <meshBasicMaterial color="#2d3748" />
          </mesh>
          
          {/* Processing Light */}
          <pointLight
            ref={processingLight}
            position={[0, 0.2, 0.1]}
            color="#48bb78"
            intensity={0}
            distance={1}
          />
        </group>
      </group>

      {/* Floating Thoughts */}
      <Html position={[-0.8, 2.8, 0]} transform occlude rotation={[0, Math.PI, 0]}>
        <div className="px-3 py-1.5 bg-gray-800/90 rounded-lg text-sm text-green-400 whitespace-nowrap animate-float-slow backdrop-blur-sm">
          const thoughts = []
        </div>
      </Html>
      <Html position={[0, 3.0, 0]} transform occlude rotation={[0, Math.PI, 0]}>
        <div className="px-3 py-1.5 bg-gray-800/90 rounded-lg text-sm text-blue-400 whitespace-nowrap animate-float-medium backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
          await brain.process()
        </div>
      </Html>
      <Html position={[0.8, 2.8, 0]} transform occlude rotation={[0, Math.PI, 0]}>
        <div className="px-3 py-1.5 bg-gray-800/90 rounded-lg text-sm text-purple-400 whitespace-nowrap animate-float-fast backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
          git commit -m &quot;thinking...&quot;
        </div>
      </Html>
    </group>
  )
}

export default function LazyDev3D() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ position: 'absolute' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#111827']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} castShadow shadow-normalBias={0.75} />
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 6, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
            <Model isProcessing={true} />
          </PresentationControls>
          <ContactShadows position-y={-1.5} opacity={0.4} scale={5} blur={2.4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none" style={{ visibility: 'hidden' }} aria-hidden="true">
        <LoadingSpinner />
      </div>
    </div>
  )
}
