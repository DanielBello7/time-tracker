import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, TaskDataType } from '@/global';
import { v4 as uuid } from 'uuid';
import data from '../../../database/TASKS.json';
import path from 'path';
import utilities from 'util';
import fs_module from 'fs';

const writeFile = utilities.promisify(fs_module.writeFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "POST") return res.end();
    const body = req.body;

    const task: TaskDataType = {
        _id: uuid(),
        body: body.body,
        createdAt: new Date().toDateString(),
        createdBy: body.createdBy,
        tags: body.tags,
        taskPeriod: body.taskPeriod,
        title: body.title,
        totalTimeSpentOnTask: body.totalTimeSpentOnTask,
        type: body.type,
        completedAt: new Date(body.completedAt).toDateString()
    }

    try {
        await writeFile(path.join(__dirname, "../../../../../database/TASKS.json"), JSON.stringify([...data, task], undefined, 4));
        return res.json({ msg: 'task created', payload: task });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
