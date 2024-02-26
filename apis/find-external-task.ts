import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import axios from "axios";

export default async function findExternalTask(
  taskId: string
): Promise<EXTERNAL_SHARED_TASK> {
  const response = await axios.get(`/shared-tasks/external/${taskId}`);
  return response.data.payload;
}

