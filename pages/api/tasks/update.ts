import type { NextApiRequest, NextApiResponse } from 'next';
import { TaskDataType } from '@/global';

type Data = {
    msg: string
    payload?: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "PATCH") return res.end();
    const body = req.body;

    const task: TaskDataType = {
        body: body.body,
        createdAt: body.createdAt,
        createdBy: body.createdBy,
        _id: body._id,
        taskPeriod: body.taskPeriod,
        tags: body.tags,
        title: body.title,
        totalTimeSpentOnTask: body.totalTimeSpentOnTask,
        type: body.type
    }

    try {
        return res.json({ msg: 'task updated', payload: task });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
