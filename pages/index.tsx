import styles from "../styles/Home.module.css";
import useMediaQuery from "../hooks/useMediaQuery";
import M from "../public/TestImages/M.jpg";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Auto from "../components/AutoPlayGallery";
import CartIcon from "../public/icons/cartIcon";
import BagIcon from "../public/icons/BagIcon";
import AltMainPage from "../components/AltMainPage";
import CopyIcon from "../public/icons/copyIcon";

import { motion } from "framer-motion";

import Collection from "../components/ModernTake/Collection";

import { useState, useRef } from "react";
import Varsity from "../components/ModernTake/Varsity";

import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { it } from "node:test";

export default function Home() {
  const { height, width } = useMediaQuery();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [index, setIndex] = useState(0);
  const isMobileScreen = width ? width < 640 : true;
  const [pageIndex, setPageIndex] = useState(0);
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

  const back = "bg-[url('../public/TestImages/LL1.jpg')]";

  const backGrounds = [
    {
      bg: "bg-[url('../public/TestImages/NightlifeNoiseFinal.jpg')] bg-center",
      button: "NightLife",
      name: "NightLife",
      Night: true,
    },
    {
      bg: "bg-[url('../public/TestImages/JacketNoise1.jpg')]",
      button: "Jackets",
      name: "Jackets",
    },
    { auto: true, component: true },

    {
      bg: "bg-[url('../public/TestImages/FormalBgNoise.jpg')] ",
      button: "",
      name: "Formal",
    },

    {
      bg: "bg-[url('../public/TestImages/Footer2.jpg')] bg-bottom",
      button: "",
      footer: true,
    },
  ];

  const autoPlayArray = [
    { bg: "bg-[url('../public/TestImages/A8.jpg')] bg-bottom", button: "" },
    { bg: "bg-[url('../public/TestImages/A10.jpg')] bg-bottom", button: "" },
    { bg: "bg-[url('../public/TestImages/WWWW.jpg')] bg-bottom", button: "" },
  ];

  const words = [
    ["Socials", "Contact"],
    ["FAQ", "Services"],
  ];

  return (
    <div className="">
      <div className="hidden">
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
          className="sna border-b border-black"
          viewport={!isMobileScreen ? { once: false } : { once: true }}
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

          <div className="flex flex-col lg:h-5/6 h-full justify-center w-4/5  lg:w-2/12 mt-12 space-y-8">
            {footerInfo.map((item, index) => {
              return (
                <div
                  key={item.name}
                  className={` relative border-red-500 group cursor-pointer font-Poppins text-xs border-r-0 text-red-500 lg:h-1/3 w-full  flex justify-center flex-col p-2`}
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
      <div className="h-screen  flex-col items-center justify-end flex p-20 bg-top bg-[url('../public/TestImages/HomeLaptopN.jpg')]  lg:bg-[url('../public/TestImages/HomeLaptopN.jpg')] w-full object-none bg-cover">
        <div className="text-red-500 font-Berk text-6xl absolute bottom-32">
          VERT
          <div className="text-red-500 font-Poppins text-center text-xs ">
            EST.
            <div className="text-lg">1988</div>
          </div>
        </div>
      </div>

      {backGrounds.map((item, index) => {
        if (item.auto) {
          return (
            <div
              key={index}
              className="relative flex items-center justify-center"
            >
              <Auto
                key={pageIndex}
                index={index}
                setIndex={setPageIndex}
              ></Auto>
            </div>
          );
        } else {
          return (
            <div
              key={item.bg}
              className={`h-screen flex-col items-center ${item.bg} justify-center flex   w-full object-none bg-cover relative`}
            >
              <div
                className={`${
                  item.name === "NightLife" ? "" : "hidden"
                } font-SecFont text-2xl absolute right-0 w-44 top-32  `}
              >
                {["   A Red Evening ", "at an unKnown", "berlin bar"].map(
                  (wrd) => {
                    return (
                      <motion.div
                        style={{
                          display: "inline-block",
                          overflow: "hidden",
                        }}
                        key={wrd}
                      >
                        <motion.div
                          initial={{ opacity: 1, y: "100%" }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.7 }}
                          className=""
                        >
                          {wrd}
                        </motion.div>
                      </motion.div>
                    );
                  }
                )}{" "}
              </div>
              <div
                className={`${
                  item.name === "Jackets" ? "" : "hidden"
                } font-SecFont text-2xl absolute left-4 w-44 `}
              >
                100% Authentic
              </div>
              <div
                className={`${
                  item.footer ? "" : "hidden"
                } absolute flex justify-between top-24 w-full p-2`}
              >
                {words.map((col, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col font-SecFont text-lg`"
                    >
                      {col.map((connect) => {
                        return (
                          <motion.button
                            key={connect}
                            style={{
                              display: "inline-block",
                              overflow: "hidden",
                            }}
                            className="border border-black mb-4 p-2"
                          >
                            <motion.div
                              initial={{ opacity: 1, y: "100%" }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.7 }}
                              className=""
                            >
                              {connect}
                            </motion.div>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <button
                className={`${
                  item.footer && "hidden"
                } border p-2 text-red-500 border-red-500 bg-black  font-Inter  flex items-center justify-center  text-[10px] absolute bottom-32 left-4`}
              >
                Shop {item.name ? item.name : ""}{" "}
                {BagIcon("fill-red-500 ml-2", "15", "15")}
              </button>
            </div>
          );
        }
      })}
    </div>
  );
}
