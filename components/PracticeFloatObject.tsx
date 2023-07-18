import * as THREE from "three";
import { Camera, Vector3 } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { Edges } from "@react-three/drei";
import { useRef } from "react";
import { AnimationControls, TargetAndTransition } from "framer-motion";

const Cube = (props: {
  args: number[];
  position: [x: number, y: number, z: number];
}) => {
  const material = new THREE.MeshBasicMaterial({
    color: "#ffff00",
  });
  return (
    <mesh material={material} position={props.position}>
      <boxBufferGeometry args={props.args}></boxBufferGeometry>
    </mesh>
  );
};

const Globe = (props: {
  args: number[];
  position: [x: number, y: number, z: number];
  animate?: boolean;
  animations?: TargetAndTransition;
}) => {
  const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
  return (
    <motion.mesh material={material} position={props.position}>
      <sphereBufferGeometry args={props.args}></sphereBufferGeometry>
    </motion.mesh>
  );
};

const Thorus = (props: {
  args: number[];
  position: [x: number, y: number, z: number];
  rotation: [x?: number, y?: number, z?: number];
}) => {
  const material = new THREE.MeshBasicMaterial({ color: "#00004f" });
  const meshRef = useRef<THREE.Mesh>(null!);
  const rotateX = props.rotation[0] ? props.rotation[0] : 0;
  const rotateY = props.rotation[1] ? props.rotation[1] : 0;
  const rotateZ = props.rotation[2] ? props.rotation[2] : 0;

  meshRef.current && meshRef.current.rotation.set(rotateX, rotateY, rotateZ);

  return (
    <motion.mesh
      ref={meshRef}
      transition={{ duration: 1 }}
      position={props.position}
      material={material}
      animate={{ pointsAtX: [0, 1, 0] }}
    >
      <Edges></Edges>
      <torusBufferGeometry args={props.args}></torusBufferGeometry>
    </motion.mesh>
  );
};

const FloatingObject = () => {
  return (
    <motion.group>
      <Globe args={[0.3, 10, 10]} position={[0, 0, 0]}></Globe>
      <Globe args={[0.2, 10, 10]} position={[1, 0.5, 0]}></Globe>
      <Globe args={[0.2, 10, 10]} position={[-1, -0.5, 0]}></Globe>
      <Thorus
        rotation={[Math.PI / -6, Math.PI / 3, Math.PI / 1]}
        args={[0.7, 0.1, 10, 40]}
        position={[0, 0, 0]}
      ></Thorus>
    </motion.group>
  );
};

export default function PracticeFloatObject() {
  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{
        fov: 45,
        position: [0, 0, 5],
        aspect: window.innerWidth / window.innerHeight,
      }}
    >
      <FloatingObject></FloatingObject>
    </Canvas>
  );
}
