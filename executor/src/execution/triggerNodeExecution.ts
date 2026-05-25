import { actionNodeExceutor } from "./actionNodeExecution.js";

export async function triggerNodeExecutor(workflow: any, triggerNode: any) {
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

        const edges = workflow.edges.filter((n:any) => n.source === triggerNodeId);

        if (!edges) {
            console.log("edges not found !");
        }

        const connectedActionNodes = edges.map(({ target }: { target: string }) => {
            const connectedActionNode = workflow.nodes.find((n:any) => n.id === target)
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

            const fromActionNodeExecution = actionNodeExceutor(workflow, key, node)

            switch (fromActionNodeExecution.nodeType) {
                case "agent":
                    if (fromActionNodeExecution.shouldTrade === true) {
                        queue.push(node);
                    }
                    break;

                case "exchange":
                case "notification":
                    queue.push(node);

                default:
                    break;
            }
        }
    }
}