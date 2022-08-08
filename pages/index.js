import '@splidejs/react-splide/css/core';
import React, { useContext, useState, useEffect } from "react"
import Head from 'next/head';
import Link from 'next/link'
import { format } from 'date-fns'
import Navigation from "../components/Navigation"
import AppBar from "../components/AppBar"
import NewsFeed from "../components/NewsFeed";
import { Container, Grid, Row, Col, Spacer, Loading } from '@nextui-org/react';
import { fetchContent } from '../utils/fetchContentfulContent'
import RecentDropsCard from '../components/RecentDropsCard'
import { ProfileContext } from "../context/ProfileContext"
import MarketCapFeed from "../components/MarketCapFeed"
import certifiedRealms from "/public/realms/mainnet-beta.json"
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { HiArrowRight, HiArrowLeft, HiLink } from "react-icons/hi";
import { BsTwitter } from "react-icons/bs";
import { HiOutlineLink, HiOutlinePhotograph } from "react-icons/hi";
import Discovery from "../components/Discovery"

export async function getStaticProps() {
    const res = await fetchContent(`
      {
        cryptoProjectCollection {
          items {
            sys {
              id
            }
            projectTitle
            projectSlug
            projectCategory
            projectThumbnail {
              url
            }
            projectDropDate
          }
        }
      }
      `)
    return {
      props: {
        cryptoProjects: res.cryptoProjectCollection.items,
      },
    }
} 

const Home = ({ cryptoProjects }) => {
    const { bonfidaUsername } = useContext(ProfileContext);
    
    const [dateState, setDateState] = useState(new Date());

    const todaysDate = new Date();
    console.log(certifiedRealms);

    // Filter NFT Categories
    const filterNFTProjects = cryptoProjects.filter((category) => {
        return category.projectCategory.toString().toLowerCase().includes('nft');
    })

    // Filter Solana Categories
    const filterSolanaProjects = cryptoProjects.filter((category) => {
        return category.projectCategory.toString().toLowerCase().includes('solana');
    })

    // Filter Airdrops Categories
    const filterAirdropsProjects = cryptoProjects.filter((category) => {
        return category.projectCategory.toString().toLowerCase().includes('airdrop');
    })

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    return (
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container fluid>
                <Grid.Container gap={1} justify="center">
                    <Grid xs={0} sm={0} md={0.5} lg={0.5}>
                        <AppBar/>
                    </Grid>
                    <Grid xs={12} sm={12} md={11.5} lg={11.5} direction="column">
                        <Navigation/>
                        <Grid.Container gap={1} direction="row" alignItems="center"  justify="space-between">
                            <Grid xs={12} sm={12} md={9.5} lg={9.5}>
                                <Grid.Container direction='column'>
                                    <Grid>
                                        {/* Intro, solana price, mcap, etc */}
                                        <div className="grid grid-cols-2 grid-rows-1 items-center">
                                            <div>
                                                <Col>
                                                    <span className="text-2xl italic font-semibold text-dracula">gm, {bonfidaUsername ? bonfidaUsername + ".sol" : "anon"}.</span>
                                                    <p className="text-normal">Today is 
                                                        {' '}
                                                        {dateState.toLocaleDateString('en-US', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}, it is 
                                                        {' '}
                                                        {dateState.toLocaleString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true,
                                                        })}.
                                                    </p>
                                                    <p className="text-normal italic font-semibold text-gray-400">Here's what's new in the ecosystem.</p>
                                                </Col>
                                            </div>
                                            <div className="min-w-min">
                                                <MarketCapFeed/>  
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid>
                                        <Discovery/>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={12} sm={12} md={2.5} lg={2.5}>
                                <Grid.Container direction="column">
                                    <Grid>
                                        <NewsFeed/>
                                    </Grid>
                                    <Grid>
                                        
                                    </Grid>
                                </Grid.Container>  
                            </Grid>
                        </Grid.Container>       
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    );
};

export default Home;
