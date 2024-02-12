import DashboardScreenLayout from "@/components/dashboard-screen-layout";
import SelectedTaskHeader from "./selected-task-header";
import * as React from "react";
import TaskDetails from "./task-details";
import TaskUserDetails from "./task-user-details";

export default function SelectedTask() {
  return (
    <DashboardScreenLayout header={<SelectedTaskHeader />}
      useGrid={false} className="block lg:flex">
      <React.Fragment>
        <div className="w-full lg:w-2/3 py-10 px-3">
          <TaskDetails />
        </div>
        <div className="w-full lg:w-1/3 py-12 px-3 lg:px-0">
          <TaskUserDetails />
        </div>
      </React.Fragment>
    </DashboardScreenLayout>
  )
}

