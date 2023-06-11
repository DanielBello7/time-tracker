import type { ResponseDataType, TaskDataType } from '@/global';
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../database/TASKS.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "GET") return res.end();
    const { id } = req.query;
    if (!id) return res.status(400).json({ msg: 'id required' });

    try {
        const userTasks = (data as TaskDataType[]).filter((item) => item.createdBy._id === id);


        return res.json({ msg: 'tasks insights', payload: [] });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}