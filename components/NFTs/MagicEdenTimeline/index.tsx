import React, { useEffect } from 'react';
import useSWR from 'swr'
import { Loading } from '@nextui-org/react'
import { formatWalletAddress, lamportsToSolString, formatTimeAgo } from '@utils/formatters'
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
const axios = require('axios')


//set up SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());
// const fetcherWithBody = (url, body) => 
//     axios
//         .post(url, {
//             body
//         })

// SWR fetcher that can take an array in the body of the request
const fetcherWithBody = (url, mintAccounts) => {
    url = "https://api.helius.xyz/v0/tokens/metadata?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c"
    return axios
        .post(url, {
            mintAccounts: [
                "BAAzgRGWY2v5AJBNZNFd2abiRXAUo56UxywKEjoCZW2",
                "8s6kQUZfdm7GSaThAcsmSs56wMinXrbk6SdNVngutrz5"
            ]
        })
        .then((res) => res.data)
}

// SWR fetcher that has a mint address as a param and can take an array in the body of the request

const NFTEvent = (amount) => {
    return (
        <div className="grid grid-cols-2 grid-row-1 p-2 border border-gray-200">
            <div>
                <img className="w-14 h-14 rounded-xl" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
            </div>
            <div>

            </div>
        </div>
    );
}

const getMetadata = async (nftAddresses) => {
    const url = "https://api.helius.xyz/v0/tokens/metadata?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c"
    const { data } = await axios.post(url, { mintAccounts: nftAddresses})
    console.log("metadata: ", data)
  }

  const fetchMetadata = async () => {
    const { data } = useSWR(
        `https://api.helius.xyz/v0/addresses/M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K/nft-events?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c&type=NFT_SALE`,
        fetcher, {

        }
    );
    console.log("metadata: ", data)
  }

const MagicEdenTimeLine = () => {
    //const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const metaplex = new Metaplex(connection);
    const { data } = useSWR(
        `https://api.helius.xyz/v0/addresses/M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K/nft-events?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c&type=NFT_SALE`,
        fetcher, {
            refreshInterval: 5000,
        }
    );

    const getCollectionImage = async () => {
        try{
            const nftObjects = await metaplex.nfts();
            console.log(nftObjects)
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-4 md:grid-rows-1 gap-2">
            {data ? data
            .map((event) => (
                <a href={`https://solscan.io/tx/` + event.signature} key={event.signature} className="w-full p-2 border rounded-xl hover:shadow-sm">
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
            )).slice(0,4) : <Loading type="points" />}
        </div>
    );
}

export default MagicEdenTimeLine;