import React, { useState, useEffect } from 'react'
import "gridjs/dist/theme/mermaid.min.css";
import axios from 'axios'
import useSWR from 'swr'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { formatNumber, formatDollar, lamportsToSol, lamportsToSolString } from '@utils/formatters'
import Link from 'next/link'
import { Avatar, Table, Grid } from '@nextui-org/react';
import { Tab } from '@headlessui/react'

const PopularCollection = () => {
        const [selectedDayRange, setSelectedDayRange] = useState(7);
        const [activeDayRange, setActiveDayRange] = useState(1);
 
        const handleClick = (event) => {
            setActiveDayRange(event.target.id);
        }

        //set up fetcher for swr
        const fetcher = url => axios.get(url).then(res => res.data) 
        const [selectedTopCollections, setSelectedTopCollections] = useState("trending1DVolume")
        const { data: trending1DVolume } = useSWR(
            "/api/v1/nfts/trending", 
            fetcher
        );
        const { data: trending7DVolume } = useSWR(
            "/api/v1/nfts/trending7D", 
            fetcher
        );
        console.log("data: ", trending1DVolume)
        
        const lamportsToSol = (lamports) => {
            return lamports / 1000000000
        }

    return(
        <>
            <div className="flex justify-between items-center my-5">
                <div className="my-2.5">
                    <h2 className="flex items-center text-3xl font-semibold">Top NFT Collections by Volume</h2>
                    <p className="text-lg">NFT Market Overview. Prices updated in real time.</p>
                </div>
                <div className="bg-gray-200 border border-gray-200 rounded-xl text-sm">
                    <Tab.Group>
                        <div>
                            <Tab.List>
                                <div className="grid grid-cols-1 grid-rows-1 items-center justify-between p-1 rounded-xl">
                                    <Tab
                                        onClick={() => setSelectedDayRange(1)}  
                                        className={({ selected }) =>
                                        selected ? 'font-medium  bg-white rounded-lg px-2 py-0.5' : 'font-medium text-dracula rounded-md px-2 py-0.5'}>
                                        24HR
                                    </Tab>
                                </div>
                            </Tab.List>
                        </div>
                    </Tab.Group>
                </div>
                
            </div>

            <div className="rounded-xl text-sm">
                <Table
                    lined
                    shadow={false}
                    hoverable
                    sticked
                    aria-label="Popular NFT Collections"
                    className="mb-10"
                    css={{
                        margin: -10,
                        padding: 0,
                        height: "auto",
                        minWidth: "100%",
                        zIndex: 0,
                    }}>
                    <Table.Header>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1.5rem', 
                                fontWeight: '600' }}>
                                🔥
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                                Collection
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                                Floor Price
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                                Average
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                                Volume (USD)
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                                Mkt Cap
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '1rem', 
                                fontWeight: '600' }}>
                        </Table.Column>
                    </Table.Header>
                    <Table.Body>
                    {trending1DVolume ? (
                        trending1DVolume?.project_stats?.map((collections, index) => (
                                    <Table.Row>
                                    <Table.Cell>
                                        {/* add + 1 because index starts at 0 */}
                                        <span className="font-semibold">{index + 1}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center">
                                            <div>
                                                <Avatar
                                                    css={{
                                                        border: "0"
                                                    }}
                                                    bordered={false}
                                                    className="mr-2"
                                                    size="lg" 
                                                    squared 
                                                    src={collections?.project?.img_url} />
                                            </div>
                                            <div>
                                                <p className="text-normal text-dracula font-semibold">{collections?.project?.display_name}</p>
                                                <p className="text-sm text-gray-400 font-semibold">{collections?.project?.supply} NFTs</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-dracula font-medium">
                                            {collections?.floor_price} SOL
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-dracula font-medium">
                                            {collections?.average_price} SOL
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-dracula font-medium">
                                            ${collections?.volume_1day}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-dracula font-medium">
                                            {collections?.volume_1day} SOL
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link href={`/nfts/collection/${collections?.project_id}`}>
                                            View collection
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            )).slice(0, 25)
                    ) : (
                        <Table.Row>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                            <Table.Cell>
                                Loading...
                            </Table.Cell>
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
                </div>
        </>
    )
}

export default PopularCollection;