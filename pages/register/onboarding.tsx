import Onboarding from "@/features/onboarding";
import usersService from "@/services/users.service";
import { USER } from "@/types/user.types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session && session.user && session.user.email) {
    const response = await usersService.findUserUsingEmail(session.user.email)
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
          user: JSON.parse(JSON.stringify(response))
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
  user: USER
}

export default function OnboardingPage({ user }: OnboardingPageProps) {
  return <Onboarding user={user} />
}

