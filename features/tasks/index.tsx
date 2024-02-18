import ErrorComponent from "@/components/error-component";
import TasksHeader from "./task-header";
import TaskRenderer from "./task-renderer";
import * as React from "react";
import Container from "@/components/container";
import TaskLoading from "./task-loading";
import Renderer from "@/components/renderer";
import { useAppSelector } from "@/store/hooks";
import useTasks from "./use-tasks";

export default function Tasks() {
	const { _id } = useAppSelector((state) => state.user.user);
	const { data, error, isFetching: isLoading } = useTasks(_id);
	if (error) return <ErrorComponent />

	return (
		<Container header={TasksHeader} grid>
			<Renderer error={error} isLoading={isLoading} loader={<TaskLoading />}>
				{data && <TaskRenderer tasks={data.docs} />}
			</Renderer>
		</Container>
	)
}

