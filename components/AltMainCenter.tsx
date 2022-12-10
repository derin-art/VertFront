import { motion } from "framer-motion";
import N13 from "../public/TestImages/N13.jpg";
import V5 from "../public/TestImages/V5.jpg";
import Center1 from "../public/TestImages/Center1.jpg";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

type AltMainCenterProps = {
  openTimeLine: boolean;
  other?: boolean;
};

export default function AltMainCenter(props: AltMainCenterProps) {
  const collectionsStand = [N13, V5];
  const [other, setOther] = useState(false);

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

  const centerVariants = {
    out: {
      opacity: 0,

      transition: {
        duration: 0.55,
      },
    },
    in: {
      opacity: 1,

      transition: {
        duration: 0.55,
        delay: 0.3,
      },
    },
  };

  const imageVariants = {
    out: {
      opacity: 0,
      x: -40,
      transition: {
        duration: 0.55,
      },
    },
    in: {
      opacity: 1,
      x: 10,
      transition: {
        duration: 0.55,
        delay: 0.3,
      },
    },
  };
  return (
    <motion.div className="absolute ">
      <div className="relative flex items-center justify-center relative duration-300">
        {/* Rendering main page Image */}
        <AnimatePresence>
          <motion.div
            animate="in"
            initial="out"
            exit={"out"}
            className=""
            variants={centerVariants}
            transition={{
              duration: 0.55,
            }}
            whileInView={{
              opacity: 1,
            }}
          >
            {props.openTimeLine && (
              <>
                <div className="absolute z-40 text-black font-Poppins bottom-2 left-2 text-xs">
                  2022 collection
                </div>
                <div className="absolute z-40 text-red-500 font-PlayI top-2 left-2">
                  VERT
                </div>
                <Image
                  src={Center1.src}
                  height="400"
                  width="300"
                  unoptimized={true}
                  className={` z-40 border-black border-2 duration-300`}
                  alt="TestImage"
                ></Image>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rendering images on TimeLine Open prop */}
        <AnimatePresence>
          <div className="relative flex ">
            <div className="flex z-50  items-center justify-center -mr-2">
              {!props.openTimeLine &&
                collectionsStand.map((item, index) => {
                  return (
                    <motion.div
                      animate="in"
                      initial="out"
                      exit={"out"}
                      transition={{
                        delay: index === 0 ? 0.2 : 0.4,
                      }}
                      variants={imageVariants}
                      key={String(`${props.openTimeLine}-${index}`)}
                      className="flex ml-2 md:ml-0"
                    >
                      {" "}
                      <p className="absolute top-2 text-black z-40 text-xs -left-2">
                        2019
                      </p>
                      <Image
                        key={index}
                        src={item.src}
                        height="295"
                        width="190"
                        unoptimized={true}
                        className={` z-30 border-black sm:mr-24 -ml-4 border md:object-cover md:h-[295px] md:w-[190px]`}
                        alt="TestImage"
                      ></Image>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </AnimatePresence>

        {/* Rendering Main page est.1988 */}
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
              rotate: 90,
              marginTop: "-130px",
            }}
            whileInView={{
              opacity: 1,

              marginTop: "0px",
            }}
            animate="in"
            exit={"out"}
            variants={variants}
            key={String(props.openTimeLine)}
            transition={{ duration: 0.6 }}
            className={`${
              !props.other ? "text-AltBlack" : "text-white"
            } z-30 lg:text-[250px] md:text-[200px] text-[100px] rotate-90 font-IMFELL font-bold absolute`}
          >
            {props.openTimeLine ? (
              <>
                <motion.div> Est. </motion.div>
                <motion.div className="">1988</motion.div>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rendering Time page est.1988 */}
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            animate="in"
            exit={"out"}
            variants={variants}
            key={String(props.openTimeLine)}
            transition={{ duration: 0.6 }}
            className="text-black xl:text-[200px] lg:text-[130px] text-[80px] font-PlayFair font-bold absolute "
          >
            {!props.openTimeLine && (
              <>
                <motion.div> Est. </motion.div>
                <motion.div>1988</motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
