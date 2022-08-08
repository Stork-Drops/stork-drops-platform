import React, { useState, useEffect } from 'react'
import { Table } from '@nextui-org/react'
import axios from 'axios'
import useSWR from 'swr'

const SevenDayPopularCollection = () => {
        //set up fetcher for swr
        const fetcher = url => axios.get(url).then(res => res.data) 
        const [sevenDayNFTList, setSevenDayNFTList] = useState([])
        const { data } = useSWR(
            'https://api.solscan.io/collection?sortBy=volume7day&offset=0&limit=10', 
            fetcher
        );
        
        console.log(data);

        useEffect(() => {
            if (data) {
                setSevenDayNFTList(data)
            }
            console.log(sevenDayNFTList);
            console.log(sevenDayNFTList);
        } , [data])
    
        if (!data) return <p>Loading...</p>

    return(
        <>
            <div>
                {/* {sevenDayNFTList.map(collection => (
                    <>
                        <p>{collection.data.name}</p>
                    </>
                ))} */}

                {data &&
                    data.data.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.data.totalAttributes}</p>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}

export default SevenDayPopularCollection;