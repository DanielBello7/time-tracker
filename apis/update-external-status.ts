import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import axios from "axios";

export default async function updateExternalTaskStatus(
  taskId: string, isActive: boolean
): Promise<EXTERNAL_SHARED_TASK> {
  const response = await axios.patch(`/api/shared-tasks/external/${taskId}`, {
    isActive
  });
  return response.data.payload;
}

