import DashboardLayout from "@/components/dashboard-layout";
import SelectedTask from "@/features/selected-task";
import * as React from "react";

export default function SelectedTaskPage() {
  return <SelectedTask />
}

SelectedTaskPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

