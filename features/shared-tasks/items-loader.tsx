import * as React from "react";
import SharedTaskLoading from "./loading-component";
import { motion } from "framer-motion";
import { item as val } from "./animation"

export default function SharedTasksLoader() {
  return (
    <React.Fragment>
      {[1, 2, 3, 4, 5].map((item) => (
        <motion.div variants={val} key={item}>
          <SharedTaskLoading />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

