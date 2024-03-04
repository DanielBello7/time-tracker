import getThreeDimensions from "@/apis/get-three-dimensions";
import { useQuery } from "react-query"

export default function useThreeDimensions(userId: string) {
  const { data, isFetching, error, refetch } = useQuery(
    ["three-dimensions", userId],
    () => getThreeDimensions(userId),
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isFetching,
    error,
    refetch
  }
}

