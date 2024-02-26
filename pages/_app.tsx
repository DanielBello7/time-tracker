import AppProviders from "@/components/app-providers";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "@/styles/globals.css";

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
      <AppProviders session={pageProps.session}>
        {Component.getLayout(<Component {...pageProps} />)}
      </AppProviders>
    )
  }
  return (
    <AppProviders session={pageProps.session}>
      <Component {...pageProps} />
    </AppProviders>
  )
}
