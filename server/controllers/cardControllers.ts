import { Request, Response } from 'express';
import { connectToDB } from '../config/db';

export async function getCards(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { slug } = req.query;

        const cards = await db.collection('cards').find({ boardId: slug }).toArray();
        res.send(cards);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function createCard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const {
            id,
            boardId,
            columnId,
            dateCreated,
            userId,
            title,
            type,
            description,
            sequence
        } = req.body;

        const data = {
            _id: id,
            boardId,
            columnId,
            title,
            type,
            dateCreated,
            userId,
            sequence,
            description
        };

        const card = await db.collection('cards').insertOne(data);
        res.send(card);
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

export async function updateCard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { cardId, slug } = req.query;

        await db.collection('cards').updateOne({ _id: cardId, boardId: slug }, { $set: { ...req.body } });

        res.send({ message: 'Card updated' });
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};


export async function deleteCard(req: Request, res: Response): Promise<void> {
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const { cardId } = req.query;

        await db.collection('cards').deleteOne({ _id: cardId });

        res.send({ message: 'A card has been deleted' });
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};