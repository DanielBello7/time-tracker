import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EnterEmailProps = {
  value: string
  setValue: (val: string) => void
  isLoading: boolean
}

function EnterEmail({ setValue, value, isLoading }: EnterEmailProps) {
  return (
    <div className="w-full">
      <Label className="mb-2">Email</Label>
      <Input
        onChange={(e) => setValue(e.currentTarget.value)}
        disabled={isLoading && true}
        type="email"
        required
        placeholder="user@example.com"
        value={value}
      />
    </div>
  )
}

export default EnterEmail;
