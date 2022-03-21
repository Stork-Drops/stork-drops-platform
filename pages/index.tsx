import type { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/Navigation'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Image from 'next/image';
import { Container } from '@nextui-org/react';
import { Grid, Card, Link, Text } from '@nextui-org/react';



const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Stork Drops - Airdrops, whitelists, and alpha in a social platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <div className="mx-auto">
                    <Navigation/>
                </div>

                <main>
                    <section id="welcome" className="my-32 flex justify-center">
                        <div className="text-center flex flex-col justify-center items-center w-4/5">
                            <h1 className="my-5 font-extrabold leading-snug text-7xl">Airdrops, whitelists, and alpha within one social platform.</h1>
                            <p className="mb-5 text-xl w-2/4">We have a bold social experiment to bring Solana back to the old days with airdrops, proper whitelisting, and open alpha.</p>
                            <Link 
                                icon 
                                className="w-max border bg-indigo-700 text-white p-4 rounded-full text-normal"
                                href="#">
                                <span className="mx-2 text-bold">Learn More</span>
                            </Link>
                        </div>
                    </section>

                    <section id="membership-card" className="my-32">
                        <div className="flex justify-center">
                            <p className="mb-5 text-xl">[3D Rotating Version of Membership Card using ThreeJS w/ parallax maybe..]</p>
                        </div>
                    </section>

                    <section id="about">
                        <Grid.Container className="items-center" gap={4} justify="center">
                            <Grid 
                                className="flex flex-col"
                                xs={12} 
                                sm={12} 
                                md={6} 
                                lg={6}
                            >
                                <h1 className="my-5 font-bold leading-snug text-5xl">What is Stork Drops?</h1>
                                <p className="mb-5 text-xl leading-relaxed">Stork Drops is a collection of 10,000 membership cards that live on the Solana blockchain. 
                                Your membership card grants you exclusive access to....Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum!</p>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6}>
                                <img className="w-full" src="/example-welcome-image.webp"/>
                            </Grid>
                        </Grid.Container>
                    </section>

                    <section id="features" className="my-32">
                        <h2 className="my-10 text-5xl font-extrabold text-center leading-normal">What does Stork Drops <br/>membership get you?</h2>
                        <Features/>
                    </section>

                    <section id="call-to-action" className="my-32 flex justify-center">
                        <div className="text-center flex flex-col justify-center items-center w-4/5">
                            <h1 className="my-5 font-extrabold leading-snug text-7xl">Some call-to-action!</h1>
                            <Link 
                                icon 
                                className="w-max border bg-indigo-700 text-white p-4 rounded-full text-normal"
                                href="#">
                                <span className="mx-2 text-bold">Mint a Stork Drops Pass</span>
                            </Link>
                        </div>
                    </section>


                </main>

                <Footer/>
            </Container>
        </div>
    );
};

export default Home;
