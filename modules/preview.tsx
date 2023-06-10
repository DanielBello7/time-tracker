import { useTaskData } from "@/context/tasks.context";

export default function PreviewTaskPanel() {
    const { activeTask, tasks } = useTaskData();
    const task = tasks.find((item) => item._id === activeTask);

    if (!task) return <TaskUnavailable />

    return (
        <div className="w-full p-3">
            <h1 className="text-2xl font-bold capitalize">{task.title}</h1>
            <p className="mb-3">
                <span className="uppercase fs-7 font-bold">type: </span>
                <span className="font-bold fs-7 uppercase">{task.type}</span>
            </p>
            <p className="text-gray-400">
                {task.body}
            </p>
            <div className="my-3">
                <p className="mb-2 fs-7 uppercase font-bold">Tags</p>
                <div className="w-full flex flex-wrap">
                    {task.tags.map((item, idx) => {
                        return (
                            <p className="mx-3 mb-2 p-2 border rounded" key={idx}>
                                {item}
                            </p>
                        )
                    })}
                </div>
            </div>
            <div className="mt-3">
                <p className="mb-2 fs-7 uppercase font-bold">Periods task was worked on</p>
                <div className="w-full mt-3">
                    {task.taskPeriod.map((item, idx) => {
                        return (
                            <div key={idx}>
                                - {new Date(item.date).toLocaleDateString("en-us", { dateStyle: "full" })}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-3 fs-9">
                <span className="text-gray-400">Total time spent on task: </span>
                <span className="text-black">
                    {task.totalTimeSpentOnTask.amount} {task.totalTimeSpentOnTask.type}
                </span>
            </div>

            <div className="w-full">
                <span>This task was created on </span>
                <span>
                    {new Date(task.createdAt).toLocaleDateString("en-us", { dateStyle: "full" })}
                </span>
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