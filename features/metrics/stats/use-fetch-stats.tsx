import getStats from "@/apis/get-stats";
import { useQuery } from "react-query";

export default function useFetchStats(userId: string) {
  const { data, isFetching, error, refetch } = useQuery(
    ["stats", userId],
    () => getStats(userId),
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isFetching,
    error,
    refetch
  }
}

