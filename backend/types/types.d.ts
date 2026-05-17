export interface MyJwtPayload {
    userId: string;
}

export interface iUser {
    name: string, email: string, password: string, createdAt: Date, updatedAt: Date
}

export interface iActionTriggeredMetadata {
    id: string, type: string, exchange: string, asset: string, quantity: string, key: string, onChange: Function
}

export interface iPriceTriggerMetadata {
    id: string, type: string, asset: string, price: number, onChange: Function
}

export interface iEdges {
    id: string, source: string, target: string
}

export interface iNodes {
    id: string, type: string, position: { x: number, y: number },
    data: PriceTriggerMetadata | ActionTriggeredMetadata
}

export interface iWorkflow {
    title: string, description: string, userId: Types.ObjectId,
    nodes: Nodes[], edges: Edges[]
}

export interface iExecution {
    userId: Types.ObjectId, workflowId: Types.ObjectId, response: String
}