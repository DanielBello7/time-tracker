import getStats from "@/apis/get-stats";
import { useQuery } from "react-query";

export default function useStats(userId: string) {
  const { data, isFetching, error, refetch } = useQuery(
    ["stats", userId],
    () => getStats(userId)
  );
  return {
    data,
    isFetching,
    error,
    refetch
  }
}

