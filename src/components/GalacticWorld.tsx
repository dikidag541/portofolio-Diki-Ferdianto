import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(5000 * 3); // More stars
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.08;
    ref.current.rotation.x = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#2a2a2a"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.NormalBlending}
        opacity={0.2}
      />
    </Points>
  );
};

const RailwayTrack = () => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 100; i++) {
      p.push(new THREE.Vector3(Math.sin(i * 0.5) * 2, Math.cos(i * 0.5) * 2, -i * 10));
    }
    return new THREE.CatmullRomCurve3(p);
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.TubeGeometry(points, 200, 0.05, 8, false); // Thicker track
  }, [points]);

  return (
    <group>
      <mesh geometry={lineGeometry}>
        <meshBasicMaterial color="#7a8fa3" transparent opacity={0.2} wireframe />
      </mesh>
      {/* Outer glow track */}
      <mesh geometry={lineGeometry}>
        <meshBasicMaterial color="#a69e94" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const CameraController = () => {
  const { scrollYProgress } = useScroll();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    const scrollVal = scrollYProgress.get();
    const targetZ = 20 - scrollVal * 300; // Much more travel
    const targetX = Math.sin(scrollVal * Math.PI * 4) * 12;
    const targetY = Math.cos(scrollVal * Math.PI * 4) * 6;

    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.05);
    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
    
    cameraRef.current.lookAt(0, 0, targetZ - 40);
    cameraRef.current.rotation.z = THREE.MathUtils.lerp(cameraRef.current.rotation.z, targetX * 0.03, 0.05);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[0, 0, 10]} />;
};

const GalacticWorld = () => {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#f4f4f0']} />
        <fog attach="fog" args={['#f4f4f0', 10, 50]} />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        
        <CameraController />
        
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
          <ParticleField />
        </Float>
        
        <Stars radius={150} depth={60} count={7000} factor={6} saturation={1} fade speed={2} />
        
        {/* Subtle Grid */}
        <gridHelper args={[200, 40, '#d1cfc7', '#e8e6e1']} position={[0, -8, 0]} opacity={0.5} transparent />
        
        <RailwayTrack />
      </Canvas>
    </div>
  );
};

export default GalacticWorld;
