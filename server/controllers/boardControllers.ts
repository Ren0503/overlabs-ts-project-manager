import { Request, Response } from 'express';
import { connectToDB } from '../config/db';

export async function createBoard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
            _id,
            name,
            dateCreated,
            createdBy,
            backgroundImage,
            users: []
        };

        const board = await db.collection('boards').insertOne(data);
        res.send(board);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function getAllBoards(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { userId } = req.query;

        const boards = await db
            .collection('boards')
            .find({ createdBy: userId })
            .limit(30)
            .toArray();

        const invitedBoards = await db.collection('boards').find({ users: userId }).toArray();
        const updatedBoards = boards.concat(invitedBoards);

        res.send(updatedBoards);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function getBoard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        const board = await db.collection('boards').findOne({ _id: slug });

        res.send(board);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function updateBoard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
            _id,
            name,
            dateCreated,
            createdBy,
            backgroundImage
        };

        const board = await db.collection('boards').updateOne({ _id: slug }, { $set: data });
        res.send(board);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function deleteBoard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        await db.collection('cards').remove({ boardId: slug });
        await db.collection('columns').remove({ boardId: slug });
        await db.collection('boards').deleteOne({ _id: slug });

        res.send({ message: 'Delete boards with columns and cards' });
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
}