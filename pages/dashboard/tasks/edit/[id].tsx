import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";
import EditTask from "@/features/edit-task";

export default function EditTaskPage() {
  return <EditTask />
}

EditTaskPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

