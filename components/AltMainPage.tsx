import { motion } from "framer-motion";
import Image from "next/image";
import Center1 from "../public/TestImages/Center1.jpg";
import TimeLineIcon from "../public/icons/timeLineIcon";
import AltMainCenter from "./AltMainCenter";
import { useState } from "react";
import { type } from "os";

type AltMainPageProps = {
  other?: boolean;
};

export default function AltMainPage() {
  const [openTimeLine, setOpenTimeLine] = useState(true);
  const borderSol = [1, 2, 3, 4, 5, 6];
  return (
    <div className={`h-screen bg-white p-4 pt-8 font-Poppins  linesB`}>
      <div className="text-[#0A090C] flex relative ">
        <button
          onClick={() => {
            setOpenTimeLine((prev) => !prev);
          }}
          className="absolute font-Oswald border border-black flex items-center justify-center text-xs hover:border-white duration-300 -right-1 top-14 p-2 z-30 border-black"
        >
          You might have missed...
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
        viewport={{ once: false }}
        className="h-5/6 mt-[91px] flex items-center justify-center relative "
      >
        <AltMainCenter openTimeLine={openTimeLine}></AltMainCenter>
      </motion.div>
    </div>
  );
}
