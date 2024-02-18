import type { TASK } from "@/types/task.types";
import TaskItem from "./task-item";
import * as React from "react";

type TaskRendererProps = {
  tasks?: TASK[]
}

export default function TaskRenderer({ tasks = [] }: TaskRendererProps) {
  return (
    <React.Fragment>
      {tasks.map((item, idx) => (
        <TaskItem {...item} key={idx} />
      ))}
    </React.Fragment>
  )
}

