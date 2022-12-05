import { useRouter } from 'next/router'
import { TokenPrice, TokenName, TokenIcon, TokenSymbol } from '@utils/tokenList'
import React, { Fragment, useEffect, useCallback, useState } from 'react'
import { Container, Grid, Spacer, Loading, Text, Col, Tooltip } from '@nextui-org/react'
import AppBar from "@components/AppBar";
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { timeAgo, formatWalletAddress, formatDollar, formatAbbreviationNumber }  from '@utils/formatters';
import axios from 'axios'
import useSWR from 'swr'
import { AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { Tab } from '@headlessui/react'
import MarketplaceID from '@components/NFTs/MarketplaceID'
import SolanaLogo from '@components/SolanaLogo'
import { formatTimeAgo } from '@utils/formatters'
import LiveBadge from '@components/Live'
import { Disclosure, Transition } from '@headlessui/react'
import SolanaTVLChart from '@components/DeFi/TVLChart';
import { MdRadar, MdOutlineAnalytics, MdFilterList } from "react-icons/md";
import ReusableAreaChart from '@components/Charts/AreaChart';
import { AreaChart, Area, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import TopMovers from '@components/NFTs/TopMovers';
import Link from 'next/link'


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
    const [pageNum, setPageNum] = useState(1);

    function handleClick() {
        setPageNum(pageNum => pageNum + 1)
    }

    const { data } = useSWR(`/api/v1/nfts/collection/${collection}`, fetcher)
    const { data: marketSnapshot } = useSWR(`/api/v1/nfts/marketSnapshot/${collection}`, fetcher)
    const { data: getMoreSnapshots } = useSWR(`/api/v1/nfts/marketSnapshot/${collection}?page=${pageNum}`, fetcher)
    const { data: collectionActivity } = useSWR(`/api/v1/nfts/getCollectionActivity/${collection}`, fetcher)
    const { data: collectionHistoricalStats } = useSWR(`/api/v1/nfts/getHistoricalStats/${collection}`, fetcher)
    const [traderView, setTraderView] = React.useState(false);

    console.log('This is your additional snapshot', getMoreSnapshots);

    return(
        <>
            <Navigation/>
            <section className="fixed">
                        <div className="">
                            <div className="mb-5 hidden">
                                <div className="w-fit">
                                    <label className="block text-normal font-semibold text-dracula">Sort by</label>
                                    <select
                                        className="text-sm block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                        <option value="">For Sale: Low to High</option>
                                        <option value="">For Sale: High to Low</option>
                                        <option value="">Recently Listed</option>
                                        <option value="">Rank: Low to High</option>
                                        <option value="">Rank: High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <Grid.Container>
                                <Grid className="overflow-y-scroll h-screen" xs={9.5} direction="column">
                                    <div className="flex items-center justify-between w-full p-2">
                                        <div className="md:flex md:items-center">
                                            <div className="w-24 h-24 mr-2.5">
                                                <img className="rounded-full" src={data?.project_stats?.[0].project?.img_url} loading="lazy"/>
                                            </div>
                                            <div className="flex items-center">
                                                <Col>
                                                <div className="flex items-center">
                                                <p className="text-lg md:text-3xl font-semibold">
                                                        {data?.project_stats?.[0].project?.display_name}
                                                    </p>
                                                    <div className="ml-2 grid grid-cols-3 grid-rows-1 gap-2 w-fit text-sm">
                                                        {data?.project_stats?.[0].project?.twitter 
                                                        ?
                                                            <a target="_blank" href={data?.project_stats?.[0].website} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                                <AiOutlineLink/>
                                                            </a>
                                                        :
                                                            null
                                                        }
                                                        {data?.project_stats?.[0].project?.twitter 
                                                        ?
                                                            <a target="_blank" href={data?.project_stats?.[0].twitter} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                                <AiOutlineTwitter/>
                                                            </a>
                                                        :
                                                            null
                                                        }
                                                        {data?.project_stats?.[0].project?.discord 
                                                        ?
                                                            <a target="_blank"  href={data?.project_stats?.[0].discord} className="flex items-center justify-center bg-gray-100 text-dracula rounded-xl p-2 w-fit">
                                                                <FaDiscord />
                                                            </a>
                                                        :
                                                            null
                                                        }
                                                    </div>
                                                </div>
                                                    <div className="grid grid-cols-1 grid-rows-1 gap-2 items-start text-xs">
                                                        <div className="flex justify-between">
                                                            <div className="grid grid-cols-4 grid-rows-1 gap-4 items-start">
                                                                <Col>
                                                                    <span className="text-sm">
                                                                        {data?.project_stats?.[0].floor_price ? data?.project_stats?.[0].floor_price : <Loading/> } SOL
                                                                    </span>
                                                                    <p className="text-xs font-semibold">Floor Price</p>
                                                                </Col>
                                                                <Col>
                                                                    <span className="text-sm">
                                                                        {data?.project_stats?.[0].market_cap ? formatDollar(data?.project_stats?.[0].market_cap) : <Loading/> }
                                                                    </span>
                                                                    <p className="text-xs font-semibold">Market Cap</p>
                                                                </Col>
                                                                <Col>
                                                                    <span className="text-sm">
                                                                        {data?.project_stats?.[0].num_of_token_listed} / {data?.project_stats?.[0].project?.supply}
                                                                    </span>
                                                                    <p className="text-xs font-semibold">Listed</p>
                                                                </Col>
                                                                <Col>
                                                                    <span className="text-sm">
                                                                        {data?.project_stats?.[0].volume_1day ? formatDollar(data?.project_stats?.[0].volume_1day) : <Loading/>}
                                                                    </span>
                                                                    <p className="text-xs font-semibold">24H Volume</p>
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </Col>
                                            </div>
                                        </div>    
                                    </div>

                                    <div className="grid grid-cols-1 auto-rows-auto gap-2 mb-24">
                                        {/* Current market listings with ascending filters as default */}
                                        <div className="mb-2.5 p-4 grid grid-cols-2 auto-rows-auto md:grid-cols-4 md:auto-rows-auto gap-2">
                                            {marketSnapshot && marketSnapshot.market_place_snapshots.length > 0 ? (
                                                marketSnapshot.market_place_snapshots.map((listing, index) => (
                                                    // NFT MARKETPLCE GRID
                                                    <div className="grid grid-cols-1 auto-rows-auto">
                                                        {/* NFT CARD */}
                                                        <Link href={`/nfts/token/${listing.token_address}`}>
                                                            <div className="cursor-pointer relative hover:opacity-75">
                                                                <div className="flex items-center justify-center absolute m-2 left-0 top-0 bg-gray-100 shadow-md border-dracula h-6 w-6 rounded-full">
                                                                    <MarketplaceID marketplace={listing?.lowest_listing_mpa?.marketplace_program_id}/>
                                                                </div>
                                                                <img src={listing?.meta_data_img} className="rounded-t-xl"/>
                                                                <div className="border-t-none border p-2 rounded-b-xl">
                                                                    <p className="text-sm font-semibold">{listing?.name}</p>
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
                                                        </Link>
                                                    </div>
                                                ))
                                                ) : (
                                                <div className="flex justify-center">
                                                    No listings.
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex items-center justify-center">
                                            <button className="sm:w-full md:w-48 p-2 text-center rounded-xl font-semibold bg_sunrise text-white">
                                                Load More
                                            </button>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid className="border-l" xs={2.5} direction="column">
                                    <Tab.Group>
                                        <Tab.List className="flex items-center justify-between text-3xl border-b p-2 py-2.5">
                                            <Tab>
                                                <Tooltip 
                                                    placement="bottomEnd"
                                                    content={<span className="text-sm font-semibold">Activity</span>}>
                                                    <MdRadar className="w-8 h-8 hover:bg-gray-100 rounded-full p-1"/>
                                                </Tooltip>
                                            </Tab>
                                            <Tab>
                                                <Tooltip 
                                                    placement="bottomEnd"
                                                    content={<span className="text-sm font-semibold">Analytics</span>}>
                                                    <MdOutlineAnalytics className="w-8 h-8 hover:bg-gray-100 rounded-full p-1"/>
                                                </Tooltip>
                                            </Tab>
                                            <Tab>
                                                <Tooltip 
                                                    placement="bottomEnd"
                                                    content={<span className="text-sm font-semibold">Collections</span>}>
                                                    <MdFilterList className="w-8 h-8 hover:bg-gray-100 rounded-full p-1"/>
                                                </Tooltip>
                                            </Tab>

                                        </Tab.List>

                                        <Tab.Panels className="overflow-y-scroll h-screen">
                                            {/* ACTIVITY TABS */}
                                            <Tab.Panel>
                                                <Col className="pb-28">
                                                    <div className="">
                                                        <div className="flex items-center justify-between p-2">
                                                            <h2 className="text-lg font-extrabold uppercase">Activity</h2>
                                                            <LiveBadge/>
                                                        </div>
                                                        <div className="grid grid-cols-1 auto-rows-auto gap-2 w-full p-2">
                                                            {collectionActivity ? (
                                                                collectionActivity.getProjectHistory.market_place_snapshots.map((activity, index) => (
                                                                <div className="flex items-start justify-between text-xs text-left">
                                                                        <div className="flex items-start">
                                                                        <img src={activity?.meta_data_img} className="rounded-xl w-12 h-12 mr-1" loading="lazy"/>
                                                                            <div>
                                                                            <span 
                                                                                className="font-semibold">
                                                                                {activity.name}
                                                                            </span>
                                                                            <div 
                                                                                style={{
                                                                                    fontSize: '0.7rem',
                                                                                }} 
                                                                                className="flex items-center justify-between">
                                                                                <MarketplaceID marketplace={activity.market_place_state.marketplace_program_id}/>
                                                                                <span style={{ fontSize: 9 }} className="p-0.5 rounded-md text-yellow-500 font-extrabold mr-1">{activity.market_place_state.type}</span> for <span className="ml-1 font-semibold flex items-center"><SolanaLogo width={12} height={12}/>{activity.market_place_state.price}</span>
                                                                            </div>
                                                                            <span style={{ fontSize: '0.6rem' }}className="font-semibold">{formatTimeAgo(activity.market_place_state.block_timestamp) ? formatTimeAgo(activity.market_place_state.block_timestamp) : <Loading size="xs"/> }</span>
                                                                                </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-1 auto-rows-auto gap-2">
                                                                            <span style={{ fontSize: '0.6rem' }} className="flex items-center justify-center font-semibold bg-yellow-500 text-white px-1 py-0.5 rounded-md uppercase">Rank</span>
                                                                            <span className="font-semibold">#{activity.rank_est}</span>
                                                                        </div>
                                                                </div>
                                                            ))
                                                            ) : (
                                                                <>
                                                                    <Loading/>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Tab.Panel>

                                            {/* ANALYTICS COLLECTION TAB */}
                                            <Tab.Panel>
                                            <Col className="pb-28">
                                                    <div className="flex items-center justify-between p-2">
                                                        <h2 className="text-lg font-extrabold uppercase">Analytics</h2>
                                                        <LiveBadge/>
                                                    </div>
                                                    <div className="">
                                                        <div className="grid grid-cols-1 auto-rows-auto gap-2 w-full p-2">
                                                                    <div className="">
                                                                    <ResponsiveContainer width="100%" height={200}>
                                                                    <AreaChart data={collectionHistoricalStats}>
                                                                        <Area type="monotone" dataKey="num_of_token_listed" stroke="#8884d8" fillOpacity={1} fill="url(#solanadefi)" />
                                                                        <defs>
                                                                            <linearGradient id="solanadefi" x1="0" y1="0" x2="0" y2="1">
                                                                                <stop offset="0%" stopColor="#8884d8" stopOpacity={1}/>
                                                                                <stop offset="100%" stopColor="#8884d8" stopOpacity={0.1}/>
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <CartesianGrid 
                                                                            stroke="#ccc" 
                                                                            strokeDasharray="5 5" 
                                                                            vertical={false}
                                                                        />
                                                                        {/* <Tooltip
                                                                            content={<CustomTooltip />} >
                                                                        </Tooltip> */}
                                                                        <XAxis
                                                                            tickLine={false}
                                                                            style= {{fontSize: "12px"}}
                                                                            className="text-xs" 
                                                                            dataKey="timestamp"
                                                                        />
                                                                        <YAxis
                                                                            tickLine={false}
                                                                            style= {{fontSize: "12px"}}
                                                                            className="text-xs" 
                                                                            dataKey="num_of_token_listed"/>
                                                                        </AreaChart>
                                                                        </ResponsiveContainer>
                                                                    </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Tab.Panel>

                                            {/* ALL COLLECTIONS TAB */}
                                            <Tab.Panel>
                                            <Col className="pb-28">
                                                    <div className="flex items-center justify-between p-2">
                                                        <h2 className="text-lg font-extrabold uppercase">Top Movers</h2>
                                                        <LiveBadge/>
                                                    </div>                                                           
                                                    <div className="p-2">
                                                        <TopMovers/>
                                                    </div>
                                                </Col>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                
                                </Grid>
                            </Grid.Container>
                        </div>
            </section>
        </>
    )
}

export default NFTCollectionPage;