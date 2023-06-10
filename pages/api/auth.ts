import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, UserDataType } from '@/global';
import data from '../../database/USERS.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "POST") return res.end();

    try {
        const password = req.body.password;
        const email = req.body.email;

        if (!password || !email) return res.status(400).json({ msg: 'incomplete fields' });

        const selectedUser = (data as UserDataType[]).find((item: UserDataType) => item.email === email);
        if (!selectedUser || selectedUser.password !== password)
            return res.status(400).json({ msg: 'invalid credentials' });
        return res.json({ msg: 'user login successful', payload: selectedUser });
    }
    catch (error) {
        return res.status(500).json({ msg: 'error occured', payload: (error as Error).message })
    }
}
