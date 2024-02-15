import SharedTaskRenderer from "./shared-tasks-renderer";
import SharedTasksHeader from "./shared-tasks-header";
import * as React from "react";
import Container from "@/components/container";

export default function SharedTasks() {
  return (
    <Container header={SharedTasksHeader} grid>
      <SharedTaskRenderer />
    </Container>
  )
}

