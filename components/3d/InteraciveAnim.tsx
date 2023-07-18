import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { Edges, OrbitControls, shaderMaterial } from "@react-three/drei";
import React, { useRef, Suspense, useState } from "react";
import glsl from "babel-plugin-glsl/macro"; // <--- Module to import
import * as THREE from "three";
import { motion, MotionCanvas, LayoutCamera } from "framer-motion-3d";
import { motion as m } from "framer-motion";
import { Scene } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { degToRad } from "three/src/math/MathUtils";

const Box = () => {
  const [hoverd, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const springs = useSpring({ from: { opacity: 4 }, to: { opacity: 1 } });

  const { scale, position, rotate } = useSpring({
    scale: hoverd ? 1 : 1.5,
    position: clicked ? 2 : 0,
    config: config.gentle,
    rotate: clicked ? [0, 1] : [1, 2],
  });
  const ref1 = useRef<THREE.Mesh>(null!);
  const material = new THREE.MeshBasicMaterial({
    color: "red",
    transparent: true,
  });
  useFrame(({ clock, controls, camera }) => {});

  return (
    <animated.mesh
      position={position.to((x) => [0, x, 0])}
      rotation={rotate.to((x, y) => [Math.PI / 2, x, y])}
      scale={scale}
      onPointerLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        setClicked((prev) => !prev);
      }}
      onPointerOver={() => {
        setIsHovered(true);
      }}
      ref={ref1}
      material={material}
    >
      <Edges></Edges>
      <boxBufferGeometry args={[1, 1]}></boxBufferGeometry>
    </animated.mesh>
  );
};

const FramerBox = (props: { enter: boolean }) => {
  return (
    <motion.mesh position={[1, -2, 0]}>
      <boxBufferGeometry args={[1, 2]}></boxBufferGeometry>
      <motion.meshMatcapMaterial
        transition={{ duration: 2 }}
        initial={{ color: "blue" }}
        color="red"
        animate={{
          color: props.enter ? "blue" : "yellow",
          transition: { duration: 2, delay: 2 },
        }}
      ></motion.meshMatcapMaterial>
    </motion.mesh>
  );
};

export default function InteractiveAnim() {
  const [enter, setEnter] = useState(false);
  return (
    <m.div
      onViewportEnter={() => {
        setEnter(true);
      }}
      onViewportLeave={() => {
        setEnter(false);
      }}
      className="border w-full h-screen"
    >
      <MotionCanvas shadows dpr={[1, 2]} camera={{ fov: 100 }}>
        <Box></Box>
        <LayoutCamera
          initial={false}
          fov={100}
          animate={
            enter
              ? {
                  x: 4,
                  y: 0,
                  z: 10,
                  rotateY: degToRad(20),
                  rotateZ: degToRad(50),
                  rotateX: degToRad(20),
                }
              : { x: 0, y: 0, z: 4, rotateY: degToRad(0) }
          }
          transition={{ duration: 2 }}
        ></LayoutCamera>
        <FramerBox enter={enter}></FramerBox>
      </MotionCanvas>
    </m.div>
  );
}
