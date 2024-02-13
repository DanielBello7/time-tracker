import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EmailUpdate() {
  return (
    <div className="my-5">
      <form>
        <Label>Email</Label>
        <Input type="email" />
        <p className="text-gray-400 text-xs mt-1">Enter your email</p>
      </form>
    </div>
  )
}

