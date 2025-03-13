import SelectedTaskHeader from "./selected-task-header";
import Container from "@/components/container";
import TaskDetails from "./task-details";
import TaskUserDetails from "./task-user-details";
import ErrorComponent from "@/components/error-component";
import * as React from "react";
import type { TASK } from "@/types/task.types";
import { item } from "./animation";
import { motion } from "framer-motion";

type SelectedTaskProps = {
  showHeader?: boolean
  task: TASK | null
  error: Error | null
}

export default function SelectedTask(props: SelectedTaskProps) {
  const { task, error, showHeader = true } = props;
  if (!task) return <ErrorComponent error={error} />
  return (
    <React.Fragment>
      <Container header={showHeader ? SelectedTaskHeader : null} className="block lg:flex" useAnimationContainer={true}>
        <motion.div className="w-full lg:w-2/3 py-10 px-3" variants={item}>
          <TaskDetails task={task} />
        </motion.div>
        <motion.div className="w-full lg:w-1/3 py-12 px-3 lg:px-0" variants={item}>
          <TaskUserDetails task={task} />
        </motion.div>
      </Container>
    </React.Fragment>
  )
}

