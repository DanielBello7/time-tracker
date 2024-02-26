import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "./main";
import * as React from "react";

function Home() {
  return (
    <div className="w-full bg-grid">
      <Header />
      <Main />
      <Footer showBorder={false} />
    </div>
  )
}

export default React.memo(Home);
