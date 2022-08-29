import { useRouter } from 'next/router'
import { TokenPrice, TokenName, TokenIcon, TokenSymbol } from '@utils/tokenList'
import React, { Fragment, useEffect, useCallback} from 'react'
import Head from 'next/head'
import { Container, Grid, Spacer, Loading, Text } from '@nextui-org/react'
import AppBar from "../../components/AppBar";
import PopularCollection from '@components/NFTs/PopularCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { formatWalletAddress, formatDollar, formatAbbreviationNumber }  from '@utils/formatters';
import axios from 'axios'
import useSWR from 'swr'


export async function getServerSideProps(context) {
    const { defi } = context.query;
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/solana/contract/${defi}`);
    const data = await res.json();
  
    console.log(`Fetched place: ${data.name}`);
    return { 
        props: { 
            data 
        } 
    };
  }

//Set up fetcher for SWR
const fetcher = url => axios.get(url).then(res => res.data) 

const DefiDetailPage = () => {
    const router = useRouter();
    const { defi  } = router.query;
    const mintAddress = defi as string;

    const { data, error } = useSWR(`https://api.coingecko.com/api/v3/coins/solana/contract/${mintAddress}`, fetcher);
    if (error) return <div>Failed to load</div>

    return(
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation/>

            <Container xl>
            <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                <Grid className="p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                    <div className="my-5 grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-start">
                        <div>
                            <div className="flex items-center w-full">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 mr-2">
                                        <TokenIcon mint={defi}/>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-6xl">
                                            <TokenName mint={defi}/>
                                        </p>
                                        <span className="ml-2 font-semibold text-xs bg-gray-200 w-fit rounded-md px-2 py-1">
                                            <TokenSymbol mint={defi}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Spacer y={0.5}/>
                            <span className="my-2.5 bg-gray-200 text-dracula rounded-md px-2 py-1 font-semibold text-xs w-fit">
                                {defi}
                            </span>
                            <Spacer y={0.5}/>
                            <div className="flex items-end">
                                <div className="text-2xl">
                                    <TokenPrice mintAddress={defi}/>
                                    <span className="capitalize text-xs">USD</span>
                                </div>
                                <div className="ml-2 text-base">
                                    <span className={`${data?.market_data?.price_change_24h_in_currency?.usd < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                        {data?.market_data?.price_change_24h_in_currency?.usd < 0 ? "-" : "+"}({(data?.market_data?.price_change_24h_in_currency?.usd)?.toFixed(4)})
                                    </span>
                                    <span className={`${data?.market_data.market_cap_change_percentage_24h < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                        ({(data?.market_data.market_cap_change_percentage_24h)?.toFixed(2)}%)
                                    </span>
                                </div>
                            </div>
                            <Spacer y={0.5}/>
                            <div className="grid grid-cols-3 items-end">
                                <div>
                                    <p>{formatAbbreviationNumber(data?.market_data?.market_cap?.usd)}</p>
                                    <span className="uppercase text-xs font-semibold">Market Cap</span>
                                </div>
                                <div>
                                    <p>{formatDollar(data?.market_data?.market_cap_change_24h_in_currency?.usd)}</p>
                                    <span className="uppercase text-xs font-semibold">24H Trading Volume</span>
                                </div>
                                <div>
                                    <p>{formatAbbreviationNumber(data?.market_data?.circulating_supply)}</p>
                                    <span className="uppercase text-xs font-semibold">Circulating Supply</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                {data.categories.map((category, index) => (
                                    <span key={index} className="mr-1.5 my-2.5 bg-gray-200 text-dracula rounded-md px-2 py-1 font-semibold text-xs w-fit">
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <Spacer y={0.5}/>
                            <span className="text-xs leading-tight">
                                {data?.description?.en ? data?.description?.en : <Loading/>}
                            </span>
                        </div>
                    </div>
                </Grid>
            </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default DefiDetailPage;