import { useQuery } from "react-query";
import { getTasks } from "@/apis/get-tasks";
import { useRouter } from "next/router";

export default function useTasks(id: string) {
  const router = useRouter();
  const { type, search } = router.query;

  const searchValue = search && typeof search === "string" ? search : null;
  const typeValue = type && typeof type === "string" ? type : null;

  const { data, isFetching, refetch, error } = useQuery(
    ["tasks", id, searchValue, typeValue],
    () => getTasks(id, searchValue, typeValue)
  );

  return {
    data,
    isFetching,
    refetch,
    error
  }
}

