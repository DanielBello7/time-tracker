import type { NEW_TASK } from "@/types/task.types";
import * as React from "react";

type CreateTaskContextType = {
	formData: NEW_TASK
	setFormData: React.Dispatch<React.SetStateAction<NEW_TASK>>
	resetFields: () => void
}

type CreateTaskContextProviderProps = {
	children: React.ReactNode
	defaultValue?: NEW_TASK
}

const CreateTaskContext = React.createContext({} as CreateTaskContextType);

export function useCreateTask() {
	return React.useContext(CreateTaskContext);
}

const initialData: NEW_TASK = {
	type: "story",
	title: "",
	timeSpent: 10,
	timeInterval: "minutes",
	body: "",
	tags: [],
	dateStarted: new Date().toISOString(),
	dateFinished: new Date().toISOString()
}

export function CreateTaskContextProvider(props: CreateTaskContextProviderProps) {
	const { defaultValue } = props;
	const [formData, setFormData] = React.useState<NEW_TASK>(defaultValue ?? initialData);

	const resetFields = () => {
		setFormData(initialData);
	}

	return (
		<CreateTaskContext.Provider value={{
			formData,
			setFormData,
			resetFields
		}}>
			{props.children}
		</CreateTaskContext.Provider>
	)
}

