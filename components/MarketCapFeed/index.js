import { Grid, Row, Col } from "@nextui-org/react";
import useSWR from "swr"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Line } from 'react-chartjs-2';

const MarketCapFeed = () => {
    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    
    return(
        <>
            <div className="grid grid-rows-1 grid-cols-2 p-4 border border-gray-200 rounded-xl w-full md:w-fit">
                <div className="text-dracula flex items-center">
                    <img className="mr-2 w-8 h-8 rounded-full" src={data.image.thumb}/>
                    <Col>
                    <p className="text-sm">{data.name}</p>
                    <p className="text-xs font-semibold">{(data.symbol).toUpperCase()}</p>
                    </Col>
                </div>
                <div>
                    <Col className="text-right">
                        <p className="font-semibold text-sm">${data.market_data.current_price.usd}</p>
                        <p className={`text-xs ${data.market_data.market_cap_change_percentage_24h < 0 ? "text-rose-400" : "text-green-500"}`}>{data.market_data.market_cap_change_percentage_24h}%</p>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default MarketCapFeed