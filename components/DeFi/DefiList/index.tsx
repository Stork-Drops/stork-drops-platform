import React, { useState, useEffect } from 'react'
import { Table } from '@nextui-org/react'
import axios from 'axios'
import useSWR from 'swr'
import { formatDollar } from '../../../utils/formatDollar'

const DefiList = () => {
        //set up fetcher for swr
        const fetcher = url => axios.get(url).then(res => res.data) 
        const [defiList, setDefiList] = useState([])
        const [solanaFilteredList, setSolanaFilteredList] = useState([])
        const { data, error } = useSWR(
            'https://yields.llama.fi/pools', 
            fetcher
        );

        console.log(data)
    
        // if (error) return <p>There was an error bro</p>
        // if (!data) return <p>Loading...</p>

    return(
        <>
            <Table
                sticked
                aria-label="Example table with static content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}>
                <Table.Header>
                    <Table.Column>PROTOCOL</Table.Column>
                    <Table.Column>POOL</Table.Column>
                    <Table.Column>APY</Table.Column>
                    <Table.Column>TOTAL VALUE LOCKED (TVL)</Table.Column>
                </Table.Header>
                <Table.Body>
                    {data && data.data
                        .filter(item => item.chain === "Solana")   
                        .map((item, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>{item.project}</Table.Cell>
                                        <Table.Cell>{item.pool}</Table.Cell>
                                        <Table.Cell>{item.apy}</Table.Cell>
                                        <Table.Cell>{formatDollar(item.tvlUsd)}</Table.Cell>
                                    </Table.Row>
                                )
                            }
                        )                 
                    }                   
                </Table.Body>
            </Table>
        </>
    )
}

export default DefiList;