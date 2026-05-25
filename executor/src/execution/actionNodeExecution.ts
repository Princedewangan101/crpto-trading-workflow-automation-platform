import { agent } from "../actionNodeFunctions/agent.js"
import { redis } from "../redis.js"

// HERE WE HAVE MAKE MODIFICATION FOR THE AGENT NODE -  
export async function actionNodeExceutor(workflow: any, key: string, node: any) {
    switch (node.type) {

        case "agent":
            const { prompt } = node.data
            const structuredResponse: any = agent(workflow, prompt)
            if (structuredResponse[0].shouldTrade === true) {
                await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "agent", structuredResponse }))
                return { nodeType: "agent", shouldTrade: true }
            } else {
                return { nodeType: "agent", shouldTrade: false }
            }

        case "exchange":
            const { asset, side, quantity, exchange } = node.data
            switch (exchange) {
                case "hyper-liquid":
                    const orderResultFromHyperLiquid = sendOrderToHyperLiquid(key, asset, side, quantity)
                    console.log("orderResultFromHyperLiquid :", orderResultFromHyperLiquid);
                    await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "exchange", exchangeName: "hyper-liquid", orderResult: orderResultFromHyperLiquid }))
                    return { nodeType: "exchange", exchangeName: "hyper-liquid", exchangeResponse: orderResultFromHyperLiquid };


                case "excness":
                    const orderResultFromExcness = sendOrderToExcness(key, asset, side, quantity)
                    console.log("orderResultFromExcness :", orderResultFromExcness);
                    await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "exchange", exchangeName: "excness", orderResult: orderResultFromExcness }))
                    return { nodeType: "exchange", exchangeName: "excness", exchangeResponse: orderResultFromExcness };


                case "backpack":
                    const orderResultFromBackpack = sendOrderToBackpack(key, asset, side, quantity)
                    console.log("orderResultFromBackpack :", orderResultFromBackpack);
                    await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "exchange", exchangeName: "backpack", orderResult: orderResultFromBackpack }))
                    return { nodeType: "exchange", exchangeName: "backpack", exchangeResponse: orderResultFromBackpack };


                case "ligther":
                    const orderResultFromLighter = sendOrderToLighter(key, asset, side, quantity)
                    console.log("orderResultFromLighter :", orderResultFromLighter);
                    await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "exchange", exchangeName: "ligther", orderResult: orderResultFromLighter }))
                    return { nodeType: "exchange", exchangeName: "ligther", exchangeResponse: orderResultFromLighter };


                default:
                    break;
            }
            break;

        case "notification":
            const { email, userId } = node.data
            const sendEmailResult = sendEmail(key, email, userId)
            console.log("sendEmailResult :", sendEmailResult);
            await redis.lpush("actionNodeExcutionResponse", JSON.stringify({ from: "notification", notificationResult: sendEmailResult }))
            return { nodeType: "notification", exchangeName: "ligther", exchangeResponse: sendEmailResult };

        default:
            break;
    }
}




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

