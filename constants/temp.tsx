import { UserDataType, TaskDataType } from '../global';

const tempUsers: UserDataType[] = [
    {
        _id: 'A',
        createdAt: new Date().toDateString(),
        email: 'user1@gmail.com',
        fullname: 'user1 user1',
        password: 'user1',
        tasks: ['1', '2']
    },
    {
        _id: 'B',
        createdAt: new Date().toDateString(),
        email: 'user2@gmail.com',
        fullname: 'user2 user2',
        password: 'user2',
        tasks: []
    }
]

const tempTasks: TaskDataType[] = [
    {
        _id: '1',
        body: 'Task to finish the user typing bug',
        createdAt: new Date().toDateString(),
        createdBy: tempUsers[0],
        tags: ['text input', 'frontend', 'urgent'],
        taskPeriod: [
            {
                _id: '0',
                date: new Date().toDateString(),
            }
        ],
        title: 'typing bug',
        totalTimeSpentOnTask: {
            amount: 10,
            type: "hours"
        },
        type: "bug",
        completedAt: new Date().toDateString()
    },
    {
        _id: '2',
        body: 'task to write in the story of the company information as well as the company history',
        createdAt: new Date().toDateString(),
        createdBy: tempUsers[0],
        tags: ['history', 'company', 'title', 'story'],
        taskPeriod: [
            {
                _id: '0',
                date: new Date().toDateString(),
            },
            {
                _id: '1',
                date: new Date().toDateString(),
            }
        ],
        title: 'company history story',
        totalTimeSpentOnTask: {
            amount: 5,
            type: "hours"
        },
        type: "story",
        completedAt: new Date().toDateString()
    }
]

export { tempTasks, tempUsers }