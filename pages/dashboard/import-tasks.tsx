import DashboardLayout from "@/components/dashboard-layout";
import ImportTasks from "@/features/import-tasks";
import * as React from "react";

export default function ImportTasksPage() {
  return <ImportTasks />
}

ImportTasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

