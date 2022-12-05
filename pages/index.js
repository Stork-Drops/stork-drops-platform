import { NextSeo } from 'next-seo';
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
import { useWallet } from '@solana/wallet-adapter-react';
import Welcome from '@components/Welcome';
import toast from 'react-hot-toast';

const Home = () => {
    const { bonfidaUsername } = useContext(ProfileContext);
    const { connected } = useWallet();
    
    const [dateState, setDateState] = useState(new Date());

    const todaysDate = new Date();

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);
    

    return (
        <>
            <NextSeo
                title="Stork Drops | Explore and interact with the Solana ecosystem, dig into crypto news, and more."
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops | Explore and interact with the Solana ecosystem, dig into crypto news, and more.',
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
            
            <section className="">
            <Container xl>
                <Grid.Container gap={1}>
                    <Grid xs={12} sm={12} md={9.5} lg={9.5} direction="column">
                        <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:grid-rows-1 items-center justify-around mb-2.5">
                                <div> 
                                    <p className="text-sm">
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
                                    <span className="text-2xl font-semibold text-dracula">gm, {bonfidaUsername ? bonfidaUsername + ".sol" : "anon."}</span>
                                    <p className="text-normal font-semibold text-gray-400">Here's what's new.</p>
                                </div>
                                <div className="flex justify-end">
                                    
                                </div>
                            </div>
                        <Discovery/>
                    </Grid>
                    <Grid className="mt-2.5" xs={12} sm={12} md={2.5} lg={2.5} direction="column">
                        <MarketCapFeed/>  
                        <NewsFeed/>
                    </Grid>
                </Grid.Container>
            </Container>
            </section>
        </>
    );
};

export default Home;
