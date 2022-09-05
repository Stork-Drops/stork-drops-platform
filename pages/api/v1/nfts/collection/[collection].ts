import { createMintNewEditionFromMasterEditionViaTokenInstructionWithSigners } from "@metaplex-foundation/js";
import axios from "axios";

export default async function handler(req, res){
    const { collection } = req.query
    const collectionName = collection as string;

    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-project-stats',
        {
            'conditions': {
                'project_ids': [
                    `${collectionName}`
                ]
            }
        },
        {
            headers: {
                'Authorization': `${process.env.HYPERSPACE_API}`,
                'Content-Type': 'application/json'
            }
        }
    );
    res.status(200).json(response.data);
}


