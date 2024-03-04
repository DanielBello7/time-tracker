import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import * as React from "react";
import Container from "@/components/container";
import Renderer from "@/components/renderer";
import useFetchTasks from "./use-fetch-tasks";
import TasksLoader from "./tasks-loader";
import EmptyTasks from "./empty-tasks";
import { useAppSelector } from "@/store/hooks";
import { container } from "./animation";

export default function Tasks() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { tasks } = useAppSelector((state) => state.tasks);
  const { error, isFetching: isLoading } = useFetchTasks(_id);

  return (
    <React.Fragment>
      <Container header={TasksHeader} grid={true} useAnimationContainer={true} animationVariants={container}>
        <Renderer error={error} isLoading={isLoading} loader={<TasksLoader />} occupyLoading={false}>
          <TaskRenderer tasks={tasks} />
          {!isLoading && tasks.length < 1 && <EmptyTasks />}
        </Renderer>
      </Container>
    </React.Fragment>
  )
}

