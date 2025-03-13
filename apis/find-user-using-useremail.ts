import { USER_WITH_PASSWORD } from "@/types/user.types";
import axios from "axios";

export default async function findUserUsingUseremail(
  email: string, token?: string
): Promise<USER_WITH_PASSWORD> {
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

