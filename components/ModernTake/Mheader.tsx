import { motion } from "framer-motion";
import { useState } from "react";
import useFramerAnimation from "../../hooks/useFramerAnimation";
import { useAppSelector } from "../../hooks/useDispatch";
import { changeCollectionBool } from "../../Features/collectionAnimSlice";

export default function Mheader() {
  const Links = ["home", "items"];
  const otherLinks = ["SHIRTS", "JACKETS", "T-SHIRTS"];
  const collectionBool = useAppSelector((state) => state.collection.value);
  const [collectionOpen, setCollectionOpen] = useState(false);
  console.log(collectionOpen);
  return (
    <div
      className={`w-full font-Poppins text-xs fixed flex duration-300 items-center ${
        collectionOpen ? "z-[100]" : "z-20"
      } ${!collectionBool ? "bg-black text-white" : "text-black"} `}
    >
      <div className="flex">
        {Links.map((item, index) => {
          return (
            <motion.button
              initial={{
                opacity: 0,
                skewX: "20deg",
              }}
              whileInView={{
                opacity: 1,
                skewX: "0deg",
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              key={item}
              onClick={() => {
                if (item === "items") {
                  setCollectionOpen((prev) => !prev);
                }
              }}
              className={`mr-8 border-black h-full z-50   p-6 hover:text-red-500 duration-300`}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
      <div className=" font-SecFont flex items-center justify-center absolute right-4 border-black text-4xl line-through h-full">
        <motion.p
          initial={{
            opacity: 0,
            skewX: "20deg",
          }}
          whileInView={{
            opacity: 1,
            skewX: "0deg",
          }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="pl-2 z-50"
        >
          {" "}
          Vert
        </motion.p>
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={collectionOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.56 }}
        className={`w-full h-screen fixed top-0 backdrop-blur-sm border ${
          collectionOpen ? "z-40" : "z-[0]"
        }`}
      >
        {useFramerAnimation(
          <div className="absolute h-screen  w-full top-8 flex flex-col items-center  ">
            <div className="mt-20 text-center ">
              {otherLinks.map((item, index) => {
                return (
                  <motion.div
                    initial={{ x: -400 }}
                    animate={{ x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
                    }}
                    key={item}
                    className="lg:text-7xl xl:text-8xl text-3xl text-red-500 blur-none font-Berk  border-black w-screen mb-8 "
                  >
                    {item}!
                  </motion.div>
                );
              })}
            </div>
          </div>,
          collectionOpen
        )}
      </motion.div>
    </div>
  );
}
