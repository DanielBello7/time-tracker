import UsersService from "@/services/user.service";
import EmailVerify from "@/features/email-verify";
import type { USER_WITH_PASSWORD } from "@/types/user.types";
import type { GetServerSidePropsContext } from "next";
import generateJwt from "@/lib/generate-jwt";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { email } = context.query;
  const token = generateJwt({ isValid: true });
  if (!email || (email && typeof email !== "string")) {
    return {
      redirect: {
        destination: "/register",
        permanent: false
      }
    }
  }
  const response = await UsersService.findUserUsingEmail(email);
  if (response.isEmailVerified) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false
      }
    }
  } else {
    return {
      props: {
        user: response,
        token
      }
    }
  }
}


type EmailVerifyPageProps = {
  user: USER_WITH_PASSWORD
  token: string
}

export default function EmailVerifyPage({ user, token }: EmailVerifyPageProps) {
  return <EmailVerify user={user} bearer={token} />
}

