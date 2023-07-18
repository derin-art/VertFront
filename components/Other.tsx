import { useRef, useState, useEffect, useMemo } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import dynamic from "next/dynamic";
import { BufferAttribute } from "three";
import { useLoader } from "@react-three/fiber";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrthographicCamera,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

const Box = () => {
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });
  return (
    <mesh position={[0, 0, 0]} material={material}>
      <boxBufferGeometry args={[5, 6]}></boxBufferGeometry>
      <meshStandardMaterial
        color={"red"}
        attach={"material"}
      ></meshStandardMaterial>
    </mesh>
  );
};

export default function Other() {
  return (
    <Canvas
      camera={{ position: [-40, 0, 0], fov: 10 }}
      style={{
        border: "2px red solid",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box></Box>
      <OrbitControls></OrbitControls>
    </Canvas>
  );
}
