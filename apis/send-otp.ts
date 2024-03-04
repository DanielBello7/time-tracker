import axios from "axios";

export default async function sendOtp(
  otp: string, email: string
): Promise<void> {
  await axios.post("/api/actions/send-otp", {
    otp, email
  });
}

