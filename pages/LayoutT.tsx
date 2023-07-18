import A8 from "../public/TestImages/A8.jpg";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LayoutT() {
  return (
    <div className="w-full relative h-screen overflow-hidden flex items-center justify-center h-screen bg-black">
      <Link href={"/LayoutP"} className="text-white z-40">
        LayoutP
      </Link>
      <div className="border absolute top-10 left-10 w-[300px]">
        <motion.img
          width={400}
          layout
          transition={{ duration: 0.6 }}
          className="w-[400px] object-cover h-[400px]"
          layoutId="ImageP"
          src={A8.src}
        ></motion.img>
      </div>
    </div>
  );
}
