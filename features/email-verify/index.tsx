import type { USER } from "@/types/user.types";
import { useRouter } from "next/router";
import { content } from "./content";
import { toast } from "sonner";
import Text from "@/components/text";
import useVerifyEmailPages from "./use-verify-email-pages";
import updateStatus from "@/apis/update-status";
import Logo from "@/components/logo";
import ensureError from "@/lib/ensure-error";
import sendOtp from "@/apis/send-otp";
import Footer from "./footer";
import * as React from "react";
import validateOtp from "@/apis/validate-otp";

type EmailVerifyProps = {
  user: USER
}

export default function EmailVerify({ user }: EmailVerifyProps) {
  const router = useRouter();
  const { email } = router.query;
  const useremail = email && typeof email === "string" ? email : "";

  const {
    setIsLoading,
    currentStepIndex,
    text,
    Next,
    otpValue,
    isLastStep,
    isLoading,
    step
  } = useVerifyEmailPages(useremail);

  const initialLoad = async () => {
    setIsLoading(true);
    if (!text.trim()) return toast("Please enter your email");
    if (user.email !== text) return toast("Email not validated");
    await sendOtp(text);
    toast("OTP sent to email");
    setIsLoading(false);
    return Next();
  }

  const handleAuthenticate = async () => {
    await validateOtp(otpValue);
    await updateStatus(user._id, { isEmailVerified: true });
    toast("Email Authenticated");
    return Next();
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        return initialLoad();
      } else if (currentStepIndex === 1) {
        return await handleAuthenticate();
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-8/12 lg:w-6/12 md:flex md:space-x-4 px-6 space-y-4 md:space-y-0">
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

