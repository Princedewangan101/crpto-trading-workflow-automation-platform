import { type Request, type Response } from 'express';
import { User } from '../schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function signIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Email and password required !"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                data: {},
                message: "JWT secret configuration missing !"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                data: {},
                message: "Invalid credentials !"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                data: {},
                message: "Invalid credentials !"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        // httpOnly - Protects against XSS attacks
        // sameSite - Protects against CSRF attacks
        // secure - True only in production (HTTPS)

        return res.status(200).json({
            success: true,
            data: {
                user: { id: user._id, email: user.email }
            },
            message: "Logged in successfully."
        });

    } catch (error: any) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            data: {},
            message: `${error.message || "Internal server error"} !`
        });
    }
}