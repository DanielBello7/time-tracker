import { getSharedTasks } from "@/apis/get-shared-tasks"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { addSharedTasks, resetSharedTasks } from "@/store/tasks-slice";
import { updateSharedTaskHasMore } from "@/store/tasks-slice"

export default function useFetchSharedTasks(userId: string) {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useAppDispatch();
  const { sharedTaskPage } = useAppSelector((state) => state.tasks)

  const searchValue = search && typeof search == "string" ? search : undefined;

  return useQuery(
    ["shared-tasks", userId, searchValue, sharedTaskPage],
    () => getSharedTasks({
      sharedTo: userId,
      search: searchValue,
      page: sharedTaskPage,
      limit: 4
    }),
    {
      onSuccess(data) {
        dispatch(updateSharedTaskHasMore(data.hasNextPage));
        if (searchValue) dispatch(resetSharedTasks());
        dispatch(addSharedTasks(data.docs));
      },
      refetchOnWindowFocus: false
    }
  );
}

