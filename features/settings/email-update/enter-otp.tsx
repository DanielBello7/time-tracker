import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EnterOTPProps = {
  value: string
  onchange: (val: string) => void
}

export default function EnterOTP({ onchange, value }: EnterOTPProps) {
  return (
    <div>
      <Label>Enter OTP</Label>
      <Input
        className="w-full"
        type="email"
        value={value}
        onChange={(e) => onchange(e.currentTarget.value)}
        required
      />
      <p className="text-gray-400 text-xs mt-1">
        Enter the OTP sent to your new email
      </p>
    </div>
  )
}

