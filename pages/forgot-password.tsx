import RecoverPassword from "@/features/recover-password";
import generateJwt from "@/lib/generate-jwt";

export async function getServerSideProps() {
  const response = generateJwt({ data: "frontend" }, "4h");
  return {
    props: {
      token: response
    }
  }
}

type ForgotPasswordPageProps = {
  token: string
}

export default function ForgotPasswordPage({ token }: ForgotPasswordPageProps) {
  return <RecoverPassword bearer={token} />
}

