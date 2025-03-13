import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";

type FooterProps = {
  isLoading: boolean
  isLastStep: boolean
}

export default function Footer({ isLastStep, isLoading }: FooterProps) {
  return (
    <div className="w-full mt-5">
      <Button variant={"secondary"} type="submit" form="reset-password-form">
        {
          isLoading
            ? <Spinner />
            : isLastStep
              ? "Finish"
              : "Submit"
        }
      </Button>
    </div>
  )
}

