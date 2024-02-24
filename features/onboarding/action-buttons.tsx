import * as React from "react";
import { Button } from "@/components/ui/button";

type PrevButtonProps = {
  isFirstStep: boolean
  isLastStep: boolean
  handleprev: Function
  handleskip: Function
}

export default function ActionButtons(props: PrevButtonProps) {
  const {
    isFirstStep,
    handleskip,
    isLastStep,
    handleprev,
  } = props;

  const handlePrevClick = () => {
    handleprev();
  }

  const handleSkipClick = () => {
    handleskip();
  }

  return (
    <div className="w-full py-6 space-x-2">
      {
        !isLastStep &&
        <Button variant={"link"} onClick={handleSkipClick} type="button">
          Skip
        </Button>
      }
      {
        !isLastStep && !isFirstStep &&
        <Button type="button" variant={"link"} onClick={handlePrevClick}>
          Prev
        </Button>
      }
      <Button type="submit" variant={"secondary"} form="onboarding-form">
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </div>
  )
}

