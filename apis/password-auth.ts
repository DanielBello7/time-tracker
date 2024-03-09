import axios from "axios";

export default async function passwordAuth(
  userId: string, password: string, token?: string
): Promise<boolean> {
  const response = await axios.post("/api/users/authenticate", {
    userId,
    password
  }, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return response.data.payload;
}

