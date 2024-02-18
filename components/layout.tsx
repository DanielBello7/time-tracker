import { Toaster } from "./ui/sonner";
import * as React from "react";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </React.Fragment>
  )
}

export default Layout;

