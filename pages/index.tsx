import Head from "next/head";
import Image from "next/image";
import AltPage from "../components/AltPage";
import styles from "../styles/Home.module.css";
import MainPageTest from "../components/MainPageTest";
import AltMainPage from "../components/AltMainPage";
import XPage from "../components/XPage";
import B1 from "../public/TestImages/B2.jpg";
import B2 from "../public/TestImages/B2.webp";
import B4 from "../public/TestImages/B444.png";
import { motion } from "framer-motion";
import MMainPage from "../components/ModernTake/MMainPage";
import NewXpage from "../components/ModernTake/NewXpage";
import Collection from "../components/ModernTake/Collection";
import AnotherMain from "../components/ModernTake/AnotherMain";
import { useState } from "react";
import Varsity from "../components/ModernTake/Varsity";

export default function Home() {
  const [other, setOther] = useState(true);
  return (
    <div className="">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        onAnimationComplete={() => {
          setOther((prev) => !prev);
        }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <AltMainPage other={other}></AltMainPage>
      </motion.div>
      <NewXpage></NewXpage>
      <Collection></Collection>
      <Varsity></Varsity>
    </div>
  );
}

/*  <AltMainPage other={other}></AltMainPage> */
