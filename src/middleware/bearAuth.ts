import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';


dotenv.config();

// middleware to check if the user is authenticated/logged in
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgsInVzZXJfaWQiOjgsImZpcnN0X25hbWUiOiJ0ZXN0IiwibGFzdF9uYW1lIjoidGVzdCIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzQ4NjgwNDkwLCJpYXQiOjE3NDg0MjEyOTB9.2h9x-JGOFkTHH_uF7nAU8q3tFiPrsIEDIi_dkhgW51o
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        // req.user = decode;
        (req as any).user = decode; // Type assertion to avoid TypeScript error
        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}