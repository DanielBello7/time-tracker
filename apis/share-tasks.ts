import axios from "axios";

type SHARE = {
  sharedTo: string
  taskId: string
}

export default async function shareTasks(
  userId: string, data: SHARE[]
): Promise<void> {
  await axios.post("/api/shared-tasks/", {
    tasks: data,
    sharedBy: userId
  });
}

