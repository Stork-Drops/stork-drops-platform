import React, { useEffect, useState } from "react"
import Head from 'next/head';
import Link from 'next/link'
import Navigation from "../components/Navigation"
import AppBar from "../components/AppBar"
import NewsFeed from "../components/NewsFeed";
import { Container, Grid, Spacer } from '@nextui-org/react';
import { fetchContent } from '../utils/fetchContentfulContent'
import RecentDropsCard from '../components/RecentDropsCard'
import findFavoriteDomainName from "../components/BonfidaSNS";

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

    const [realms, setRealms] = useState([])
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

    // useEffect(() => {
    //     cyberConnect();
    // }, [])

    return (
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container fluid>
                <Navigation/>
                <Grid.Container gap={2} justify="center"> 
                    <Grid xs={12} sm={12} md={10} lg={10} direction="column" className="min-h-screen">
                            <div>
                                <Grid.Container direction="row" justify="space-between" gap={2}>
                                    <Grid className="w-full">
                                        <span className="text-2xl italic font-semibold text-dracula">gm, degenmaster69.sol️</span>
                                        <p className="text-lg italic font-semibold text-gray-400">Here's your overview for the week.</p>
                                    </Grid>
                                </Grid.Container>
                            </div>
                            <div>
                                <Grid.Container direction="row" justify="space-between" gap={2}>
                                    <Grid className="w-full flex justify-between items-center">
                                        <div>
                                            <span className="px-3 py-2 text-normal font-semibold shadow-md text-white bg-clean-blue rounded-xl">Solana</span>
                                        </div>
                                        <Link href="/">
                                            <a className="px-3 py-1 text-clean-blue font-semibold text-normal rounded-xl border border-clean-blue">
                                                See all
                                            </a>
                                        </Link>
                                    </Grid>
                                </Grid.Container>
                            </div>
                            <div>
                                <Grid.Container direction="row" gap={2}>
                                    {filterSolanaProjects.slice(0, 3).map((cryptoProject) => ( 
                                            <Grid xs={4} sm={4} md={4} lg={4}>
                                                <RecentDropsCard 
                                                    key={cryptoProject.sys.id}
                                                    cryptoProject={cryptoProject}
                                                />
                                            </Grid>
                                    ))}
                                </Grid.Container>
                            </div>
                            <div>
                                <Grid.Container direction="row" justify="space-between" gap={2}>
                                    <Grid className="w-full flex justify-between items-center">
                                        <div>
                                            <span className="px-3 py-2 text-normal font-semibold shadow-md text-white bg-clean-blue rounded-xl">NFTs</span>
                                        </div>
                                        <Link href="/">
                                            <a className="px-3 py-1 text-clean-blue font-semibold text-normal rounded-xl border border-clean-blue">
                                                See all
                                            </a>
                                        </Link>
                                    </Grid>
                                </Grid.Container>
                            </div>
                        <Grid.Container direction="row" gap={2}>
                            {filterNFTProjects.slice(0, 3).map((cryptoProject) => (
                                <Grid xs={12} sm={12} md={4} lg={4}>
                                    <RecentDropsCard 
                                        key={cryptoProject.sys.id}
                                        cryptoProject={cryptoProject}
                                    />
                                </Grid>
                            ))}
                        </Grid.Container>
                        <div>
                            <Grid.Container direction="row" justify="space-between" gap={2}>
                                <Grid className="w-full flex justify-between items-center">
                                    <div>
                                        <span className="px-3 py-2 text-normal font-semibold shadow-md text-white bg-clean-blue rounded-xl">Airdrops</span>
                                    </div>
                                    <Link href="/">
                                        <a className="px-3 py-1 text-clean-blue font-semibold text-normal rounded-xl border border-clean-blue">
                                            See all
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid.Container>
                        </div>
                        <Grid.Container direction="row" gap={2}>
                            {filterAirdropsProjects && filterAirdropsProjects.length > 0 ? (
                                filterAirdropsProjects.map((cryptoProject) => (
                                  <Grid xs={12} sm={12} md={3} lg={3}>
                                    <CryptoProjectCard 
                                        key={cryptoProject.sys.id}
                                        cryptoProject={cryptoProject}
                                    />
                                  </Grid>
                                ))
                              ) : (
                                <div className="flex justify-center">
                                    <span className="text-center">It's a bear market, anon.</span>
                                </div>
                            )}
                        </Grid.Container>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} lg={2}>
                       <NewsFeed/>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    );
};

export default Home;
