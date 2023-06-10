import type { NextApiRequest, NextApiResponse } from 'next';
import { TaskDataType } from '@/global';
import { v4 as uuid } from 'uuid';

type Data = {
    msg: string
    payload?: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") return res.end();
    const body = req.body;

    const task: TaskDataType = {
        _id: uuid(),
        body: body.body,
        createdAt: body.createdAt,
        createdBy: body.createdBy,
        tags: body.tags,
        taskPeriod: body.taskPeriod,
        title: body.title,
        totalTimeSpentOnTask: body.totalTimeSpentOnTask,
        type: body.type
    }

    try {
        return res.json({ msg: 'task created', payload: task });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
