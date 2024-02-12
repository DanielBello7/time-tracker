import TaskRenderer from "./task-renderer";
import DashboardScreenLayout from "@/components/dashboard-screen-layout";
import TasksHeader from "./task-header";

export default function Tasks() {
  return (
    <DashboardScreenLayout header={<TasksHeader />}>
      <TaskRenderer />
    </DashboardScreenLayout>
  )
}

