import SignInForm from "./sign-in-form";
import AuthFooter from "./auth-footer";

export default function SignIn() {
  return (
    <div className="w-full h-screen border-2 border-black flex justify-center py-10">
      <div className="border px-0 md:px-2">
        <SignInForm />
        <AuthFooter />
      </div>
    </div>
  )
}

