import useMediaQuery from "../hooks/useMediaQuery";
import dynamic from "next/dynamic";
import M from "../public/TestImages/M.jpg";
const Fidget = dynamic(() => import("./../components/3d/BlenderModels/Fidget"));
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Blott from "../components/3d/Blott";
import Tilt from "../components/3d/Tilt";
import Auto from "../components/AutoPlayGallery";
import CartIcon from "../public/icons/cartIcon";
import BagIcon from "../public/icons/BagIcon";
import AltMainPage from "../components/AltMainPage";
import SlantedArrow from "../public/icons/SlantedArrow";
import CopyIcon from "../public/icons/copyIcon";
import Begin3d from "../components/3d/Begin3d";
import NahBro from "../components/3d/NahBro";
import NewScene from "../components/3d/NewScene";
import InteractiveAnim from "../components/3d/InteraciveAnim";
import LightsAndHelpers from "../components/3d/LightsAndHelpers";
import NewSceneOne from "../components/3d/NewSceneOne";
import Plan from "../components/3d/Plan";
import SideTest from "../components/3d/SideTest";
import BatmanBegins from "../components/3d/BatmanBegins";
import Other from "../components/Other";
import ImageView from "../components/3d/ImageView";
const YetSpline = dynamic(() => import("../components/3d/YetSpline"));
const YetSpline2 = dynamic(() => import("../components/3d/YetSpline2"));
import AnotherObj from "../components/3d/AnotherObj";
import PracticeFloatObject from "../components/PracticeFloatObject";

import { motion } from "framer-motion";

import Collection from "../components/ModernTake/Collection";

import { useState, useRef, useEffect, Suspense } from "react";
import Varsity from "../components/ModernTake/Varsity";

import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { it } from "node:test";
import Link from "next/link";
import Round from "../components/3d/Round";

export default function Home() {
  const { height, width } = useMediaQuery();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const [index, setIndex] = useState(0);
  const isMobileScreen = width ? width < 640 : true;
  const [pageIndex, setPageIndex] = useState(0);
  const [other, setOther] = useState(false);
  useEffect(() => {
    setOther(true);
  }, []);
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
      Link: "Risque",
      Night: true,
    },
    {
      bg: "bg-[url('../public/TestImages/JacketNoise1.jpg')]",
      button: "Jackets",
      name: "Jackets",
      Link: "Jacket",
    },
    { auto: true, component: true },

    {
      bg: "bg-[url('../public/TestImages/FormalBgNoise.jpg')] ",
      button: "",
      name: "Formal",
      Link: "Formal",
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
    <motion.div
      animate={{ opacity: 1, translateY: "0%" }}
      initial={{ opacity: 1, translateY: "30%" }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 1, translateY: "-30%" }}
      className=""
    >
      {" "}
      <Suspense fallback={null}>
        {typeof window !== "undefined" && <Blott></Blott>}
      </Suspense>
      <div className="">
        <Suspense fallback={null}>
          <Fidget></Fidget>
        </Suspense>
      </div>
      <div className="border hidden bg-white relative flex items-center justify-center ">
        <Begin3d></Begin3d>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        {typeof window !== "undefined" && <NewScene></NewScene>}
      </div>
      <div className="flex items-center justify-center h-screen w-full bg-white relative overflow-hidden">
        <motion.div
          whileInView={{ width: "250vh", height: "250vh" }}
          className="absolute bg-red-500 rounded-full"
          initial={{ width: 0, height: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        ></motion.div>
        <div className="w-2/5 leading-10 z-30 text-white font-Inter text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem corporis
          hic autem aperiam. Repellendus autem neque minima sit accusantium quae
          nisi reiciendis blanditiis aspernatur nam expedita corrupti dolorum
          laboriosam fuga facere, sunt vel dignissimos quas tempora optio culpa
          libero nihil maxime? Soluta sit impedit distinctio saepe harum?
          Debitis, impedit nisi?
        </div>
      </div>
      <motion.div className="w-full hidden h-screen flex items-center justify-center text-white">
        <InteractiveAnim></InteractiveAnim>
      </motion.div>
      <div className="hidden w-full h-screen bg-[url('../public/TestImages/NightlifeNoiseFinal.jpg')] bg-center">
        <NewSceneOne></NewSceneOne>
      </div>
      <SideTest></SideTest>
      {other && (
        <div className="h-screen w-full flex items-center justify-center ">
          <Tilt></Tilt>
        </div>
      )}
      <div className="h-screen w-full hidden flex items-center justify-center z-40 ">
        <div>cdfd</div>
        <NahBro></NahBro>
      </div>
      <div className="h-screen w-full hidden">
        <Plan></Plan>
      </div>
      <div className="h-screen w-full bg-black ">
        <BatmanBegins></BatmanBegins>
      </div>
      <ImageView></ImageView>
      <Round></Round>
      <div className="bb w-full ">
        <div className="h-40 w-40 bg-red-500 sticky top-0"></div>
      </div>
      <div className="h-screen w-full hidden bg-blue-200 font-Neue flex items-center justify-center">
        <div className="text-9xl flex ">
          TH
          <motion.span
            style={{
              display: "inline-block",
              overflow: "hidden",
            }}
            className="  "
          >
            <motion.span
              initial={{ opacity: 1, x: "100%" }}
              animate={{ opacity: [1, 0, 0, 1], x: [0, -100, 100, 0] }}
              viewport={{ once: false }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="flex items-center justify-center"
            >
              E
            </motion.span>{" "}
          </motion.span>
          GU{" "}
          <motion.span
            style={{
              display: "inline-block",
              overflow: "hidden",
            }}
            className="  "
          >
            <motion.span
              initial={{ opacity: 1, x: "100%" }}
              animate={{ opacity: [1, 0, 0, 1], x: [0, -100, 100, 0] }}
              viewport={{ once: false }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="flex items-center justify-center"
            >
              Y
            </motion.span>{" "}
          </motion.span>
        </div>
      </div>
      <YetSpline></YetSpline>
      <div className="w-full h-screen flex items-center justify-center hidden">
        <AnotherObj></AnotherObj>
      </div>
      <div className="h-screen w-full border border-black hidden">
        <motion.div className="flex text-[10vw]">
          <motion.span
            className="border border-red-500"
            style={{ display: "inline", overflow: "hidden" }}
          >
            <motion.span
              whileInView={{ x: "0%" }}
              animate={{ x: "100%" }}
              className="border border-black"
            >
              T
            </motion.span>
          </motion.span>
          <motion.span style={{ display: "inline", overflow: "hidden" }}>
            <motion.span whileInView={{ x: "0%" }} initial={{ x: "100%" }}>
              A
            </motion.span>
          </motion.span>
          <motion.span style={{ display: "inline-block", overflow: "hidden" }}>
            <motion.span
              transition={{ duration: 0.7 }}
              whileInView={{ x: "0%" }}
              initial={{ x: "100%" }}
              className="flex items-center justify-center"
            >
              R
            </motion.span>
          </motion.span>
          <motion.span
            style={{
              display: "inline-block",
              overflow: "hidden",
            }}
            className="  "
          >
            <motion.span
              initial={{ opacity: 1, x: "100%" }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center"
            >
              Y
            </motion.span>{" "}
          </motion.span>
        </motion.div>
      </div>
      <LightsAndHelpers></LightsAndHelpers>
      {typeof window !== "undefined" && (
        <PracticeFloatObject></PracticeFloatObject>
      )}
    </motion.div>
  );
}
