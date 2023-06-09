import { useTaskData } from "@/context/tasks.context";

export default function SidePanel() {
    const { sidePanel } = useTaskData();
    return (
        <div className={`border border-red-400 ${sidePanel.isOpen ? "col-2/6" : "hidden"}`}>

        </div>
    )
}

function PreviewTask() {
    return
}