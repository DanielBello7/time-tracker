import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseDataType, TaskDataType } from '@/global';
import data from '../../../database/TASKS.json';
import path from 'path';
import utilities from 'util';
import fs_module from 'fs';

const writeFile = utilities.promisify(fs_module.writeFile);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseDataType>) {
    if (req.method !== "DELETE") return res.end();

    try {
        const { id } = req.query;
        const updatedData = (data as TaskDataType[]).filter((item) => item._id !== id);
        await writeFile(path.join(__dirname, "../../../../../database/TASKS.json"), JSON.stringify(updatedData, undefined, 4));
        return res.json({ msg: 'task deleted', payload: id });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'error occured',
            payload: (error as Error).message
        })
    }
}
