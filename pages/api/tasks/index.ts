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
        return res.json({ msg: 'tasks', payload: tempTasks });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
