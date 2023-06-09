import { useApplicationData } from "@/context/data.context";
import React from "react";

export default function CreateTaskPanel() {
    const { user } = useApplicationData();
    const initial_data = {
        _id: "",
        title: "",
        type: "",
        body: "",
        bugMeta: null,
        createdAt: new Date().toDateString(),
        createdBy: user!,
        storyMeta: null,
        tags: [],
        taskPeriod: [],
        totalTimeSpentOnTask: 0
    }

    const [data, setData] = React.useState(initial_data);

    const HandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <form className="w-full border-t border-black p-3" onSubmit={HandleSubmit}>
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
                    required
                    disabled={false}
                />
            </div>

            <div className={`col-span-100 sm:col-span-100`}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    task body
                </label>

                <input
                    className="border-b-4 bg-gray-50 focus:border-b-blue-500 focus:outline-0 block w-full sm:text-sm p-2 mb-4 rounded"
                    onChange={(e) => setData({ ...data, body: e.currentTarget.value })}
                    name={"body"}
                    type="text"
                    id={"body"}
                    value={data.body}
                    autoComplete="off"
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
                    onChange={(e) => setData({ ...data, type: e.currentTarget.value as "bug" | "story" })}
                >
                    <option value="">Select a task type</option>
                    <option value="bug">Bug</option>
                    <option value="story">Story</option>
                </select>
            </div>
        </form>
    )
}