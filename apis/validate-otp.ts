import axios from "axios";

export default async function validateOtp(
  otp: string
): Promise<void> {
  await axios.post("/api/actions/validate-otp", { otp });
}

