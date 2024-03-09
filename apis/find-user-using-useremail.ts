import { USER } from "@/types/user.types";
import axios from "axios";

export default async function findUserUsingUseremail(
  email: string, token?: string
): Promise<USER> {
  if (token) {
    const response = await axios.get(`/api/users/email/${email}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data.payload;
  } else {
    const response = await axios.get(`/api/users/email/${email}`);
    return response.data.payload;
  }
}

