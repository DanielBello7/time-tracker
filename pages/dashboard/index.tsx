import * as React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import Metrics from "@/features/metrics";
import UsersService from "@/services/user.service";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);
	if (session && session.user && session.user.email) {
		const response = await UsersService.findUserUsingEmailWithoutPassword(session.user.email);
		if (!response.isOnboarded) {
			return {
				redirect: {
					destination: "/register/onboarding",
					permanent: false
				}
			}
		} else {
			return {
				props: {}
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

export default function DashboardPage() {
	return <Metrics />
}

DashboardPage.getLayout = function (page: React.ReactElement) {
	return (
		<DashboardLayout>
			{page}
		</DashboardLayout>
	)
}

