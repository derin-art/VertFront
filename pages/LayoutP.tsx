import A8 from "../public/TestImages/A8.jpg";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LayoutP() {
  return (
    <div className="w-full relative flex items-center h-screen overflow-hidden justify-center h-screen bg-black">
      <Link href={"/LayoutT"} className="text-white z-40">
        LayoutT
      </Link>
      <motion.img
        width={800}
        transition={{ duration: 0.6 }}
        layout
        className="absolute top-[400px]"
        layoutId="ImageP"
        src={A8.src}
      ></motion.img>
    </div>
  );
}
