import '@splidejs/react-splide/css/core';
import React, { useContext, useState, useEffect } from "react"
import Head from 'next/head';
import Navigation from "../components/Navigation"
import AppBar from "../components/AppBar"
import NewsFeed from "../components/NewsFeed";
import { Container, Grid, Row, Col, Spacer, Loading } from '@nextui-org/react';
import { fetchContent } from '../utils/fetchContentfulContent'
import { ProfileContext } from "../context/ProfileContext"
import MarketCapFeed from "../components/MarketCapFeed"
import Discovery from "../components/Discovery"

const Home = () => {
    const { bonfidaUsername } = useContext(ProfileContext);
    
    const [dateState, setDateState] = useState(new Date());

    const todaysDate = new Date();

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

            <Container xl>
                <Grid.Container gap={1} justify="center">
                    <Grid xs={0} sm={0} md={0.5} lg={0.5}>
                        <AppBar/>
                    </Grid>
                    <Grid xs={12} sm={12} md={11.5} lg={11.5} direction="column">
                        <Navigation/>
                        <Grid.Container gap={2} direction="row" alignItems="center">
                            <Grid xs={12} sm={12} md={9.5} lg={9.5}>
                                <Grid.Container direction='column'>
                                        {/* Intro, solana price, mcap, etc */}
                                        <div className="grid grid-cols-2 grid-rows-1 items-center justify-between mb-10">
                                            <div> 
                                                <span className="text-2xl font-extrabold text-dracula">gm, {bonfidaUsername ? bonfidaUsername + ".sol" : "anon"}.</span>
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
                                            </div>
                                            <div className="flex justify-end">
                                                <MarketCapFeed/>  
                                            </div>
                                        </div>
                                        <Discovery/>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={12} sm={12} md={2.5} lg={2.5}>
                                <NewsFeed/>
                            </Grid>
                        </Grid.Container>       
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    );
};

export default Home;
