import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "./main";
import * as React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div className="w-full bg-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <Main />
      <Footer showBorder={false} />
    </motion.div>
  )
}

export default React.memo(Home);
