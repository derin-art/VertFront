import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import GLTFLoader from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import { Edges, useHelper } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { AmbientLight, Object3D } from "three";

const DirectionalLight = (props: {
  pos?: [x: number, y: number, z: number];
}) => {
  const light: any = useRef<Object3D>();
  useHelper(light, THREE.DirectionalLightHelper);
  return (
    <directionalLight
      intensity={1.6}
      position={props.pos}
      ref={light}
    ></directionalLight>
  );
};

export default function Fidget() {
  const model = useGLTF("/Fidget.glb");
  const model2 = useGLTF("/Hand.glb");

  console.log(model);
  return (
    <div className="h-screen w-full bg-white">
      <Canvas camera={{ position: [1, 1, -3] }}>
        <DirectionalLight pos={[0, 7, 0]}></DirectionalLight>
        <DirectionalLight pos={[6, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[-4, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[0, -8, 0]}></DirectionalLight>
        <ambientLight intensity={0.4}></ambientLight>

        <OrbitControls></OrbitControls>
        <primitive object={model2.scene}></primitive>
      </Canvas>
    </div>
  );
}
