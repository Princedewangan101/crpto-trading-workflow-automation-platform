import { TRIGGERs, type ExchangeActionNode, type Node, type NotificationActionNode, type TriggeredNode, type Workflow } from "../../types.js";
import { agent } from "../actionNodeFunctions/agent.js";
import { decide } from "../actionNodeFunctions/decide.js";
import { redis } from "../redis.js";
import { triggerNodeExecutor } from "./triggerNodeExecution.js";

while (true) {
    execute()
}

async function execute() {
    const workflowInString = await redis.rpop("execute");
    if (!workflowInString) {
        console.log("Error: didnt get workflow from redis queue (key: execute) (file: execute.ts) :", workflowInString);
        return
    }

    const workflow = JSON.parse(workflowInString);
    if (!workflow) {
        console.log("Error: didnt get workflow from JSON.parse() (file: execute.ts)");
        return
    }

    const workflowExecutionStatus = await redis.get(`isWorkflowExecutionStarts-${workflow._id}`);
    if (!workflowExecutionStatus) {
        console.log("Error: workflowExecutionStatus (execute.ts) :", workflowExecutionStatus);
        return
    }

    const triggerNode = workflow.nodes.find((n: Node) => n.kind === "TRIGGER");
    if (!triggerNode) {
        console.log("Error: triggered node not found (file: execute.ts)");
        return
    }

    if (TRIGGERs.includes(triggerNode.type)) {
        await triggerNodeExecutor(workflow, triggerNode)
    } else {
        console.log(`invalid trigger node`);
    }
}






















export const iworkflow =
{
    "_id": "629fhs8a76bjdhusksssssnsuxnclkixnd8hx",
    "userId": "65f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Bitcoin Price Alert",
    "description": "Triggers an action when BTC hits a target price.",
    "nodes": [
        {
            "id": "node-1",
            "kind": "TRIGGER",
            "type": "priceTrigger",
            "position": { "x": "100", "y": "150" },
            "data": {
                "id": "trigger-btc",
                "type": "priceTrigger",
                "asset": "BTC",
                "price": 75000
            }
        },
        {
            "id": "node-2",
            "kind": "ACTION",
            "type": "exchangeAction",
            "position": { "x": "450", "y": "150" },
            "data": {
                "id": "action-email",
                "type": "actionTrigger",
                "exchange": "none",
                "asset": "BTC",
                "side": "LONG",
                "quantity": "0",
                "key": "user_email_key"
            }
        },
        {
            "id": "node-3",
            "kind": "ACTION",
            "type": "notificationAction",
            "position": { "x": "450", "y": "150" },
            "data": {
                "id": "node-3",
                "type": "notificationAction",
                "key": "user_email_key",
                "email": "hsj",
                "userId": "hsj"
            }
        }
    ],
    "edges": [
        {
            "id": "edge-1",
            "source": "node-1",
            "target": "node-2"
        },
        {
            "id": "edge-2",
            "source": "node-2",
            "target": "node-3"
        }
    ]
};

