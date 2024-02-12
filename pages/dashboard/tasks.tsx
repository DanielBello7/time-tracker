import DashboardLayout from "@/components/dashboard-layout";
import Tasks from "@/features/tasks";
import * as React from "react";

export default function TasksPage() {
  return <Tasks />
}

TasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

