import { CreateTaskContextProvider } from "./create-context";
import ScreenLayout from "@/components/layout/screen-layout";
import CreateTaskHeader from "./create-task-header";
import * as React from "react";
import CreateInputFields from "./create-input-fields";
import CreateTaskPreview from "./create-task-preview";

export default function CreateTask() {
  return (
    <ScreenLayout Header={CreateTaskHeader} useGrid={false} className="flex">
      <CreateTaskContextProvider>
        <div className="w-full md:w-11/12 lg:w-7/12">
          <CreateInputFields />
        </div>
        <div className="hidden lg:block md:w-5/12">
          <CreateTaskPreview />
        </div>
      </CreateTaskContextProvider>
    </ScreenLayout>
  )
}

