import SharedTasksHeader from "./shared-tasks-header";
import DashboardScreenLayout from "@/components/layout/dashboard-screen-layout";
import SharedTaskRenderer from "./shared-tasks-renderer";

export default function SharedTasks() {
  return (
    <DashboardScreenLayout header={<SharedTasksHeader />}>
      <SharedTaskRenderer />
    </DashboardScreenLayout>
  )
}

