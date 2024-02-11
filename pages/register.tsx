import SignUp from "@/features/sign-up";

export default function Register() {
  return <SignUp />
}

Register.getLayout = function (page: React.ReactElement) {
  return page
}

