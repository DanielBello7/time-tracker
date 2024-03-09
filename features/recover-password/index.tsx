import findUserUsingUseremail from "@/apis/find-user-using-useremail";
import isEmailRegistered from "@/apis/is-email-registered";
import ensureError from "@/lib/ensure-error";
import * as React from "react";
import Text from "@/components/text";
import Logo from "@/components/logo";
import Footer from "./footer";
import sendOtp from "@/apis/send-otp";
import updatePassword from "@/apis/update-password";
import useRecoverPages from "./use-recover-pages";
import validateOtp from "@/apis/validate-otp";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { recoverPasswordContent } from "./content";

type RecoverPasswordProps = {
  bearer: string
}

function RecoverPassword({ bearer }: RecoverPasswordProps) {
  const router = useRouter();
  const {
    currentStepIndex,
    Next,
    isLastStep,
    step,
    setIsLoading,
    email,
    otpValue,
    password,
    confirm,
    isLoading
  } = useRecoverPages();

  const handleChangePassword = async () => {
    if (!password.trim() || !confirm.trim())
      return toast("Please fill in required fields");
    if (password !== confirm) return toast("Password's don't match");
    setIsLoading(true)
    const user = await findUserUsingUseremail(email, bearer);
    await updatePassword(user._id, password, bearer);
    setIsLoading(false)
    return Next();
  }

  const handleInitialStep = async () => {
    if (!email.trim()) return toast("Type in your email");
    setIsLoading(true);
    const response = await isEmailRegistered(email, bearer);
    if (!response) {
      setIsLoading(false);
      return toast("Email is not registered");
    }
    await sendOtp(email, bearer);
    toast("One-Time-Password sent to your email");
    setIsLoading(false);
    return Next();
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        return await handleInitialStep();
      } else if (currentStepIndex === 1) {
        setIsLoading(true);
        await validateOtp(otpValue);
        setIsLoading(false);
        return Next();
      } else if (currentStepIndex === 2) {
        return await handleChangePassword();
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
