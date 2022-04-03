import type { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/Navigation'
import Platform from '../components/Platform'
import Features from '../components/Features'
import Roadmap from '../components/Roadmap'
import FAQ from '../components/FAQ'
import { Container } from '@nextui-org/react';
import { Grid, Spacer } from '@nextui-org/react';
import JoinDiscord from '../components/JoinDiscord';
import JoinTwitter from '../components/JoinTwitter';



const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <div className="mx-auto">
                    <Navigation/>
                </div>

                <main>
                    <section id="welcome" className="my-36 flex justify-center">
                        <div className="text-center flex flex-col justify-center items-center w-4/5">
                            <h1 className="my-5 font-extrabold leading-snug text-7xl">Airdrops. Whitelists. Alpha. <br/> One Social Platform.</h1>
                            <p className="mb-5 text-xl w-2/4">A social experiment that brings Solana back to its early days; with unique airdrops, proper whitelists, and open alpha.</p>
                        </div>
                    </section>

                    <section id="membership-card my-24">
                        <Platform/>
                    </section>

                    <section id="about" className="my-24">
                        <Grid.Container className="items-center" gap={4} justify="center">
                            <Grid 
                                className="flex flex-col"
                                xs={12} 
                                sm={12} 
                                md={6} 
                                lg={6}
                            >
                                <span className="uppercase font-bold text-slate-400">WTF is Stork Drops?</span>
                                <h1 className="my-5 font-extrabold leading-snug text-6xl">Introductions</h1>
                                <p className="mb-5 text-xl leading-relaxed">
                                    Stork Drops is a collection of [number] membership cards 
                                    that give you the <span className="underline">highest</span> access within our Stork Drops platform. 
                                    A place where you can collect various token drops, 
                                    gain access to whitelists, and holder-only chatrooms.
                                </p>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6}>
                                <img className="w-full" src="/example-welcome-image.webp"/>
                            </Grid>
                        </Grid.Container>
                    </section>

                    <section id="features">
                        <h2 className="my-5 text-6xl font-extrabold text-center leading-normal">What does Stork Drops <br/>membership get you?</h2>
                        <Features/>
                    </section>

                    <section id="roadmap" className="my-48">
                        <Roadmap/>
                    </section>

                    <section id="faq" className="my-48">
                        <FAQ/>
                    </section>

                    <section id="call-to-action" className="my-32 flex justify-center">
                        <div className="text-center flex flex-col justify-center items-center w-4/5">
                            <h1 className="my-5 font-extrabold leading-snug text-6xl">Ready to have some fun, anon?</h1>
                            <div className="flex items-center">
                                <JoinDiscord/>
                                <Spacer/>
                                <JoinTwitter/>
                            </div>
                        </div>
                    </section>
                </main>
            </Container>
        </div>
    );
};

export default Home;
