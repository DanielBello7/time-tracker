import Container from "@/components/container";
import SelectedTaskHeader from "./selected-task-header";
import * as React from "react";
import TaskDetails from "@/components/selected/task-details";
import TaskUserDetails from "./task-user-details";

export default function SelectedTask() {
  return (
    <Container header={SelectedTaskHeader} className="block lg:flex">
      <div className="w-full lg:w-2/3 py-10 px-3">
        <TaskDetails />
      </div>
      <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
        <TaskUserDetails />
      </div>
    </Container>
  )
}

