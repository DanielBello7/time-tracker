import type { TaskDataType, WeekDataType, ResponseDataType, InsightDataType } from "@/global";
import type { NextApiRequest, NextApiResponse } from 'next';
import { tempTasks } from '@/constants/temp';

function GetTasksStats(data: TaskDataType[]): WeekDataType {
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

        const lastWeekStart = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 8
            )
        ).getTime();

        const lastWeekEnd = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 1
            )
        ).getTime();

        const previousWeekStart = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 15
            )
        ).getTime();

        const previousWeekEnd = new Date(
            new Date().setDate(
                new Date().getDate() - new Date().getDay() - 8
            )
        ).getTime();

        if (currentWeekStart < taskDate && currentWeekEnd > taskDate) dataSortedByDate.currentWeek.push(task);
        if (lastWeekStart < taskDate && lastWeekEnd > taskDate) dataSortedByDate.lastWeek.push(task);
        if (previousWeekStart < taskDate && previousWeekEnd > taskDate) dataSortedByDate.perviousWeek.push(task);
    })

    return dataSortedByDate;
}

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

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseDataType>
) {
    if (req.method !== "GET") return res.end();

    try {

        const CalculateBugsInsights = () => {
            const bugsData = tempTasks.filter(item => item.type === "bug");
            const result = GetTasksStats(bugsData);
            return result;
        }

        const CalculateInsights = () => {
            const bugsData = tempTasks.filter(item => item.type === "story");
            const result = GetTasksStats(bugsData);
            return result;
        }

        const CalculateGeneralInsight = () => {
            const result = tempTasks.reduce((total, task) => {
                if (task.totalTimeSpentOnTask.type === "hours")
                    return total = total + task.totalTimeSpentOnTask.amount;

                else if (task.totalTimeSpentOnTask.type === "minutes")
                    return total = total + (task.totalTimeSpentOnTask.amount / 60);

                else return total = total + (task.totalTimeSpentOnTask.amount / 3600);
            }, 0);

            return result;
        }

        return res.json({ msg: 'tasks insights', payload: [] });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
