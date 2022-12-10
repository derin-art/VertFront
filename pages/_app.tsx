import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/Wrapper";
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
