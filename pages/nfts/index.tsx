import { NextSeo } from 'next-seo';
import React, {Fragment} from 'react'
import Head from 'next/head'
import { Container, Grid } from '@nextui-org/react'
import AppBar from "../../components/AppBar";
import TrendingCollections from '@components/NFTs/TrendingCollections';
import TopCollections from '@components/NFTs/TopCollections';
import Navigation from '@components/Navigation';
import MagicEdenTimeLine from '@components/NFTs/MagicEdenTimeline';
import Footer from '@components/Footer';
import { BsCircleFill } from "react-icons/bs";
import Highlights from '@components/NFTs/Highlights';

const DefiPage = () => {
    return(
        <>
            <NextSeo
                title="Stork Drops | NFT Tracking, Discovery, and Market Insights"
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops | NFT Tracking, Discovery, and Market Insights',
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

                  <Grid xs={12} sm={12} md={12} lg={12} direction="column">
                    <div className="grid grid-cols-1 grid-rows-auto md:grid-cols-2 md:grid-rows-1 gap-4 items-center my-10">
                      <div>
                        <span className="bg_sunrise text-white rounded-full px-2 py-1 text-sm font-extrabold">NFTs</span>
                        <h1 className="flex items-center my-2.5 md:my-0 text-5xl md:text-8xl font-semibold">Explore Collections</h1>
                        <p className="text-lg my-5">
                          The Solana NFT ecosystem is bustling with new collections each and every day.
                          Stay up to date on different NFTs across marketplaces various marketplaces to make more informed decisions.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <Highlights/>
                      </div>
                    </div>

                    {/* <div>
                      <h2 className="mb-2.5 flex items-center font-semibold text-2xl">Magic Feed - <span className="ml-2 text-sm font-base">Recent NFT sales on MagicEden.</span></h2>
                      <MagicEdenTimeLine/>
                      </div> */}

                    <div className="mt-20">
                      <h2 className="text-4xl font-extrabold">Trending NFT Collections <span className="text-green-500">by Volume</span></h2>
                      <p className="text-lg mb-5">See what's hot. Prices updated in real time.</p>
                      <TrendingCollections/>
                    </div>
                    
                  </Grid>
                </Grid.Container>
            </Container>
        </>
    )
}

export default DefiPage;