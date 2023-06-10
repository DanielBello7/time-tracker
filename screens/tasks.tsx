import { useTaskData } from '@/context/tasks.context';
import { TaskDataType } from '../global';
import SidePanel from '@/components/sidepanel';
import Task from '@/components/task';
import React from 'react';

export default function Tasks() {
    const { sidePanel, ToggleSidePanel, tasks } = useTaskData();

    return (
        <div className="border w-full h-full overflow-hidden flex">
            <div className={`relative flex flex-col h-full overflow-hidden border border-black ${sidePanel.isOpen ? "w-4/6" : "w-full"}`}>
                <div className="w-full p-2 px-4 border-b border-black">
                    <h1 className="capitalize text-3xl font-bold">Tasks</h1>
                </div>
                <div className="flex flex-wrap grow w-full overflow-scroll bg-gray-100 p-2">
                    {
                        tasks.length < 1 &&
                        <div className='p-3'>
                            <h1 className='font-bold'>No task to show currently</h1>
                        </div>
                    }

                    {
                        tasks.length > 0 && tasks.map((item: TaskDataType, idx: number) => {
                            return <Task {...item} key={idx} />
                        })
                    }
                </div>

                <button
                    className='text-3xl hover:scale-110 bg-blue-400 font-bold p-2 rounded-full p-3 px-5 absolute bottom-5 end-5 text-white'
                    type='button'
                    onClick={() => ToggleSidePanel(true, "create")}
                >
                    +
                </button>
            </div>
            <SidePanel />
        </div>
    )
}