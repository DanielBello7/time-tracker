import type { TaskDataType, InsightDataType, WeekDataType } from "@/global";
import { tempTasks } from "@/constants/temp";
import { useTaskData } from "@/context/tasks.context";

function GetBugsStats(data: TaskDataType[]): WeekDataType {
    const bugsData = data.filter(item => item.type === "bug");

    const dataSortedByDate: WeekDataType = {
        currentWeek: [],
        lastWeek: [],
        perviousWeek: []
    }

    data.forEach(task => {
        const taskDate = new Date(task.createdAt).getTime();

        const currentWeekStart = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 1
            )
        ).getTime();

        const currentWeekEnd = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() + 6
            )
        ).getTime();

        const previousWeekStart = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 8
            )
        ).getTime();

        const previousWeekEnd = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 1
            )
        ).getTime();

        const TwoWeekAgoStart = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 15
            )
        ).getTime();

        const TwoWeeksAgoEnd = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 8
            )
        ).getTime();

        if (currentWeekStart < taskDate && currentWeekEnd > taskDate) dataSortedByDate.currentWeek.push(task);
        if (previousWeekStart < taskDate && previousWeekEnd > taskDate) dataSortedByDate.perviousWeek.push(task);
        if (TwoWeekAgoStart < taskDate && TwoWeeksAgoEnd > taskDate) dataSortedByDate.lastWeek.push(task);
    })

    return dataSortedByDate;
}

export default function Analytics() {
    const { tasks } = useTaskData();
    const result = GetBugsStats(tempTasks);
    console.log(result);

    const analytics_data: InsightDataType[] = [
        {
            additionalInfo: 'There was a -50% decline in bugs completion',
            _id: '1',
            description: 'This is an insight about the total amount of bugs completed last week',
            primaryFigure: '10',
            subExpanatory: 'Bugs completed',
            title: 'Bugs Insight'
        },
        {
            additionalInfo: 'There was a 50% increase in the stories completion',
            _id: '2',
            description: 'This is an insight to the total amount of stories completed last week',
            primaryFigure: '10',
            subExpanatory: 'Stories completed',
            title: 'Stories Insight'
        },
        {
            additionalInfo: 'There have been a 2% increase in the amount of time spent on tasks',
            _id: '3',
            description: 'This insight holds information about the total time spent on tasks',
            primaryFigure: '10',
            subExpanatory: 'hours spent on tasks',
            title: 'Time Spent'
        },
    ]
    return (
        <div className="border border-black flex flex-col h-full w-full overflow-hidden">
            <div className="p-2 border-b border-black">
                <h1 className="text-3xl font-bold">Insights</h1>
            </div>
            <div className="w-full flex grow border border-blue-500 overflow-scroll p-3">
                {analytics_data.map((item, idx) => {
                    return <Insight {...item} key={idx} />
                })}
            </div>
        </div>
    )
}

function Insight(props: InsightDataType) {
    return (
        <div className="w-1/3 h-52 p-3">
            <div className="w-full border h-full rounded bg-gray-50 p-3">
                <h1 className="font-bold text-3xl">
                    {props.title}
                </h1>

                <p className="fs-7 text-gray-500">
                    {props.description}
                </p>

                <div className="flex items-end mt-3">
                    <h1 className="me-1 text-2xl font-bold">{props.primaryFigure}</h1>
                    <p className="text-gray-700 mb-1 fs-8">{props.subExpanatory}</p>
                </div>

                <p className="fs-8">
                    {props.additionalInfo}
                </p>
            </div>
        </div>
    )
}