import Container from "@/components/container";
import ImportTasksHeader from "./import-tasks-header";
import ImportTaskTitle from "./title";
import TaskItem from "../tasks/task-item";
import classNames from "classnames";

export default function ImportTasks() {
  const grid = classNames({
    "w-full mt-5 grid grid-cols-1": true,
    "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": true,
    "gap-1 gap-4 md:gap-2 lg:gap-2 content-start": true
  });

  return (
    <Container header={ImportTasksHeader}>
      <ImportTaskTitle />
      <div className={grid}>
        <TaskItem />
        <TaskItem />
      </div>
    </Container>
  )
}

