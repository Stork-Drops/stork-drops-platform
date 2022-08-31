import React, { useState, useEffect } from 'react'
import "gridjs/dist/theme/mermaid.min.css";
import axios from 'axios'
import useSWR from 'swr'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { formatDollar, lamportsToSol, lamportsToSolString } from '@utils/formatters'
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
        const [sevenDayNFTList, setSevenDayNFTList] = useState([])
        const { data } = useSWR(
            `https://api.solscan.io/collection?sortBy=volume` + selectedDayRange + `day&offset=0&limit=10`, 
            fetcher
        );
        console.log("data: ", data)
        
        const lamportsToSol = (lamports) => {
            return lamports / 1000000000
        }

        useEffect(() => {
            if (data) {
                setSevenDayNFTList(data)
            }
            console.log(sevenDayNFTList);
        } , [data])
    
        if (!data) return <p>Loading...</p>

    return(
        <>
            <div className="p-2 rounded-md text-xl bg-red-200 text-red-600 mt-10">
                <b>For demo purposes only.</b> Updated UI &amp; accurate data will be available soon. 🙏
            </div>
            <div className="flex justify-between items-center my-5">
                <div className="my-5">
                    <h2 className="flex items-center text-2xl font-semibold">Popular Collections</h2>
                </div>
                <div className="bg-gray-200 border border-gray-200 rounded-xl text-sm">
                    <Tab.Group>
                        <div>
                            <Tab.List>
                                <div className="grid grid-cols-3 grid-rows-1 items-center justify-between p-1 rounded-xl">
                                    <Tab
                                        onClick={() => setSelectedDayRange(1)}  
                                        className={({ selected }) =>
                                        selected ? 'font-medium  bg-white rounded-lg px-2 py-0.5' : 'font-medium text-dracula rounded-md px-2 py-0.5'}>
                                        1D
                                    </Tab>
                                    <Tab 
                                        onClick={() => setSelectedDayRange(7)} 
                                        className={({ selected }) =>
                                        selected ? 'font-medium  bg-white rounded-lg px-2 py-0.5' : 'font-medium text-dracula rounded-md px-2 py-0.5'}>
                                        7D
                                    </Tab>
                                    <Tab
                                        onClick={() => setSelectedDayRange(30)} 
                                        className={({ selected }) =>
                                        selected ? 'font-medium bg-white rounded-lg px-2 py-0.5' : 'font-medium text-dracula rounded-md px-2 py-0.5'}>
                                        30D
                                    </Tab>
                                </div>
                            </Tab.List>
                        </div>
                    </Tab.Group>
                </div>
            </div>
            
            <Table
                bordered
                lined
                shadow={false}
                hoverable
                sticked
                aria-label="Popular NFT Collections"
                css={{
                    margin: -10,
                    padding: 0,
                    height: "auto",
                    minWidth: "100%",
                }}>
                <Table.Header>
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
                            {selectedDayRange}D Volume
                    </Table.Column>
                    <Table.Column 
                        css={{ 
                            background: "transparent", 
                            fontSize: '1rem', 
                            fontWeight: '600' }}>
                            Floor Price
                    </Table.Column>
                </Table.Header>
                <Table.Body>
                {data && data.data
                    .map((item, index) => {
                        return (
                            <Table.Row key={index}>
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
                                                src={item.data.avatar} />
                                        </div>
                                        <div>
                                            <p className="text-normal text-dracula font-semibold">{item.data.collection}</p>
                                            <p className="text-sm text-gray-400 font-semibold">{item.totalItems} NFTs</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-sm text-dracula font-medium">
                                        {(parseFloat(item.volume)) / LAMPORTS_PER_SOL} SOL
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="text-sm text-dracula font-medium">
                                        {(parseFloat(item.floorPrice)) / LAMPORTS_PER_SOL} SOL
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
                </Table.Body>
            </Table>
        </>
    )
}

export default PopularCollection;