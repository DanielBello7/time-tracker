import SignIn from "@/features/sign-in";
import * as React from "react";

export default function SignInPage() {
  return <SignIn />
}

SignInPage.getLayout = function (page: React.ReactElement) {
  return page
}

