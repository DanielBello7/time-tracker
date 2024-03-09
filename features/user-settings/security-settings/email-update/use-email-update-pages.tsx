import useMultistep from "@/hooks/use-multi-form";
import * as React from "react";
import EnterNewEmail from "./enter-new-email";
import EnterOTP from "./enter-otp";
import SecurityConfirmation from "./security-confirmation";

export default function useEmailUpdatePages(initialFormData: any) {
  const [formData, setFormData] = React.useState(initialFormData);
  const [isLoading, setIsLoading] = React.useState(false);

  const response = useMultistep([
    <SecurityConfirmation
      currentEmail={formData.currentEmail}
      onEmailChange={(e) => setFormData({ ...formData, currentEmail: e })}
      onPasswordChange={(e) => setFormData({ ...formData, passowrd: e })}
      password={formData.passowrd}
      isLoading={isLoading}
    />,
    <EnterNewEmail
      onchange={(e) => setFormData({ ...formData, newEmail: e })}
      value={formData.newEmail}
      isLoading={isLoading}
    />,
    <EnterOTP
      onchange={(e) => setFormData({ ...formData, confirmOTP: e })}
      value={formData.confirmOTP}
      newEmail={formData.newEmail}
      isLoading={isLoading}
    />
  ]);

  return {
    ...response,
    formData,
    setFormData,
    isLoading,
    setIsLoading
  }
}

