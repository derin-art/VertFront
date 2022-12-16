import { AnimatePresence, motion } from "framer-motion";

export default function useFramerAnimation(component: any, bool: boolean) {
  const variants = {
    out: {
      opacity: 0,
      x: 200,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        delay: 0.3,
      },
    },
  };

  const blurVariant = {
    out: {
      opacity: 0,
      x: 0,
      transition: {
        duration: 0.46,
      },
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.46,
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        key={bool.toString()}
        variants={blurVariant}
        animate="in"
        initial="out"
        exit={"out"}
        className="w-full absolute"
      >
        {bool && component}
      </motion.div>
    </AnimatePresence>
  );
}
