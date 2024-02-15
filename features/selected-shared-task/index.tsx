import Container from "@/components/container";
import * as React from "react";
import TaskDetails from "@/components/selected/task-details";
import TaskUsersDetails from "./task-users-details";
import Options from "./selected-shared-task-header";

export default function SelectedSharedTask() {
  return (
    <Container header={Options} className="block lg:flex">
      <div className="w-full lg:w-2/3 py-10 px-3">
        <TaskDetails />
      </div>
      <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
        <TaskUsersDetails />
      </div>
    </Container>
  )
}

