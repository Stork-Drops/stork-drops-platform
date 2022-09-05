import { NextSeo } from 'next-seo';
import React, {Fragment} from 'react'
import Head from 'next/head'
import { Container, Grid } from '@nextui-org/react'
import AppBar from "../../components/AppBar";
import PopularCollection from '@components/NFTs/PopularCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';

const DefiPage = () => {
    return(
        <>
            <NextSeo
                title="Stork Drops - NFT Tracking, Discovery, and Market Insights "
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops - NFT Tracking, Discovery, and Market Insights.',
                    description: 'Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops.',
                    images: [
                    {
                        url: '/logos/og-banner.png',
                        width: 800,
                        height: 400,
                        alt: 'Stork Drops Banner',
                        type: 'image/png',
                    },
                    ],
                }}
            />

            <Navigation/>

            <Container xl>
              <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                  <Grid className="pl-4 py-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center">
                      <div>
                        <h1 className="flex items-center text-2xl md:text-7xl font-semibold">NFTs</h1>
                        <p className="text-lg my-5">
                          The Solana NFT ecosystem is bustling with new collections each and every day.
                          Track NFTs across marketplaces using on-chain data to make informed decisions.
                        </p>
                      </div>
                      
                    </div>

                    <div>
                      <h2 className="mb-2.5 flex items-center font-semibold text-2xl">Magic Feed - <span className="ml-2 text-sm font-base">Recent NFT sales on MagicEden.</span></h2>
                      <MagicEdenTimeLine/>
                    </div>
                    
                    <div>
                        <PopularCollection/>
                    </div>
                  </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default DefiPage;