import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import SignIn from "@/features/sign-in";
import * as React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function SignInPage() {
  return <SignIn />
}

SignInPage.getLayout = function (page: React.ReactElement) {
  return page
}

