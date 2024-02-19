import { useQuery } from "react-query";
import { getTasks } from "@/apis/get-tasks";

export default function useTasks(id: string, type?: string, search?: string) {
  const { data, isFetching, refetch, error } = useQuery(
    ["tasks", id, type, search],
    () => getTasks(id, search, type)
  );

  return {
    data,
    isFetching,
    refetch,
    error
  }
}

