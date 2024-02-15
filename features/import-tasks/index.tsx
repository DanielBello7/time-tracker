import Container from "@/components/layout/container";
import ImportTasksHeader from "./import-tasks-header";
import ImportTaskTitle from "./title";
import TaskItem from "../tasks/task-item";

export default function ImportTasks() {
  return (
    <Container header={ImportTasksHeader} useGrid={false}>
      <ImportTaskTitle />
      <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-4 md:gap-2 lg:gap-2 content-start">
        <TaskItem />
        <TaskItem />
      </div>
    </Container>
  )
}

