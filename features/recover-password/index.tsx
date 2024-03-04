import EnterEmail from "./enter-email";
import ResetPassword from "./reset-password";
import EnterOTP from "./enter-otp";
import useMultistep from "@/hooks/use-multi-form";
import ensureError from "@/lib/ensure-error";
import * as React from "react";
import Text from "@/components/text";
import Logo from "@/components/logo";
import Success from "./success";
import Footer from "./footer";
import isEmailRegistered from "@/apis/is-email-registered";
import sendOtp from "@/apis/send-otp";
import updatePassword from "@/apis/update-password";
import findUserUsingUseremail from "@/apis/find-user-using-useremail";
import { toast } from "sonner";
import { recoverPasswordContent } from "./content";
import { useRouter } from "next/router";

function RecoverPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [otpValue, setOtpValue] = React.useState("");

  const router = useRouter();

  const { Next, currentStepIndex, step, isLastStep } = useMultistep([
    <EnterEmail
      isLoading={isLoading}
      setValue={setEmail}
      value={email}
    />,
    <EnterOTP
      setValue={setOtpValue}
      isLoading={isLoading}
      value={otpValue}
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

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        if (!email.trim()) return toast("Type in your email");
        setIsLoading(true);
        const response = await isEmailRegistered(email);
        if (!response) {
          setIsLoading(false);
          return toast("Email is not registered");
        }
        const token = Math.floor(Math.random() * 999999).toString();
        setOtp(token);
        await sendOtp(token, email);
        toast("OTP Sent to email");
        setIsLoading(false);
        return Next();
      } else if (currentStepIndex === 1) {
        if (otp !== otpValue) return toast("Invalid token");
        return Next();
      } else if (currentStepIndex === 2) {
        if (!password.trim() || !confirm.trim()) return toast("Please fill in required fields");
        if (password !== confirm) return toast("Password's don't match");
        setIsLoading(true)
        const user = await findUserUsingUseremail(email);
        await updatePassword(user._id, password);
        setIsLoading(false)
        return Next();
      } else if (currentStepIndex === 3) {
        setIsLoading(true);
        return router.replace("/sign-in");
      }
    } catch (error) {
      const err = ensureError(error);
      setIsLoading(false);
      toast("Error Occured", { description: err.message });
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-6/12 md:flex md:space-x-10 space-y-4 md:space-y-0">
        <div className="w-full">
          <Logo />
          <Text className="mt-2 text-3xl">
            {recoverPasswordContent[currentStepIndex].title}
          </Text>
          <Text className="mt-2" type="sub">
            {recoverPasswordContent[currentStepIndex].body}
          </Text>
          <Footer isLoading={isLoading} isLastStep={isLastStep} />
        </div>
        <form className="w-full pt-10" onSubmit={submit} id="reset-password-form">
          {step}
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
