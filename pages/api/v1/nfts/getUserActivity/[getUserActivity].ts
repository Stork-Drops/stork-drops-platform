import { HyperspaceClient } from "hyperspace-client-js";
const hsClient = new HyperspaceClient(process.env.HYPERSPACE_API);

export default async function handler(req, res){
    const { getUserActivity } = req.query
    const response = await hsClient.getUserHistory({
        condition: {
            userAddress: `${getUserActivity}`
        }
    });
    res.status(200).json(response);
}