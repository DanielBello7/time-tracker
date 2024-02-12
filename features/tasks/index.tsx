import TaskRenderer from "./task-renderer";
import DashboardBodyLayout from "@/components/dashboard-body-layout";
import TasksHeader from "./task-header";

export default function Tasks() {
  return (
    <DashboardBodyLayout header={<TasksHeader />}>
      <TaskRenderer />
    </DashboardBodyLayout>
  )
}

