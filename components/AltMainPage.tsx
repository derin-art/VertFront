import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import AltMainCenter from "./AltMainCenter";
import { useState } from "react";
import { type } from "os";

type AltMainPageProps = {
  toastId: any;
};

export default function AltMainPage(props: AltMainPageProps) {
  const { height, width } = useMediaQuery();

  const isMobileScreen = width ? width < 640 : true;
  const [openTimeLine, setOpenTimeLine] = useState(true);
  const borderSol = [1, 2, 3, 4, 5, 6];
  return (
    <div className={`h-screen bg-white p-4 pt-8 font-Poppins  linesB`}>
      <div className="text-[#0A090C] flex relative ">
        <button
          onClick={() => {
            setOpenTimeLine((prev) => !prev);
          }}
          className="absolute font-Oswald border border-black flex items-center justify-center text-xs hover:border-white duration-300 -right-1 top-14 p-2 z-20 border-black"
        >
          {openTimeLine ? " You might have missed..." : "back"}
        </button>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          marginTop: 0,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          marginTop: 91,
        }}
        transition={{ duration: 0.8 }}
        viewport={!isMobileScreen ? { once: false } : { once: true }}
        className="h-5/6 mt-[91px] flex items-center justify-center relative "
      >
        <AltMainCenter
          toastId={props.toastId}
          openTimeLine={openTimeLine}
        ></AltMainCenter>
      </motion.div>
    </div>
  );
}
