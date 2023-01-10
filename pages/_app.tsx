import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Wrapper from "../components/Wrapper";

const ProgressBar = dynamic(() => import("../components/atoms/ProgressBar"), {
  ssr: false,
});
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <ProgressBar></ProgressBar>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
