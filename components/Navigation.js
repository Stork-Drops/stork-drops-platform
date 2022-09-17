import React, { Fragment, useMemo } from 'react'
import Link from 'next/link'
import { Grid, Container, Input, Navbar, Button, Dropdown, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from './WalletConnect';
import { FiHome, FiCompass, FiDroplet, FiUser } from "react-icons/fi";
import { useWallet } from '@solana/wallet-adapter-react';
import AppBar from '@components/AppBar'; 
import { Disclosure, Popover } from '@headlessui/react'
import { HiChevronDown } from "react-icons/hi";
import { Menu, Transition } from '@headlessui/react'
import { AiOutlinePicture, AiOutlineCluster, AiOutlineLineChart } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";

const Navigation = () => {
    const router = useRouter();
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const base58PubKey = useMemo(() => publicKey?.toBase58(), [publicKey]);

    const collapseItems = [
        "Features",
        "Customers",
        "Pricing",
        "Company",
        "Legal",
        "Team",
        "Help & Feedback",
        "Login",
        "Sign Up",
      ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return(
        <>
        <Navbar className="border-b" maxWidth="fluid" shouldHideOnScroll isCompact disableShadow disableBlur variant="sticky">
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
      </Navbar.Collapse>
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
                <Link href="/">
                    <a className={router.pathname == "/" ? "w-full bg_sunrise flex items-center space-between text-white px-2 py-1 rounded-xl" : "flex items-center space-between text-gray-500 w-full px-2 py-1 hover:bg-gray-100 rounded-xl"}>
                        <React.Fragment>
                            <span className="font-semibold text-sm">Home</span>
                        </React.Fragment>
                    </a>
                </Link>

                <Tooltip
                  content={
                    <div className="absolute left-1/2 z-50 bg-white mt-10 w-96 -translate-x-1/2 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <Link href="/nfts">
                            <a className="flex items-center rounded-lg p-4 transition duration-150 ease-in-out hover:bg-gray-50">
                              <div className="flex items-center justify-center text-white">
                                <AiOutlinePicture className="text-dracula w-6 h-6 mr-4"/> 
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Explore NFTs
                                </p>
                                <p className="text-sm text-gray-500">
                                  NFT tracking, discovery, and market insights.
                                </p>
                              </div>
                            </a>
                        </Link>
                        <Link href="/daos">
                            <a className="flex items-center rounded-lg p-4 transition duration-150 ease-in-out hover:bg-gray-50">
                              <div className="flex items-center justify-center text-white">
                                <AiOutlineCluster className="text-dracula w-6 h-6 mr-4"/> 
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Explore DAOs
                                </p>
                                <p className="text-sm text-gray-500">
                                  Discover awesome communities, view proposals, and make a difference.
                                </p>
                              </div>
                            </a>
                        </Link>
                        <Link href="/defi">
                            <a className="flex items-center rounded-lg p-4 transition duration-150 ease-in-out hover:bg-gray-50">
                              <div className="flex items-center justify-center text-white">
                                <AiOutlineLineChart className="text-dracula w-6 h-6 mr-4"/> 
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Explore Defi
                                </p>
                                <p className="text-sm text-gray-500">
                                  Swap, stake, and track Defi protocols.
                                </p>
                              </div>
                            </a>
                        </Link>
                          <div className="bg-gray-50 p-4">
                            <a
                              href="##"
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <span className="flex items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  Docs
                                </span>
                              </span>
                              <span className="block text-sm text-gray-500">
                                Learn more about our products &amp; services.
                              </span>
                            </a>
                          </div>
                        </div>
                    </div>
                  }
                  >
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-500">Explore</span>
                    <HiChevronDown
                      className="ml-1 h-3 w-3 text-gray-500 transition duration-150 ease-in-out group-hover:text-opacity-80"
                      aria-hidden="true"
                    />
                  </div>
                </Tooltip>

                {connected ? 
                    <Link href={`/profile/` + base58PubKey}>
                        <a className={router.pathname.includes("profile") ? "w-full bg_sunrise flex items-center space-between text-white px-2 py-1 rounded-xl" : "flex items-center space-between text-gray-500 w-full px-2 py-1 hover:bg-gray-100 rounded-xl"}>
                            <React.Fragment>
                                <span className="font-semibold text-sm">Profile</span>
                            </React.Fragment>
                        </a>
                    </Link>
                    : 
                    null 
                }
                <Link href="/dyor">
                    <a className={router.pathname == "/dyor" ? "w-full bg_sunrise flex items-center space-between text-white px-2 py-1 rounded-xl" : "flex items-center space-between text-gray-500 w-full px-2 py-1 hover:bg-gray-100 rounded-xl"}>
                        <React.Fragment>
                            <span className="font-semibold text-sm">DYOR</span>
                        </React.Fragment>
                    </a>
                </Link>
                </Navbar.Content>
                <Navbar.Content>
                    <WalletMultiButton/>
                </Navbar.Content>
            </Navbar>
        </>
    )
}

export default Navigation;