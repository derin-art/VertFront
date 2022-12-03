import { motion } from "framer-motion";

export default function Header() {
  const Links = ["home", "collection"];
  return (
    <div className="w-full  font-Poppins text-xs fixed h-20 p-4 flex items-center z-50 bg-white">
      <div>
        {Links.map((item) => {
          return (
            <button key={item} className="ml-4">
              {item}
            </button>
          );
        })}
      </div>
      <p className=" font-SecFont absolute right-4 text-5xl line-through">
        Vert
      </p>
    </div>
  );
}

/* <div>
        <motion.div
          initial={{
            marginTop: "0px",
            rotate: 90,
          }}
          whileInView={{
            marginTop: "340px",
            rotate: 90,
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="rotate-90 -ml-20 mt-32 w-fit text-[200px] text-gray-200 hidden font-Berk"
        >
          Vert
        </motion.div>
      </div> */
