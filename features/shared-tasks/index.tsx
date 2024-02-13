import SharedTasksHeader from "./shared-tasks-header";
import ScreenLayout from "@/components/layout/screen-layout";
import SharedTaskRenderer from "./shared-tasks-renderer";

export default function SharedTasks() {
  return (
    <ScreenLayout Header={<SharedTasksHeader />}>
      <SharedTaskRenderer />
    </ScreenLayout>
  )
}

