
import React from 'react'
import useSWR from 'swr'
import axios from 'axios';
import SolanaLogo from '@components/SolanaLogo';
import { formatPrettyNumber } from '@utils/formatters';
import { Tab } from '@headlessui/react'

const Highlights = () => {
    const [selected, setSelected] = React.useState("24HR")
    // FOR SWR
    const fetcher = url => axios.get(url).then(res => res.data); 
    const { data: topMovers } = useSWR('/api/v1/nfts/topFloorMovers', fetcher);
    const { data: topVolume1D } = useSWR('/api/v1/nfts/topVolume1D', fetcher);  
    const { data: topVolume7D } = useSWR('/api/v1/nfts/topVolume7D', fetcher);  
    const { data: lowPercentage } = useSWR('/api/v1/nfts/percentageListed', fetcher);    

    console.log('Top volume 1D: ', topVolume1D);

    return(
        <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-3 md:grid-rows-1 gap-8">
            <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="text-lg font-semibold">Top Movers</h2>
                <div className="grid grid-cols-1 auto-rows-auto gap-4">
                    {topMovers ? (
                        topMovers?.project_stats?.map((topMover) => (
                            <div className="flex items-center">
                                    <div className="flex items-center">
                                        <img src={topMover.project.img_url} className="w-16 h-16 rounded-xl mr-2"/>
                                    </div>
                                    <div className="">
                                        <p className="font-semibold text-sm">{topMover.project.display_name}</p>
                                        <p className="text-gray-500 font-semibold text-xs">{topMover.supply} NFTs</p>
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4 py-1">
                                            <div>
                                                <p className="text-xs">Floor Price</p>
                                                <p className="text-xs flex items-center font-semibold">{topMover.floor_price} <SolanaLogo/></p>
                                            </div>
                                            <div>
                                                <p className="text-xs">24HR Volume</p>
                                                <p className="text-xs flex items-center font-semibold">${formatPrettyNumber(topMover.volume_1day)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        )).slice(0, 4)
                    ) : (
                        <p>No data</p>
                    )}
                </div>
            </div>
            <div>
                <div className="bg-gray-100 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Top Volume</h2>
                        <div className="bg-gray-200 border border-gray-200 rounded-xl text-sm">
                            <Tab.Group>
                                <div>
                                    <Tab.List>
                                        <div className="grid grid-cols-2 grid-rows-1 items-center justify-between p-1 rounded-xl">
                                            <Tab
                                                onClick={() => setSelected("24HR")}  
                                                className={({ selected }) =>
                                                selected ? 'font-medium  bg-white rounded-md px-2 py-0.5 text-xs' : 'font-medium text-dracula rounded-md px-2 py-0.5 text-xs'}>
                                                1D
                                            </Tab>
                                            <Tab
                                                onClick={() => setSelected("7D")}  
                                                className={({ selected }) =>
                                                selected ? 'font-medium  bg-white rounded-md px-2 py-0.5 text-xs' : 'font-medium text-dracula rounded-md px-2 py-0.5 text-xs'}>
                                                7D
                                            </Tab>
                                        </div>
                                    </Tab.List>
                                </div>
                            </Tab.Group>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 auto-rows-auto gap-2">
                        {topVolume1D ? 
                            (
                                topVolume1D?.project_stats?.map((topVol1D) => (
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <img src={topVol1D.project.img_url} className="w-16 h-16 rounded-xl mr-2"/>
                                        </div>
                                        <div className="">
                                            <p className="font-semibold font-base">{topVol1D.project.display_name}</p>
                                            <p className="text-gray-500 font-semibold text-xs">{topVol1D.supply} NFTs</p>
                                            <div className="grid grid-cols-3 grid-rows-1 gap-4 py-1">
                                                <div>
                                                    <p className="text-xs">Floor Price</p>
                                                    <p className="text-xs flex items-center font-semibold">{topVol1D.floor_price} <SolanaLogo/></p>
                                                </div>
                                                <div>
                                                    <p className="text-xs">24HR Volume</p>
                                                    <p className="text-xs flex items-center font-semibold">${formatPrettyNumber(topVol1D.volume_1day)}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )).slice(0, 4)
                            ) 
                        : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-gray-100 p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">💎 Diamond Hands</h2>
                    <div className="grid grid-cols-1 auto-rows-auto gap-2">
                        {lowPercentage ? (
                            lowPercentage?.project_stats?.map((topVol1D) => (
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <img src={topVol1D.project.img_url} className="w-16 h-16 rounded-xl mr-2"/>
                                    </div>
                                    <div className="">
                                        <p className="font-semibold font-base">{topVol1D.project.display_name}</p>
                                        <p className="text-gray-500 font-semibold text-xs">{topVol1D.supply} NFTs</p>
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4 py-1">
                                            <div>
                                                <p className="text-xs">Floor Price</p>
                                                <p className="text-xs flex items-center font-semibold">{topVol1D.floor_price} <SolanaLogo/></p>
                                            </div>
                                            <div>
                                                <p className="text-xs">24HR Volume</p>
                                                <p className="text-xs flex items-center font-semibold">${formatPrettyNumber(topVol1D.volume_1day)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )).slice(0, 4)
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Highlights