import axios from "axios";

export default async (req, res) => {
    const { nameService } = req.query
    const URL = `https://api.helius.xyz/v0/addresses/${nameService}/names?api-key=${process.env.HELIUS_API}`;
    const response = await axios.get(URL);
    res.status(200).json({ data: response.data })
}