import { Toaster } from "../ui/sonner";
import * as React from "react";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
      <Toaster />
    </React.Fragment>
  )
}

