import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useSWR from 'swr'
import { useTable, useSortBy } from 'react-table'
import { Loading, Avatar } from "@nextui-org/react"
import { formatPrettyNumber, truncateString } from "@utils/formatters";
import SolanaLogo from "@components/SolanaLogo";
import Link from 'next/link'


function Table({columns, data}) { 
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);
  return(
    <table className="text-left w-full" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className="cursor-pointer hover:bg-gray-100 rounded-xl" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td className="p-2" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

const TopMovers = () => {
    const columns = [
        {
            Header: ()=> <span className="text-xs font-extrabold">Collection</span>,
            id: 'collectionName',
            Cell: (row) => {
                return(
                    <Link href={`/nfts/collection/${row.row.original.project.project_id}`}>
                        <p className="text-xs text-normal text-dracula">{truncateString(row?.row?.original?.project?.display_name, 20)}</p>
                    </Link>
                )
            }
        },
        {
            Header: ()=> <span className="text-xs font-extrabold">Floor</span>,
            id: 'floorPrice',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row.project.project_id}`}>
                        <span className="flex items-center text-xs text-dracula">
                            <SolanaLogo width={10} height={10}/>
                            {row?.floor_price}
                        </span>
                    </Link>
                )
            }
        },
        {
            Header: ()=> <span className="text-xs font-extrabold">24HR Volume</span>,
            id: '24hrVolume',
            accessor: (row) => {
                return(
                    <Link href={`/nfts/collection/${row.project.project_id}`}>
                        <span className="flex items-center text-xs text-dracula">
                            ${formatPrettyNumber(row?.volume_1day)}
                        </span>
                    </Link>
                )
            },
        },
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

export default TopMovers