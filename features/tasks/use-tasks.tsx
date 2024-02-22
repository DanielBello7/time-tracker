import { useQuery } from "react-query";
import { getTasks } from "@/apis/get-tasks";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { addTasks, resetTasks } from "@/store/tasks-slice";

export default function useTasks(id: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { type, search } = router.query;

  const searchValue = search && typeof search === "string" ? search : null;
  const typeValue = type && typeof type === "string" ? type : null;

  const { data, isFetching, refetch, error } = useQuery(
    ["tasks", id, searchValue, typeValue],
    () => getTasks(id, searchValue, typeValue),
    {
      onSuccess(data) {
        dispatch(resetTasks());
        dispatch(addTasks(data.docs));
      },
    }
  );

  return {
    data,
    isFetching,
    refetch,
    error
  }
}

