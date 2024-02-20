import axios from "axios";

export default async function deleteAllSharedTasks(
  userId: string
): Promise<void> {
  await axios.delete(`/api/shared-tasks/all/${userId}`);
}

