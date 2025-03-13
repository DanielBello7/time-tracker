import axios from "axios";

export default async function deleteTask(ids: string[]): Promise<void> {
  await axios.delete(`/api/tasks`, {
    data: {
      tasks: ids
    }
  });
}
