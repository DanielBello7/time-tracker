import { useQuery } from "react-query";
import { getTasks } from "@/apis/get-tasks";

export default function useTasks(id: string) {
  const { data, isFetching, refetch, error } = useQuery(["tasks", id], () => getTasks(id));

  return {
    data,
    isFetching,
    refetch,
    error
  }
}

