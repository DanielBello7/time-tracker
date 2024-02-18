import { Provider } from "react-redux";
import store from "@/store";
import * as React from "react";

type ReduxLayoutProps = {
  children: React.ReactNode | React.ReactNode[]
}

export default function ReduxLayout({ children }: ReduxLayoutProps) {
  return (
    <Provider store={store}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </Provider>
  )
}

