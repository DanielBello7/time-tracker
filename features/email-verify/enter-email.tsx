import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EnterEmailProps = {
  setText: (value: string) => void
  text: string
  isLoading: boolean
}

export default function EnterEmail(props: EnterEmailProps) {
  const {
    isLoading,
    setText,
    text,
  } = props;

  return (
    <div className="w-full mt-10">
      <Label>Email</Label>
      <Input
        className="mt-2"
        type="email"
        required
        placeholder="user@example.com"
        disabled={isLoading && true}
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
      />
    </div>
  )
}

