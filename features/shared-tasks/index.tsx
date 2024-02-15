import SharedTasksHeader from "./shared-tasks-header";
import ScreenLayout from "@/components/layout/screen-layout";
import SharedTaskRenderer from "./shared-tasks-renderer";
import EmptySharedTasks from "./empty-tasks";

export default function SharedTasks() {
  return (
    <ScreenLayout header={SharedTasksHeader} useGrid={false}>
      {false ? <SharedTaskRenderer /> : <EmptySharedTasks />}
    </ScreenLayout>
  )
}

