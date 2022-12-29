import { animate, AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import CollectionImage from "../CollectionImage";
import Test2 from "../../public/TestImages/Test2.jpg";
import V1 from "../../public/TestImages/V1.jpg";
import V2 from "../../public/TestImages/V2.jpg";
import X2 from "../../public/TestImages/X2.jpg";
import Test3 from "../../public/TestImages/Test3.jpg";
import L1 from "../../public/TestImages/L1.jpg";
import B1 from "../../public/TestImages/B44.png";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import {
  changeCollectionBool,
  changeCollectionBooltoFalse,
} from "../../Features/collectionAnimSlice";

export default function Collection() {
  const [other, setOther] = useState(false);
  const [other2, setOther2] = useState(false);
  const collectionBool = useAppSelector((state) => state.collection.value);

  const dispatch = useAppDispatch();
  const ThisIs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const images = [
    {
      name: "Casual",
      img: Test2,
      date: "2019",
      by: "lee yeon",
      model: "alex corr",
    },
    {
      name: "Risque",
      img: L1,
      date: "2016",
      by: "yemi olawale",
      model: "just greenland",
    },
    {
      name: "Formal",
      img: V2,
      date: "2017",
      by: "giancoo galdi",
      model: "micheal masz",
    },

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
        collectionBool ? "bg-white" : "bg-black"
      } relative flex md:overflow-x-hidden duration-300 items-end md:snap-center justify-start border-b border-black`}
    >
      <div className="md:flex font-SecFont w-full text-[50px] hidden md:text-[80px] lg:text-[90px] xl:text-[130px]  2xl:text-[150px] absolute  self-start mt-14 text-red-500">
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
          <motion.span
            className={`font-PlayI  ${
              collectionBool ? "text-AltBlack" : "text-white"
            }`}
          >
            Timeless
          </motion.span>{" "}
          Collections
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
          className="absolute -left-[300px] hidden 2xl:block"
        >
          Collections
        </motion.div>
      </div>

      <motion.div className="mt-14 w-full absolute text-red-500 font-PlayFair md:hidden flex top-20 text-6xl">
        <motion.div className="text-red-500">
          {" "}
          <motion.span
            className={`font-PlayI  ${
              collectionBool ? "text-AltBlack" : "text-white"
            }`}
          >
            Timeless
          </motion.span>{" "}
          Collections
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
          /*   setOther((prev) => !prev); */
          dispatch(changeCollectionBool());
        }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false }}
        className="flex w-full items-center justify-center h-full"
      >
        <motion.div className="lg:mt-[123px] mt-[74px] flex  sm:flex-row">
          {images.map((item, index) => {
            return (
              <Link href={`/${item.name}`} className="mb-6" key={index}>
                <CollectionImage
                  by={item.by}
                  date={item.date}
                  model={item.model}
                  width={150}
                  height={500}
                  img={item.img}
                  word={"Casual"}
                  key={index}
                  version={item.name}
                  other={other}
                ></CollectionImage>
              </Link>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
