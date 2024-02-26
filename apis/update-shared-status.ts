import axios from "axios";

export default async function updateSharedStatus(
  sharedId: string, data: Partial<{ isActive: boolean; isRead: boolean }>
) {
  await axios.patch("/api/shared-tasks/status", {
    sharedId,
    ...data
  });
}
