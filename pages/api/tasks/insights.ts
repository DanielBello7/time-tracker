import type { TaskDataType, WeekDataType, ResponseDataType, InsightDataType, AnalyticsResultDataType } from "@/global";
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../database/TASKS.json';


function SortTaskIntoWeekPeriods(data: TaskDataType[]): WeekDataType {
    const dataSortedByDate: WeekDataType = {
        currentWeek: [],
        lastWeek: [],
        perviousWeek: []
    }

    data.forEach(task => {
        const taskDate = new Date(task.completedAt).getTime();

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

const CalculateStatsInsights = (data: TaskDataType[], type: "bug" | "story") => {
    const filteredData = data.filter(item => item.type === type);
    const result = SortTaskIntoWeekPeriods(filteredData);

    const lastWeekStats = result.lastWeek.length;
    const perviousWeekStats = result.perviousWeek.length;

    const differenceInPercent = ((lastWeekStats - perviousWeekStats) / ((lastWeekStats + perviousWeekStats) / 2)) * 100
    return {
        amountCompletedLastWeek: lastWeekStats,
        amountCompletedPreviousWeek: perviousWeekStats,
        percentage: Math.floor(differenceInPercent)
    }
}

const CalculateTotalTaskTimeSpentForWeek = (data: TaskDataType[]) => {
    const response = data.reduce((total, task) => {
        if (task.totalTimeSpentOnTask.type === "hours") return total = total + task.totalTimeSpentOnTask.amount;
        else if (task.totalTimeSpentOnTask.type === "minutes") return total = total + (task.totalTimeSpentOnTask.amount / 60);
        else return total = total + (task.totalTimeSpentOnTask.amount / 3600);
    }, 0);

    return response
}

const CalculateGeneralInsight = (data: TaskDataType[]) => {
    const response = SortTaskIntoWeekPeriods(data);
    const totalTimeSpentLastWeek = CalculateTotalTaskTimeSpentForWeek(response.lastWeek);
    const totalTimeSpentPreviousWeek = CalculateTotalTaskTimeSpentForWeek(response.perviousWeek);

    const differenceInPercent = ((totalTimeSpentLastWeek - totalTimeSpentPreviousWeek) / ((totalTimeSpentLastWeek + totalTimeSpentPreviousWeek) / 2)) * 100

    return {
        totalTimeSpentLastWeek: Math.floor(totalTimeSpentLastWeek),
        totalTimeSpentPreviousWeek: Math.floor(totalTimeSpentPreviousWeek),
        percentage: Math.floor(differenceInPercent)
    }
}

const GenerateAnalyticsResult = (data: AnalyticsResultDataType) => {
    const analytics_data: InsightDataType[] = [
        {
            additionalInfo: `There was a ${data.bugsPercentage}% ${data.bugsPercentage < 0 ? "decline" : "increase"} in bugs completion`,
            _id: '1',
            description: `This is an insight about the total amount of bugs completed last week`,
            primaryFigure: `${data.bugsCompleted}`,
            subExpanatory: 'Bugs completed last week',
            title: 'Bugs Insight'
        },
        {
            additionalInfo: `There was a ${data.storiesPercentage}% ${data.storiesPercentage < 0 ? "decline" : "increase"} in the stories completion`,
            _id: '2',
            description: `This is an insight to the total amount of stories completed last week`,
            primaryFigure: `${data.storiesCompleted}`,
            subExpanatory: 'Stories completed last week',
            title: 'Stories Insight'
        },
        {
            additionalInfo: `There have been a ${data.hoursPercentage}% ${data.hoursPercentage < 0 ? "decline" : "increase"} in the amount of time spent on tasks`,
            _id: '3',
            description: `This insight holds information about the total time spent on tasks`,
            primaryFigure: `${data.hoursCompleted}`,
            subExpanatory: 'hours spent on tasks last week',
            title: 'Time Spent'
        },
    ]

    return analytics_data
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "GET") return res.end();
    const { id } = req.query;
    if (!id) return res.status(400).json({ msg: 'id required' });

    try {
        const userTasks = (data as TaskDataType[]).filter((item) => item.createdBy._id === id);
        const insightStatsForBugs = CalculateStatsInsights(userTasks, "bug");
        const insightStatsForStories = CalculateStatsInsights(userTasks, "story");
        const generalInsights = CalculateGeneralInsight(userTasks);

        const result = GenerateAnalyticsResult({
            bugsCompleted: insightStatsForBugs.amountCompletedLastWeek,
            bugsPercentage: insightStatsForBugs.percentage,
            storiesCompleted: insightStatsForStories.amountCompletedLastWeek,
            storiesPercentage: insightStatsForStories.percentage,
            hoursCompleted: generalInsights.totalTimeSpentLastWeek,
            hoursPercentage: generalInsights.percentage
        });

        return res.json({ msg: 'tasks insights', payload: result, addition: insightStatsForStories });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
