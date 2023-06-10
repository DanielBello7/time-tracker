import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    payload?: any
    msg: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "DELETE") return res.end();

    try {
        return res.json({ msg: 'task deleted' });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
