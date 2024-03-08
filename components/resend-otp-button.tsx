import { Button } from "./ui/button";
import { toast } from "sonner";
import sendOtp from "@/apis/send-otp";
import ensureError from "@/lib/ensure-error";

type ResendOtpButtonProps = {
  email: string
}

export default function ResendOtpButton({ email }: ResendOtpButtonProps) {
  const click = () => {
    sendOtp(email)
      .then(() => toast("OTP Sent to email"))
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }

  return (
    <Button variant={"link"} type="button" className="p-0 m-0 text-gray-400 text-xs ms-1" onClick={click}>
      <span>Didn't get the OTP?</span>
      <span className="text-blue-400 ms-1">Resend OTP</span>
    </Button>
  )
}

