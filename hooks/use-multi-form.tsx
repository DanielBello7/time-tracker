import * as React from "react";

export default function useMultistep(steps: React.ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const Next = () => setCurrentStepIndex((i: any) => {
    if (i >= steps.length - 1) return i;
    return i + 1;
  });

  const Back = () => setCurrentStepIndex((i: any) => {
    if (i <= 0) return i;
    return i - 1;
  });

  const GoTo = (index: number) => setCurrentStepIndex(index);

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    GoTo,
    Next,
    Back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  }
}

