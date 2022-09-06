import axios from "axios";

export default async function handler(req, res){
    const { recentlyListed } = req.query
    const listings = recentlyListed as string;

    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-market-place-snapshots',
        {
            'condition': {
                'project_ids': [
                    {
                        'project_id': `${recentlyListed}`
                    }
                ]
            },
            'order_by': {
                'field_name': 'lowest_listing_price',
                'sort_order': 'ASC'
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


