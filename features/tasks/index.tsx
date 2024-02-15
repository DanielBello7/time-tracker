import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import EmptyTasks from "./empty-tasks";
import * as React from "react";
import Container from "@/components/layout/container";

export default function Tasks() {
  return (
    <React.Fragment>
      {
        !false
          ?
          <Container header={TasksHeader}>
            <TaskRenderer />
          </Container>
          :
          <EmptyTasks />
      }
    </React.Fragment>
  )
}

