import { motion } from "framer-motion";
import Star from "../public/icons/star";
import Image from "next/image";
import X1 from "../public/TestImages/X1.jpg";
import X2 from "../public/TestImages/X2.jpg";
import X3 from "../public/TestImages/X3.jpg";

export default function AltPage() {
  const imgFiles = [X1, X2];
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="h-screen  snapChild flex items-center justify-center p-4 "
    >
      <div className="relative w-full h-5/6 border mt-20 border-black flex items-center justify-center">
        <div className="flex h-fit">
          {imgFiles.map((item, index) => {
            return (
              <Image
                key={index}
                src={item.src}
                height="400"
                width="300"
                className={` z-20 border-black border duration-300 ml-8`}
                alt="TestImage"
              ></Image>
            );
          })}
        </div>
        <motion.div
          initial={{
            opacity: 0,
            rotate: 180,
          }}
          whileInView={{
            opacity: 1,
          }}
          animate="in"
          exit={"out"}
          transition={{ duration: 0.6 }}
          className="flex rotate-180 hidden text-zinc-200 flex-col items-center justify-center font-Noto text-[600px] absolute right-20"
        >
          V
          {Star(
            "40",
            "40",
            "absolute bottom-44 ml-3 rotate-180 fill-yellow-400"
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
