import axios from "axios";

export default async function isEmailRegistered(email: string): Promise<boolean> {
  const response = await axios.post("/api/users/is-email-registered", {
    email
  });
  return response.data.payload;
}

