import type { SHARED_TASK } from "@/types/shared-task.types";
import SharedTaskItem from "./shared-task-item";
import * as React from "react";
import { motion } from "framer-motion";
import { item as val } from "./animation";

type SharedTaskRendererProps = {
  docs: SHARED_TASK[]
}

export default function SharedTaskRenderer({ docs }: SharedTaskRendererProps) {
  return (
    <React.Fragment>
      {docs.map((item) => (
        <motion.div key={item._id} variants={val}>
          <SharedTaskItem {...item} />
        </motion.div>
      ))}
    </React.Fragment>
  )
}

