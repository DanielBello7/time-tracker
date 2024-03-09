import axios from "axios";

export default async function passwordAuth(
  userId: string, password: string, token?: string
): Promise<boolean> {
  if (token) {
    const response = await axios.post("/api/users/authenticate", {
      userId,
      password
    }, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data.payload;
  } else {
    const response = await axios.post("/api/users/authenticate", {
      userId,
      password
    });
    return response.data.payload;
  }
}

