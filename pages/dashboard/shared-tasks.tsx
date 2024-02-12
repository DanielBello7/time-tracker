import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";

export default function SharedTasksPage() {
  return (
    <div>Shared Tasks Page</div>
  )
}

SharedTasksPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
