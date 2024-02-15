import SharedTaskRenderer from "./shared-tasks-renderer";
import SharedTasksHeader from "./shared-tasks-header";
import EmptySharedTasks from "./empty-tasks";
import * as React from "react";
import Container from "@/components/layout/container";
import ErrorComponent from "@/components/error-component";

export default function SharedTasks() {
  return (
    <React.Fragment>
      {
        !true
          ?
          <Container header={SharedTasksHeader}>
            <SharedTaskRenderer />
          </Container>
          :
          // <EmptySharedTasks />
          <ErrorComponent />
      }
    </React.Fragment>
  )
}

