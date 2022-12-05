import axios from "axios";

export default async function marketSnapshothandler(req, res){
    const { marketSnapshot, page } = req.query
    const listings = marketSnapshot as string;

    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-market-place-snapshots',
        {
            'condition': {
                'project_ids': [
                    {
                        'project_id': `${marketSnapshot}`
                    }
                ]
            },
            'order_by': {
                'field_name': 'lowest_listing_price',
                'sort_order': 'ASC'
            },
            'pagination_info': {
                'page_number': 1,
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


