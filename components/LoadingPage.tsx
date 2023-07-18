import { animate, AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import { change, changeSpecific } from "../Features/loadingSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useDispatch";

type LoadingPageProps = {
  loading?: boolean;
  setLoad?: any;
};

export default function LoadingPage(props: LoadingPageProps) {
  const variants = {
    out: {
      opacity: 1,
      y: -200,
      transition: {
        duration: 2,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
  };

  const dispatch = useAppDispatch();
  const loadingState = useAppSelector((state) => state.loading.loading);

  Router.events.on("routeChangeStart", () => {
    dispatch(changeSpecific(true));
    console.log("heydf");
  });
  Router.events.on("routeChangeComplete", () => {
    dispatch(changeSpecific(false));
  });
  Router.events.on("routeChangeError", () => dispatch(change));

  return (
    <div className="w-full ">
      <AnimatePresence>
        <motion.div
          exit={{
            opacity: 0,
            y: -200,
            transition: {
              duration: 0.75,
              delay: 0.3,
            },
          }}
          initial={{
            opacity: 0,
            y: -200,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.75,
              delay: 0.3,
            },
          }}
          className="w-full fixed z-50"
          key={loadingState.toString()}
        >
          {loadingState && (
            <motion.div className="w-full h-screen bg-red-400 flex items-center justify-center  ">
              <div className="text-8xl">Loading...</div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
