import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, TaskDataType } from '@/global';
import data from '../../../database/TASKS.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "GET") return res.end();

    try {
        const { id } = req.query;
        const findTask = (data as TaskDataType[]).find((item) => item._id === id);
        if (!findTask) return res.status(404).json({ msg: 'task not found' });
        return res.json({ msg: 'task found', payload: findTask });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
