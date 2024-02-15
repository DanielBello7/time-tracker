import TaskRenderer from "./task-renderer";
import ScreenLayout from "@/components/layout/screen-layout";
import TasksHeader from "./task-header";

export default function Tasks() {
  return (
    <ScreenLayout header={TasksHeader}>
      <TaskRenderer />
    </ScreenLayout>
  )
}

