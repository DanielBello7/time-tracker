import store, { persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type ReduxLayoutProps = {
  children: React.ReactNode | React.ReactNode[]
}
export default function ReduxLayout({ children }: ReduxLayoutProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  )
}

