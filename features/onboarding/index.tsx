import useMultistep from "@/hooks/use-multi-form";
import Text from "@/components/text";
import * as React from "react";
import Logo from "@/components/logo";
import AvatarSelect from "./avatar-select";
import PositionSelect from "./position-select";
import Finish from "./finish";
import { onboardingContent } from "./content"
import { toast } from "sonner";
import { USER } from "@/types/user.types";
import { useRouter } from "next/router";
import ActionButtons from "./action-buttons";
import ensureError from "@/lib/ensure-error";
import updateAccount from "@/apis/update-account";
import LogoutButton from "./logout-button";
import updateStatus from "@/apis/update-status";


type OnboardingProps = {
  user: USER
}

export default function Onboarding({ user }: OnboardingProps) {
  const [selected, setSelected] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [text, setText] = React.useState("");
  const router = useRouter();

  const { step, Next, currentStepIndex, Back, isLastStep, isFirstStep } = useMultistep([
    <AvatarSelect
      selected={selected}
      setSelected={setSelected}
    />,
    <PositionSelect
      position={position}
      setPosition={setPosition}
      setText={setText}
      text={text}
    />,
    <Finish />
  ]);

  const onsubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        if (!selected.trim()) return toast("Please select an image");
        await updateAccount(user._id, { avatar: selected });
        return Next();
      } else if (currentStepIndex === 1) {
        if (!position.trim()) return toast("Please select a position");
        if (position === "other" && !text.trim()) return toast("Please type in your role");
        await updateAccount(user._id, { position: position });
        return Next();
      } else if (currentStepIndex === 2) {
        await updateStatus(user._id, { isOnboarded: true });
        return router.replace("/dashboard");
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

