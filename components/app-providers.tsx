import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import store from "@/store";

const client = new QueryClient();

type AppProvidersProps = {
  session: any
  children: any
}

export default function AppProviders({ children, session }: AppProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Head>
            <title>CoreTask | Task Manager</title>
            <link rel="icon" href="favicon.png" />
          </Head>
          <AnimatePresence>
            {children}
          </AnimatePresence>
          <Toaster />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

