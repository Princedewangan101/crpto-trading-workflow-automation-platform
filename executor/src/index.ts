import { redis } from "./redis.js";

// decided to give this responsibility to /start-workflow  route in backend.

// async function executor() {

//     const workflow = await redis.rpop("evaluation")

//     if (!workflow) {
//         return console.log("there is no workflow on queue");
//     }

//     const parsedWorkflow = JSON.parse(workflow)
//     // const parsedWorkflow = iworkflow

//     if (!parsedWorkflow) {
//         console.log("Error: failed to parse !");
//         throw new Error("failed to parse !");
//     }

//     const triggerNode = parsedWorkflow.nodes[0]

//     if (!triggerNode) {
//         console.log("Error: triggerNode is missing !");
//         throw new Error("triggerNode is missing !");
//     }

//     switch (triggerNode.type) {
//         case "priceTrigger":
//             // engine service
//             await redis.zadd("priceMatching", JSON.stringify(triggerNode.data.price), parsedWorkflow._id)
//             break;

//         case "timeTrigger":
//              //have to replace with bull mq scheduler
//             setInterval(async () => {
//                 await redis.lpush("execute", JSON.stringify(workflow));
//             }, triggerNode.data.time)
//             break;

//         default:
//             break;
//     }
// }