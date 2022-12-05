import axios from "axios";

export default async function handler(req, res){
    const query = req.query
    const { getMoreMarketSnapshots, page } = query
    const listings = getMoreMarketSnapshots as string;

    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-market-place-snapshots',
        {
            'condition': {
                'project_ids': [
                    {
                        'project_id': `${getMoreMarketSnapshots}`
                    }
                ]
            },
            'order_by': {
                'field_name': 'lowest_listing_price',
                'sort_order': 'ASC'
            },
            'pagination_info': {
                'page_number': `${page}`,
                'page_size': 32
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


