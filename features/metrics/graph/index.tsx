import ThreeDimension from "./three-dimensions";
import TwoDimension from "./two-dimensions";
import { motion } from "framer-motion";

export default function Graph() {
  return (
    <div className="mt-3 grid lg:grid-cols-3 gap-3">
      <motion.div className="w-full lg:col-span-2 border rounded"
        initial={{ opacity: 0.7, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.7, scale: 0.96 }}
      >
        <TwoDimension />
      </motion.div>
      <motion.div className="w-full border rounded"
        initial={{ opacity: 0.7, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.7, scale: 0.96 }}
      >
        <ThreeDimension />
      </motion.div>
    </div>
  )
}
