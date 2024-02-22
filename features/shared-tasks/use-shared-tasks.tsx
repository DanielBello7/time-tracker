import { getSharedTasks } from "@/apis/get-shared-tasks"
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { addSharedTasks, resetSharedTasks } from "@/store/tasks-slice";

export default function useGetSharedTasks(userId: string) {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useAppDispatch();
  const searchValue = search && typeof search == "string" ? search : null;
  const { data, isFetching, error, refetch } = useQuery(
    ["shared-tasks", userId, searchValue],
    () => getSharedTasks(userId, searchValue),
    {
      onSuccess(data) {
        dispatch(resetSharedTasks());
        dispatch(addSharedTasks(data.docs));
      },
    }
  );

  return {
    data,
    isFetching,
    error,
    refetch
  }
}

