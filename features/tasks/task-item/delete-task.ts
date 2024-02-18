import axios from "axios";

export default async function deleteTask(id: string): Promise<void> {
  await axios.delete(`/api/tasks/${id}`);
}
