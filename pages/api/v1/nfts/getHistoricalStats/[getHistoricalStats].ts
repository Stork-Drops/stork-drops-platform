import axios from "axios";
import { HyperspaceClient } from "hyperspace-client-js";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";

const hsClient = new HyperspaceClient(process.env.HYPERSPACE_API);

export default async function handler(req, res){
    const { getHistoricalStats } = req.query

    // input object for historical stats api
    const input = {
        projects: [`${getHistoricalStats}`],
        startTimestamp: 1577858400,
        endTimestamp: new Date().getTime(),
        timeGranularity: "PER_DAY",
        paginationInfo: {
            page_number: 1,
            page_size: 360,
        },
    };

    const response = await hsClient.getProjectStatHistory(input) 
    res.status(200).json(response);
}
  