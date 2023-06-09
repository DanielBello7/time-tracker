import type { AppProps } from 'next/app';
import DataContextProvider, { useApplicationData } from '@/context/data.context';
import ModalContextProvider from '@/context/modal.context';
import TaskContextProvider from '@/context/tasks.context';
import '@/styles/globals.css'
import SideBar from '@/components/sidebar';
import Authentication from '@/components/authentication';

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useApplicationData();
  return (
    <DataContextProvider>
      <TaskContextProvider>
        <ModalContextProvider>
          {
            !isLoggedIn
              ?
              <Authentication />
              :
              <main className='border w-full h-full border-2 border-red-300 flex overflow-hidden'>
                <div className='w-1/5 border border-blue-400 h-full'>
                  <SideBar />
                </div>
                <div className='w-4/5 border border-red-500 h-full'>
                  <Component {...pageProps} />
                </div>
              </main>
          }
        </ModalContextProvider>
      </TaskContextProvider>
    </DataContextProvider>
  )
}