import Onboarding from "@/features/onboarding";
import generateJwt from "@/lib/generate-jwt";
import usersService from "@/services/user.service";
import { USER_WITH_PASSWORD } from "@/types/user.types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const token = generateJwt({ isValid: true });
  if (session && session.user && session.user.email) {
    const response = await usersService.findUserUsingEmailWithoutPassword(session.user.email)
    if (response.isOnboarded) {
      return {
        redirect: {
          destination: "/dashboard",
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
  } else {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false
      }
    }
  }
}

type OnboardingPageProps = {
  user: USER_WITH_PASSWORD
  token: string
}

export default function OnboardingPage({ user, token }: OnboardingPageProps) {
  return <Onboarding user={user} bearer={token} />
}

