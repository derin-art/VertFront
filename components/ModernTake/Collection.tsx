import { animate, AnimatePresence, motion } from "framer-motion";
import CollectionImage from "../CollectionImage";
import Test2 from "../../public/TestImages/Test2.jpg";
import V1 from "../../public/TestImages/V1.jpg";
import V2 from "../../public/TestImages/V2.jpg";
import X2 from "../../public/TestImages/X2.jpg";
import Test3 from "../../public/TestImages/Test3.jpg";
import L1 from "../../public/TestImages/L1.jpg";
import B1 from "../../public/TestImages/B44.png";
import { useState } from "react";

export default function Collection() {
  const [other, setOther] = useState(false);
  const [other2, setOther2] = useState(false);
  const ThisIs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const images = [
    { name: "Casual", img: Test2 },
    { name: "Risque", img: L1 },
    { name: "Formal", img: V2 },

    { name: "Jewerly", img: B1 },
  ];

  const variants = {
    out: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
  };

  return (
    <div
      className={`h-screen ${
        other ? "bg-white" : "bg-black"
      } relative flex overflow-x-hidden duration-300 items-end snapChild justify-start border-b border-black`}
    >
      <div className="flex font-SecFont w-full text-[150px] absolute  self-start mt-14 text-red-500">
        <motion.div
          initial={{
            opacity: 0,
            right: 150,
          }}
          whileInView={{
            opacity: 1,
            right: -150,
          }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="absolute -right-[300px]"
        >
          Collection
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            left: -700,
          }}
          whileInView={{
            opacity: 1,
            left: -500,
          }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: false }}
          className="absolute -left-[300px] "
        >
          Collections
        </motion.div>
      </div>
      <div className="w-full absolute hidden top-[60px] border-b font-SecFont text-xl border-black flex justify-center">
        <p className="marquee border-b border-black">
          <span>
            {ThisIs.map((item) => {
              return "This is Vert -";
            })}
          </span>
        </p>
        <p className="marquee marquee2">
          <span>
            {ThisIs.map((item) => {
              return "This is Vert -";
            })}
          </span>
        </p>
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          skewX: 0,
        }}
        onAnimationComplete={() => {
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false }}
        className="flex ml-20  mb-8 w-full relative items-center hidden"
      >
        <motion.div className="p-6 mr-4">
          {images.slice(0, 2).map((item, index) => {
            return (
              <CollectionImage
                width={150}
                height={500}
                img={item.img}
                word={"Casual"}
                key={index}
                version={item.name}
                other={other}
              ></CollectionImage>
            );
          })}
        </motion.div>
        <motion.div className="p-6">
          {images.slice(2, 4).map((item, index) => {
            return (
              <CollectionImage
                width={150}
                height={500}
                img={item.img}
                word={"Casual"}
                key={index}
                version={item.name}
                other={other}
              ></CollectionImage>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          skewX: 0,
        }}
        onAnimationComplete={() => {
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false }}
        className="flex w-full items-center justify-center h-full "
      >
        <motion.div className="lg:mt-[123px] mt-[74px] flex">
          {images.map((item, index) => {
            return (
              <div className="mb-6" key={index}>
                <CollectionImage
                  width={150}
                  height={500}
                  img={item.img}
                  word={"Casual"}
                  key={index}
                  version={item.name}
                  other={other}
                ></CollectionImage>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
