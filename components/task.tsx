import type { TaskDataType } from "@/global";
import { useTaskData } from "@/context/tasks.context";

export default function Task(props: TaskDataType) {
    const { setActiveTask, ToggleSidePanel, sidePanel } = useTaskData();

    const item = props;

    const HandlePreview = () => {
        setActiveTask(item._id);
        ToggleSidePanel(true, "view");
    }

    const HandleEdit = () => {
        setActiveTask(item._id);
        ToggleSidePanel(true, "edit");
    }

    const HandleDelete = () => { }

    const HandleExport = () => {
        if (typeof window !== "undefined") {
            const result = JSON.stringify(item, undefined, 4);
            const file = new Blob([result], { type: "application/json charset=utf-8" });
            const element = document.createElement("a");
            element.setAttribute("href", window.URL.createObjectURL(file));
            element.target = "_blank";
            element.download = item.title.replaceAll(" ", "_") + "_task";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }

    return (
        <div className={`${sidePanel.isOpen ? "w-3/6" : "w-2/6"} p-3 h-80`}>
            <div className='h-full p-5 bg-white rounded flex flex-col cursor-pointer hover:bg-blue-50'>
                <div className='flex justify-between items-center'>
                    <p className='uppercase font-bold text-gray-500'>{item.title}</p>
                    <button className='fs-7 uppercase font-bold text-gray-400 border-2 p-2 rounded hover:bg-black hover:text-white hover:border-black px-3' type='button' onClick={HandleEdit}>
                        Edit Task
                    </button>
                </div>
                <h1 className='text-dark font-bold capitalize' onClick={HandlePreview}>
                    {item.type}
                </h1>
                <p className='w-full border-t text-gray-500 mt-3 pt-3 flex grow' onClick={HandlePreview}>
                    {item.body.slice(0, 150)}{item.body.length > 150 && "..."}
                </p>
                <p className='text-gray-400 my-3 fs-9'>
                    <span>Created: </span>
                    <span>{item.createdAt}</span>
                </p>
                <div className='flex'>
                    <button className='rounded hover:opacity-50 bg-red-500 text-white uppercase p-2 px-3 fs-7 font-bold' type="button" onClick={HandleDelete}>
                        delete
                    </button>

                    <button className='ms-3 rounded hover:opacity-50 bg-blue-500 text-white uppercase p-2 px-3 fs-7 font-bold' type='button' onClick={HandleExport}>
                        export
                    </button>
                </div>
            </div>
        </div>
    )
}