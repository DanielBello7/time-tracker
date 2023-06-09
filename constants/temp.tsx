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
        bugMeta: {
            dateFixed: null,
            isBugFixed: false
        },
        createdAt: new Date().toDateString(),
        createdBy: tempUsers[0],
        storyMeta: null,
        tags: ['text input', 'frontend', 'urgent'],
        taskPeriod: [
            {
                _id: '0',
                date: new Date().toDateString(),
                timeSpent: 10
            }
        ],
        title: 'typing bug',
        totalTimeSpentOnTask: 10,
        type: "bug"
    },
    {
        _id: '2',
        body: 'task to write in the story of the company information as well as the company history',
        bugMeta: null,
        createdAt: new Date().toDateString(),
        createdBy: tempUsers[0],
        storyMeta: {
            body: 'the company was created on the 21st of july 2007 with 3 officers and 2 primary staff'
        },
        tags: ['history', 'company', 'title', 'story'],
        taskPeriod: [
            {
                _id: '0',
                date: new Date().toDateString(),
                timeSpent: 2
            },
            {
                _id: '1',
                date: new Date().toDateString(),
                timeSpent: 3
            }
        ],
        title: 'company history story',
        totalTimeSpentOnTask: 5,
        type: "story"
    }
]

export { tempTasks, tempUsers }