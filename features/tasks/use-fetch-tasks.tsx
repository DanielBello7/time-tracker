import { useQuery } from "react-query";
import { getTasks } from "@/apis/get-tasks";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { addTasks, resetTasks } from "@/store/tasks-slice";
import * as React from "react";

export default function useFetchTasks(id: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { type, search } = router.query;
  const [page, setPage] = React.useState(1);

  const searchValue = search && typeof search === "string" ? search : null;
  const typeValue = type && typeof type === "string" ? type : null;

  return useQuery(
    ["tasks", id, searchValue, typeValue],
    () => getTasks(id, searchValue, typeValue),
    {
      onSuccess(data) {
        dispatch(resetTasks());
        dispatch(addTasks(data.docs));
      },
    }
  );
}

