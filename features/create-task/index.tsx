import { CreateTaskContextProvider } from "./context";
import Container from "@/components/container";
import CreateTaskHeader from "./create-task-header";
import CreateInputFields from "./create-input-fields";
import CreateTaskPreview from "./create-task-preview";
import * as React from "react";
import { NEW_TASK } from "@/types/task.types";

type CreateTaskProps = {
  defautValues?: NEW_TASK
  header?: (() => React.ReactElement)
}

export default function CreateTask(props: CreateTaskProps) {
  const { defautValues, header } = props;
  return (
    <CreateTaskContextProvider defaultValue={defautValues}>
      <Container header={header ?? CreateTaskHeader} className="flex lg:px-8" useAnimationContainer={true}>
        <div className="w-full md:w-11/12 lg:w-7/12">
          <CreateInputFields />
        </div>
        <div className="hidden lg:block md:w-5/12">
          <CreateTaskPreview />
        </div>
      </Container>
    </CreateTaskContextProvider>
  )
}

