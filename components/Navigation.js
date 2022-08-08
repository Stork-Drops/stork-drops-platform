import React, { Fragment } from 'react'
import Link from 'next/link';
import { Grid, Container, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import AppBar from './AppBar';
import { WalletMultiButton } from './WalletConnect';

const Navigation = () => {
    const router = useRouter();

    return(
        <Grid.Container gap={1} direction="row" alignItems="center" justify="space-between">
            <Grid>  
            </Grid>
            <Grid className="flex items-center">
                <WalletMultiButton/>
            </Grid>
        </Grid.Container>
    )
}

export default Navigation;