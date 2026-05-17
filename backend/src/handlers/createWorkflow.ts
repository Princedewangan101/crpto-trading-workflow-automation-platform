import { type Request, type Response } from 'express';
import { Workflow } from '../schema.js';

export async function createWorkflow(req: Request, res: Response) {
    try {
        const { title, description, nodes, edges } = req.body;
        const userId = req.userId;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Title and description required !"
            });
        }

        const newWorkflow = await Workflow.create({
            title,
            description,
            userId,
            nodes: nodes || [],
            edges: edges || []
        });

        return res.status(201).json({
            success: true,
            data: newWorkflow,
            message: "Workflow created successfully."
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