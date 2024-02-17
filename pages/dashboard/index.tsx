import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import * as React from "react";
import UsersService from "@/services/users.service";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Metrics from "@/features/metrics";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);
	if (session && session.user) {
		const user = await UsersService.findUserUsingEmail(session.user.email!);
		return {
			props: {
				user: user.email
			}
		}
	}
	return {
		redirect: {
			destination: "/",
			permanent: false
		}
	}
}

export default function DashboardPage() {
	return <Metrics />
}

DashboardPage.getLayout = function (page: React.ReactElement) {
	const a: any = this;
	console.log("dashboard-page", page.props);
	return (
		<DashboardLayout>
			{page}
		</DashboardLayout>
	)
}

