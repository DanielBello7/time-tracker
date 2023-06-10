import type { NextApiRequest, NextApiResponse } from 'next';
import { TaskDataType, ResponseDataType } from '@/global';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseDataType>
) {
    if (req.method !== "PATCH") return res.end();
    const body = req.body;
    const { id } = req.query;

    const task: TaskDataType = {
        body: body.body,
        createdAt: body.createdAt,
        createdBy: body.createdBy,
        _id: id as string,
        taskPeriod: body.taskPeriod.length < 1 ? [{ _id: Math.random(), date: new Date().toDateString() }] : body.taskPeriod,
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
