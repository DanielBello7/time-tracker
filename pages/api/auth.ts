import type { NextApiRequest, NextApiResponse } from 'next';
import { tempUsers } from '@/constants/temp';

type Data = {
    msg: string
    payload?: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const email = req.body.email;
    const password = req.body.password;

    const selectedUser = tempUsers.find((item) => item.email === email);
    if (!selectedUser || selectedUser.password !== password)
        return res.status(400).json({ msg: 'invalid credentials' });
    return res.json({ msg: 'user login successful', payload: selectedUser });
}
