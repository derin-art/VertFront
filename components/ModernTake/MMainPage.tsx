import { motion } from "framer-motion";
import V1 from "../../public/TestImages/V1.jpg";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MMainPage() {
  const vs = [2, 3, 4];
  const [anim, setAnim] = useState(false);
  const variants = {
    out: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.55,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: 0.3,
      },
    },
  };
  return (
    <div className="h-screen border-b border-black z-30 flex items-center justify-center overflow-auto">
      <div className="w-4/5 border-t border-x  h-full border-black flex items-center  ">
        {vs.map((item) => {
          return (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                skewX: "0deg",
                marginLeft: "0px",
              }}
              whileInView={{
                opacity: 1,
                skewX: "10deg",
                marginLeft: 240 * item,
              }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: false }}
              className={`absolute text-[300px] font-IMFELL z-40 hidden`}
            >
              V<div className="text-gray-100"></div>
              <div className="text-gray-200"></div>
              <div className="text-gray-300"></div>
              <div className="text-gray-400"></div>
              <div className="text-gray-500"></div>
            </motion.div>
          );
        })}
        <motion.div
          className="absolute hover:text-blue-300 z-40 font-SecFont hidden"
          initial={{
            opacity: 1,
            skewX: "0deg",
            marginLeft: "0px",
          }}
          animate={
            anim
              ? {
                  rotate: 90,
                  scale: 7,
                  left: 400,
                }
              : {
                  rotate: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 0.6,
          }}
          onClick={() => {
            setAnim((prev) => !prev);
          }}
        >
          Est 1966
        </motion.div>
        <div className="w-1/2 h-full border-r border-black relative flex items-center  justify-center">
          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,

                marginTop: "-130px",
                marginRight: 100,
              }}
              whileInView={{
                opacity: 1,

                marginTop: "0px",
              }}
              animate="in"
              exit={"out"}
              variants={variants}
              key={String(anim)}
              className="flex pr-1 absolute z-40"
              transition={{ duration: 0.6 }}
            >
              {!anim && (
                <Image
                  src={V1.src}
                  height={600}
                  width={500}
                  alt="Standing Woman"
                  className="relative"
                  unoptimized={true}
                ></Image>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="w-1/2 h-full flex-col">
          <div className="h-1/2 w-full bg-green-200 border-b border-black hover:scale-125 duration-300 hover:bg-green-100">
            <div className="text-[120px] text-white mt-4 font-SecFont">
              Est.
              <div>1966</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[500px] md:w-[300px] bg-red-200 h-full right-96 group  hover:bg-[#0A090C] duration-300 font-SecFont absolute z-0">
        <div className="rotate-90 text-white lg:text-[200px] md:text-[100px] group-hover:text-gray-800">
          Est.
          <div>1966</div>
        </div>
      </div>
    </div>
  );
}
