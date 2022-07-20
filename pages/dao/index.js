import React, { useEffect, useState, useMemo } from 'react'
import { useConnection } from '@solana/wallet-adapter-react';
import Link from "next/link"
import Navigation from "../../components/Navigation"
import Head from 'next/head'
import { Container, Grid, Row } from '@nextui-org/react'
import { getRealms } from '@solana/spl-governance';
import { Connection, PublicKey } from '@solana/web3.js';


const DAOPage = () => {
    const [daoList, setDaoList] = useState([]);
    //const connection = useConnection();
    const connection = new Connection("https://ssc-dao.genesysgo.net/", 'recent');
    const programId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw');

    const realms = getRealms(connection, programId);
    console.log(realms)


    // const getRealmDAOs = async () => {
    //   try {
    //     const allRealms = await getRealms(connection, programId);
    //     console.log(allRealms)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // useEffect(() => {
    //   getRealmDAOs();
    // }, []);

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
                <Grid xs={12}>
                    {/* {realms && realms.length > 0 ? (
                      realms.map((realmList) => (
                          <div>
                            <h3>{realmList.account.name}</h3>
                          </div>
                      ))
                    ) : (
                      <h1>No results found!</h1>
                    )} */}
                </Grid>
              </Grid.Container>
            </Container>
        </div>
    )
}

export default DAOPage;