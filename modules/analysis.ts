import { TaskDataType, WeekDataType } from "@/global";

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

const CalculateTimeSpentInsight = (data: TaskDataType[]) => {
    const response = SortTaskIntoWeekPeriods(data);
    const totalTimeSpentThisWeek = CalculateTotalTaskTimeSpentForWeek(response.currentWeek);
    const totalTimeSpentLastWeek = CalculateTotalTaskTimeSpentForWeek(response.lastWeek);
    const totalTimeSpentPreviousWeek = CalculateTotalTaskTimeSpentForWeek(response.perviousWeek);

    const differenceInPercent = ((totalTimeSpentLastWeek - totalTimeSpentPreviousWeek) / ((totalTimeSpentLastWeek + totalTimeSpentPreviousWeek) / 2)) * 100

    return {
        totalTimeSpentLastWeek: Math.floor(totalTimeSpentLastWeek),
        totalTimeSpentPreviousWeek: Math.floor(totalTimeSpentPreviousWeek),
        totalTimeSpentThisWeek: Math.floor(totalTimeSpentThisWeek),
        percentage: Math.floor(differenceInPercent)
    }
}

export {
    SortTaskIntoWeekPeriods,
    CalculateTimeSpentInsight,
    CalculateStatsInsights,
    CalculateTotalTaskTimeSpentForWeek
}