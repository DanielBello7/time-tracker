import TaskRenderer from "./task-renderer";
import ScreenLayout from "@/components/layout/screen-layout";
import TasksHeader from "./task-header";
import EmptyTasks from "./empty-tasks";

export default function Tasks() {
  return (
    <ScreenLayout header={TasksHeader} useGrid={false}>
      {false ? <TaskRenderer /> : <EmptyTasks />}
    </ScreenLayout>
  )
}

