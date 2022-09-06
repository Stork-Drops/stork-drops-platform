import React, { useEffect } from 'react';
import useSWR from 'swr'
import { Loading } from '@nextui-org/react'
import { formatWalletAddress, lamportsToSolString, formatTimeAgo } from '@utils/formatters'
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
const axios = require('axios')


//set up SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

const MagicEdenTimeLine = () => {
    //const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const metaplex = new Metaplex(connection);
    const { data } = useSWR(
        `/api/v1/nfts/magicEden/timeline`,
        fetcher, {
            refreshInterval: 5000,
        }
    );

    console.log(data);

    return (
        <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-6 md:grid-rows-1 gap-2">
            {data ? data.data.map((event) => (
                <a target="_blank" href={`https://solscan.io/tx/` + event.signature} key={event.signature} className="w-full p-2 border rounded-xl hover:shadow-sm">
                    <div className="flex items-center justify-between w-full">
                            <img
                                className="w-14 h-14 rounded-xl mr-2" 
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                                alt=""/>
                            <div className="flex items-center">
                                <div>
                                    <span className="text-xs font-extrabold">
                                        {event.nfts.map((nft) => (
                                                <>
                                                    {formatWalletAddress(nft.mint)}
                                                </>
                                            ))
                                        }
                                        {event.nfts.tokenStandard}
                                    </span>
                                    <p className="text-xs rounded-md text-green-500 font-semibold">+{lamportsToSolString(event.amount)} SOL</p>
                                    <p className="text-xs">{formatTimeAgo(event.timestamp)}</p>
                                </div>
                            </div>
                    </div>
                </a>
            )).slice(0,6) : <Loading type="points" />}
        </div>
    );
}

export default MagicEdenTimeLine;