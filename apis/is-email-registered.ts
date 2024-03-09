import axios from "axios";

export default async function isEmailRegistered(
  email: string, token?: string
): Promise<boolean> {
  const response = await axios.post("/api/users/is-email-registered", {
    email
  }, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return response.data.payload;
}

