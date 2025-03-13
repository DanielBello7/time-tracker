import axios from "axios";

export default async function sendOtp(
  email: string, token?: string
): Promise<void> {
  if (token) {
    await axios.post("/api/actions/send-otp", {
      email
    }, {
      headers: { "Authorization": `Bearer ${token}` }
    });
  } else {
    await axios.post("/api/actions/send-otp", {
      email
    });
  }
}

