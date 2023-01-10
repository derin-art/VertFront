import styles from "../styles/Home.module.css";

import AltMainPage from "../components/AltMainPage";
import CopyIcon from "../public/icons/copyIcon";

import { motion } from "framer-motion";

import Collection from "../components/ModernTake/Collection";

import { useState, useRef } from "react";
import Varsity from "../components/ModernTake/Varsity";

import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";

export default function Home() {
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
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        onAnimationComplete={() => {
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.8 }}
        className="sna"
        viewport={{ once: false }}
      >
        <AltMainPage toastId={toastId}></AltMainPage>
      </motion.div>

      <Collection toastId={toastId}></Collection>
      <Varsity toastId={toastId}></Varsity>
      <div className="h-screen bg-white flex items-center justify-center md:snap-center">
        <div className="w-10/12  h-3/4 hidden md:block relative flex justify-end text-right p-8">
          <div className=" w-fit font-Berk absolute left-4 line-through lg:text-[150px] md:text-[100px] text-[100px] xl:text-[250px] text-gray-200">
            VERT
          </div>
        </div>
        <div className="absolute text-gray-200 text-6xl rotate-90 left-0 font-Poppins md:hidden">
          VE<span className="text-black">®</span>T
        </div>
        <div className="flex flex-col h-5/6 justify-center   w-2/12 mt-12 space-y-2">
          {footerInfo.map((item, index) => {
            return (
              <div
                key={item.name}
                className={` relative border-red-500 group cursor-pointer font-Poppins text-xs border-r-0 text-red-500 h-1/3 w-full  flex justify-center flex-col p-2`}
              >
                {CopyIcon("group-hover:opacity-100 opacity-0 duration-300")}
                <div className="font-Oswald text-xl z-30 ">{item.name}</div>
                <div className="z-30">{item.info}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
