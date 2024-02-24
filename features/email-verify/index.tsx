import { USER } from "@/types/user.types";

type EmailVerifyProps = {
  user: USER
}

export default function EmailVerify({ user }: EmailVerifyProps) {
  return (
    <div>
      Email Verify
    </div>
  )
}

