import AuthHeader from "./auth-header";
import Logo from "../logo";
import * as React from "react";

type AuthFormProps = {
  children?: React.ReactNode
  type: "sign-in" | "sign-up"
}

export default function AuthForm({ children, type }: AuthFormProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center -ms-10">
        <Logo />
      </div>

      <div className="w-full sm:w-[300px] py-10 px-2 md:px-0">
        <AuthHeader current={type} />
        {children}
      </div>
    </div>
  )
}