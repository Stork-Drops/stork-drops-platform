import useSWR from "swr"
import { useWallet } from '@solana/wallet-adapter-react'

export default function handler(req, res) {
    const { publicKey } = useWallet();
    const fetcher = url => fetch(url).then(r => r.json())
    const { data } = useSWR(`https://api.helius.xyz/v0/addresses/${publicKey}/transactions?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c`, fetcher);
}