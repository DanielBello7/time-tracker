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
        <div className="border w-full md:w-7/12 py-10 overflow-scroll">
          <CreateInputFields />
        </div>
        <div className="border hidden md:block md:w-5/12 py-10 overflow-scroll">
          <CreateTaskPreview />
        </div>
      </CreateTaskContextProvider>
    </ScreenLayout>
  )
}

