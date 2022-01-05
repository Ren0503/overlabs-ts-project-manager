import { Request, Response } from 'express';
import { connectToDB } from '../config/db';

export async function getAllColumns(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        const columns = await db.collection('columns').find({ boardId: slug }).toArray();
        res.send(columns);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function createColumns(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const {
            id,
            boardId,
            boardName,
            columnName,
            dateCreated,
            userId,
            cards,
            sequence
        } = req.body;

        const data = {
            _id: id,
            boardId,
            boardName,
            columnName,
            dateCreated,
            userId,
            sequence
        };

        const board = await db.collection('columns').insertOne(data);
        res.send(board);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function updateColumns(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { cid } = req.query;

        const board = await db
            .collection('columns')
            .updateOne({ _id: cid }, { $set: { ...req.body } });

        res.send(board);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function deleteColumn(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { cid } = req.query;

        await db.collection('cards').remove({ columnId: cid });
        await db.collection('columns').deleteOne({ _id: cid });

        res.send({ message: 'Deleted' });
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};


export async function deleteAllColumns(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        await db.collection('columns').remove({ boardId: slug });

        res.send({ message: 'All columns deleted' });
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};