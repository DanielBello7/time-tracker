import ResendOtpButton from "@/components/resend-otp-button";
import OtpInput from "@/components/otp-input";
import { Label } from "@/components/ui/label";

type EnterOTPProps = {
  setOtpValue: (value: string) => void
  otpValue: string
  email: string
  isLoading: boolean
}

export default function EnterOTP(
  props: EnterOTPProps
) {
  const {
    setOtpValue, email, isLoading, otpValue
  } = props;
  return (
    <div className="px-5 w-full">
      <Label className="ms-2">
        OTP
      </Label>
      <OtpInput
        onChange={(e) => setOtpValue(e)}
        isLoading={isLoading}
        value={otpValue}
        valueLength={6}
      />
      <ResendOtpButton email={email} />
    </div>
  );
}

