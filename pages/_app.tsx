import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import DataContextProvider from '@/context/data.context';
import ModalContextProvider from '@/context/modal.context';
import TaskContextProvider from '@/context/tasks.context';
import '@/styles/globals.css'

function MainLayout(props: { children: React.ReactNode }) {
  return (
    <DataContextProvider>
      <TaskContextProvider>
        <ModalContextProvider>
          {props.children}
        </ModalContextProvider>
      </TaskContextProvider>
    </DataContextProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}