import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { font } from "@/constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={pageProps.session}>
        <div className={font.inter.className}>
          <Component {...pageProps} />
          <Toaster />
        </div>
      </SessionProvider>
    )
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <div className={font.inter.className}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </SessionProvider>
  )
}

