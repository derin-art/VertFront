import { motion } from "framer-motion";
import { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function NewXpage() {
  const [isAnimationComplete, setAnimationIsComplete] = useState(true);

  const { height, width } = useMediaQuery();

  const textDisplacement = {
    laptop: {
      left: { initial: -500, final: -200 },
      right: { initial: 100, final: -250 },
    },
    tablet: {
      left: { initial: 100, final: -100 },
      right: { initial: -200, final: -100 },
    },
    mobile: {
      left: { initial: 100, final: -130 },
      right: { initial: -200, final: -100 },
    },
  };

  let textDisplacementToBePassedToElement: {
    right: {
      initial: number;
      final: number;
    };
    left: {
      initial: number;
      final: number;
    };
  };

  textDisplacementToBePassedToElement = textDisplacement.laptop;

  let isMobile: boolean = false;

  if (width) {
    if (width < 700) {
      textDisplacementToBePassedToElement = textDisplacement.tablet;
    }
    if (width < 400) {
      textDisplacementToBePassedToElement = textDisplacement.mobile;
      isMobile = true;
    }
  }

  return (
    <div
      className={`${
        isAnimationComplete
          ? "bg-PineGreen text-white "
          : "bg-white text-PineGreen"
      } duration-300 h-screen flex border-y snapChild border-black overflow-hidden items-center justify-center`}
    >
      <button
        className={`${
          isAnimationComplete
            ? "text-white border-white"
            : "text-black bg-white border-black"
        }  absolute mb-48 font-PlayI border p-2  z-40  sm:hidden`}
      >
        Explore Our Christmas Collection
      </button>
      <motion.button
        initial={{
          skew: "30deg",
          rotate: 0,
        }}
        whileInView={{
          skew: "0deg",
          rotate: 0,
        }}
        onAnimationEnd={() => {
          setAnimationIsComplete((prev) => !prev);
        }}
        onAnimationComplete={() => {
          setAnimationIsComplete((prev) => !prev);
        }}
        transition={{ duration: 0.3 }}
        viewport={{ once: false }}
        className={`${
          isAnimationComplete
            ? "text-white border-white"
            : "text-black border-black"
        } absolute xl:text-2xl hidden sm:block text-3xl border p-2  flex flex-col z-30 group duration-300 mt-10 md:ml-0 ml-20  font-Poppins items-center justify-center`}
      >
        <span className="group-hover:text-red-500 duration-300">
          Explore our christmas collection
        </span>
      </motion.button>

      <div
        className={`w-1/2 border-r sm:border-none duration-300 h-full ${
          isAnimationComplete ? "border-white" : "border-black"
        } relative flex overflow-hidden items-center justify-center`}
      >
        <motion.div
          initial={{
            left: textDisplacementToBePassedToElement.left.initial,
            scale: 1.5,
          }}
          whileInView={{
            left: textDisplacementToBePassedToElement.left.final,
            scale: 1,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="absolute text-7xl md:text-8xl xl:text-9xl font-Abril sm:mt-0 mt-48"
        >
          Christmas
        </motion.div>
      </div>
      <div
        className={`w-1/2  h-full border-black relative font-Abril flex items-center justify-center md:rotate-90`}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.5,
            right: textDisplacementToBePassedToElement.right.initial,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            right: textDisplacementToBePassedToElement.right.final,
          }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="absolute text-7xl md:text-8xl xl:text-9xl flex"
        >
          <span className="font-PlayI text-red-500 lg:mr-4">Vert</span>{" "}
          Christmas
        </motion.div>
      </div>
    </div>
  );
}
