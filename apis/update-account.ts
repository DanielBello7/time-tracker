import type { UPDATE_USER } from "@/types/user.types";
import axios from "axios";

export default async function updateAccount(
  userId: string, data: UPDATE_USER
): Promise<void> {
  await axios.patch(`/api/users/${userId}`, data);
}

