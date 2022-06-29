import React, { Fragment } from 'react'
import Link from 'next/link';
import { Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import AppBar from './AppBar';
import { WalletMultiButton } from './WalletConnect';

const Navigation = () => {
    const router = useRouter();

    return(
        <>
            <Grid.Container className="my-1" direction="row" alignItems="flex-start" justify="space-between" gap={2}>
                <Grid>
                    <Link href="/">
                        <a className="pointer-cursor text-4xl font-extrabold text-dracula">
                            <React.Fragment>
                                sdrps
                            </React.Fragment>
                        </a>
                    </Link>
                </Grid>
                <Grid>
                    <AppBar/>
                </Grid>
                <Grid className="flex items-center">
                    <WalletMultiButton/>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Navigation;