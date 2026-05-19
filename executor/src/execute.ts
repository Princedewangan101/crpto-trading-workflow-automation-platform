import { TRIGGERs, type ExchangeActionNode, type Node, type NotificationActionNode, type TriggeredNode, type Workflow } from "../types.js";
import { redis } from "./redis.js";

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
        console.log("Error: didnt get the workflowExecutionStatus (execute.ts) :", workflowExecutionStatus);
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
        console.log(`TRIGGERs not includes triggerNode.type : ${triggerNode.type} (file: execute.ts)`);
    }
}

async function triggerNodeExecutor(workflow: Workflow, triggerNode: Node) {
    if (!triggerNode) {
        console.log("triggered node not found !");
        return
    }

    const queue = [triggerNode]

    while (queue.length > 0) {
        const triggerNode = queue.shift()
        if (!triggerNode) {
            console.log("triggered node not found !");
            return
        }
        const triggerNodeId = triggerNode.id;

        const edges = workflow.edges.filter(n => n.source === triggerNodeId);

        if (!edges) {
            console.log("edges not found !");
            var executeNextNodeLoop = false
            return executeNextNodeLoop
        }

        const connectedActionNodes = edges.map(({ target }: { target: string }) => {
            const connectedActionNode = workflow.nodes.find(n => n.id === target)
            return connectedActionNode
        })
        if (!connectedActionNodes) {
            console.log("connectedActionNodes not found !");
            return
        }

        for (const node of connectedActionNodes) {

            if (!node) {
                console.log("node of connectedActionNodes not found !");
                return
            }

            const { key } = node.data

            if (!key) {
                console.log("key not found !");
                return
            }

            actionNodeExceutor(key, node)

            queue.push(node);
        }
    }

}

async function actionNodeExceutor(key: string, node: any) {
    switch (node.type) {
        case "exchangeAction":
            const { asset, side, quantity, exchange } = node.data
            switch (exchange) {
                case "hyper-liquid":
                    const orderResultFromHyperLiquid = sendOrderToHyperLiquid(key, asset, side, quantity)
                    console.log("orderResultFromHyperLiquid :", orderResultFromHyperLiquid);
                    break;

                case "excness":
                    const orderResultFromExcness = sendOrderToExcness(key, asset, side, quantity)
                    console.log("orderResultFromExcness :", orderResultFromExcness);
                    break;

                case "backpack":
                    const orderResultFromBackpack = sendOrderToBackpack(key, asset, side, quantity)
                    console.log("orderResultFromBackpack :", orderResultFromBackpack);
                    break;

                case "ligther":
                    const orderResultFromLighter = sendOrderToLighter(key, asset, side, quantity)
                    console.log("orderResultFromLighter :", orderResultFromLighter);
                    break;

                default:
                    break;
            }
            break;

        case "notificationAction":
            const { email, userId } = node.data
            const sendEmailResult = sendEmail(key, email, userId)
            console.log("sendEmailResult :", sendEmailResult);
            break;

        default:
            break;
    }
}




















export const iworkflow =
{
    "_id": "629fhs8a76bjdhusksssssnsuxnclkixnd8hx",
    "title": "Bitcoin Price Alert",
    "description": "Triggers an action when BTC hits a target price.",
    "userId": "65f1a2b3c4d5e6f7a8b9c0d1",
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

function sendOrderToHyperLiquid(key, asset, side, quantity) {
    return { success: true }
}
function sendOrderToExcness(key, asset, side, quantity) {
    return { success: true }
}

function sendOrderToBackpack(key, asset, side, quantity) {
    return { success: true }

}

function sendOrderToLighter(key, asset, side, quantity) {
    return { success: true }
}

function sendEmail(key, email, userId) {
    return { success: true }
}

