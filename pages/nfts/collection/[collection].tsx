import { useRouter } from 'next/router'
import { TokenPrice, TokenName, TokenIcon, TokenSymbol } from '@utils/tokenList'
import React, { Fragment, useEffect, useCallback} from 'react'
import Head from 'next/head'
import { Container, Grid, Spacer, Loading, Text } from '@nextui-org/react'
import AppBar from "@components/AppBar";
import PopularCollection from '@components/NFTs/PopularCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { formatWalletAddress, formatDollar, formatAbbreviationNumber }  from '@utils/formatters';
import axios from 'axios'
import useSWR from 'swr'

//Set up fetcher for SWR
const fetcher = url => axios.get(url).then(res => res.data) 

const NFTCollectionPage = () => {
    const router = useRouter();
    const { collection  } = router.query;
    const projectId = collection as string;

    const { data, error } = useSWR(`/api/v1/nfts/collection/${collection}`, fetcher)
    console.log(data)

    return(
        <>
            <Navigation/>

            <Container xl>
            <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                <Grid className="py-4 md:pl-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                    <div className="my-2.5 grid grid-cols-1 grid-rows-auto gap-4 items-start">
                        <div>
                            <div className="flex items-center w-full">
                                <div className="flex items-center">
                                    <div className="w-28 h-28 mr-2">
                                        <img src={data?.project_stats?.[0].project?.img_url}/>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-7xl">
                                            {data?.project_stats?.[0].project?.display_name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Spacer y={0.5}/>
                            <div className="flex items-end">
                                <div className="text-lg">
                                    {data?.project_stats?.[0].floor_price ? data?.project_stats?.[0].floor_price : <Loading/> } SOL
                                </div>
                                <div className="ml-2 text-base">
                                    <span className={`${data?.project_stats?.[0].floor_price_1day_change < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                        {data?.project_stats?.[0].floor_price_1day_change}({(data?.project_stats?.[0].floor_price_1day_change)?.toFixed(4)})
                                    </span>
                                    <span className={`${data?.project_stats?.[0].floor_price_1day_change < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                                        ({(data?.project_stats?.[0].floor_price_1day_change)?.toFixed(2)}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-end">
                            <div>
                                <p>{data?.project_stats?.[0].num_of_token_listed} / {data?.project_stats?.[0].project?.supply}</p>
                                <span className="uppercase text-xs font-semibold">Listed</span>
                            </div>
                            <div>
                                <p>{data?.project_stats?.[0].market_cap}</p>
                                <span className="uppercase text-xs font-semibold">Market Cap</span>
                            </div>
                            <div>
                                <p>{data?.project_stats?.[0].volume_1day}</p>
                                <span className="uppercase text-xs font-semibold">24H Trading Volume</span>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default NFTCollectionPage;