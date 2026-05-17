import { Schema, model, Types } from 'mongoose';
import type { iUser, iEdges, iNodes, iWorkflow, iExecution } from '../types/types.js';

// ----------------------------------
// user schema
// ----------------------------------

const userSchema = new Schema<iUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })
export const User = model<iUser>("User", userSchema);


// ----------------------------------
// workflow schema
// ----------------------------------

const nodeSchema = new Schema<iNodes>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
        x: { type: String, required: true },
        y: { type: String, required: true }
    },
    data: { type: Schema.Types.Mixed, required: true }
}, { id: false })

const edgeSchema = new Schema<iEdges>({
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true }
}, { id: false })

const workflowSchema = new Schema<iWorkflow>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nodes: { type: [nodeSchema], required: true, default: [] },
    edges: { type: [edgeSchema], required: true, default: [] }
}, { timestamps: true })
export const Workflow = model<iWorkflow>("Workflow", workflowSchema);

// ----------------------------------
// execution schema
// ----------------------------------

const executionSchema = new Schema<iExecution>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true, unique: true },
    response: { type: String, required: true }
}, { timestamps: true })
export const Execution = model<iWorkflow>("Execution", executionSchema);



