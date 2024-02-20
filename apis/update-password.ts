import axios from "axios";

export default async function updatePassword(
  userId: string, newPassword: string,
): Promise<void> {
  await axios.patch("/api/users/password", {
    userId,
    newPassword
  });
}

