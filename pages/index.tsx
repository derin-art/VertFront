import styles from "../styles/Home.module.css";
import useMediaQuery from "../hooks/useMediaQuery";

import AltMainPage from "../components/AltMainPage";
import CopyIcon from "../public/icons/copyIcon";

import { motion } from "framer-motion";

import Collection from "../components/ModernTake/Collection";

import { useState, useRef } from "react";
import Varsity from "../components/ModernTake/Varsity";

import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";

export default function Home() {
  const { height, width } = useMediaQuery();

  const isMobileScreen = width ? width < 640 : true;

  const [other, setOther] = useState(true);
  const toastId = useRef(null);
  const dispatch = useAppDispatch();
  const footerInfo = [
    { name: "Contact", info: ["08182880022", "+1299020200"] },
    {
      name: "Address",
      info: "St. Micheal Boulevar, 2012, OMA WAY, Manhattan, USA",
    },
    { name: "Email", info: "email us @ vert!@gmail.com" },
  ];

  return (
    <div className="">
      <motion.div
        initial={
          !isMobileScreen
            ? {
                opacity: 0,
                scale: 0.7,
              }
            : { opacity: 1, scale: 1 }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        onAnimationComplete={() => {
          if (isMobileScreen) return;
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.8 }}
        className="sna"
        viewport={!isMobileScreen ? { once: false } : { once: true }}
      >
        <AltMainPage toastId={toastId}></AltMainPage>
      </motion.div>

      <Collection toastId={toastId}></Collection>
      <Varsity toastId={toastId}></Varsity>
      <div className="h-screen bg-white flex items-center justify-center md:snap-center">
        <div className="flex lg:flex-row flex-col lg:h-5/6 h-full justify-center w-full  justify-center items-center text-center  mt-12 space-y-8">
          {footerInfo.map((item, index) => {
            return (
              <div
                key={item.name}
                className={` relative border-red-500 group cursor-pointer font-Poppins text-xs border-r-0 text-red-500 lg:h-1/3 w-full  flex justify-center flex-col p-2`}
              >
                {CopyIcon("group-hover:opacity-100 opacity-0 duration-300")}
                <div className="text-xl z-30 ">{item.name}</div>
                <div className="z-30">{item.info}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
