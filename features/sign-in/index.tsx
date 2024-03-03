import AuthFooter from "@/components/authentication/auth-footer";
import SignInForm from "./sign-in-form";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <motion.div className="w-full h-screen flex justify-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="px-0 md:px-2">
        <SignInForm />
        <AuthFooter />
      </div>
    </motion.div>
  )
}

