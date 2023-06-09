import { TaskDataType } from "@/global";
import React from "react";

interface TaskContextProviderProps {
    children: React.ReactNode
}

interface SidePanelType {
    isOpen: boolean
    type: "create" | "view" | "edit"
}

interface TaskContextType {
    setTasks: React.Dispatch<React.SetStateAction<TaskDataType[]>>
    tasks: TaskDataType[]

    ToggleSidePanel: (isOpen: boolean, type?: "create" | "view" | "edit") => void
    sidePanel: SidePanelType

    setActiveTask: React.Dispatch<React.SetStateAction<string | null>>
    activeTask: string | null
}

const TaskContext = React.createContext({} as TaskContextType);

export const useTaskData = () => React.useContext(TaskContext);

export default function TaskContextProvider(props: TaskContextProviderProps) {
    const [tasks, setTasks] = React.useState<TaskDataType[]>([]);
    const [sidePanel, setSidePanel] = React.useState<SidePanelType>({ isOpen: false, type: "create" });
    const [activeTask, setActiveTask] = React.useState<string | null>(null);

    const ToggleSidePanel = (isOpen: boolean, type?: "create" | "view" | "edit") => {
        return setSidePanel({
            isOpen: isOpen,
            type: type ? type : sidePanel.type
        })
    }

    return (
        <TaskContext.Provider value={{
            setTasks,
            tasks,

            sidePanel,
            ToggleSidePanel,

            activeTask,
            setActiveTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}