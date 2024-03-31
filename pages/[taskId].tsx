import SelectedTask from "@/features/selected-task";
import Header from "@/components/header";
import type { TASK } from "@/types/task.types";
import type { GetServerSidePropsContext } from "next";
import ExternalSharedTaskService from "@/services/external-shared-task.service";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { params } = context;
	const id = params?.taskId as string
	if (id && typeof id === "string") {
		try {
			const findShared = await ExternalSharedTaskService.findExternalSharedTaskUsingId(id);
			if (!findShared.isActive) throw new Error("Task unavailable");
			await ExternalSharedTaskService.updateExternalSharedTaskStatusUsingTaskId(findShared.taskId._id, {
				isRead: true
			});
			return {
				props: {
					error: null,
					task: findShared.taskId
				}
			}
		} catch {
			return {
				redirect: {
					destination: "/404",
					permanent: false
				}
			}
		}
	} else {
		return {
			redirect: {
				destination: "/404",
				permanent: false
			}
		}
	}
}

type LinkedTaskPageProps = {
	task: TASK | null
	error: Error | null
}

export default function LinkedTaskPage({ error, task }: LinkedTaskPageProps) {
	return (
		<div className="w-full">
			<Header />
			<div className="container mx-auto pt-24">
				<div className="w-8/12 mx-auto">
					<SelectedTask error={error} task={task} showHeader={false} />
				</div>
			</div>
		</div>
	)
}

