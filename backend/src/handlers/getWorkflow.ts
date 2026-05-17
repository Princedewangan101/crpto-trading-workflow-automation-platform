import { type Request, type Response } from 'express';
import { Workflow } from '../schema.js';

export async function workflow(req: Request, res: Response) {
    try {
        const { workflowId } = req.params;
        const userId = req.userId;

        const workflow = await Workflow.findOne({ _id: workflowId, userId });

        if (!workflow) {
            return res.status(404).json({
                success: false,
                data: {},
                message: "Workflow not found !"
            });
        }

        return res.status(200).json({
            success: true,
            data: workflow,
            message: "Workflow fetched successfully."
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