import SharedTasksHeader from "./shared-tasks-header";
import DashboardBodyLayout from "@/components/dashboard-body-layout";
import SharedTaskRenderer from "./shared-tasks-renderer";

export default function SharedTasks() {
  return (
    <DashboardBodyLayout header={<SharedTasksHeader />}>
      <SharedTaskRenderer />
    </DashboardBodyLayout>
  )
}

