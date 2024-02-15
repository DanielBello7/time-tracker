import { CreateTaskContextProvider } from "./create-context";
import ScreenLayout from "@/components/layout/screen-layout";
import CreateTaskHeader from "./create-task-header";
import CreateInputFields from "./create-input-fields";
import CreateTaskPreview from "./create-task-preview";
import * as React from "react";

type CreateTaskProps = {
  defautValues?: any
  header?: (() => React.ReactElement)
}

export default function CreateTask({ defautValues, header }: CreateTaskProps) {
  return (
    <CreateTaskContextProvider defaultValue={defautValues}>
      <ScreenLayout Header={header ?? CreateTaskHeader} useGrid={false} className="flex">
        <React.Fragment>
          <div className="w-full md:w-11/12 lg:w-7/12">
            <CreateInputFields />
          </div>
          <div className="hidden lg:block md:w-5/12">
            <CreateTaskPreview />
          </div>
        </React.Fragment>
      </ScreenLayout>
    </CreateTaskContextProvider>
  )
}

