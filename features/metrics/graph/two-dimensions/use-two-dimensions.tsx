import getTwoDimensions from "@/apis/get-two-dimensions";
import { useQuery } from "react-query"

export default function useTwoDimensions(userId: string) {
  const { data, isFetching, error, refetch } = useQuery(
    ["two-dimensions", userId],
    () => getTwoDimensions(userId),
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isFetching,
    error,
    refetch
  }
}

