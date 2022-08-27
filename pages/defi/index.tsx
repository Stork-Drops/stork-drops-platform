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
import { BiCoin } from "react-icons/bi";

const DefiPage = () => {
    return(
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation/>

            <Container xl>
              <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                <Grid className="p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                    <div className="">
                        <h1 className=" text-4xl md:text-7xl font-semibold">
                          DeFi
                        </h1>
                        <p className="text-sm">Decentralized Finance.</p>
                    </div>

                    <div className="my-5">
                      <SolanaTVLChart/>
                    </div>

                    <DefiList/>
                </Grid>
              </Grid.Container>
            </Container>

            <Footer/>
        </>
    )
}

export default DefiPage;