import cookie from 'cookie';
import { Request, Response } from 'express';
import { generateToken, verifyToken } from '.';

const COOKIE_NAME = 'fin-auth';

export function setTokenCookie(res: Response, userId: string) {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE_NAME, generateToken(userId), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/',
        })
    );
}

export function getUserFromCookie(
    req: Request,
    res: Response,
    strict?: boolean
) {
    try {
        const token =
            req?.headers?.cookie && cookie.parse(req.headers.cookie)[COOKIE_NAME];
            
        if (!token) throw Error('No token');
        const payload: any = verifyToken(token);
        return payload.userId;
    } catch (err) {
        if (!strict) return null;
        res.status(401);
        res.json({ error: err });
    }
}

export function clearTokenCookie(res: Response) {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE_NAME, '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/',
        })
    );
}