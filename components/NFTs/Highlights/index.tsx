
import React from 'react'
import useSWR from 'swr'
import axios from 'axios';
import SolanaLogo from '@components/SolanaLogo';
import { formatPrettyNumber } from '@utils/formatters';
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import Tooltip from '@components/Tooltip';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { HiArrowRight, HiArrowLeft, HiLink } from "react-icons/hi";
import { Loading } from '@nextui-org/react'

const Highlights = () => {
    const [selected, setSelected] = React.useState("24HR")
    // FOR SWR
    const fetcher = url => axios.get(url).then(res => res.data); 
    const { data: topMovers } = useSWR('/api/v1/nfts/topFloorMovers', fetcher);
    const { data: topVolume1D } = useSWR('/api/v1/nfts/topVolume1D', fetcher);   

    console.log('Top volume 1D: ', topVolume1D);

    return(
        <div>
                <div className="">
                        {topVolume1D ? (
                            topVolume1D?.project_stats?.map((topVolume1D) => (
                                <Link href={`/nfts/collection/${topVolume1D.project_id}`}>
                                    <div className="relative grid grid-cols-1 auto-rows-auto cursor-pointer hover:opacity-90 duration-150">
                                        <div className="relative">
                                            <div className="absolute text-sm font-semibold rounded-md text-dracula bg-gray-100 px-2 py-0.5 left-0 m-2">Hot 🔥</div>
                                            <img src={topVolume1D.project.img_url} className="w-full md:w-6/12 h-full rounded-xl mr-2"/>
                                        </div>
                                        <div className="my-2.5">
                                            <p className="font-extrabold text-2xl md:text-4xl">{topVolume1D.project.display_name}</p>
                                            <p className="text-gray-500 font-semibold text-base">{topVolume1D.supply} NFTs</p>
                                            <div className="grid grid-cols-4 grid-rows-1 gap-4 py-1">
                                                <div>
                                                    <p className="text-base flex items-center font-base"><SolanaLogo height={16} width={16}/>{topVolume1D.floor_price}</p>
                                                    <p className="text-base font-extrabold">Floor Price</p>
                                                </div>
                                                <div>
                                                    <p className="text-base flex items-center font-base">${formatPrettyNumber(topVolume1D.volume_1day)}</p>
                                                    <p className="text-base font-extrabold">24HR Volume</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )).slice(0, 1)
                        ) : (
                            <p>No data</p>
                        )}
                </div>
        </div>
    )
}

export default Highlights