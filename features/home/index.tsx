import Footer from "@/features/home/footer";
import Header from "@/features/home/header";
import Main from "./main";
import * as React from "react";

function Home() {
  return (
    <div className="w-full bg-grid">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default React.memo(Home);
