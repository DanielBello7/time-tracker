import ResendOtpButton from "@/components/resend-otp-button";
import OtpInput from "@/components/otp-input";
import { Label } from "@/components/ui/label";

type EnterOTPProps = {
  setValue: (val: string) => void
  value: string
  isLoading: boolean
  email: string
}

function EnterOTP(props: EnterOTPProps) {
  const { isLoading, setValue, email, value } = props;

  return (
    <div className="w-full">
      <Label className="mb-1">OTP</Label>
      <OtpInput
        isLoading={isLoading}
        onChange={setValue}
        value={value}
        valueLength={6}
      />
      <ResendOtpButton email={email} />
    </div>
  )
}

export default EnterOTP;

