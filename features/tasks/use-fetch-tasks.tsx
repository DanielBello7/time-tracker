import { addTasks, resetTasks } from "@/store/tasks-slice";
import { getTasks } from "@/apis/get-tasks";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateHasMore } from "@/store/tasks-slice";

export default function useFetchTasks(id: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.tasks);
  const { type, search } = router.query;

  const searchValue = search && typeof search === "string" ? search : undefined;
  const typeValue = type && typeof type === "string" ? type : undefined;

  return useQuery(
    ["tasks", id, searchValue, typeValue, page],
    () => getTasks({
      search: searchValue,
      type: typeValue,
      createdBy: id,
      page,
      limit: 4
    }),
    {
      onSuccess(data) {
        dispatch(updateHasMore(data.hasNextPage))
        if (searchValue) dispatch(resetTasks());
        dispatch(addTasks(data.docs));
      }
    }
  );
}

