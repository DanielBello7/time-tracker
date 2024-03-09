import { onboardingContent } from "./content"
import { toast } from "sonner";
import { USER } from "@/types/user.types";
import { useRouter } from "next/router";
import Text from "@/components/text";
import * as React from "react";
import Logo from "@/components/logo";
import ActionButtons from "./action-buttons";
import ensureError from "@/lib/ensure-error";
import updateAccount from "@/apis/update-account";
import LogoutButton from "./logout-button";
import updateStatus from "@/apis/update-status";
import useOnboardingPages from "./use-onboarding-pages";

type OnboardingProps = {
  user: USER
  bearer: string
}

export default function Onboarding({ user, bearer }: OnboardingProps) {
  const router = useRouter();
  const {
    Next,
    Back,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    step,
    selected,
    position,
    text
  } = useOnboardingPages();

  const handleInitial = async () => {
    if (!selected.trim()) return toast("Please select an image");
    await updateAccount(user._id, { avatar: selected }, bearer);
    return Next();
  }

  const handlePosition = async () => {
    if (!position.trim()) return toast("Please select a position");
    if (position === "other" && !text.trim()) return toast("Please type in your role");
    await updateAccount(user._id, { position: position }, bearer);
    return Next();
  }

  const handleComplete = async () => {
    await updateStatus(user._id, { isOnboarded: true }, bearer);
    return router.replace("/dashboard");
  }

  const onsubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        return await handleInitial();
      } else if (currentStepIndex === 1) {
        return await handlePosition();
      } else if (currentStepIndex === 2) {
        return await handleComplete();
      } else return
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    }
  }

  const handleskip = () => {
    return Next();
  }

  const handleprev = () => {
    return Back();
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LogoutButton />
      <div className="w-full md:w-8/12 lg:w-5/12 md:flex space-y-5 md:space-y-0 md:space-x-5 px-5">
        <div className="w-full md:w-1/2">
          <Logo />
          <Text type="h1" className="my-5">
            {onboardingContent[currentStepIndex].title}
          </Text>
          <Text type="sub">
            {onboardingContent[currentStepIndex].body}
          </Text>
          <ActionButtons
            handleprev={handleprev}
            handleskip={handleskip}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
          />
        </div>
        <form className="w-full md:w-1/2" onSubmit={onsubmit} id="onboarding-form">
          {step}
        </form>
      </div>
    </div>
  )
}

