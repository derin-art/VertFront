import { motion } from "framer-motion";
import { useState } from "react";

export default function NewXpage() {
  const [other, setOther] = useState(false);
  console.log(other);
  return (
    <div
      className={`${
        other ? "bg-PineGreen text-white " : "bg-white text-PineGreen"
      } duration-300 h-screen flex border-y snapChild border-black overflow-hidden items-center justify-center`}
    >
      <motion.div
        initial={{
          skew: "20deg",
          rotate: 90,
        }}
        whileInView={{
          skew: "0deg",
        }}
        onAnimationEnd={() => {
          setOther((prev) => !prev);
        }}
        onAnimationComplete={() => {
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className={`${
          !other ? "text-black" : "text-white "
        } absolute text-3xl flex flex-col items-center duration-300  text-black rotate-90 font-SecFont ml-20`}
      >
        <div className="text-5xl">‸</div>
        Explore our christmas collection
      </motion.div>

      <div
        className={`w-1/2 border-r duration-300 h-full ${
          !other ? "border-black" : "border-white"
        } relative flex overflow-hidden items-center justify-center`}
      >
        <motion.div
          initial={{
            left: -500,
          }}
          whileInView={{
            left: -200,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="absolute text-7xl xl:text-9xl font-SecFont"
        >
          Christmas
        </motion.div>
      </div>
      <div className="w-1/2  h-full border-black relative font-SecFont flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            right: 100,
          }}
          whileInView={{
            opacity: 1,
            right: -200,
          }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="absolute right-0 text-7xl xl:text-9xl"
        >
          Christmas
        </motion.div>
      </div>
    </div>
  );
}
