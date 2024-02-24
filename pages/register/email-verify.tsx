import UsersService from "@/services/users.service";
import EmailVerify from "@/features/email-verify";
import type { USER } from "@/types/user.types";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { email } = context.query;
  if (!email || (email && typeof email !== "string")) {
    return {
      redirect: {
        destination: "/sign-in",
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
        user: JSON.parse(JSON.stringify(response))
      }
    }
  }
}


type EmailVerifyPageProps = {
  user: USER
}

export default function EmailVerifyPage({ user }: EmailVerifyPageProps) {
  return <EmailVerify user={user} />
}

