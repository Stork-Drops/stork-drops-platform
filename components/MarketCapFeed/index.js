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
            <div className="my-5 border border-gray-200 rounded-xl w-full">
            <Grid.Container gap={1} direction="column">
                    <Grid>
                        <Grid.Container alignItems="center" gap={2} alignContent="flex-end">
                            <Grid xs={7}>
                                <Row align="center">
                                    <Col span="7">
                                        <img className="w-8 h-8 rounded-full" src={data.image.thumb}/>
                                    </Col>
                                    <Col className="text-dracula">
                                        <p className="text-sm">{data.name}</p>
                                        <p className="text-xs font-semibold">{(data.symbol).toUpperCase()}</p>
                                    </Col>
                                </Row>
                            </Grid>
                            <Grid xs={5}>
                                <Col className="text-right">
                                    <p className="font-semibold text-sm">${data.market_data.current_price.usd}</p>
                                    <p className={`text-xs ${data.market_data.market_cap_change_percentage_24h < 0 ? "text-rose-400" : "text-green-500"}`}>{data.market_data.market_cap_change_percentage_24h}%</p>
                                </Col>
                            </Grid>
                        </Grid.Container>
                    </Grid>
            </Grid.Container>
            </div>
        </>
    )
}

export default MarketCapFeed