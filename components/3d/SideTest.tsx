import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import A8 from "../../public/TestImages/A8.jpg";
import * as THREE from "three";

import { motion as m } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";

export default function SideTest() {
  const [hasEntered, setHasEntered] = useState(false);
  const [mouseXposition, setMouseXposition] = useState(0);
  const [pe, setPe] = useState(0);
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const act = (e.clientX / window.innerWidth) * 100;
      setPe(act);
      /* setMouseXposition(e.clientX); */
    });
  }, []);
  return (
    <div className="h-screen w-full">
      <motion.div>
        <motion.div className="w-[300px] h-[300px] ">
          <motion.img
            animate={{
              objectPosition: `bottom 10px right ${pe}%`,
            }}
            transition={{
              duration: 0.001,
              mass: 5,
              damping: 2,
              ease: "easeInOut",
            }}
            className="w-[400px] object-none absolute object-left"
            src={A8.src}
          ></motion.img>
        </motion.div>
      </motion.div>
    </div>
  );
}
