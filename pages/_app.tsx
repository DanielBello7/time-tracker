import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import store from "@/store";
import Layout from "@/components/layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {Component.getLayout(<Component {...pageProps} />)}
          <Toaster />
        </Provider>
      </SessionProvider>
    )
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}
