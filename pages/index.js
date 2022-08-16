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
import Footer from "@components/Footer"

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

            <Navigation/>

            <Container fluid>
                <Grid.Container justify="flex-start">
                    <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                        <AppBar/>
                    </Grid>
                    <Grid className="h-screen p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                            <div className="grid grid-cols-2 grid-rows-1 items-center justify-around">
                                <div> 
                                    <span className="text-2xl italic font-semibold text-dracula">gm, {bonfidaUsername ? bonfidaUsername + ".sol" : "anon"}.</span>
                                    <p className="text-base">
                                        {dateState.toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })},
                                        {' '}
                                        {dateState.toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        })}.
                                    </p>
                                    <p className="text-normal font-normal text-gray-400">Here's what's new in the ecosystem.</p>
                                </div>
                                <div className="flex justify-end">
                                    <MarketCapFeed/>  
                                </div>
                            </div>
                            <div className="my-10">
                                <NewsFeed/>
                            </div>
                        <Discovery/>
                    </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </div>
    );
};

export default Home;
