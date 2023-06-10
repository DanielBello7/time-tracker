import type { NextApiRequest, NextApiResponse } from 'next';
import { tempTasks } from '@/constants/temp';
import { ResponseDataType } from '@/global';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseDataType>
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
