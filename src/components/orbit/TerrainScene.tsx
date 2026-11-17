import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.PlaneGeometry(40, 40, 120, 120), []);
  const original = useMemo(() => Float32Array.from(geom.attributes.position.array), [geom]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = geom.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      pos[i + 2] =
        Math.sin(x * 0.3 + t * 0.4) * 0.6 +
        Math.cos(y * 0.4 + t * 0.3) * 0.5 +
        Math.sin((x + y) * 0.15 + t * 0.2) * 0.4;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();
    if (mesh.current) mesh.current.rotation.z = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -3, 0]} geometry={geom}>
      <meshStandardMaterial
        color={new THREE.Color("#15803D")}
        emissive={new THREE.Color("#15803D")}
        emissiveIntensity={0.08}
        wireframe
      />
    </mesh>
  );
}

function Nodes() {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        x: (Math.random() - 0.5) * 18,
        y: -2 + Math.random() * 0.5,
        z: (Math.random() - 0.5) * 10,
        s: 0.5 + Math.random() * 1.5,
      })),
    []
  );
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((c, i) => {
      c.position.y = -2 + Math.sin(t * 0.8 + i) * 0.3;
      (c as THREE.Mesh).scale.setScalar(0.05 + Math.sin(t * 1.5 + i) * 0.02);
    });
  });
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#B91C1C" />
        </mesh>
      ))}
    </group>
  );
}

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 0.8;
    camera.position.y = 1.5 + Math.sin(t * 0.15) * 0.3;
    camera.lookAt(0, -1, -2);
  });
  return null;
}

export function TerrainScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.5, 8], fov: 55 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#F3F4F6", 12, 32]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 8, 5]} intensity={1.2} color="#EAB308" />
        <pointLight position={[-10, 4, -5]} intensity={0.9} color="#15803D" />
        <Terrain />
        <Nodes />
        <CameraDrift />
      </Suspense>
    </Canvas>
  );
}
