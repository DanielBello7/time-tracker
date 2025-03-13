import axios from "axios";

export default async function updateEmail(
  userId: string, newEmail: string
): Promise<void> {
  await axios.patch("/api/users/email", {
    userId, newEmail
  });
}

