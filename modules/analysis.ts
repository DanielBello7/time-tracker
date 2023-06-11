import { TaskDataType, WeekDataType } from "@/global";


// this function gives you back the first day and last day of the week
// it follows as suit where 0 is the current week and 1 is the week before the current week
const GetWeekDay = (idx: number) => {
    const firstDateOfWeek = new Date(
        new Date().setDate(
            new Date().getDate() - new Date().getDay() - 1 - (7 * idx)
        )
    );

    const secondDayofWeek = new Date(
        new Date().setDate(
            new Date().getDate() - new Date().getDay() + (6 - (7 * idx))
        )
    );

    return [firstDateOfWeek, secondDayofWeek]
}

// sort data given into current week, last week and previous week
function SortTaskIntoWeekPeriods(data: TaskDataType[]): WeekDataType {
    const dataSortedByDate: WeekDataType = {
        currentWeek: [],
        lastWeek: [],
        perviousWeek: []
    }

    // current week (0 weeks ago)
    const [a, b] = GetWeekDay(0);
    const currentWeekStart = a.getTime();
    const currentWeekEnd = b.getTime();

    // last week (1 week ago)
    const [c, d] = GetWeekDay(1);
    const lastWeekStart = c.getTime();
    const lastWeekEnd = d.getTime();

    // previous week (2 weeks ago)
    const [e, f] = GetWeekDay(2);
    const previousWeekStart = e.getTime();
    const previousWeekEnd = f.getTime();

    data.forEach(task => {
        const taskDate = new Date(task.completedAt).getTime();

        if (currentWeekStart < taskDate && currentWeekEnd > taskDate)
            dataSortedByDate.currentWeek.push(task);
        if (lastWeekStart < taskDate && lastWeekEnd > taskDate)
            dataSortedByDate.lastWeek.push(task);
        if (previousWeekStart < taskDate && previousWeekEnd > taskDate)
            dataSortedByDate.perviousWeek.push(task);
    });

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

    return response;
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