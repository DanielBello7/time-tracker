import ensureError from "@/lib/ensure-error";
import sendOtp from "@/apis/send-otp";
import OtpInput from "@/components/otp-input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type EnterOTPProps = {
  setOtpValue: (value: string) => void
  otpValue: string
  setOtp: (value: string) => void
  isLoading: boolean
  email: string
}

export default function EnterOTP(props: EnterOTPProps) {
  const {
    setOtpValue,
    setOtp,
    email,
    isLoading,
    otpValue,
  } = props;

  const click = () => {
    const newOTP = Math.floor(Math.random() * 999999).toString()
    sendOtp(newOTP, email)
      .then(() => {
        setOtp(newOTP);
        toast("OTP Sent to email");
      })
      .catch((error) => {
        const err = ensureError(error);
        toast("Error occured", { description: err.message });
      });
  }

  return (
    <div className="px-5 w-full">
      <Label className="ms-2">OTP</Label>
      <OtpInput
        onChange={(e) => setOtpValue(e)}
        value={otpValue}
        valueLength={6}
        isLoading={isLoading}
      />

      <Button variant={"link"} type="button" className="p-0 m-0 text-gray-400 text-xs ms-1" onClick={click}>
        <span>Didn't get the OTP?</span>
        <span className="text-blue-400 ms-1">Resend OTP</span>
      </Button>
    </div>
  );
}

