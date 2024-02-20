import axios from "axios";

export default async function passwordAuth(
  userId: string, password: string
): Promise<boolean> {
  const response = await axios.post("/api/users/authenticate", {
    userId,
    password
  });
  return response.data.payload;
}

