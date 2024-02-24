import * as React from "react";
import { Button } from "@/components/ui/button";

type PrevButtonProps = {
  isFirstStep: boolean
  isLastStep: boolean
  click: Function
}

export default function PrevButton(props: PrevButtonProps) {
  const { isFirstStep, isLastStep, click } = props;
  const handleprev = () => {
    click();
  }
  return (
    <React.Fragment>
      {
        !isLastStep && !isFirstStep &&
        <Button type="button" variant={"link"} onClick={handleprev}>
          Prev
        </Button>
      }
    </React.Fragment>
  )
}

