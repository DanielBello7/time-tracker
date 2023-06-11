import type { AppProps } from 'next/app';
import DataContextProvider from '@/context/data.context';
import ModalContextProvider from '@/context/modal.context';
import TaskContextProvider from '@/context/tasks.context';
import AlertModal from '@/modules/alert';
import '@/styles/globals.css'

function MainLayout(props: { children: React.ReactNode }) {
  return (
    <DataContextProvider>
      <TaskContextProvider>
        <ModalContextProvider>
          {props.children}
          <AlertModal />
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