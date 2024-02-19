import TaskDetails from "./task-details";
import Container from "@/components/container";
import * as React from "react";
import TaskUsersDetails from "./task-users-details";
import Options from "./selected-shared-task-header";
import ErrorComponent from "@/components/error-component";
import type { SHARED_TASK } from "@/types/shared-task.types";

type SelectedSharedTaskProps = {
  task: SHARED_TASK | null,
  error?: Error | null
}

export default function SelectedSharedTask({ task, error }: SelectedSharedTaskProps) {
  if (!task) return <ErrorComponent error={error} />
  return (
    <Container header={Options} className="block lg:flex">
      <div className="w-full lg:w-2/3 py-10 px-3">
        <TaskDetails task={task} />
      </div>
      <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
        <TaskUsersDetails task={task} />
      </div>
    </Container>
  )
}

