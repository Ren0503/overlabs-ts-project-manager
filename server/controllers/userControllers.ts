import { Request, Response } from 'express';
import { connectToDB } from '../config/db';

export async function getUser(req: Request, res: Response): Promise<void> {
    const { slug } = req.query;
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const user = await db.collection('users').findOne({ _id: slug });

        res.send(user);
    } {
        res.send({ msg: 'DB connection error', status: 400 });
    }
}