import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../schema.js';

export async function signUp(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Email and password required !"
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "User already exists !"
            });
        }

        // Hash password before saving to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            data: { id: newUser._id, name: newUser.name, email: newUser.email },
            message: "User registered successfully."
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