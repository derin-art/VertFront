import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import {
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLightHelper,
  Object3D,
} from "three";
import * as THREE from "three";

const HemisphereLight = () => {
  const ref = useRef<Object3D>(null);
  useHelper(ref, HemisphereLightHelper, 0.3);

  return (
    <hemisphereLight args={["red", "white", 0.6]} ref={ref}></hemisphereLight>
  );
};

const DirectionLight = () => {
  const ref = useRef<DirectionalLight>(null);
  useHelper(ref, DirectionalLightHelper);
  return (
    <directionalLight castShadow ref={ref} args={["red", 1]}></directionalLight>
  );
};

export default function LightsAndHelpers() {
  return (
    <div className="h-screen w-full">
      <Canvas shadows>
        <OrbitControls></OrbitControls>
        <DirectionLight></DirectionLight>
        <ambientLight intensity={0.1}></ambientLight>
        <HemisphereLight></HemisphereLight>

        <mesh castShadow>
          <meshStandardMaterial color={"white"}></meshStandardMaterial>
          <sphereBufferGeometry args={[1, 16, 32]}></sphereBufferGeometry>
        </mesh>

        <mesh
          receiveShadow
          rotation={[(Math.PI * 1) / 2, 0, 0]}
          position={[0, -2, 0]}
        >
          <meshStandardMaterial
            side={THREE.DoubleSide}
            color={"white"}
          ></meshStandardMaterial>
          <planeBufferGeometry args={[10, 10]}></planeBufferGeometry>
        </mesh>
      </Canvas>
    </div>
  );
}
