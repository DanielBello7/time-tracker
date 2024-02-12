import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import SignUp from "@/features/sign-up";

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

export default function Register() {
  return <SignUp />
}

Register.getLayout = function (page: React.ReactElement) {
  return page
}

