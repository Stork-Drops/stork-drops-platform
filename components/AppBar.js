import React, { Fragment, useMemo } from 'react'
import Link from 'next/link';
import { Grid, Tooltip, Collapse, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FiHome, FiCompass, FiDroplet, FiCodesandbox, FiMessageSquare, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Disclosure } from '@headlessui/react'
import { HiChevronDown } from "react-icons/hi";
import MusicPlayer from '@components/MusicPlayer';
import { ProfileContext } from '@context/ProfileContext';

const AppBar = () => {
    const router = useRouter();
    const { publicKey, wallet, disconnect } = useWallet();
    const { connected } = useWallet();

    const base58PubKey = useMemo(() => publicKey?.toBase58(), [publicKey]);

    return(
        <>
            <Grid.Container className="h-full border-r border-gray-200" direction='column' justify='space-between'>
                <div className="fixed w-fit">
                    <div className="my-2.5 grid grid-cols-1 gap-2 auto-rows-auto">
                        <Link href="/">
                            <a className={router.pathname == "/" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                <React.Fragment>
                                    <FiHome className="mr-2 w-5 h-5"/>
                                    <span className="font-semibold text-sm">Home</span>
                                </React.Fragment>
                            </a>
                        </Link>
                        <Disclosure>
                                    {({ open }) => (
                                        <>
                                        <Disclosure.Button className="flex items-center space-between text-gray-500 w-full p-2">
                                            <div className="flex items-center justify-between">
                                                <FiCompass className="mr-2 w-5 h-5"/>
                                                <span className="text-sm font-semibold">Explore</span>
                                            </div>
                                            <HiChevronDown className={`${open ? 'rotate-180 transform' : ''} ml-1 w-4 text-gray-500`}/>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="p-2 text-sm text-gray-500">
                                            <ul>
                                                <li>
                                                    <Link href="/daos">
                                                        <a className={router.pathname == "/daos" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                                            <React.Fragment>
                                                                <span className="font-semibold text-sm">DAOs</span>
                                                            </React.Fragment>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/nfts">
                                                        <a className={router.pathname == "/nfts" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                                            <React.Fragment>
                                                                <span className="font-semibold text-sm">NFTs</span>
                                                            </React.Fragment>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/defi">
                                                        <a className={router.pathname == "/defi" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                                            <React.Fragment>
                                                                <span className="font-semibold text-sm">DeFi</span>
                                                            </React.Fragment>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Disclosure.Panel>
                                        </>
                                    )}
                            </Disclosure>
                            { connected 
                                ? 
                                <Link href={`/profile/` + base58PubKey}>
                                    <a className={router.pathname == "/profile/" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                        <React.Fragment>
                                            <FiUser className="mr-2 w-5 h-5"/>
                                            <span className="font-semibold text-sm">Profile</span>
                                        </React.Fragment>
                                    </a>
                                </Link>
                                : 
                                null 
                            }
                            <Link href="/dyor">
                                <a className={router.pathname == "/dyor" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                    <React.Fragment>
                                        <FiDroplet className="mr-2 w-5 h-5"/>
                                        <span className="font-semibold text-sm">DYOR</span>
                                    </React.Fragment>
                                </a>
                            </Link>
                    </div>
                </div>
            </Grid.Container>
        </>
    )
}

export default AppBar;