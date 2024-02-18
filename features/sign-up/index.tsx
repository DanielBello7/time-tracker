import AuthFooter from "@/components/authentication/auth-footer";
import SignUpForm from "./sign-up-form";

export default function SignUp() {
  return (
    <div className="w-full h-screen flex justify-center py-10">
      <div className="px-0 md:px-2">
        <SignUpForm />
        <AuthFooter />
      </div>
    </div>
  )
}

