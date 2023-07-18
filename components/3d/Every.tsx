import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import * as THREE from "three";
import EveryImg from "../../public/TestImages/Every.png";
import { useGLTF, SpotLight, useDepthBuffer } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <spotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  );
}

const Hin = () => {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const base = useLoader(TextureLoader, EveryImg.src);
  const mat = new THREE.MeshPhysicalMaterial({
    map: base,
    metalness: 0.2,
    clearcoat: 2,
    toneMapped: false,
  });

  return (
    <mesh material={mat}>
      <MovingSpot
        depthBuffer={depthBuffer}
        color="white"
        position={[0, 0, 2]}
      />
      <planeBufferGeometry args={[18, 10]}></planeBufferGeometry>
    </mesh>
  );
};

export default function Every() {
  const [mouse, setMouse] = useState();

  useEffect(() => {
    addEventListener("mousemove", () => {});
  });

  return (
    <Canvas>
      <Hin></Hin>
    </Canvas>
  );
}
