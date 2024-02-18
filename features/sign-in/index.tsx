import AuthFooter from "@/components/authentication/auth-footer";
import SignInForm from "./sign-in-form";

export default function SignIn() {
  return (
    <div className="w-full h-screen flex justify-center py-10">
      <div className="px-0 md:px-2">
        <SignInForm />
        <AuthFooter />
      </div>
    </div>
  )
}

