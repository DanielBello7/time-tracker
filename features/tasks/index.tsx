import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import * as React from "react";
import Container from "@/components/container";

export default function Tasks() {
  return (
    <Container header={TasksHeader} grid>
      <TaskRenderer />
    </Container>
  )
}

