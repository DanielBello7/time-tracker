import axios from "axios";

export default async function isEmailRegistered(
  email: string, token?: string
): Promise<boolean> {
  if (token) {
    const response = await axios.post("/api/users/is-email-registered", {
      email
    }, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.data.payload;
  } else {
    const response = await axios.post("/api/users/is-email-registered", {
      email
    });
    return response.data.payload;
  }
}

