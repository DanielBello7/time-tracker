import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/otp-input";

type EnterOTPProps = {
  setValue: (val: string) => void
  value: string
  isLoading: boolean
}

function EnterOTP(props: EnterOTPProps) {
  const {
    isLoading,
    setValue,
    value
  } = props;

  return (
    <div className="w-full">
      <Label className="mb-1">OTP</Label>
      <OtpInput
        onChange={(e) => setValue(e)}
        isLoading={isLoading}
        value={value}
        valueLength={6}
      />
      <Button className="mt-3 text-gary-400 text-xs p-0 m-0" variant={"link"}>
        <span>Didn't get a code?</span>
        <span className="ms-1 text-blue-400">Resend</span>
      </Button>
    </div>
  )
}

export default EnterOTP;

