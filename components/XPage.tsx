import X4 from "../public/TestImages/X4.jpg";
import Image from "next/image";
import { motion } from "framer-motion";

export default function XPage() {
  const vertDuplicates = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="h-screen bg-white snapChild relative flex items-center justify-center">
      <div className="h-4/5 w-4/5  flex items-end justify-end relative overflow-hidden">
        <button className="absolute left-4 top-4 font-Poppins p-2 border border-white text-white z-40 b">
          Explore Our Christmas Collection
        </button>
        {vertDuplicates.map((item) => {
          return (
            <motion.div
              initial={{
                left: item * 150,
                top: -200,
              }}
              whileInView={{
                top: 70,
              }}
              transition={{
                duration: 0.6,
              }}
              key={item}
              className={`font-Notos text-[190px] text-LauGreen absolute font-bold rotate-90 top-0 left-[${
                item * 150
              }]px`}
            >
              vert{" "}
            </motion.div>
          );
        })}

        <Image
          unoptimized={true}
          src={X4.src}
          alt="Ximg"
          height={"400"}
          width={"900"}
          className="h-fit z-40"
        ></Image>
      </div>
    </div>
  );
}
