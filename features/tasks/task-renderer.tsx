import type { TASK } from "@/types/task.types";
import TaskItem from "./task-item";
import * as React from "react";
import { motion } from "framer-motion";
import { item as val } from "./animation"

type TaskRendererProps = {
  tasks?: TASK[]
}

export default function TaskRenderer({ tasks = [] }: TaskRendererProps) {
  return (
    <React.Fragment>
      {tasks.map((item, idx) => (
        <motion.div variants={val} key={idx}>
          <TaskItem {...item} />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

