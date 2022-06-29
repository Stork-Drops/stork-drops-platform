import React from "react"
import axios from 'axios'
import useSWR from 'swr'

// set up axios fetcher
const fetcher = (url:any) => axios.get(url).then(res => res.data);

const SolanaCoinPrice = () => {
    const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/solana?tickers=false&community_data=false&developer_data=false&sparkline=false', fetcher);
    
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    return <span className="m-1 text-xs font-semibold">${data.market_data.current_price.usd}</span>
}

const SolanaCoinPercentage = () => {
    const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/solana?tickers=false&community_data=false&developer_data=false&sparkline=false', fetcher);
    
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return <span className={`text-xs ${data.market_data.price_change_24h < 0 ? "text-rose-400" : "text-emerald-400"}`}>{(data.market_data.price_change_24h).toFixed(3)}%</span>
}

const SolanaPriceData = () => {
    return(
        <div className="flex justify-center items-center p-1 px-2 border border-gray-300 w-fit rounded-lg">
            <img className="w-4 mr-1" src="/solana-logo.svg"/>
            <SolanaCoinPrice/>
            <SolanaCoinPercentage/>
        </div>
    )
}

export default SolanaPriceData;