export interface UserDataType {
    createdAt: string
    email: string
    _id: string
    password: string
    fullname: string
}

export interface TaskWorkingPeriod {
    _id: string
    date: string
    timeSpent: number
}

export interface TaskStoryMetaData {
    body: string
}

export interface TaskBugMetaData {
    isBugFixed: boolean
    dateFixed: string
}

export interface TaskDataType {
    _id: string
    type: "story" | "bug"
    title: string
    body: string
    storyMeta: TaskStoryMetaData | null
    bugMeta: TaskBugMetaData | null
    totalTimeSpentOnTask: number
    tags: string[]
    taskPeriod: TaskWorkingPeriod[]
    createdAt: string
    createdBy: UserDataType
}