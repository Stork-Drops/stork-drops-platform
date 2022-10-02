import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useSWR from 'swr'
import { useTable, useSortBy } from 'react-table'
import { Loading, Avatar } from "@nextui-org/react"
import { formatPrettyNumber } from "@utils/formatters";
import SolanaLogo from "@components/SolanaLogo";
import Link from 'next/link'
import Table from '@components/Table'

// function Table({columns, data}) { 
//     const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({ columns, data }, useSortBy);
//   return(
//     <table className="text-left w-full" {...getTableProps()}>
//       <thead>
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row);
//           return (
//             <tr className="flex items-center cursor-pointer hover:bg-gray-100 rounded-xl p-2" {...row.getRowProps()}>
//               {row.cells.map((cell) => {
//                 return <td className="p-2" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   )
// }

const TrendingCollections = () => {
    const columns = [
        {
            Header: ()=> <span className="text-base">Collection</span>,
            id: 'projectName',
            Cell: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.row?.original?.project_id}`}>
                        <div className="flex items-center">
                            <div>
                                <img className="mr-2 w-12 h-12 rounded-xl" src={row?.row?.original?.project?.img_url}/>
                            </div>
                            <div>
                                <p className="text-normal text-dracula font-semibold">{row?.row?.original?.project?.display_name}</p>
                                <p className="text-sm text-gray-400 font-semibold">{row?.row?.original?.supply} NFTs</p>
                            </div>
                        </div>
                    </Link>
                )
            }
        },
        {
            Header: ()=> <span className="text-base">Floor Price</span>,
            id: 'floorPrice',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.project?.project_id}`}>
                        <span className="flex items-center text-sm text-dracula">
                            <SolanaLogo height={16} width={16}/>
                            {row?.floor_price}
                        </span>
                    </Link>
                )
            }
        },
        {
            Header: ()=> <span className="text-base">Average Price</span>,
            id: 'averagePrice',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.project?.project_id}`}>
                        <span className="flex items-center text-sm text-dracula">
                            <SolanaLogo height={16} width={16}/>
                            {row?.average_price}
                        </span>
                    </Link>
                )
            },
        },
        {
            Header: '24HR Volume (USD)',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.project?.project_id}`}>
                        <span className="flex items-center text-sm text-dracula">
                            ${formatPrettyNumber(row?.volume_1day)}
                        </span>
                    </Link>
                )
            },
        },
        {
            Header: 'Market Cap (USD)',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.project?.project_id}`}>
                        <span className="flex items-center text-sm text-dracula">
                            ${formatPrettyNumber(row?.market_cap)}
                        </span>
                    </Link>
                )
            },
        },
        {
            Header: 'Listed',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row?.num_of_token_holders}`}>
                        <span className="flex items-center text-sm text-dracula">
                            {row?.num_of_token_holders}
                        </span>
                    </Link>
                )
            }
        }
    ]

    // FOR SWR
    const fetcher = url => axios.get(url).then(res => res.data); 
    //const data = useSWR('/api/v1/nfts/trending').data?.data?.project_stats || [];    
    const { data } = useSWR('/api/v1/nfts/trending', fetcher);                                                                                                                           

    const collectionData = useMemo(() => (data ? data.project_stats : []), [data])
    console.log(collectionData)

    return (
        <>
            <Table columns={columns} data={collectionData}/>
        </>
    )
}

export default TrendingCollections