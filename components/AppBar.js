import React, { Fragment } from 'react'
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FiHome, FiCompass, FiCodesandbox, FiMessageSquare, FiUser, FiCalendar } from "react-icons/fi";

const AppBar = () => {
    const router = useRouter();

    return(
        <>
            <div>
            <Grid.Container justify="center" alignItems="center" direction="column" gap={2}>
                    <Grid>
                        <Link href="/">
                            <a className={router.pathname == "/" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-dracula text-2xl"}>
                                <React.Fragment>
                                    <FiHome/>
                                </React.Fragment>
                            </a>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="/profile">
                            <a className={router.pathname == "/profile" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-2xl text-dracula"}>
                                <React.Fragment>
                                    <FiUser/>
                                </React.Fragment>
                            </a>
                        </Link>
                    </Grid>
                    <Grid>
                        <Link className="flex items-center space-between text-dracula text-lg font-semibold" href="/calendar">
                            <a className={router.pathname == "/calendar" ? "flex items-center space-between text-clean-blue text-2xl" : "flex items-center space-between text-2xl text-dracula"}>
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
                            <a className={router.pathname == "/chat" ? "flex items-center space-between font-normal text-clean-blue text-lg" : "flex items-center space-between text-dracula text-lg font-normal"}>
                                <React.Fragment>
                                    <FiMessageSquare className="mr-2"/>
                                    Chat Hub
                                </React.Fragment>
                            </a>
                        </Link>
                    </Grid> 
            </Grid.Container>
            </div>
        </>
    )
}

export default AppBar;