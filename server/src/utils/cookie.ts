import { Request, Response } from 'express';
import { generateToken, verifyToken } from '.';

const COOKIE_NAME = 'user-auth';

export const setTokenCookie = (res: Response, userId: string) => {
    console.log(generateToken(userId));
    
    res.cookie(COOKIE_NAME, generateToken(userId), {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        path: '/',
    });
}

export const getUserFromCookie = (
    req: Request,
    res: Response,
    strict?: boolean
) => {
    try {
        const token = req?.cookies[COOKIE_NAME]

        console.log(req.cookies[COOKIE_NAME]);
        if (!token) throw Error('No token');
        const payload: any = verifyToken(token);
        return payload.userId;
    } catch (err) {
        if (!strict) return null;
        res.status(401);
        res.json({ error: err });
    }
}

export const clearTokenCookie = (res: Response) => {
    res.clearCookie(COOKIE_NAME, {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        path: '/',
    });
}