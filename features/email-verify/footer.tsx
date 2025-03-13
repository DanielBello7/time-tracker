import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import Link from "next/link";

type FooterProps = {
  isLoading: boolean
  isLastStep: boolean
}

export default function Footer({ isLastStep, isLoading }: FooterProps) {
  const button_data = [
    {
      id: 1,
      href: "/forgot-password",
      title: "Forgot Password"
    },
    {
      id: 2,
      href: "/sign-in",
      title: "Sign In"
    },
    {
      id: 3,
      href: "/register",
      title: "Sign Up"
    },
  ]

  return (
    <div className="w-full mt-5">
      <Button type="submit" form="submit-email-form" variant={"secondary"}
        disabled={isLoading && true}>
        {
          isLoading
            ? <Spinner />
            : isLastStep ? "Finish" : "Continue"
        }
      </Button>
      <div className="w-full mt-2 md:mt-10 flex space-x-4">
        {button_data.map((item) => (
          <Link href={`${item.href}`} key={item.id}>
            <Button type="button" variant={"link"} className="px-0 text-xs text-gray-400">
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

