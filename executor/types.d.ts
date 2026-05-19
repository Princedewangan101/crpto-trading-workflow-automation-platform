export interface MyJwtPayload {
    userId: string;
}

export const TRIGGERs = ["priceTrigger", "timeTrigger"]

export interface User {
    name: string, email: string, password: string, createdAt: Date, updatedAt: Date
}

export interface Execution {
    userId: Types.ObjectId, workflowId: Types.ObjectId, response: String
}

export interface Workflow {
    title: string, description: string, userId: Types.ObjectId,
    nodes: Nodes[], edges: Edges[]
}

// -------------------
// EDGES
// -------------------

export interface Edges {
    id: string, source: string, target: string
}

// -------------------
// NODES
// -------------------

export interface Node {
    id: string, kind: "TRIGGER" | "ACTION", type: string, position: { x: number, y: number },
    data:
    PriceTriggerNodeMetadata | TimeTriggerNodeMetadata |
    ExchangeActionNodeMetadata | NotificationActionNodeMetadata
}

// -------------------
// TRIGGER NODE
// -------------------

export interface TriggeredNode {
    id: string, kind: "TRIGGER", type: string, position: { x: number, y: number }, data: PriceTriggerNodeMetadata | TimeTriggerNodeMetadata
}

export interface TriggeredNodeWithoutMetadata {
    id: string, kind: "TRIGGER", type: string, position: { x: number, y: number },
}

// -------------------
// TRIGGER NODE METADATA
// -------------------

export interface PriceTriggerNodeMetadata {
    id: string, kind: "TRIGGER", type: "priceTrigger", asset: string, price: number, onChange: Function
}

export interface TimeTriggerNodeMetadata {
    id: string, kind: "TRIGGER", type: "timeTrigger", asset: string, price: number, onChange: Function
}

// -------------------
// types
// -------------------

export type PriceTriggerNode = TriggeredNodeWithoutMetadata & PriceTriggerNodeMetadata

export type TimeTriggerNode = TriggeredNodeWithoutMetadata & TimeTriggerNodeMetadata





// -------------------
// ACTION NODE
// -------------------

export interface ActionNodeWithoutMetadata {
    id: string, kind: "ACTION", type: string, position: { x: number, y: number }
}

// -------------------
// ACTION NODE METADATA
// -------------------

export interface ExchangeActionNodeMetadata {
    id: string, kind: "ACTION", type: "exchangeAction", exchange: string, asset: string, side: "LONG" | "SHORT", quantity: string, key: string, onChange: Function
}

export interface NotificationActionNodeMetadata {
    id: string, kind: "ACTION", type: "notificationAction", email: string, userId: string
}

// -------------------
// types
// -------------------

export type ExchangeActionNode = ActionNodeWithoutMetadata & ExchangeActionNodeMetadata

export type NotificationActionNode = ActionNodeWithoutMetadata & NotificationActionNodeMetadata




