import DashboardLayout from "@/components/dashboard-layout";
import * as React from "react";

export default function SettingsPage() {
  return (
    <div>Settings Page</div>
  )
}

SettingsPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

