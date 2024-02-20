import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import * as React from "react";
import Container from "@/components/container";
import Renderer from "@/components/renderer";
import useTasks from "./use-tasks";
import TasksLoader from "./tasks-loader";
import EmptyTasks from "./empty-tasks";
import { useAppSelector } from "@/store/hooks";

export default function Tasks() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { tasks } = useAppSelector((state) => state.tasks);
  const { error, isFetching: isLoading } = useTasks(_id);

  return (
    <Container header={TasksHeader} grid>
      <Renderer error={error} isLoading={isLoading} loader={<TasksLoader />}>
        {
          tasks.length > 0
            ? <TaskRenderer tasks={tasks} />
            : <EmptyTasks />
        }
      </Renderer>
    </Container>
  )
}

