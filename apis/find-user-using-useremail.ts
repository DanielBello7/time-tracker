import { USER } from "@/types/user.types";
import axios from "axios";

export default async function findUserUsingUseremail(email: string): Promise<USER> {
  const response = await axios.get(`/api/users/email/${email}`);
  return response.data.payload;
}

