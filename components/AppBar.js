import React, { Fragment } from 'react'
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { Grid, Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FiHome, FiCompass, FiCodesandbox, FiMessageSquare, FiUser, FiCalendar } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useWallet } from '@solana/wallet-adapter-react';

const AppBar = () => {
    const router = useRouter();
    const { disconnect} = useWallet();

    return(
        <>
            <Grid.Container className="fixed h-screen py-5 w-min" direction='column' justify='space-between' alignItems='center' alignContent='flex-start'>
                <Grid className="relative">
                    <Link href="/">
                        <img
                            className='w-10 h-10 cursor-pointer hover:opacity-80' 
                            src="/sd-package.svg"/>
                    </Link>
                    <div 
                        style={{
                            fontSize: '0.6rem',
                        }}
                        className="animate-bounce absolute -top-2 -right-10 z-50 w-min bg_sunrise text-white px-2.5 py-1 rounded-full font-semibold hover:opacity-80">
                        beta
                    </div>
                </Grid>

                <Grid>
                    <Grid.Container direction="column" gap={2}>
                        <div>
                        <Grid>
                            <Link href="/">
                                <a className={router.pathname == "/" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-gray-400 text-2xl"}>
                                    <React.Fragment>
                                        <FiHome/>
                                    </React.Fragment>
                                </a>
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="/profile">
                                <a className={router.pathname == "/profile" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-2xl text-gray-400"}>
                                    <React.Fragment>
                                        <FiUser/>
                                    </React.Fragment>
                                </a>
                            </Link>
                        </Grid>
                        <Grid>
                            <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="/calendar">
                                <a className={router.pathname == "/calendar" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-2xl text-gray-400"}>
                                    <React.Fragment>
                                        <FiCalendar/>
                                    </React.Fragment>
                                </a>
                            </Link>
                        </Grid>
                        <Grid className="hidden">
                            <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="/">
                                <a className={router.pathname == "/dropzone" ? "flex items-center space-between font-normal text-clean-blue text-2xl" : "flex items-center space-between text-dracula text-2xl font-normal"}>
                                    <React.Fragment>
                                        Dropzone
                                    </React.Fragment>
                                </a>
                            </Link>
                        </Grid>
                        <Grid className="hidden">
                            <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="#">
                                <a className={router.pathname == "/chat" ? "flex items-center space-between font-normal text-clean-blue text-lg" : "flex items-center space-between text-gray-200 text-lg font-normal"}>
                                    <React.Fragment>
                                        <FiMessageSquare className="mr-2"/>
                                        Chat Hub
                                    </React.Fragment>
                                </a>
                            </Link>
                        </Grid>
                        </div> 
                    </Grid.Container>
                </Grid>

                <Grid>
                    <Tooltip 
                        content={"Logout"}
                        hideArrow>
                        <button onClick={disconnect}>
                            <HiOutlineLogout className="rounded-full text-2xl text-dracula"/>
                        </button>
                    </Tooltip>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default AppBar;