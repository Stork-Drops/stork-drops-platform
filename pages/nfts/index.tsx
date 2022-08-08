import React, { useEffect, useState, useMemo } from 'react'
import { useConnection } from '@solana/wallet-adapter-react';
import Link from "next/link"
import Head from 'next/head'
import { Container, Grid, Row, Avatar, Col, Spacer, Tooltip, Input, Button } from '@nextui-org/react'
import DefiList from '@components/DeFi/DefiList';
import SolanaTVLChart from '@components/DeFi/TVLChart';
import AppBar from "../../components/AppBar";
import SevenDayPopularCollection from '@components/NFTs/PopularCollections/SevenDayList';

const DefiPage = () => {
    return(
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container xl>
              <Grid.Container gap={1} justify="center"> 
                <Grid className="h-screen" xs={0} sm={0} md={0.5} lg={0.5}>
                  <AppBar/>
                </Grid>

                  <Grid xs={12} sm={12} md={11.5} lg={11.5} direction="column">
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center my-5">
                      <div className="my-5">
                        <h2 className="flex items-center text-5xl font-semibold">NFTs</h2>
                        <p className="text-lg my-5">Explore decentralized finance on Solana. While the ecosystem is young, there are many protocols out there to let your SOL or whatever SPL token work for you.</p>
                      </div>
                      <div className="">
                        <SolanaTVLChart/>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center my-5">
                        <div className="my-5">
                            <h2 className="flex items-center text-3xl font-semibold">Popular Collections</h2>
                        </div>
                        <div className="w-full">
                            <select
                                className="block w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                <option value="">24 hrs</option>
                                <option value="7d">7 days</option>
                                <option value="30d">30 days</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <SevenDayPopularCollection/>
                    </div>
                  </Grid>
                </Grid.Container>
            </Container>
        </>
    )
}

export default DefiPage;