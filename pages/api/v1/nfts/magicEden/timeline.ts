import axios from "axios";

export default async (req, res) => {
    const { transactions } = req.query
    const URL = `https://api.helius.xyz/v0/addresses/M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K/nft-events?api-key=${process.env.HELIUS_API}&type=NFT_SALE`;
    const response = await axios.get(URL);
    res.status(200).json({ data: response.data })
}