import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import ReduxLayout from "@/components/redux-layout";

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
        <ReduxLayout>
          <Component {...pageProps} />
          <Toaster />
        </ReduxLayout>
      </SessionProvider>
    )
  }
  return (
    <SessionProvider session={pageProps.session}>
      <ReduxLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxLayout>
    </SessionProvider>
  )
}

