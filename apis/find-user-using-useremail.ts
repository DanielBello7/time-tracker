import { USER } from "@/types/user.types";
import axios from "axios";

export default async function findUserUsingUseremail(
  email: string, token?: string
): Promise<USER> {
  const response = await axios.get(`/api/users/email/${email}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return response.data.payload;
}

