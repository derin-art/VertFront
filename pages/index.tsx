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
import { increment } from "../Features/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";

export default function Home() {
  const [other, setOther] = useState(true);
  const dispatch = useAppDispatch();
  /* console.log(useAppSelector((state) => state.cart.value)); */
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
        viewport={{ once: false }}
      >
        <AltMainPage></AltMainPage>
        <button
          className="hidden"
          onClick={() => {
            dispatch(increment());
          }}
        >
          sd
        </button>
      </motion.div>

      <Collection></Collection>
      <Varsity></Varsity>
      <div className="h-screen bg-white flex items-center justify-center snapChild">
        <div className="w-4/5 border h-4/5 relative flex justify-end text-right">
          <div className="text-[200px] w-fit absolute left-0">®</div>
          <div className="pt-20 font-Poppins text-red-500 text-xs">
            <div className="">CONTACT US</div>
            <div>Our Client Advisors are available Mon-Sat 9am - 9pm ET</div>
            <div>
              Sun 10am-7pm ET LIVECHAT Our Client Advisors are currently
            </div>
            <div>unavailable CALL US +1 646 889 1895 EMAIL US</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*  <AltMainPage other={other}></AltMainPage> */

/*  <NewXpage></NewXpage> */
