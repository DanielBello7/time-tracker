import { TaskDataType } from "@/global";
import React from "react";

interface TaskContextProviderProps {
    children: React.ReactNode
}

interface TaskContextType {
    setTasks: React.Dispatch<React.SetStateAction<TaskDataType[]>>
    tasks: TaskDataType[]
}

const TaskContext = React.createContext({} as TaskContextType);

export const useTaskData = () => React.useContext(TaskContext);

export default function TaskContextProvider(props: TaskContextProviderProps) {
    const [tasks, setTasks] = React.useState<TaskDataType[]>([]);

    return (
        <TaskContext.Provider value={{
            setTasks,
            tasks
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}