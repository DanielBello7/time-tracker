import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, UserDataType } from '@/global';
import { v4 as uuid } from 'uuid';
import path from 'path';
import utilities from 'util';
import fs_module from 'fs';

import data from '../../database/USERS.json';

const writeFile = utilities.promisify(fs_module.writeFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    try {
        const newUser: UserDataType = {
            _id: uuid(),
            createdAt: new Date().toDateString(),
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            tasks: []
        }

        const findUser = (data as UserDataType[]).find((item) => item.email === newUser.email);
        if (findUser) return res.status(400).json({ msg: 'user already registered' });
        await writeFile(path.join(__dirname, "../../../../database/USERS.json"), JSON.stringify([...data, newUser], undefined, 4))
        return res.json({ msg: 'user successfully registered', payload: newUser });
    }
    catch (error) {
        return res.status(500).json({ msg: 'error occured', payload: (error as Error).message })
    }
}
