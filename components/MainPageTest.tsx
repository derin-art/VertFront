import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Test1 from "../public/TestImages/Test1.jpg";
import Test2 from "../public/TestImages/Test2.jpg";

export default function MainPageTest() {
  const imgArray = [Test1, Test2];
  return (
    <div className="font-HeadFont h-screen bg-TiWhite snapChild -mt-4 border border-white">
      <div>
        <motion.div
          initial={{
            opacity: 0,
            skewX: "20deg",
            marginTop: "-0px",
            rotate: 90,
          }}
          whileInView={{
            opacity: 1,
            skewX: "0deg",
            marginTop: "160px",
            rotate: 90,
          }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="rotate-90 -ml-32 mt-32 w-fit text-[200px] text-red-500  z-30 absolute"
        >
          Vert
        </motion.div>
      </div>
      <motion.div
        initial={{
          opacity: 0,

          marginTop: "30px",
        }}
        whileInView={{
          opacity: 1,

          marginTop: "200px",
        }}
        transition={{ duration: 0.6 }}
        className="flex mt-32 items-center justify-center"
      >
        {imgArray.map((item, index) => {
          return (
            <div
              key={index}
              className={`relative ${index === 1 && "ml-8 -mt-32"} group`}
            >
              <Image
                key={index}
                src={item.src}
                height="400"
                width="300"
                className={` z-50   `}
                alt="TestImage"
              ></Image>
              <div className="w-full h-4 absolute bottom-0 bg-PineGreen group-hover:h-32  duration-300"></div>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          skewX: "20deg",
          marginRight: "30px",
        }}
        whileInView={{
          opacity: 1,
          skewX: "0deg",
          marginRight: "50px",
        }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="absolute top-8 right-0 text-8xl w-full text-right border-black"
      >
        <p className="z-10 font-SecFont">Vert</p>
      </motion.div>
    </div>
  );
}
