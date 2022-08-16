import React, { useEffect, useState, useMemo } from 'react'
import { useConnection } from '@solana/wallet-adapter-react';
import Link from "next/link"
import Head from 'next/head'
import { Container, Grid, Row, Avatar, Col, Spacer, Tooltip, Input } from '@nextui-org/react'
import DefiList from '@components/DeFi/DefiList';
import SolanaTVLChart from '@components/DeFi/TVLChart';
import AppBar from "../../components/AppBar";
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';

const DefiPage = () => {
    return(
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation/>

            <Container fluid>
              <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                  <Grid className="p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center">
                      <div>
                        <h1 className="flex items-center text-6xl font-semibold">DeFi</h1>
                        <p className="text-lg my-5">
                          While the ecosystem is still young, there are many protocols out there <br/>to let your SOL or any SPL token work for you.
                        </p>
                      </div>
                    </div>

                    <div className="my-5">
                      <SolanaTVLChart/>
                    </div>

                    <div>
                      <DefiList/>
                    </div>
                  </Grid>
                </Grid.Container>
            </Container>

            <Footer/>
        </>
    )
}

export default DefiPage;