import { useTaskData } from "@/context/tasks.context";

export default function PreviewTaskPanel() {
    const { activeTask, tasks, ToggleSidePanel } = useTaskData();
    const task = tasks.find((item) => item._id === activeTask);

    if (!task) return <TaskUnavailable />

    return (
        <div className="w-full p-3 h-full overflow-scroll">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold capitalize">{task.title}</h1>

                <button className="fs-7 uppercase p-2 px-4 rounded bg-blue-500 hover:bg-blue-800 text-white font-bold" onClick={() => ToggleSidePanel(true, "edit")} type="button">
                    edit
                </button>
            </div>

            <div className="my-2">
                <p className="text-gray-400 fs-7 font-bold">Task Type </p>
                <p className="uppercase font-bold">{task.type}</p>
            </div>

            <div className="mt-9">
                <p className="text-gray-400 fs-7 font-bold">Task body</p>
                <p className="text-gray-500 mb-9">
                    {task.body}
                </p>
            </div>

            {
                task.tags.length > 0 &&
                <div className="my-3">
                    <p className="mb-2 font-bold fs-7 text-gray-400">Task Tags</p>
                    <div className="w-full flex flex-wrap">
                        {task.tags.map((item, idx) => {
                            return (
                                <p className="me-2 mb-2 p-2 border capitalize rounded" key={idx}>
                                    {item}
                                </p>
                            )
                        })}
                    </div>
                </div>
            }

            <div className="mt-9">
                <p className="fs-7 text-gray-400 font-bold">Periods task was worked on</p>
                <div className="w-full">
                    {task.taskPeriod.map((item, idx) => {
                        return (
                            <div key={idx} className="font-bold">
                                - {new Date(item.date).toLocaleDateString("en-us", { dateStyle: "full" })}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-9 fs-9">
                <p className="text-gray-400 fs-7 font-bold">Total time spent on task: </p>
                <p className="text-black font-bold text-xl">
                    {task.totalTimeSpentOnTask.amount} {task.totalTimeSpentOnTask.type}
                </p>
            </div>

            <div className="w-full mt-9">
                <p className="text-gray-400 fs-7 font-bold">This task was created on </p>
                <p className="font-bold">
                    {new Date(task.createdAt).toLocaleDateString("en-us", { dateStyle: "full" })}
                </p>
            </div>

            <div className="w-full my-9">
                <p className="text-gray-400 fs-7 font-bold">This task was completed on </p>
                <p className="font-bold">
                    {new Date(task.completedAt).toLocaleDateString("en-us", { dateStyle: "full" })}
                </p>
            </div>
        </div>
    )
}

function TaskUnavailable() {
    return (
        <div className="w-full p-3">
            <h1>Task currently unavailable</h1>
        </div>
    )
}