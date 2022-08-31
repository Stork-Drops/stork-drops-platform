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
                title="Stork Drops - Learn more about the Solana ecosystem, dig into crypto news, and more."
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops - Learn more about the Solana ecosystem, dig into crypto news, and more.',
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
                <Grid.Container justify="flex-start">
                    <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                        <AppBar/>
                    </Grid>
                    <Grid className="h-screen p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                            <div className="block md:flex justify-center md:items-center md:justify-between p-4 mb-10 bg-green-200 text-green-600 font-base md:text-center rounded-xl w-full">
                                <span className="text-normal font-semibold">We entered into the Solana Summer Camp Hackathon. Give us an upvote if you enjoyed the experience. 🙏</span>
                                <a className="flex items-center justify-center bg-green-600 text-white px-2 py-1 font-semibold mt-2.5 md:mt-0 text-base rounded-md" href="https://solana.com/summercamp/voting/stork-drops">Go Vote!</a>
                            </div>
                            <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:grid-rows-1 items-center justify-around">
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
                                    <span className="text-2xl italic font-semibold text-dracula">gm, {bonfidaUsername ? bonfidaUsername + ".sol" : "anon."}</span>
                                    <p className="text-normal font-semibold text-gray-400">Here's what's new.</p>
                                </div>
                                <div className="flex justify-end">
                                    <MarketCapFeed/>  
                                </div>
                            </div>
                            <div className="my-5">
                                <NewsFeed/>
                            </div>
                        <Discovery/>
                    </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </>
    );
};

export default Home;
