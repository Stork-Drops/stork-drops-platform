import React, { useEffect, useState, useMemo } from 'react'
import Link from "next/link"
import Navigation from "../../components/Navigation"
import Head from 'next/head'
import { Container, Grid, Row } from '@nextui-org/react'
import { getRealms } from '@solana/spl-governance';
import { Connection, PublicKey } from '@solana/web3.js';


const DAOPage = () => {
    const connection = new Connection("https://api.mainnet-beta.solana.com", 'recent');
    const programId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw');

    const realms = getRealms(connection, programId);
    console.log(realms);
    return(
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container xl>
              <Navigation/>
              <Grid.Container gap={1} justify="center"> 
                <Grid xs={12} className="min-h-screen">
                      {realms && realms.length > 0 ? (
                            realms.map((realm) => (
                                <Grid xs={12} sm={12} md={3} lg={3}>
                                  <div>
                                    <h3>{realm.owner.bn}</h3>
                                  </div>
                                </Grid>
                            ))
                          ) : (
                            <h1>No results found!</h1>
                          )}
                </Grid>
              </Grid.Container>
            </Container>
        </div>
    )
}

export default DAOPage;