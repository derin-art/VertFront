import { gsap } from "gsap";

import ScrollTrigger from "gsap/dist/ScrollTrigger";

import { Suspense, useLayoutEffect, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const Cube = (props: { ref: any }) => {
  const rrr: any = useRef<THREE.Mesh>(null);
  useLayoutEffect(() => {
    const scl = gsap.context(() => {
      gsap.to(rrr.current?.position, {
        x: 0,
        y: 2,
        z: 0,
        duration: 2,
        delay: 1,
      });
    });

    return () => scl.revert();
  });

  return (
    <mesh ref={rrr}>
      <boxBufferGeometry args={[1, 1, 1]}></boxBufferGeometry>
      <meshBasicMaterial color={"grey"}></meshBasicMaterial>
    </mesh>
  );
};

const Globe = (props: { ref: any }) => {
  return (
    <mesh ref={props.ref} position={[1, 0, 0]}>
      <sphereBufferGeometry args={[1, 16, 16, 16]}></sphereBufferGeometry>
      <meshBasicMaterial color={"green"}></meshBasicMaterial>
    </mesh>
  );
};

const ThreeStuff = (props: { ref1: any; ref2: any }) => {
  const cubeRef: any = useRef<THREE.Mesh>(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      /*  gsap.to(cubeRef.current?.position, {
        x: 1,
        y: 3,
        z: 0,
        duration: 2,
        delay: 1,
      }); */
      const timeLine = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section1",
            endTrigger: ".section3",
            scrub: true,
          },
        })
        .to(cubeRef.current?.position, {
          x: 1,
          y: 3,
          z: 0,
          duration: 2,
          delay: 1,
        });

      const moveAnim = gsap.to(cubeRef.current?.position, {
        x: 1,
        y: 3,
        z: 0,
        duration: 2,
        delay: 1,
      });
      /*   ScrollTrigger.create({
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "top 50px",
        animation: moveAnim,
      }); */
      /*   gsap.to(cubeRef.current?.position, {
        x: 3,
        y: -2,
        z: 0,
        scrollTrigger: {
          trigger: cubeRef.current,
          scrub: true,
          start: "top center",
          end: "top 50px",
        },
      }); */
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="h-[100vh]  w-full fixed">
      <Canvas className="yee">
        <Suspense fallback={null}>
          <mesh position={[1, 0, 0]}>
            <sphereBufferGeometry args={[1, 16, 16, 16]}></sphereBufferGeometry>
            <meshBasicMaterial color={"green"}></meshBasicMaterial>
          </mesh>
          <mesh ref={cubeRef} position={[0, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 1]}></boxBufferGeometry>
            <meshBasicMaterial color={"blue"}></meshBasicMaterial>
          </mesh>
        </Suspense>
      </Canvas>
      <div ref={triggerRef} className="h-40 w-40 bg-green-400 movv"></div>
    </div>
  );
};

export default function Blott() {
  const ref1: any = useRef();
  const ref2: any = useRef();

  return (
    <div
      className="w-full
    "
    >
      <ThreeStuff ref1={ref1} ref2={ref2}></ThreeStuff>
      <div className="h-[200vh] bg-green-400 section1"></div>
      <div className="h-[200vh] bg-red-400 section2"></div>
      <div className="h-[200vh] bg-yellow-400 section3"></div>
    </div>
  );
}
