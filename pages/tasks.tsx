import { TaskDataType } from '../global';
import { tempTasks } from '../constants/temp';
import { useTaskData } from '@/context/tasks.context';
import SidePanel from '@/components/sidepanel';
import React from 'react';

export default function Tasks() {
    const { sidePanel } = useTaskData();
    return (
        <div className="border border-red-500 w-full h-full overflow-hidden flex">
            <div className={`flex flex-col h-full overflow-hidden border border-black ${sidePanel.isOpen ? "w-4/6" : "w-full"}`}>
                <div className="w-full p-2 px-4 border-b border-black">
                    <h1 className="capitalize text-3xl font-bold">Tasks</h1>
                </div>
                <div className="flex flex-wrap grow w-full overflow-scroll bg-gray-100">
                    {
                        tempTasks.map((item: TaskDataType, idx: number) => {
                            return <Task {...item} key={idx} />
                        })
                    }
                </div>
            </div>
            <SidePanel />
        </div>
    )
}

function Task(props: TaskDataType) {
    const { setActiveTask, ToggleSidePanel } = useTaskData();

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
        const result = JSON.stringify(item);
        const element = document.createElement("a");
        element.href = result;
        element.download = "TASK";
        document.append(element);
        element.click();
        document.removeChild(element);
    }

    return (
        <div className='w-2/6 p-2 h-80'>
            <div className='h-full p-5 bg-white flex flex-col cursor-pointer hover:bg-blue-50'>
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