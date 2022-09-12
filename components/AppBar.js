import React, { Fragment, useMemo } from 'react'
import { Grid, Navbar, Dropdown, Button, Text, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FiHome, FiCompass, FiDroplet, FiUser } from "react-icons/fi";
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
        <Navbar className="border-b" isCompact disableShadow disableBlur variant="sticky">
        <Navbar.Brand>
            <div className="flex items-center justify-between">
                <Link href="/">
                    <img
                        className='w-32 sm:w-36 cursor-pointer hover:opacity-80' 
                        src="/sd-full.svg"/>
                </Link>
                <div 
                    style={{
                        fontSize: '0.6rem',
                    }}
                    className="ml-1 w-min bg_sunrise text-white px-1 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold hover:opacity-80">
                    beta
                </div>  
            </div>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="sticky">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} color="primary" href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
        




            {/* <Grid.Container className="hidden" direction='row' alignItems='center' alignContent='center' justify='space-between'>
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
            </Grid.Container> */}
        </>
    )
}

export default AppBar;