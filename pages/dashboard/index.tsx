import database_connection from "@/lib/database-connection";
import UsersService from "@/services/users.service";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);
	await database_connection();
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
	return (
		<div>Dashboard Page</div>
	)
}

