import { useTaskData } from "@/context/tasks.context";

export default function SidePanel() {
    const { sidePanel, ToggleSidePanel } = useTaskData();

    const HandleClose = () => {
        return ToggleSidePanel(false);
    }

    return (
        <div className={`flex flex-col border border-blue-400 overflow-hidden ${sidePanel.isOpen ? "w-2/6" : "hidden"}`}>
            <div className="flex justify-end border p-2">
                <button className="border p-2 px-3 fs-7 uppercase border-black hover:bg-black hover:text-white font-bold" type="button" onClick={HandleClose}>
                    close
                </button>
            </div>
            <div className="grow overflow-scroll">

            </div>
        </div>
    )
}

function PreviewTaskPanel() {
    return (
        <div className="w-full border border-black h-full">

        </div>
    )
}

function CreateTaskPanel() {
    return (
        <div className="w-full border border-black h-full">

        </div>
    )
}

function EditTaskPanel() {
    return (
        <div className="w-full border border-black h-full">

        </div>
    )
}