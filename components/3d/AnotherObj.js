import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { TextureLoader, Vector3 } from "three";
import * as THREE from "three";
import One from "../../public/TestImages/onesheet1.jpg";
import Sheet from "../../public/TestImages/onesheet3.jpg";
import {
  useGLTF,
  SpotLight,
  useDepthBuffer,
  OrbitControls,
} from "@react-three/drei";
import { useEffect, useState, useRef } from "react";

const Ne = ({ shal }) => {
  return (
    <motion.spotLight
      castShadow
      penumbra={1}
      distance={8}
      angle={0.4}
      transition={{ duration: 1 }}
      animate={shal ? { x: 7.8, y: 4, color: "white" } : { x: -2, y: -4 }}
      attenuation={5}
      anglePower={4}
      intensity={7}
      position={[0, 0, 3]}
    ></motion.spotLight>
  );
};

const Plane = () => {
  const mat = new THREE.MeshPhysicalMaterial({
    metalness: 0.2,
    clearcoat: 2,
    toneMapped: false,
    color: "black",
  });
  return (
    <mesh material={mat}>
      <planeBufferGeometry args={[18, 10]}></planeBufferGeometry>
    </mesh>
  );
};
const Plane1 = () => {
  const base = useLoader(TextureLoader, Sheet.src);
  const mat = new THREE.MeshPhysicalMaterial({
    metalness: 0.2,
    clearcoat: 2,
    toneMapped: false,
    map: base,
  });

  return (
    <mesh material={mat} position={[4, 2, 0]}>
      <planeBufferGeometry args={[4, 3]}></planeBufferGeometry>
    </mesh>
  );
};

export default function AnotherObj() {
  const [hover, setHover] = useState(false);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseOver={() => {
          setHover(true);
        }}
        className="absolute text-white bg-black z-40 p-2 rounded-full font-Neue"
      >
        Hey
      </button>
      <Canvas>
        <OrbitControls></OrbitControls>
        <Ne shal={hover}></Ne>
        <Plane></Plane>
        <Plane1></Plane1>
      </Canvas>
    </div>
  );
}
