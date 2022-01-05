import { Request, Response } from 'express';
import { connectToDB } from '../config/db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

/**
 * Verify token: [GET] /api/auth/verify-token
 * 
 * @param req 
 * @param res 
 */
export async function verifyToken(req: Request, res: Response): Promise<void> {
    const { token } = req.query;

    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const tokenValue = await db.collection('token').findOne({ token });

        if (tokenValue) {
            res.status(200).send({ message: 'Token valid' });
        } else {
            res.status(404).send({ message: 'Not found token' });
        }
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

/**
 * Verify email: [GET] /api/auth/verify-email
 * 
 * @param req 
 * @param res 
 */
export async function verifyEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.query;

    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.status(200).send({ message: 'User Found' });
        } else {
            res.status(404).send({ message: 'Not found user' });
        }
    } else {
        res.send({ msg: 'DB connection error', status: 400 });
    }
};

/**
 * Login user: [POST] /api/auth/login
 * @param req 
 * @param res 
 */
export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send({ error: 'email or password is missing' });

    const { db, client } = await connectToDB();
    const KEY = process.env.JWT_SECRET_KEY || '';

    if (client.isConnected()) {
        const user = await db.collection('users').findOne({ email: email });

        if (user) {
            bcrypt.compare(password, user.password, function (err, isMatched) {
                if (isMatched === true) {
                    const claim = { id: user._id, email: user.email };
                    const token = jwt.sign({ user: claim }, KEY, { expiresIn: '1h' });

                    res.setHeader(
                        'Set-Cookie',
                        serialize('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24 * 1000,
                            sameSite: 'strict',
                            path: '/'
                        })
                    );

                    res.send({ message: 'success', token, id: user._id, status: 200 });
                } else {
                    res.status(404).send({ error: 'Invalid username or password' });
                }
            });
        } else {
            res.status(404).send({ error: 'Invalid username or password' });
        }
    }
};

/**
 * Register user [POSt] /api/auth/register
 * 
 * @param req 
 * @param res 
 */
export async function register(req: Request, res: Response): Promise<void> {
    const { email, password, id, fullName } = req.body;
    const { db, client } = await connectToDB();

    if (client.isConnected()) {
        const isExistUser = await db.collection('users').find({ email: email }).toArray();

        if (isExistUser.length > 0) {
            res.status(404).send({ message: 'Email is already registered' });
        }

        let user = {};
        bcrypt.hash(password, 10, async (err, hash) => {
            user = await db.collection('users').insertOne({ _id: id, email, password: hash, fullName });
        });

        if (user) {
            res.status(200).send({ message: 'Registered success' });
        }
        res.status(404).send({ message: 'Failed register' });
    } else {
        res.send({ message: 'DB Error' });
    }
}

/**
 * Logout user /api/auth/logout
 * 
 * @param req 
 * @param res 
 */
export function handler(req: Request, res: Response): void {
    res.setHeader(
        'Set-Cookie',
        serialize('token', req.body.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        })
    );

    res.send({ message: 'success' });
}
