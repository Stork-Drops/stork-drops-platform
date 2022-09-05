import axios from "axios";

export default async function handler(req, res){
    const { collection } = req.query

    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-token-state',
        {
            'condition': {
                'token_addresses': [
                    `${collection}`
                ]
            },
            'pagination_info': {
                'page_number': 1
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


