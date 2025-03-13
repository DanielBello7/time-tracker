import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import ResendOtpButton from "@/components/resend-otp-button";

type EnterOTPProps = {
  value: string
  newEmail: string
  onchange: (val: string) => void
  isLoading: boolean
}

export default function EnterOTP(props: EnterOTPProps) {
  const {
    onchange,
    value,
    newEmail,
    isLoading,
  } = props;

  return (
    <React.Fragment>
      <div>
        <Label>Enter OTP</Label>
        <Input
          className="w-full"
          disabled={isLoading && true}
          type="text"
          placeholder="123456"
          value={value}
          onChange={(e) => onchange(e.currentTarget.value)}
          required
        />
        <p className="text-gray-400 text-xs mt-1 ps-1 mb-2">
          Enter the OTP sent to your new email
          <span className="ms-1 text-blue-400">
            {newEmail}
          </span>
        </p>

        <ResendOtpButton email={newEmail} />
      </div>
    </React.Fragment>
  )
}

