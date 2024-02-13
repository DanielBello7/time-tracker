import DashboardLayout from "@/components/layout/dashboard-layout";
import SelectedSharedTask from "@/features/selected-shared-task";
import * as React from "react";

export default function SelectedSharedTasksPage() {
  return <SelectedSharedTask />
}

SelectedSharedTasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

