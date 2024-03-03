import * as React from "react";
import TaskLoading from "./task-loading";
import { motion } from "framer-motion";
import { item as val } from "./animation"

export default function TasksLoader() {
  return (
    <React.Fragment>
      {[1, 2, 3, 4, 5, 6, 7, , 8, 9].map((item) => (
        <motion.div key={item} variants={val}>
          <TaskLoading />
        </motion.div>
      ))}
    </React.Fragment>
  )
}
