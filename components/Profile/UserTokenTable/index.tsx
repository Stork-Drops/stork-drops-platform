import React, { useState, useEffect } from 'react'
import "gridjs/dist/theme/mermaid.min.css";
import axios from 'axios'
import useSWR from 'swr'
import { Avatar, Table, Grid, Loading } from '@nextui-org/react';

const UserTokenTable = () => {
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
        console.log(trending1DVolume)
        const { data: trending7DVolume } = useSWR(
            "/api/v1/nfts/trending7D", 
            fetcher
        );
        
        const lamportsToSol = (lamports) => {
            return lamports / 1000000000
        }

    return(
        <>
            <div className="rounded-xl text-sm">
                <Table
                    lined
                    shadow={false}
                    hoverable
                    sticked
                    aria-label="Popular NFT Collections"
                    className="mb-10 text-sm"
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
                                fontSize: '0.8rem', 
                                fontWeight: '600' }}>
                                #
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '0.8rem', 
                                fontWeight: '600' }}>
                                Token
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '0.8rem', 
                                fontWeight: '600' }}>
                                Balance
                        </Table.Column>
                        <Table.Column 
                            css={{ 
                                background: "transparent", 
                                fontSize: '0.8rem', 
                                fontWeight: '600' }}>
                                Price
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
                                </Table.Row>
                            ))
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
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
                </div>
        </>
    )
}

export default UserTokenTable;
