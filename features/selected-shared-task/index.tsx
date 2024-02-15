import ScreenLayout from "@/components/layout/screen-layout";
import * as React from "react";
import TaskDetails from "@/components/selected/task-details";
import TaskUsersDetails from "./task-users-details";
import SelectedSharedTaskHeaderOptions from "./selected-shared-task-header";

export default function SelectedSharedTask() {
  return (
    <ScreenLayout header={SelectedSharedTaskHeaderOptions} useGrid={false} className="block lg:flex">
      <React.Fragment>
        <div className="w-full lg:w-2/3 py-10 px-3">
          <TaskDetails />
        </div>
        <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
          <TaskUsersDetails />
        </div>
      </React.Fragment>
    </ScreenLayout>
  )
}

