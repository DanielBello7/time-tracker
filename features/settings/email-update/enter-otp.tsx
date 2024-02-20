import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import sendOtp from "@/apis/send-otp";

type EnterOTPProps = {
  value: string
  newEmail: string
  onchange: (val: string) => void
  isLoading: boolean
  changeOTP: (val: string) => void
}

export default function EnterOTP(props: EnterOTPProps) {
  const {
    onchange, value, newEmail, isLoading, changeOTP
  } = props;

  const click = async () => {
    const newOTP = Math.floor(Math.random() * 999999).toString();
    changeOTP(newOTP);
    await sendOtp(newOTP, newEmail);
    toast(`New otp sent to new email - ${newEmail}`);
  }
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
        <p className="text-gray-400 text-xs mt-1">
          Enter the OTP sent to your new email
          <span className="ms-1 text-blue-400">
            {newEmail}
          </span>
        </p>
      </div>
      <Button type="button" onClick={click} variant={"outline"} className="mt-7 w-32">
        Resend OTP
      </Button>
    </React.Fragment>
  )
}

