import axios from "axios";

export default async function handler(req, res){
    const response = await axios.post(
        'https://beta.api.solanalysis.com/rest/get-project-stats',
        {
            'order_by': {
                'field_name': 'volume_1day',
                'sort_order': 'DESC'
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