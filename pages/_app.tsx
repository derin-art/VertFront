import "../styles/globals.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Wrapper from "../components/Wrapper";
import Router, { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../hooks/useDispatch";
import { change } from "../Features/loadingSlice";
import LoadingPage from "../components/LoadingPage";

const ProgressBar = dynamic(() => import("../components/atoms/ProgressBar"), {
  ssr: false,
});
import { Provider } from "react-redux";
import { store } from "../store";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
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

  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <Provider store={store}>
        <Wrapper location={router} key={router.pathname}>
          <Component {...pageProps} />
        </Wrapper>
      </Provider>
      <script src="https://unpkg.com/blotterjs-fork@0.1.0/build/blotter.min.js"></script>
    </AnimatePresence>
  );
}

/* {/*  <ProgressBar></ProgressBar> * */
