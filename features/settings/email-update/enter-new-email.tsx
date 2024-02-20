import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EnterNewEmailProps = {
  value: string
  onchange: (val: string) => void
}

export default function EnterNewEmail({ onchange, value }: EnterNewEmailProps) {
  return (
    <div>
      <Label>New Email</Label>
      <Input
        className="w-full"
        value={value}
        type="email"
        required
        onChange={(e) => onchange(e.currentTarget.value)}
      />
      <p className="text-gray-400 text-xs mt-1">
        Enter your new email
      </p>
    </div>
  )
}

