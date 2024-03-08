import useMultistep from "@/hooks/use-multi-form";
import EnterEmail from "./enter-email";
import Success from "./success";
import EnterOTP from "./enter-otp";
import * as React from "react";
import ResetPassword from "./reset-password";

export default function useRecoverPages() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [otpValue, setOtpValue] = React.useState("");

  const options = useMultistep([
    <EnterEmail
      isLoading={isLoading}
      setValue={setEmail}
      value={email}
    />,
    <EnterOTP
      setValue={setOtpValue}
      isLoading={isLoading}
      value={otpValue}
      email={email}
    />,
    <ResetPassword
      setPassword={setPassword}
      confirm={confirm}
      isLoading={isLoading}
      password={password}
      setConfirm={setConfirm}
    />,
    <Success />
  ]);

  return {
    ...options,
    isLoading,
    setIsLoading,
    email,
    setEmail,
    password,
    setPassword,
    confirm,
    setConfirm,
    otpValue,
    setOtpValue
  }
}

