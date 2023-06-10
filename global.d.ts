export interface UserDataType {
    createdAt: string
    email: string
    _id: string
    password: string
    fullname: string
    tasks: string[]
}

export interface TaskWorkingPeriod {
    _id: string
    date: string
}

export interface TaskDataType {
    _id: string
    type: "story" | "bug"
    title: string
    body: string
    totalTimeSpentOnTask: {
        amount: number
        type: "minutes" | "seconds" | "hours"
    }
    tags: string[]
    taskPeriod: TaskWorkingPeriod[]
    createdAt: string
    completedAt: string
    createdBy: UserDataType
}

export interface InsightDataType {
    _id: string
    primaryFigure: string
    description: string
    subExpanatory: string
    title: string
    additionalInfo: string
}

export interface WeekDataType {
    currentWeek: TaskDataType[]
    perviousWeek: TaskDataType[]
    lastWeek: TaskDataType[]
}

export interface ResponseDataType {
    msg: string
    payload?: any
    addition?: any
}

export interface AnalyticsResultDataType {
    bugsCompleted: number
    storiesCompleted: number
    hoursCompleted: number
    bugsPercentage: number
    storiesPercentage: number
    hoursPercentage: number
}