import useMultistep from "@/hooks/use-multi-form";
import * as React from "react";
import EnterEmail from "./enter-email";
import EnterOTP from "./enter-otp";
import Success from "./success";

export default function useVerifyEmailPages(useremail: string) {
  const [text, setText] = React.useState(useremail ?? "");
  const [otpValue, setOtpValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const response = useMultistep([
    <EnterEmail
      isLoading={isLoading}
      setText={setText}
      text={text}
    />,
    <EnterOTP
      isLoading={isLoading}
      otpValue={otpValue}
      email={text}
      setOtpValue={setOtpValue}
    />,
    <Success />
  ]);

  return {
    ...response,
    text,
    setText,
    otpValue,
    setOtpValue,
    isLoading,
    setIsLoading
  }
}

