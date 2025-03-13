import Header from "@/components/header";
import Footer from "@/components/footer";
import Title from "./title";
import Body from "./body";
import { motion } from "framer-motion";

export default function Legal() {
  return (
    <motion.div className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <Title />
      <Body />
      <Footer />
    </motion.div>
  )
}

