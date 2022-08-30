import React from 'react';
import Head from 'next/head';
import { Container, Grid } from '@nextui-org/react'
import AppBar from '@components/AppBar'
import Navigation from '@components/Navigation'
import Footer from '@components/Footer'
import { useWallet } from '@solana/wallet-adapter-react';
import Welcome from '@components/Welcome'


export default function TwoTenLayout({ children }){
    const { connected } = useWallet();

    if(!connected){
        return <Welcome />
    }
    
    return (
        <>
            <div>
                <Head>
                    <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                    <meta name="description" content="Stork Drops for the kids bro." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                    <>
                        <Navigation/>
                        <Container xl>
                            <Grid.Container justify="flex-start">
                                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                                    <AppBar/>
                                </Grid>
                                <Grid className="h-screen p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                                    <main>{children}</main>
                                </Grid>
                            </Grid.Container>
                        </Container>
                        <Footer/>
                    </>
            </div>
        </>
    );
}