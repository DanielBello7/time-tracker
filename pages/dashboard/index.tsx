import * as React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import Metrics from "@/features/metrics";

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

