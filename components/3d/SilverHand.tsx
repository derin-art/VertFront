import { useGLTF, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { AmbientLight, Object3D } from "three";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const DirectionalLight = (props: {
  pos?: [x: number, y: number, z: number];
}) => {
  const light: any = useRef<Object3D>();
  /*   useHelper(light, THREE.DirectionalLightHelper); */
  return (
    <directionalLight
      intensity={1.6}
      position={props.pos}
      ref={light}
    ></directionalLight>
  );
};

function SilverHand() {
  const Hand = useGLTF("/Hand.glb");
  const groupRef: any = useRef<THREE.Group>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".sectionA",
            endTrigger: ".sectionC",
            scrub: true,
          },
        })
        .to(groupRef.current?.rotation, {
          x: (Math.PI * 1) / 2,
          z: 1,

          duration: 10,
        });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-screen w-full  fixed z-30">
      <Canvas>
        <DirectionalLight pos={[0, 7, 0]}></DirectionalLight>
        <DirectionalLight pos={[6, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[-4, 0, 0]}></DirectionalLight>
        <DirectionalLight pos={[0, -8, 0]}></DirectionalLight>
        <ambientLight intensity={0.4}></ambientLight>
        <group ref={groupRef}>
          {" "}
          <primitive object={Hand.scene}></primitive>
        </group>
      </Canvas>
    </div>
  );
}

export default function FinalCanvas() {
  return (
    <div>
      <SilverHand></SilverHand>
      <div className="w-full h-screen bg-red-500 sectionA relative z-0">
        <div className="absolute text-white font-Berk left-[15%] top-[20%] text-9xl uppercase">
          Gun
          <div>Man</div>
        </div>
      </div>
      <div className="w-full h-screen bg-yellow-500 sectionB"></div>
      <div className="w-full h-screen bg-green-500 sectionC"></div>
      <div className="w-full h-screen bg-gray-500 sectionD"></div>
    </div>
  );
}
