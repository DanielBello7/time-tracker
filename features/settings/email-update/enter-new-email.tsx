import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EnterNewEmailProps = {

}

export default function EnterNewEmail({ }: EnterNewEmailProps) {
  return (
    <div>
      <Label>New Email</Label>
      <Input type="email" className="w-full" />
      <p className="text-gray-400 text-xs mt-1">
        Enter your new email
      </p>
    </div>
  )
}

