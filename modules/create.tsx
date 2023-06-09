import { useApplicationData } from "@/context/data.context";
import { useModalData } from "@/context/modal.context";
import { useTaskData } from "@/context/tasks.context";
import { AxiosError } from "axios";
import React from "react";

export default function CreateTaskPanel() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { user, axios } = useApplicationData();
    const { setTasks } = useTaskData();
    const { ToggleAlert } = useModalData();

    const initial_data = {
        title: "",
        type: "",
        body: "",
        createdBy: user!,
        tags: [],
        taskPeriod: [],
        totalTimeSpentOnTask: "0",
        periodType: "",
        completedAt: ""
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
                        _id: Math.random().toString() + 'A',
                        date: new Date().toDateString()
                    }
                ] as never
            })
        }

        setIsLoading(true)

        try {
            const response = await axios.post('/tasks/create', {
                ...data,
                totalTimeSpentOnTask: {
                    amount: parseInt(data.totalTimeSpentOnTask),
                    type: data.periodType
                }
            });
            setTasks(prev => ([...prev, response.data.payload]));
            setData(initial_data);
            setIsLoading(false);
            return ToggleAlert(true, "New Task Created");
        }
        catch (error) {
            const msg: any = (error as AxiosError).response?.data
            ToggleAlert(true, msg.msg);
            return setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex grow overflow-scroll p-3">
                <form className="w-full" onSubmit={HandleSubmit}>
                    <div className={`col-span-100 sm:col-span-100`}>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                            task title
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
                            disabled={isLoading && true}
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
                            disabled={isLoading && true}
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
                            disabled={isLoading && true}
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
                                disabled={isLoading && true}
                            />

                            <div className="px-2"></div>

                            <select
                                className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-3/6 sm:text-sm p-2 rounded"
                                required
                                style={{ fontSize: '0.9rem', padding: '10px' }}
                                value={data.periodType}
                                onChange={(e) => setData({ ...data, periodType: e.currentTarget.value })}
                            >
                                <option value="">Select a period type</option>
                                <option value="seconds">Seconds</option>
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    </div>

                    <div className={`col-span-100 sm:col-span-100 my-5 mb-6`}>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                            date task was completed
                        </label>

                        <div className="w-full flex items-center mb-4">
                            <input
                                className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 rounded"
                                onChange={(e) => setData({ ...data, completedAt: e.currentTarget.value })}
                                name={"periods"}
                                type="date"
                                id={"periods"}
                                required
                                value={data.completedAt}
                                max={new Date().toISOString().split("T")[0]}
                                placeholder="Task Periods"
                                autoComplete="off"
                                disabled={isLoading && true}
                            />
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
                                disabled={isLoading && true}
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
                                value={periodInput}
                                max={new Date().toISOString().split("T")[0]}
                                placeholder="Task Periods"
                                autoComplete="off"
                                disabled={isLoading && true}
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
                        className="mt-9 mb-5 hover:opacity-50 w-full text-white bg-blue-500 p-3 fs-7 uppercase font-bold"
                        type="submit"
                        disabled={isLoading && true}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>

            <div className="p-3 border-t border-blue-500 bg-gray-200">
                <TaskImportComponent />
            </div>
        </div>
    )
}

function TaskImportComponent() {
    const [file, setFile] = React.useState<File | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { axios, user } = useApplicationData();
    const { ToggleAlert } = useModalData();
    const { setTasks } = useTaskData();

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) return ToggleAlert(true, "Please select a file for import");
        setIsLoading(true);

        try {
            const url = URL.createObjectURL(file);
            const response = await (await fetch(url)).json()
            const result = await axios.post(`/tasks/upload?id=${user?._id}`, response);
            setTasks((prev) => [...prev, result.data.payload]);
            setFile(null);
            ToggleAlert(true, "Task Added");
            return setIsLoading(false);
        }
        catch (error) {
            const msg = (error as Error).message;
            const res: any = (error as AxiosError).response?.data;
            const axiosMsg = res.msg;
            ToggleAlert(true, msg ? msg : axiosMsg ? axiosMsg : "Error occured");
            return setIsLoading(false)
        }
    }

    return (
        <div className={`col-span-100 sm:col-span-100`}>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                import task data
            </label>
            <p className="text-gray-400 fs-7 mb-3">You could import external task data</p>

            <form className="w-full flex items-center mb-4" onSubmit={HandleSubmit}>
                <input
                    className="border-b-4 bg-white focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 rounded"
                    onChange={(e) => {
                        const data = e.currentTarget.files as FileList;
                        const file = data[0];
                        return setFile(file);
                    }}
                    name={"file_import"}
                    type="file"
                    id={"file_import"}
                    accept="application/json"
                    required
                    placeholder="Import Task"
                    disabled={isLoading && true}
                />
                <button className="p-1 px-3 ms-3 bg-white border-2 border-black rounded text-2xl hover:scale-110 hover:bg-black hover:text-white" type="submit">
                    +
                </button>
            </form>
        </div>
    )
}