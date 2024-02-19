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
  const { data, error, isFetching: isLoading } = useTasks(_id);

  return (
    <Container header={TasksHeader} grid={data && data.docs.length > 0}>
      <Renderer error={error} isLoading={isLoading} loader={<TasksLoader />}>
        {
          data && data.docs.length > 0
            ? <TaskRenderer tasks={data.docs} />
            : <EmptyTasks />
        }
      </Renderer>
    </Container>
  )
}

