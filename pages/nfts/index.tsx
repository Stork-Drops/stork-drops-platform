import { NextSeo } from 'next-seo';
import React, {Fragment} from 'react'
import Head from 'next/head'
import { Container, Grid } from '@nextui-org/react'
import AppBar from "../../components/AppBar";
import TrendingCollections from '@components/NFTs/TrendingCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { BsCircleFill } from "react-icons/bs";

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

                  <Grid className="pl-4 py-4" xs={12} sm={12} md={12} lg={12} direction="column">
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center">
                      <div>
                        <h1 className="flex items-center text-2xl md:text-6xl font-semibold">Explore NFTs</h1>
                        <p className="text-sm my-5">
                          The Solana NFT ecosystem is bustling with new collections each and every day.
                          Track NFTs across marketplaces using on-chain data to make those informed decisions.
                        </p>
                      </div>
                      
                    </div>

                    {/* <div>
                      <h2 className="mb-2.5 flex items-center font-semibold text-2xl">Magic Feed - <span className="ml-2 text-sm font-base">Recent NFT sales on MagicEden.</span></h2>
                      <MagicEdenTimeLine/>
                    </div> */}

                    <div className="my-5 flex items-center">
                      <h2 className="text-3xl font-semibold">Top NFT Collections by Volume</h2>
                      <div className="ml-2 flex items-center">
                          <span className="text-xs font-semibold flex items-center animate-pulse bg-green-200 px-2 py-1 rounded-xl text-green-500">
                              <BsCircleFill className="w-1.5 h-1.5 mr-1.5"/>
                              LIVE
                          </span>
                      </div>
                    </div>

                    <div>
                      <TrendingCollections/>
                    </div>
                    
                  </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default DefiPage;