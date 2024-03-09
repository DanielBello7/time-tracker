import type { UPDATE_USER } from "@/types/user.types";
import axios from "axios";

export default async function updateStatus(
  userId: string, data: UPDATE_USER, token?: string
): Promise<void> {
  await axios.patch(`/api/users/${userId}/status`, data, {
    headers: { "Authorization": `Bearer ${token}` }
  });
}

