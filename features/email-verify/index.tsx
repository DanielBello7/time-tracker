import type { USER } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { content } from "./content";
import Text from "@/components/text";
import EnterOTP from "./enter-otp";
import EnterEmail from "./enter-email";
import Success from "./success";
import * as React from "react";
import Logo from "@/components/logo";
import useMultistep from "@/hooks/use-multi-form";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import sendOtp from "@/apis/send-otp";
import ensureError from "@/lib/ensure-error";
import updateStatus from "@/apis/update-status";
import Footer from "./footer";

type EmailVerifyProps = {
  user: USER
}

export default function EmailVerify({ user }: EmailVerifyProps) {
  const router = useRouter();
  const { email } = router.query;
  const useremail = email && typeof email === "string" ? email : "";
  const [text, setText] = React.useState(useremail ?? "");
  const [otp, setOtp] = React.useState("");
  const [otpValue, setOtpValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    step, currentStepIndex, Next, isLastStep,
  } = useMultistep([
    <EnterEmail
      isLoading={isLoading}
      setText={setText}
      text={text}
    />,
    <EnterOTP
      isLoading={isLoading}
      otpValue={otpValue}
      setOtp={setOtp}
      email={text}
      setOtpValue={setOtpValue}
    />,
    <Success />
  ]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        setIsLoading(true);
        if (!text.trim()) return toast("Please enter your email");
        if (user.email !== text) return toast("Email not validated");
        const newotp = Math.floor(Math.random() * 999999).toString();
        setOtp(newotp);
        await sendOtp(newotp, text);
        toast("OTP sent to email");
        setIsLoading(false);
        return Next();
      } else if (currentStepIndex === 1) {
        if (otp !== otpValue) return toast("Invalid OTP");
        await updateStatus(user._id, { isEmailVerified: true });
        toast("Email Authenticated");
        return Next();
      } else if (currentStepIndex === 2) {
        return router.replace("/sign-in");
      }
    } catch (error) {
      setIsLoading(false);
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    }
  }

  return (
    <div className="w-full h-screen border flex items-center justify-center">
      <div className="w-6/12 flex space-x-4">
        <div className="w-full md:w-1/2">
          <Logo />
          <Text className="text-3xl pt-5 pb-3 tracking-tighter font-bold">
            {content[currentStepIndex].title}
          </Text>
          <Text type="sub">
            {content[currentStepIndex].body}
          </Text>
          <Footer isLastStep={isLastStep} isLoading={isLoading} />
        </div>
        <form className="w-full md:w-1/2" onSubmit={submit} id="submit-email-form">
          {step}
        </form>
      </div>
    </div>
  )
}

