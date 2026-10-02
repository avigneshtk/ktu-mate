"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

function Desk() {
  return (
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={[6, 0.4, 3]} />
      <meshStandardMaterial color="#8b5a2b" />
    </mesh>
  );
}

function Laptop() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2.4, 0.15, 1.6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      <mesh position={[0, 0.4, -0.65]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[2.4, 1.6, 0.12]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}

type BookProps = {
  color: string;
  onClick: () => void;
};

function Book({ color, onClick }: BookProps) {
  return (
    <mesh
      position={[-2, -0.65, 0.2]}
      rotation={[0, 0.1, 0]}
      onClick={onClick}
    >
      <boxGeometry args={[1.5, 0.3, 1.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cup() {
  return (
    <mesh position={[2, -0.45, 0.3]}>
      <cylinderGeometry args={[0.45, 0.35, 0.9, 32]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

export default function StudyScene() {
  const colors = ["#2563eb", "#16a34a", "#f59e0b", "#9333ea"];

  const [colorIndex, setColorIndex] = useState(0);

  function changeBookColor() {
    setColorIndex((current) => (current + 1) % colors.length);
  }

  return (
    <div>
      <div className="h-[600px] w-full overflow-hidden rounded-2xl bg-slate-950">
        <Canvas camera={{ position: [7, 5, 8], fov: 45 }}>
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={3}
          />

          <Desk />
          <Laptop />

          <Book
            color={colors[colorIndex]}
            onClick={changeBookColor}
          />

          <Cup />

          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={12}
          />
        </Canvas>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-center">
        <p className="text-sm font-semibold text-slate-700">
          Interactive Book
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Click the book to change its color.
        </p>

        <div
          className="mx-auto mt-3 h-6 w-6 rounded-full border-2 border-slate-300"
          style={{
            backgroundColor: colors[colorIndex],
          }}
        />
      </div>
    </div>
  );
}