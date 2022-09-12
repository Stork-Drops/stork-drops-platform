import { HyperspaceClient } from "hyperspace-client-js";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
const hsClient = new HyperspaceClient(process.env.HYPERSPACE_API);

export default async function handler(req, res){
    const { getTokenHistory } = req.query
    const response = await hsClient.getTokenHistory({
        condition: {
            tokenAddresses: [`${getTokenHistory}`]
        },
    }) 
    res.status(200).json(response);
}
