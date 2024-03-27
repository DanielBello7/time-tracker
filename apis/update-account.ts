import type { UPDATE_USER } from "@/types/user.types";
import axios from "axios";

export default async function updateAccount(
  userId: string, data: Partial<UPDATE_USER> = {}, token?: string
): Promise<void> {
  if (token) {
    await axios.patch(`/api/users/${userId}`, data, {
      headers: { "Authorization": `Bearer ${token}` }
    });
  } else {
    await axios.patch(`/api/users/${userId}`, data);
  }
}

