import axios from "axios";

export default async function deleteSharedTasks(
  ids: string[]
): Promise<void> {
  await axios.delete("/api/shared-tasks", {
    data: {
      tasks: ids
    }
  });
}

