import { useTaskData } from '@/context/tasks.context';
import { TaskDataType } from '../global';
import { useApplicationData } from '@/context/data.context';
import SidePanel from '@/components/sidepanel';
import Task from '@/components/task';
import React from 'react';
import Loading from '@/components/loading';

export default function Tasks() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { axios, user } = useApplicationData();
    const { setTasks } = useTaskData();

    const { sidePanel, ToggleSidePanel, tasks } = useTaskData();

    React.useEffect(() => {
        async function GetTasks() {
            setIsLoading(true);
            try {
                const response = await axios.get(`/tasks?id=${user?._id}`);
                setTasks(response.data.payload);
                return setIsLoading(false);
            }
            catch (error) {
                setIsError(true);
                setError(error as Error);
                return setIsLoading(false);
            }
        }
        GetTasks();
    }, []);

    return (
        <div className="w-full h-full overflow-hidden flex">
            <div className={`relative flex flex-col h-full overflow-hidden ${sidePanel.isOpen ? "w-4/6" : "w-full"}`}>
                <div className="w-full p-2 px-4 border-b border-black">
                    <h1 className="capitalize text-3xl font-bold">Tasks</h1>
                </div>
                <div className="flex flex-wrap grow w-full overflow-scroll bg-gray-200 p-2">
                    {
                        isLoading && <Loading />
                    }

                    {
                        !isLoading && isError &&
                        <div className='p-3 font-bold'>{error?.message}</div>
                    }

                    {
                        !isLoading && !isError && tasks.length < 1 &&
                        <div className='p-3'>
                            <h1 className='font-bold'>No task to show currently</h1>
                        </div>
                    }

                    {
                        !isLoading && !isError && tasks.length > 0 &&
                        tasks.map((item: TaskDataType, idx: number) => {
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