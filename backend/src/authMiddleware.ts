import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { MyJwtPayload } from '../types/types.js';

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    console.log(1);
    const header = req.header("authorization");

    if (!header) {
        return res.status(401).json({ success: false, message: "authorization header not found !" })
    }

    const hearderParts = header.split(" ")[1]

    if (!hearderParts) {
        return res.status(401).json({ success: false, message: "hearderParts not found !" })
    }

    if (hearderParts.length !== 2 || hearderParts[0] !== "Bearer") {
        return res.status(401).json({ success: false, message: "invalid formate" })
    }

    try {
        const token = hearderParts[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "authorization token not found !" })
        }
        if (!process.env.JWT_SECRET) {
            return res.status(401).json({ success: false, message: "JWT_SECRET not found !" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as MyJwtPayload;

        req.userId = decodedToken.userId;

        return next()
    } catch (error: any) {
        console.log("error from authmiddleware :", error.message);
        res.status(401).json({ success: false, message: `${error.message}` })
    }
}
