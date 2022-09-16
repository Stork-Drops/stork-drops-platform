import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useSWR from 'swr'
import Table from '@components/Table'
import { useTable } from 'react-table'
import { Loading, Avatar } from "@nextui-org/react"
import { formatPrettyNumber } from "@utils/formatters";

const TrendingCollections = () => {
    const columns = [
        {
            Header: 'Collection Name',
            accessor: 'project.display_name',
            Cell: (row) => {
                return(
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
                            src={row?.row?.original?.project?.img_url} />
                    </div>
                    <div>
                        <p className="text-normal text-dracula font-semibold">{row?.row?.original?.project?.display_name}</p>
                        <p className="text-sm text-gray-400 font-semibold">{row?.supply} NFTs</p>
                    </div>
                </div>
                )
            }
        },
        {
            Header: 'Floor Price',
            accessor: (row) => {
                return(
                    <span className="flex items-center text-sm text-dracula">
                        {row?.floor_price}
                        <img className="ml-2 w-3 h-3" src="/solana-logo.svg"/>
                    </span>
                )
            }
        },
        {
            Header: 'Average Price',
            accessor: (row) => {
                return(
                    <span className="flex items-center text-sm text-dracula">
                        {row?.average_price}
                        <img className="ml-2 w-3 h-3" src="/solana-logo.svg"/>
                    </span>
                )
            },
        },
        {
            Header: '24HR Volume (USD)',
            accessor: (row) => {
                return(
                    <span className="flex items-center text-sm text-dracula">
                        ${formatPrettyNumber(row?.volume_1day)}
                    </span>
                )
            },
        },
        {
            Header: 'Market Cap (USD)',
            accessor: (row) => {
                return(
                    <span className="flex items-center text-sm text-dracula">
                        ${formatPrettyNumber(row?.market_cap)}
                    </span>
                )
            },
        }
    ]

    //useEffect axios get request to get trending collections api and set data state
    // useEffect(() => {
    //     axios.get('/api/v1/nfts/trending')
    //     .then((res) => {
    //         setData(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    // FOR SWR
    const fetcher = url => axios.get(url).then(res => res.data); 
    //const data = useSWR('/api/v1/nfts/trending', fetcher)
    const data = useSWR('/api/v1/nfts/trending').data?.project_stats || [];                                                                                                                                
    console.log("your data here:", data);

    return (
        <>
            <Table columns={columns} data={data}/>
        </>
    )
}

export default TrendingCollections