import { type Request, type Response } from 'express';
import { Execution } from '../schema.js';

export async function workflowExecution(req: Request, res: Response) {
    try {
        const { workflowId, response } = req.body;
        const userId = req.userId;

        if (!workflowId || !response) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Workflow ID and response required !"
            });
        }

        const execution = await Execution.findOneAndUpdate(
            { workflowId },
            { userId, response },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            data: execution,
            message: "Workflow executed successfully."
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