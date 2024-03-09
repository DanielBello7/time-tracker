import AuthFooter from "@/components/authentication/auth-footer";
import SignUpForm from "./sign-up-form";
import { motion } from "framer-motion";

type SignUpProps = {
  bearer: string
}

function SignUp({ bearer }: SignUpProps) {
  return (
    <motion.div className="w-full h-screen flex justify-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="px-0 md:px-2">
        <SignUpForm bearer={bearer} />
        <AuthFooter />
      </div>
    </motion.div>
  )
}

export default SignUp

