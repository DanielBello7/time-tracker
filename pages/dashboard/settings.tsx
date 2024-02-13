import DashboardLayout from "@/components/dashboard-layout";
import Settings from "@/features/settings";
import * as React from "react";

export default function SettingsPage() {
  return <Settings />
}

SettingsPage.getLayout = function (page: React.ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

