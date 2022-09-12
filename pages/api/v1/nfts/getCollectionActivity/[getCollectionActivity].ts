import { HyperspaceClient } from "hyperspace-client-js";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
const hsClient = new HyperspaceClient(process.env.HYPERSPACE_API);

export default async function handler(req, res){
    const { getCollectionActivity } = req.query
    const response = await hsClient.getProjectHistory({
        condition: {
            projects: [{
                project_id: `${getCollectionActivity}`,
            }],
            actionTypes: [
                MarketPlaceActionEnum.Bid,
                MarketPlaceActionEnum.Delisting,
                MarketPlaceActionEnum.Listing,
                MarketPlaceActionEnum.Transaction,
                MarketPlaceActionEnum.Updatelisting,
                MarketPlaceActionEnum.Updatebid,
            ]
        },
    }) 
    res.status(200).json(response);
}
