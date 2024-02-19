import Container from "@/components/container";
import SelectedTaskHeader from "./selected-task-header";
import * as React from "react";
import TaskDetails from "./task-details";
import TaskUserDetails from "./task-user-details";
import type { TASK } from "@/types/task.types";
import ErrorComponent from "@/components/error-component";

type SelectedTaskProps = {
  task: TASK | null
  error: Error | null
}

export default function SelectedTask({ task, error }: SelectedTaskProps) {
  if (!task) return <ErrorComponent error={error} />
  return (
    <Container header={SelectedTaskHeader} className="block lg:flex">
      <div className="w-full lg:w-2/3 py-10 px-3">
        <TaskDetails task={task} />
      </div>
      <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
        <TaskUserDetails task={task} />
      </div>
    </Container>
  )
}

