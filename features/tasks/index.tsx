import ErrorComponent from "@/components/error-component";
import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import * as React from "react";
import Container from "@/components/container";
import Renderer from "@/components/renderer";
import useTasks from "./use-tasks";
import TasksLoader from "./tasks-loader";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

export default function Tasks() {
  const router = useRouter();
  const { type, search } = router.query;
  const { _id } = useAppSelector((state) => state.user.user);
  const { data, error, isFetching: isLoading } = useTasks(_id, type as any, search as any);
  if (error) return <ErrorComponent />

  return (
    <Container header={TasksHeader} grid>
      <Renderer error={error} isLoading={isLoading} loader={<TasksLoader />}>
        {data && <TaskRenderer tasks={data.docs} />}
      </Renderer>
    </Container>
  )
}

