import { type Request, type Response } from 'express';
import { Workflow } from '../schema.js';

export async function saveNodesEdges(req: Request, res: Response) {
    try {
        const { workflowId } = req.params; 
        const { nodes, edges } = req.body;
        const userId = req.userId;

        if (!nodes || !edges) {
            return res.status(400).json({
                success: false,
                data: {},
                message: "Nodes and edges arrays required !"
            });
        }

        const updatedWorkflow = await Workflow.findOneAndUpdate(
            { _id: workflowId, userId },
            { $set: { nodes, edges } },
            { new: true }
        );

        if (!updatedWorkflow) {
            return res.status(404).json({
                success: false,
                data: {},
                message: "Workflow not found !"
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedWorkflow,
            message: "Nodes and edges saved successfully."
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