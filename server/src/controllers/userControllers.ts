import { Request, Response } from 'express';
import { User } from '../models';
import { 
    clearTokenCookie, 
    getOrSetCache, 
    getUserFromCookie, 
    setTokenCookie 
} from '../utils';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;

        const existUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existUser) {
            return res
                .status(400)
                .json({ error: 'email or username is already taken' });

        }

        const newUser = await User.create({ ...req.body });

        setTokenCookie(res, newUser._id);
        return res.status(201).json({ user: newUser.toJSON() });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await User.findOne(
            usernameOrEmail?.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        ).select('+password');

        if (!user)
            return res.status(400).json({ error: 'incorrect email or username' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'incorrect password' });
        }

        setTokenCookie(res, user._id);
        console.log(res.cookie)
        return res.json({ user: { ...user.toJSON(), password: undefined } });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        clearTokenCookie(res);
        return res.send('Ok');
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res);
        const cacheKey = 'user';

        const user = await getOrSetCache(cacheKey, async () => {
            const data = await User.findById(userId);

            return data;
        });

        if (user) {
            return res.json({ user: user.toJSON() });
        } else {
            return res
                .status(401)
                .json({ error: 'Unauthorization' });
        }
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
}