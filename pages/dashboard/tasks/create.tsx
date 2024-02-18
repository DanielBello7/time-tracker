import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";
import CreateTask from "@/features/create-task";

export default function CreateTaskPage() {
  return <CreateTask />
}

CreateTaskPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

