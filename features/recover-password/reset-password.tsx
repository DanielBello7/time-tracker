import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetPasswordProps = {
  password: string
  setPassword: (val: string) => void
  confirm: string
  isLoading: boolean
  setConfirm: (val: string) => void
}

export default function ResetPassword(props: ResetPasswordProps) {
  const {
    confirm,
    setConfirm,
    password,
    isLoading,
    setPassword
  } = props;

  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    if (name === "password") return setPassword(value);
    if (name === "confirm") return setConfirm(value);
  }

  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <Label>New Password</Label>
        <Input
          onChange={handlechange}
          type="password"
          className="mt-2"
          name="password"
          placeholder="**********"
          value={password}
          disabled={isLoading && true}
          required
        />
      </div>

      <div className="w-full">
        <Label>Confirm Password</Label>
        <Input
          onChange={handlechange}
          type="password"
          className="mt-2"
          name="confirm"
          placeholder="**********"
          value={confirm}
          disabled={isLoading && true}
          required
        />
      </div>
    </div>
  )
}

