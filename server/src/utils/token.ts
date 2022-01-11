import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    return jwt.verify(token, JWT_SECRET);
};