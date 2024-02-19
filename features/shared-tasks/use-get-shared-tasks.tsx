import { getSharedTasks } from "@/apis/get-shared-tasks"
import { useRouter } from "next/router";
import { useQuery } from "react-query"

export default function useGetSharedTasks(userId: string) {
  const router = useRouter();
  const { search } = router.query
  const searchValue = search && typeof search == "string" ? search : null;
  const { data, isFetching, error, refetch } = useQuery(
    ["shared-tasks", userId, searchValue],
    () => getSharedTasks(userId, searchValue)
  );

  return {
    data,
    isFetching,
    error,
    refetch
  }
}

