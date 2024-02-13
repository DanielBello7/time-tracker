import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";
import SharedTasks from "@/features/shared-tasks";

export default function SharedTasksPage() {
  return <SharedTasks />
}

SharedTasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
