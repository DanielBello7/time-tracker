import findExternalTask from "@/apis/find-external-task";
import updateExternalTaskStatus from "@/apis/update-external-status";
import Spinner from "@/components/spinner";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import ensureError from "@/lib/ensure-error";
import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import * as React from "react";
import { toast } from "sonner";
import { FaBan } from "react-icons/fa";
import { FaBook, FaBookOpen } from "react-icons/fa6";

type VisibilityStatusProps = {
	taskId: string
}

export default function VisibilityStatus({ taskId }: VisibilityStatusProps) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [externalTask, setExternalTask] = React.useState<EXTERNAL_SHARED_TASK | null>(null);

	const getExternalTask = React.useCallback(async () => {
		try {
			const find = await findExternalTask(taskId);
			setExternalTask(find);
		} catch { return } finally {
			return setIsLoading(false);
		}
	}, [taskId]);

	const toggleVisibility = async () => {
		if (!externalTask) return
		setIsLoading(true);
		try {
			const response = await updateExternalTaskStatus(taskId, !externalTask.isActive);
			setExternalTask(response);
			toast("Task visibility status has been updated", {
				description: !externalTask.isActive ? "Task has been made visible" : "Task has been protected"
			});
		} catch (error) {
			const err = ensureError(error);
			toast("Error occured", { description: err.message });
		} finally {
			return setIsLoading(false);
		}
	}

	React.useEffect(() => {
		getExternalTask();
	}, [getExternalTask]);

	if (isLoading) {
		return (
			<DropdownMenuItem disabled={true} className="text-gray-400">
				<span>Loading...</span>
				<DropdownMenuShortcut>
					<Spinner size="sm" />
				</DropdownMenuShortcut>
			</DropdownMenuItem>
		)
	}
	if (!externalTask) {
		return (
			<DropdownMenuItem disabled={true} className="text-gray-400">
				<span>Not Public</span>
				<DropdownMenuShortcut>
					<FaBan size={15} />
				</DropdownMenuShortcut>
			</DropdownMenuItem>
		)
	}
	return (
		<DropdownMenuItem onClick={toggleVisibility} disabled={isLoading && true}>
			{externalTask?.isActive ? "Protect" : "Make Visible"}
			<DropdownMenuShortcut>
				{
					externalTask?.isActive
						? <FaBook size={15} />
						: <FaBookOpen size={15} />
				}
			</DropdownMenuShortcut>
		</DropdownMenuItem>
	)
}

