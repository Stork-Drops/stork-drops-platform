import React, { Fragment } from 'react'
import Link from 'next/link';
import { Grid, Tooltip, Collapse, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FiHome, FiCompass, FiDroplet, FiCodesandbox, FiMessageSquare, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Disclosure } from '@headlessui/react'
import { HiChevronDown } from "react-icons/hi";
import MusicPlayer from '@components/MusicPlayer';

const AppBar = () => {
    const router = useRouter();
    const { wallet, disconnect } = useWallet();
    const { connected } = useConnection();

    return(
        <>
            <Grid.Container className="h-full border-r border-gray-200" direction='column' justify='space-between'>
                <div className="fixed w-fit">
                <Grid>
                    <Grid.Container gap={1} direction="column">
                            <Grid>
                                <Link href="/">
                                    <a className={router.pathname == "/" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                        <React.Fragment>
                                            <FiHome className="mr-2 w-5 h-5"/>
                                            <span className="font-semibold text-sm">Home</span>
                                        </React.Fragment>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid>
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
                            </Grid>
                            <Grid>
                                <Link href="/profile">
                                    <a className={router.pathname == "/profile" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                        <React.Fragment>
                                            <FiUser className="mr-2 w-5 h-5"/>
                                            <span className="font-semibold text-sm">Profile</span>
                                        </React.Fragment>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href="/dyor">
                                    <a className={router.pathname == "/dyor" ? "w-full bg_sunrise flex items-center space-between text-white p-2 rounded-xl" : "flex items-center space-between text-gray-500 w-full p-2"}>
                                        <React.Fragment>
                                            <FiDroplet className="mr-2 w-5 h-5"/>
                                            <span className="font-semibold text-sm">DYOR</span>
                                        </React.Fragment>
                                    </a>
                                </Link>
                            </Grid>     
                    </Grid.Container>
                </Grid>
                </div>
            </Grid.Container>
        </>
    )
}

export default AppBar;