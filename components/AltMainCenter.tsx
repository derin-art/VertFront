import { motion } from "framer-motion";
import N13 from "../public/TestImages/N15.jpg";
import V5 from "../public/TestImages/V5.jpg";
import Center1 from "../public/TestImages/Center1.jpg";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

type AltMainCenterProps = {
  openTimeLine: boolean;
  other?: boolean;
  toastId: any;
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
      x: 0,
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
                <div className="absolute z-30 text-black font-Poppins bottom-2 right-2 text-xs">
                  Vert 2022
                </div>

                <Image
                  src={Center1.src}
                  height="400"
                  width="300"
                  unoptimized={true}
                  className={` z-40 border-black  duration-300`}
                  alt="TestImage"
                ></Image>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Rendering images on TimeLine Open prop */}
        <AnimatePresence>
          <div className="relative flex ">
            <div className="flex z-30  items-center justify-center md:-mr-2 space-x-2">
              {!props.openTimeLine &&
                collectionsStand.map((item, index) => {
                  return (
                    <Link href={index === 0 ? "/Future" : "/Time"} key={index}>
                      <motion.div
                        animate="in"
                        initial="out"
                        exit={"out"}
                        transition={{
                          delay: index === 0 ? 0.2 : 0.4,
                        }}
                        variants={imageVariants}
                        key={String(`${props.openTimeLine}-${index}`)}
                        className="group "
                      >
                        {" "}
                        <div className="absolute top-0 h-1/4 group-hover:text-red-500  text-white  text-base flex items-center justify-center text-center font-Oswald w-[140px] md:w-[190px]">
                          <div className="w-full  duration-300 bg-black items-center flex justify-center text-xs border-red-500">
                            {index === 0 ? (
                              <div>Vert Futures Project</div>
                            ) : (
                              "Vert 2021 Archive"
                            )}
                          </div>
                        </div>
                        <Image
                          key={index}
                          src={item.src}
                          height="295"
                          width="190"
                          unoptimized={true}
                          className={` z-30 border-red-500 sm:mr-24   w-[140px] md:object-cover md:h-[295px] md:w-[190px]`}
                          alt="TestImage"
                        ></Image>
                      </motion.div>
                    </Link>
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
            } z-20 lg:text-[250px] md:text-[200px] text-[100px] rotate-90 font-PlayI font-bold absolute`}
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
