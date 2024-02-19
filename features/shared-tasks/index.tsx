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
  const { data, error, isFetching, refetch } = useGetSharedTasks(_id);

  return (
    <Container header={SharedTasksHeader} grid={data && data?.docs.length > 0}>
      <Renderer error={error} isLoading={isFetching} refresh={refetch}
        loader={<SharedTasksLoader />}>
        {
          data && data.docs.length > 0
            ? <SharedTaskRenderer docs={data.docs} />
            : <EmptySharedTasks />
        }
      </Renderer>
    </Container>
  )
}

