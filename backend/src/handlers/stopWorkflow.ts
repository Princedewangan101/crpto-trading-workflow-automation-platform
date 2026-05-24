import { type Request, type Response } from 'express';
import { Execution } from '../schema.js';

export async function stopWorkflow(req: Request, res: Response) {
    try {
        const { workflowId } = req.body;
        const userId = req.userId;

        if (!workflowId || !userId) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Missing Required Data !"
            });
        }

        await Execution.findOneAndUpdate(
            { workflowId, userId },
            { onExecution: false },
            { new: true, upsert: true }
        );

        return res.status(201).json({
            success: true,
            message: "Workflow stops successfully."
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