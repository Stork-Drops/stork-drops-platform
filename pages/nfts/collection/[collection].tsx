import { useRouter } from 'next/router'
import { TokenPrice, TokenName, TokenIcon, TokenSymbol } from '@utils/tokenList'
import React, { Fragment, useEffect, useCallback} from 'react'
import Head from 'next/head'
import { Container, Grid, Spacer, Loading, Text, Col } from '@nextui-org/react'
import AppBar from "@components/AppBar";
import PopularCollection from '@components/NFTs/PopularCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { timeAgo, formatWalletAddress, formatDollar, formatAbbreviationNumber }  from '@utils/formatters';
import axios from 'axios'
import useSWR from 'swr'
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { Tab } from '@headlessui/react'
import moment from 'moment';


const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

//Set up fetcher for SWR
const fetcher = url => axios.get(url).then(res => res.data) 

const NFTCollectionPage = () => {
    const router = useRouter();
    const { collection  } = router.query;
    const projectId = collection as string;

    const { data } = useSWR(`/api/v1/nfts/collection/${collection}`, fetcher)
    const { data: recentlyListed } = useSWR(`/api/v1/marketSnapshot/${collection}`, fetcher)
    console.log(recentlyListed)

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
                                <div className="flex items-center w-full">
                                    <div className="flex items-start">
                                        <div className="w-48 h-48 mr-5">
                                            <img className="rounded-xl" src={data?.project_stats?.[0].project?.img_url}/>
                                        </div>
                                        <div className="flex items-center">
                                            <Col>
                                                <p className="text-3xl md:text-6xl">
                                                    {data?.project_stats?.[0].project?.display_name}
                                                </p>
                                                <Spacer/>
                                                <div className="grid grid-cols-1 grid-rows-1 gap-4 items-start text-xs">
                                                    <div className="flex justify-between">
                                                        <div className="grid grid-cols-4 grid-rows-1 gap-4 items-start">
                                                            <Col>
                                                                <span className="text-lg font-semibold">
                                                                    {data?.project_stats?.[0].floor_price ? data?.project_stats?.[0].floor_price : <Loading/> } SOL
                                                                </span>
                                                                <p>Floor Price</p>
                                                            </Col>
                                                            <Col>
                                                                <span className="text-lg font-semibold">
                                                                    {data?.project_stats?.[0].market_cap ? formatDollar(data?.project_stats?.[0].market_cap) : <Loading/> }
                                                                </span>
                                                                <p>Market Cap</p>
                                                            </Col>
                                                            <Col>
                                                                <span className="text-lg font-semibold">
                                                                    {data?.project_stats?.[0].num_of_token_listed} / {data?.project_stats?.[0].project?.supply}
                                                                </span>
                                                                <p>Listed</p>
                                                            </Col>
                                                            <Col>
                                                                <span className="text-lg font-semibold">
                                                                    {data?.project_stats?.[0].volume_1day ? formatDollar(data?.project_stats?.[0].volume_1day) : <Loading/>}
                                                                </span>
                                                                <p>24H Volume</p>
                                                            </Col>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Spacer/>
                                                <div className="grid grid-cols-3 grid-rows-1 gap-4 w-fit">
                                                    {data?.project_stats?.[0].project?.twitter 
                                                    ?
                                                        <a href={data?.project_stats?.website} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                            <AiOutlineLink className="w-6 h-6"/>
                                                        </a>
                                                    :
                                                        null
                                                    }
                                                    {data?.project_stats?.[0].project?.twitter 
                                                    ?
                                                        <a href={data?.project_stats?.twitter} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                            <AiOutlineTwitter className="w-6 h-6"/>
                                                        </a>
                                                    :
                                                        null
                                                    }
                                                    {data?.project_stats?.[0].project?.discord 
                                                    ?
                                                        <a href={data?.project_stats?.discord} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                            <FaDiscord className="w-6 h-6"/>
                                                        </a>
                                                    :
                                                        null
                                                    }
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                <Spacer y={0.5}/>

                                <Tab.Group>
                                    <Tab.List>
                                            <div className="grid grid-cols-3 grid-rows-1 gap-4 my-2.5 p-2 border border-gray-200 rounded-xl">
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl px-2 p-2' : 'font-semibold text-dracula text-sm rounded-xl p-2'}>
                                                    Trader View
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl p-2' : 'font-semibold text-dracula text-sm rounded-xl p-2'}>
                                                    Market View
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl p-2' : 'font-semibold text-dracula text-sm rounded-xl p-2'}>
                                                    Activity
                                                </Tab>
                                            </div>
                                          </Tab.List>

                                          {/* Trader View */}
                                          <Tab.Panels>
                                            <Tab.Panel>
                                              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                                <div className="grid grid-cols-1 auto-rows-auto border p-4 rounded-xl">
                                                  
                                                </div>
                                              </div>
                                            </Tab.Panel>
                                            
                                            {/* Market View */}
                                            <Tab.Panel>
                                                <div className="mb-5">
                                                    <div className="w-fit">
                                                        <label className="block text-normal font-semibold text-dracula">Sort by</label>
                                                        <select
                                                            className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                            <option value="">For Sale: Low to High</option>
                                                            <option value="">For Sale: High to Low</option>
                                                            <option value="">Recently Listed</option>
                                                            <option value="">Rank: Low to High</option>
                                                            <option value="">Rank: High to Low</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            <div className="grid grid-cols-2 auto-rows-auto md:grid-cols-5 md:auto-rows-auto gap-2">
                                                {recentlyListed && recentlyListed.market_place_snapshots.length > 0 ? (
                                                    recentlyListed.market_place_snapshots.map((listing, index) => (
                                                        <div className="grid grid-cols-1 auto-rows-auto">
                                                            <img src={listing?.meta_data_img} className="rounded-t-xl"/>
                                                                <div className="border-t-none border p-2 rounded-b-xl">
                                                                    <p className="text-sm font-extrabold">{listing?.name}</p>
                                                                    <div className="grid grid-cols-2 grid-rows-1 gap-2">
                                                                        <div>
                                                                            <p className="text-xs font-semibold">Price</p>
                                                                            <p className="text-xs">{listing?.lowest_listing_mpa?.price} SOL</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-xs font-semibold">Rank</p>
                                                                            <p className="text-xs">{listing?.rank_est} / {data?.project_stats?.[0].project?.supply}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-xs"></p>
                                                                </div>
                                                        </div>
                                                    ))
                                                    ) : (
                                                    <div className="flex justify-center">
                                                        No listings.
                                                    </div>
                                                )}
                                            </div>
                                            </Tab.Panel>

                                            {/* Activity View */}
                                            <Tab.Panel>
                                                
                                            </Tab.Panel>

                                          </Tab.Panels>
                                        </Tab.Group>

                    </div>
                </Grid>
            </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default NFTCollectionPage;