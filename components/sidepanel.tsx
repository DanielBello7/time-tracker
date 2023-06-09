import { useTaskData } from "@/context/tasks.context";
import PreviewTaskPanel from "@/modules/preview";
import CreateTaskPanel from "@/modules/create";
import EditTaskPanel from "@/modules/edit";
import React from "react";

export default function SidePanel() {
    const { sidePanel, ToggleSidePanel } = useTaskData();

    const HandleClose = () => {
        return ToggleSidePanel(false);
    }

    return (
        <div className={`flex flex-col border border-blue-400 overflow-hidden ${sidePanel.isOpen ? "w-2/6" : "hidden"}`}>
            <div className="flex justify-between p-2 items-center">
                <h1 className="uppercase text-2xl font-bold">
                    {
                        sidePanel.type === "create" && "Create Task"
                    }

                    {
                        sidePanel.type === "edit" && "Edit Task"
                    }

                    {
                        sidePanel.type === "view" && "Preview Task"
                    }
                </h1>

                <button className="border p-2 px-3 fs-7 uppercase border-black hover:bg-black hover:text-white font-bold" type="button" onClick={HandleClose}>
                    close
                </button>
            </div>
            <div className="grow overflow-scroll">
                {
                    sidePanel.type === "create"
                    && <CreateTaskPanel />
                }

                {
                    sidePanel.type === "edit"
                    && <EditTaskPanel />
                }

                {
                    sidePanel.type === "view"
                    && <PreviewTaskPanel />
                }
            </div>
        </div>
    )
}