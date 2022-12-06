import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  console.log(router.pathname);

  const getPageTitle = () => {
    switch (router.pathname) {
      case "/login":
        return "Login";
      case "/profile":
        return "Profile"

      default:
        return "";
    }
  };

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout
          pageInfo={{
            pageTitle: getPageTitle(),
          }}
        >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
