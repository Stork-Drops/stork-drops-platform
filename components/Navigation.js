import React, { Fragment } from 'react'
import Link from 'next/link';
import { Grid, Container } from '@nextui-org/react';
import { useRouter } from 'next/router';
import AppBar from './AppBar';
import { WalletMultiButton } from './WalletConnect';

const Navigation = () => {
    const router = useRouter();

    return(
        <Container fluid className="my-5">
            <Grid.Container direction="row" alignItems="center" justify="space-between">
                <Grid>
                    <Link href="/">
                        <a className="pointer-cursor text-4xl font-extrabold text-dracula">
                            <React.Fragment>
                                sdrps
                            </React.Fragment>
                        </a>
                    </Link>
                </Grid>
                <Grid className="flex items-center">
                    <WalletMultiButton/>
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default Navigation;