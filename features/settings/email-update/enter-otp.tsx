import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EnterOTPProps = {

}

export default function EnterOTP({ }: EnterOTPProps) {
  return (
    <div>
      <Label>Enter OTP</Label>
      <Input type="email" className="w-full" />
      <p className="text-gray-400 text-xs mt-1">
        Enter your new email
      </p>
    </div>
  )
}

