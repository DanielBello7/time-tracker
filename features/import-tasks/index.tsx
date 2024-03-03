import { ImportTasksContextProvider } from "./context";
import Container from "@/components/container";
import ImportTasksHeader from "./import-tasks-header";
import ImportTaskTitle from "./title";
import * as React from "react";
import ImportRenderer from "./import-renderer";

export default function ImportTasks() {
  return (
    <ImportTasksContextProvider>
      <Container header={ImportTasksHeader} useAnimationContainer={true}>
        <ImportTaskTitle />
        <ImportRenderer />
      </Container>
    </ImportTasksContextProvider>
  )
}

