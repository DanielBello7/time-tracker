import { TaskDataType } from "@/global";
import { useTaskData } from "@/context/tasks.context";
import { useApplicationData } from "@/context/data.context";
import { useModalData } from "@/context/modal.context";
import React from "react";

export default function EditTaskPanel() {
    const [data, setData] = React.useState<TaskDataType | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const { activeTask, tasks } = useTaskData();

    const GetEditData = React.useCallback(() => {
        setIsLoading(true);
        const task = tasks.find((item) => item._id === activeTask);
        if (task) setData(task);
        setIsLoading(false);
    }, [activeTask]);

    React.useEffect(() => {
        GetEditData();
    }, [GetEditData]);

    if (isLoading) return <div className="p-3 font-bold uppercase">Loading...</div>
    if (!data) return <UnavailableTask />
    return <MainComponent {...data} />
}

function MainComponent(props: TaskDataType) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { activeTask, setTasks, setActiveTask, ToggleSidePanel } = useTaskData();
    const { axios } = useApplicationData();
    const { ToggleAlert } = useModalData();

    const initial_data = {
        title: props.title,
        body: props.body,
        type: props.type,
        taskPeriod: props.taskPeriod,
        tags: props.tags,
        totalTimeSpentOnTask: props.totalTimeSpentOnTask.amount.toString(),
        periodType: props.totalTimeSpentOnTask.type
    }

    const [data, setData] = React.useState(initial_data);
    const [tagsInput, setTagsInput] = React.useState("");
    const [periodInput, setPeriodInput] = React.useState("");

    const HandleAddPeriod = () => {
        if (!periodInput.trim()) return
        const taskData = {
            _id: Math.random().toString() + 'A',
            date: periodInput
        }
        setData({ ...data, taskPeriod: [...data.taskPeriod, taskData] as never });
        return setPeriodInput("");
    }

    const HandleAddTag = () => {
        if (!tagsInput.trim()) return
        setData({ ...data, tags: [...data.tags, tagsInput] as never })
        return setTagsInput("");
    }

    const TagsOutput = data.tags.map((item, idx) => {
        const HandleDelete = () => {
            return setData({ ...data, tags: data.tags.filter((tag) => tag !== item) as never });
        }

        return (
            <div className="border mb-1 flex items-center justify-between bg-gray-200" key={idx}>
                <p className="p-2 fs-8 capitalize">
                    {item}
                </p>
                <button className="fs-7 uppercase p-2 font-bold text-red-500" type="button" onClick={HandleDelete}>
                    delete
                </button>
            </div>
        )
    });

    const PeriodOutput = data.taskPeriod.map((item: any, idx) => {
        const HandleDelete = () => {
            return setData({
                ...data,
                taskPeriod: data.taskPeriod.filter((tag: any) => tag._id !== item._id)
            });
        }

        return (
            <div className="border mb-1 flex items-center justify-between bg-gray-200" key={idx}>
                <p className="p-2 fs-8 capitalize">
                    {new Date(item.date).toDateString()}
                </p>
                <button
                    className="fs-7 uppercase p-2 font-bold text-red-500"
                    type="button"
                    onClick={HandleDelete}
                >
                    delete
                </button>
            </div>
        )
    });

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!data.title.trim() || !data.type.trim() || !data.body.trim() || !data.periodType.trim()) return
        if (parseInt(data.totalTimeSpentOnTask) <= 0) return
        if (data.taskPeriod.length < 1) {
            setData({
                ...data,
                taskPeriod: [
                    {
                        _id: 'A',
                        date: new Date().toDateString()
                    }
                ] as never
            })
        }

        setIsLoading(true)

        try {
            const response = await axios.patch(`/tasks/update?id=${props._id}`, {
                ...props,
                ...data,
                totalTimeSpentOnTask: {
                    amount: data.totalTimeSpentOnTask,
                    type: data.periodType
                }
            });
            setTasks((prev) => {
                const result = prev.map((item) => {
                    if (item._id === response.data.payload._id) item = response.data.payload
                    return item
                });
                return result
            });
            ToggleSidePanel(false);
            setActiveTask(null);
            setIsLoading(false);
            return ToggleAlert(true, "Task Updated!");
        }
        catch (error) {
            ToggleAlert(true, (error as Error).message);
            return setIsLoading(false);
        }
    }

    return (
        <form className="w-full p-3" onSubmit={HandleSubmit}>
            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task title {activeTask}
                </label>

                <input
                    className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 mb-4 rounded"
                    onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
                    name={"title"}
                    type="text"
                    id={"title"}
                    value={data.title}
                    autoComplete="off"
                    placeholder="Task Title"
                    required
                    disabled={false}
                />
            </div>

            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task type
                </label>

                <select
                    className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 mb-4 rounded"
                    value={data.type}
                    required
                    onChange={(e) => setData({ ...data, type: e.currentTarget.value as "bug" | "story" })}
                >
                    <option value="">Select a task type</option>
                    <option value="bug">Bug</option>
                    <option value="story">Story</option>
                </select>
            </div>

            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task body
                </label>

                <textarea
                    className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 mb-4 rounded"
                    style={{ resize: "none", height: '100px' }}
                    placeholder="Task Body"
                    value={data.body}
                    required
                    onChange={(e) => setData({ ...data, body: e.currentTarget.value })}
                />
            </div>

            <div className={`pt-2 col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Total time spent on task
                </label>
                <p className="text-gray-400 fs-7 mb-3">Set the period amount worked on the task</p>

                <div className="flex items-center mb-4">
                    <input
                        className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-3/6 sm:text-sm p-2 rounded"
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            setData({ ...data, totalTimeSpentOnTask: value })
                        }}
                        name={"totalTimeSpent"}
                        type="text"
                        pattern="[0-9]+"
                        id={"totalTimeSpent"}
                        value={data.totalTimeSpentOnTask}
                        placeholder="Total time spent"
                        autoComplete="off"
                        required
                        disabled={false}
                    />

                    <div className="px-2"></div>

                    <select
                        className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-3/6 sm:text-sm p-2 rounded"
                        required
                        style={{ fontSize: '0.9rem', padding: '10px' }}
                        value={data.periodType}
                        onChange={(e) => setData({ ...data, periodType: e.currentTarget.value as any })}
                    >
                        <option value="">Select a period type</option>
                        <option value="seconds">Seconds</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                </div>
            </div>

            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task tags
                </label>
                <p className="text-gray-400 fs-7 mb-3">Add tags for the task </p>

                <div className="w-full flex items-center mb-4">
                    <input
                        className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 rounded"
                        onChange={(e) => setTagsInput(e.currentTarget.value)}
                        name={"tags"}
                        type="text"
                        id={"tags"}
                        value={tagsInput}
                        placeholder="Task Tags"
                        autoComplete="off"
                        disabled={false}
                    />
                    <button className="p-1 px-3 ms-3 border-2 border-black rounded text-2xl hover:scale-110 hover:bg-black hover:text-white" type="button" onClick={HandleAddTag}>
                        +
                    </button>
                </div>
            </div>

            {
                data.tags.length > 0 &&
                <div className="mb-3">{TagsOutput}</div>
            }

            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task periods
                </label>
                <p className="text-gray-400 fs-7 mb-3">Add dates on which you worked on the task </p>

                <div className="w-full flex items-center mb-4">
                    <input
                        className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 rounded"
                        onChange={(e) => setPeriodInput(e.currentTarget.value)}
                        name={"periods"}
                        type="date"
                        id={"periods"}
                        max={new Date().toISOString().split("T")[0]}
                        value={periodInput}
                        placeholder="Task Periods"
                        autoComplete="off"
                        disabled={false}
                    />
                    <button className="p-1 px-3 ms-3 border-2 border-black rounded text-2xl hover:scale-110 hover:bg-black hover:text-white"
                        type="button"
                        onClick={HandleAddPeriod}
                    >
                        +
                    </button>
                </div>
            </div>

            {
                data.taskPeriod.length > 0 &&
                <div className="mb-3">{PeriodOutput}</div>
            }

            <button
                className="mt-9 hover:opacity-50 w-full text-white bg-blue-500 p-3 fs-7 uppercase font-bold"
                type="submit"
                disabled={isLoading && true}
            >
                {isLoading ? "Loading..." : "update"}
            </button>
        </form>
    )
}

function UnavailableTask() {
    return (
        <div className="w-full p-3">
            <h1>Task unavailable</h1>
        </div>
    )
}