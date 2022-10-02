import { HyperspaceClient } from "hyperspace-client-js";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
const hsClient = new HyperspaceClient(process.env.HYPERSPACE_API);

export default async function handler(req, res){
    const { getTokenState } = req.query
    const response = await hsClient.getTokenState({
        condition: {
            tokenAddresses: [`${getTokenState}`]
        },
    }) 
    res.status(200).json(response);
}
