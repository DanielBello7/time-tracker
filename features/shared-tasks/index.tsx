import SharedTaskRenderer from "./shared-tasks-renderer";
import SharedTasksHeader from "./header";
import * as React from "react";
import Container from "@/components/container";
import useFetchSharedTasks from "./use-fetch-shared-tasks";
import Renderer from "@/components/renderer";
import SharedTasksLoader from "./items-loader";
import EmptySharedTasks from "./empty-tasks";
import { useAppSelector } from "@/store/hooks";
import { container } from "./animation";

export default function SharedTasks() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { error, isFetching, refetch } = useFetchSharedTasks(_id);
  const { sharedTasks } = useAppSelector((state) => state.tasks);

  return (
    <React.Fragment>
      <Container header={SharedTasksHeader} grid={true} useAnimationContainer={true} animationVariants={container}>
        <Renderer error={error} isLoading={isFetching} refresh={refetch} loader={<SharedTasksLoader />} occupyLoading={false}>
          <SharedTaskRenderer docs={sharedTasks} />
          {!isFetching && sharedTasks.length < 1 && <EmptySharedTasks />}
        </Renderer>
      </Container>
    </React.Fragment>
  )
}

