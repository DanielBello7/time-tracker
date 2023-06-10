import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, TaskDataType } from '@/global';
import data from '../../../database/TASKS.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "GET") return res.end();

    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ msg: 'id required' });

        const response = (data as TaskDataType[]).filter((item) => item.createdBy._id === id);
        return res.json({ msg: 'tasks', payload: response });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
