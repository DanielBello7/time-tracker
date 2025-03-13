import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";

type SecurityConfirmationProps = {
  currentEmail: string
  password: string
  onEmailChange: (e: string) => void
  onPasswordChange: (e: string) => void
  isLoading: boolean
}

export default function SecurityConfirmation(props: SecurityConfirmationProps) {
  const {
    currentEmail,
    password,
    onEmailChange,
    isLoading,
    onPasswordChange,
  } = props;

  return (
    <React.Fragment>
      <div className="w-full">
        <Label>Current Email</Label>
        <Input
          disabled={isLoading && true}
          className="w-full"
          type="email"
          required
          placeholder="email@example.com"
          value={currentEmail}
          onChange={(e) => onEmailChange(e.currentTarget.value)}
        />
        <p className="text-gray-400 text-xs mt-1">
          Enter your current email
        </p>
      </div>

      <div className="w-full">
        <Label>Password</Label>
        <Input
          disabled={isLoading && true}
          type="password"
          placeholder="**************"
          className="w-full"
          required
          value={password}
          onChange={(e) => onPasswordChange(e.currentTarget.value)}
        />
        <p className="text-gray-400 text-xs mt-1">
          Enter your password
        </p>
      </div>
    </React.Fragment>
  )
}

