import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import SignUp from "@/features/sign-up";
import generateJwt from "@/lib/generate-jwt";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const token = generateJwt({ isValid: true }, "4h");
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }
  return {
    props: {
      token
    }
  }
}

type RegisterPageProps = {
  token: string
}

export default function RegisterPage({ token }: RegisterPageProps) {
  return <SignUp bearer={token} />
}

RegisterPage.getLayout = function (page: React.ReactElement) {
  return page
}

