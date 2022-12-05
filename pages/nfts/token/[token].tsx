import { useRouter } from 'next/router'
import React, { useMemo, useState, Fragment, useEffect, useCallback} from 'react'
import { Container, Grid, Spacer, Loading, Text, Col, Tooltip, Collapse } from '@nextui-org/react'
import Navigation from '@components/Navigation';
import axios from 'axios'
import useSWR from 'swr'
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Tab } from '@headlessui/react'
import MarketplaceID from '@components/NFTs/MarketplaceID';
import { formatTimeAgo } from '@utils/formatters';
import SolanaLogo from '@components/SolanaLogo';
import SolanaFM from '@components/Logos/SolanaFM';
import Table from '@components/Table';
import Link from 'next/link'
import { HiExternalLink } from "react-icons/hi";
import { Disclosure } from '@headlessui/react'
import { HiChevronUp } from "react-icons/hi";


const NFTItemPage = () => {
    const router = useRouter();
    const { token  } = router.query;
    const nftuuid = token as string;
    const [nftMetaplexData, setNFTMetaplexData] = useState(null);
    const [nftURI, setNftURI] = useState(null);
    const connection = new Connection(process.env.NEXT_PUBLIC_QUICKNODE_URL, 'confirmed')
    const metaplex = new Metaplex(connection);

    const fetchNft = async () => {
        const nft = await metaplex.nfts().findByMint(new PublicKey(nftuuid));
        setNFTMetaplexData(nft);
        setNftURI(nft?.uri);
    };

    //Set up fetcher for SWR
    const fetcher = url => axios.get(url).then(res => res.data)     

    const { data: nftMetadata } = useSWR(nftURI, fetcher)
    const { data: nftTokenHistory } = useSWR(`/api/v1/nfts/getTokenHistory/${token}`, fetcher)
    const { data: nftTokenBids } = useSWR(`/api/v1/nfts/getTokenState/${token}`, fetcher)
    const nftBidTableData = useMemo(() => (nftTokenBids ? nftTokenBids?.getTokenState[0]?.market_place_states : []), [nftTokenBids])
    console.log("your token history :", nftTokenHistory)
    console.log("your token bids :", nftTokenBids)
    console.log("nfthistory table data :", nftBidTableData)
    // console.log("your metaplex data :", nftMetaplexData)
    // console.log("your uri data :", nftMetadata)

    const nftBidscolumns = [
        {
            Header: ()=> <span className="text-sm font-semibold">Item</span>,
            id: 'marketplace',
            Cell: (row) => {
                return(
                    <div className="flex items-center">
                        <MarketplaceID marketplace={row?.row?.original?.name}/>
                        <img className="ml-2 w-12 h-12 rounded-xl" src={nftMetadata?.image} />
                        <div className="ml-2 grid grid-cols-1 grid-auto-2">
                            <div className="flex flex-col">
                                <p className="text-xs font-semibold">{nftMetadata?.collection?.name}</p>
                                <h1 className="flex items-center text-sm font-semibold">
                                    {nftMetadata?.name}
                                </h1>
                            </div>
                            <span className="text-gray-400 font-semibold text-xs">{formatTimeAgo(row?.row?.original?.market_place_state?.block_timestamp)}</span>
                        </div>
                        <div style={{ fontSize: 10 }} className="ml-2 flex items-center bg-gray-200 rounded-full font-semibold px-2 py-0.5 w-fit text-dracula">
                            {row?.row?.original?.market_place_state.type}
                        </div>
                    </div>
                )
            }
        },
        {
            Header: ()=> <span className="text-sm font-semibold">Price</span>,
            id: 'amount',
            Cell: (row) => {
                return(
                    <div className="flex items-center">
                        <SolanaLogo width={12} height={12}/>
                        <p className="text-sm text-dracula font-semibold">{row?.row?.original?.market_place_state?.price}</p>
                    </div>
                )
            }
        },
        {
            id: 'blockchainExplorer',
            Cell: (row) => {
                return(
                    <a className="hover:opacity-75" target="_blank" href={`https://solscan.io/tx/${row?.row?.original?.market_place_state?.signature}`}>
                        <div className="flex items-center p-2 rounded-xl bg-gray-200 w-fit">
                            <HiExternalLink className="text-lg"/>
                        </div>
                    </a>
                )
            }
        },       
    ]

    useEffect(() => {
        fetchNft();
    }, []);

    return(
        <>
            <Navigation/>

            <Container fluid>
                <section className="my-2.5">
                    <Grid.Container gap={1} alignContent="flex-start" alignItems="flex-start">
                        <Grid xs={12} sm={12} md={3} lg={3} xl={3} direction="column">
                            <div>
                                <div className="">
                                    <div className="flex items-center justify-center absolute m-2 left-0 top-0 bg-gray-100 shadow-md border-dracula h-6 w-6 rounded-full">
                                        <MarketplaceID marketplace={nftMetadata?.marketplace_program_id}/>
                                    </div>
                                    <img className="w-full rounded-xl" src={nftMetadata?.image} />
                                    <div className="mt-2.5">
                                        <p className="text-base font-semibold">{nftMetadata?.collection?.name}</p>
                                        <h1 className="flex items-center text-xl font-extrabold">
                                            {nftMetadata?.name}
                                        </h1>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 auto-rows-auto gap-4 mt-2.5">
                                            <div>
                                                <p className="text-lg mb-2.5 font-extrabold">Description</p>
                                                <p className="text-sm">{nftMetadata?.description}</p>
                                            </div>
                                            <div>
                                                <p className="text-lg mb-2.5 font-extrabold">Attributes ({nftMetadata?.attributes.length})</p>
                                                <div className="grid grid-cols-2 auto-rows-auto gap-2">
                                                    {nftMetadata && nftMetadata.attributes.map((attribute, index) => {
                                                        return (
                                                            <div key={index} className="border rounded-xl flex flex-col p-2">
                                                                <p className="text-base font-semibold">{attribute.trait_type}</p>
                                                                <p className="text-xs font-base">{attribute.value}</p>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                            </div>
                        </Grid>
                        <Grid xs={9} direction="column" alignContent='flex-start'>
                            <div className="w-full">
                                <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 w-full rounded-2xl p-2">
                                    <div>
                                    <Disclosure defaultOpen>
                                    {({ open }) => (
                                        <>
                                        <Disclosure.Button className="flex items-center justify-between w-full rounded-lg text-xl font-semibold text-dracula">
                                            <span>Bids</span>
                                            <HiChevronUp
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-dracula`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="my-5 text-sm text-gray-500">
                                            <Table columns={nftBidscolumns} data={nftBidTableData}/>
                                        </Disclosure.Panel>
                                        </>
                                    )}
                                    </Disclosure>
                                    </div>
                                    <div>
                                    <Disclosure as="div" className="" defaultOpen>
                                    {({ open }) => (
                                        <>
                                        <Disclosure.Button className="flex items-center justify-between w-full rounded-lg text-xl font-semibold text-dracula">
                                            <span>History</span>
                                            <HiChevronUp
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-dracula`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="my-5 text-sm text-gray-500">
                                        </Disclosure.Panel>
                                        </>
                                    )}
                                    </Disclosure>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid.Container>
                </section>
            </Container>
        </>
    )
}

export default NFTItemPage;