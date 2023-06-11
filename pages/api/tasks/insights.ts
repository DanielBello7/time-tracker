import type { TaskDataType, ResponseDataType, InsightDataType, AnalyticsResultDataType } from "@/global";
import type { NextApiRequest, NextApiResponse } from 'next';
import { CalculateGeneralInsight, CalculateStatsInsights } from '../../../modules/analysis';
import data from '../../../database/TASKS.json';

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
            additionalInfo: `There have been a ${data.hoursPercentage}% ${data.hoursPercentage < 0 ? "decline" : "increase"} on time spent on tasks`,
            _id: '3',
            description: `This insight holds information about the total time spent on tasks, both bug tasks and stories tasks`,
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

        return res.json({ msg: 'tasks insights', payload: result });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
