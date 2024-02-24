import useMultistep from "@/hooks/use-multi-form";
import Text from "@/components/text";
import * as React from "react";
import Logo from "@/components/logo";
import AvatarSelect from "./avatar-select";
import PositionSelect from "./position-select";
import Finish from "./finish";
import { onboardingContent } from "./content"
import { toast } from "sonner";
import ActionButtons from "./action-buttons";

export default function Onboarding() {
  const [selected, setSelected] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [text, setText] = React.useState("");

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

  const onsubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentStepIndex === 0) {
      if (!selected.trim()) return toast("Please select an image");
      else {
        Next();
      }
    }
    if (currentStepIndex === 1) {
      if (!position.trim()) return toast("Please select a position");
      if (position === "other" && !text.trim()) return toast("Please type in your role");
      else {
        Next();
      }
    }
    if (currentStepIndex === 2) {
      return Next();
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

