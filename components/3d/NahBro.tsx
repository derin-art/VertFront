import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import A8 from "../../public/TestImages/A8.jpg";
import * as THREE from "three";

import { motion as m } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function NahBro() {
  return (
    <Canvas>
      <m.mesh position={[0, 2, 0]}>
        <meshBasicMaterial color={"red"}></meshBasicMaterial>
        <sphereBufferGeometry args={[12, 10, 10]}></sphereBufferGeometry>
      </m.mesh>
    </Canvas>
  );
}
