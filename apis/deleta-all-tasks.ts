import axios from "axios";

export default async function deleteAllTasks(
  userId: string
): Promise<void> {
  await axios.delete(`/api/tasks/all/${userId}`);
}

