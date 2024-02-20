import SharedTaskRenderer from "./renderer";
import SharedTasksHeader from "./header";
import * as React from "react";
import Container from "@/components/container";
import useGetSharedTasks from "./use-get-shared-tasks";
import Renderer from "@/components/renderer";
import SharedTasksLoader from "./loader";
import EmptySharedTasks from "./empty-tasks";
import { useAppSelector } from "@/store/hooks";

export default function SharedTasks() {
  const { _id } = useAppSelector((state) => state.user.user);
  const { error, isFetching, refetch } = useGetSharedTasks(_id);
  const { sharedTasks } = useAppSelector((state) => state.tasks);
  return (
    <Container header={SharedTasksHeader} grid>
      <Renderer error={error} isLoading={isFetching} refresh={refetch}
        loader={<SharedTasksLoader />}>
        {
          sharedTasks.length > 0
            ? <SharedTaskRenderer docs={sharedTasks} />
            : <EmptySharedTasks />
        }
      </Renderer>
    </Container>
  )
}

