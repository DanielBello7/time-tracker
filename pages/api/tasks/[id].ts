import type { NextApiRequest, NextApiResponse } from 'next';
import { tempTasks } from '@/constants/temp';

type Data = {
    msg: string
    payload?: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "GET") return res.end();

    try {
        const { id } = req.query;
        const findTask = tempTasks.find((item) => item._id === id);
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
