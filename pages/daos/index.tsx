import React, { useEffect, useState, useMemo } from 'react'
import { useConnection } from '@solana/wallet-adapter-react';
import Link from "next/link"
import Navigation from "../../components/Navigation"
import Head from 'next/head'
import { Container, Grid, Row, Avatar, Col, Spacer, Tooltip, Input } from '@nextui-org/react'
import { getRealms } from '@solana/spl-governance';
import { Connection, PublicKey } from '@solana/web3.js';
import AppBar from "../../components/AppBar";
import { HiOutlineExternalLink } from "react-icons/hi";
import Footer from '@components/Footer';


const DAOPage = () => {
    const [cerifiedDaoList, setCerifiedDaoList] = useState([]);
    const [uncharteredDaoList, setUncharteredDaoList] = useState([]);
    //const connection = useConnection();
    const connection = new Connection("https://ssc-dao.genesysgo.net/", 'recent');
    const programId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw');

    const certifiedRealms = require("/public/realms/mainnet-beta.json");

    // handling search input
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const searchItems = (searchValue) => {
      setSearchInput(searchValue)
      if (searchInput !== '') {
          const filteredData = certifiedRealms.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
          })
          setFilteredResults(filteredData)
      }
      else{
          setFilteredResults(certifiedRealms)
      }
  }

    const getUncharteredRealmDAOs = async () => {
      try {
        const daosFromRealmsSDK = await getRealms(connection, programId);
        // // filter out realms from on-chain data that are in the certified json list
        const filteredRealms = daosFromRealmsSDK?.filter(
          (realm) => !certifiedRealms.find(certifiedRealm => certifiedRealm.displayName === realm.account.name)
        );
        setUncharteredDaoList(filteredRealms);
      } catch (error) {
        console.log(error);
      }
    }

    const allRealms = [].concat(certifiedRealms, uncharteredDaoList);

    useEffect(() => {
      getUncharteredRealmDAOs();
    }, []);

    return(
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation/>

            <Container fluid>
              <Grid.Container justify="center"> 
                <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                  <AppBar/>
                </Grid>

                <Grid className="p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                  <div>
                    <Grid.Container alignItems="center">
                      <Grid xs={12} sm={12} md={6} lg={6}>
                        <Col>
                          <div className="mb-5 text-dracula">
                          <h2 className="flex items-center text-6xl font-semibold">DAOs <span className="mx-2 text-2xl bg-gray-200 py-1 px-2 h-min rounded-xl tracking-tighter">{certifiedRealms.length + uncharteredDaoList.length}</span></h2>
                          <p className="text-sm">Decentralized Autonomous Organizations.</p>
                          <div className="p-2">
                            <Avatar.Group count={allRealms.length - 6}>
                              {certifiedRealms.map((verifiedRealms, index) => (
                                <Avatar
                                  key={index}
                                  size="md"
                                  pointer
                                  src={verifiedRealms.ogImage}
                                  bordered
                                  color="gradient"
                                  stacked
                                />
                                )).slice(0,6)}
                              </Avatar.Group>
                            </div>
                          </div>
                        </Col>
                      </Grid>
                      <Grid xs={12} sm={12} md={6} lg={6}>
                        <Col>
                          <div className="w-full">
                            <input
                              onChange={(e) => searchItems(e.target.value)} 
                              className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                              type="text" 
                              placeholder="Search DAOs..." />
                          </div>
                        </Col>
                      </Grid>
                    </Grid.Container>
                  </div>

                  <Grid.Container direction="column">
                      <Grid>
                        <Grid.Container gap={1}>
                        {searchInput.length > 1 ? (
                            filteredResults.map((verifiedRealms) => (
                                <Grid alignContent='flex-end' id={verifiedRealms.symbol} key={verifiedRealms.displayName} xs={4}>
                                  <div className="w-full border border-gray-200 rounded-xl p-1 shadow-md">
                                    <Grid.Container gap={1} justify="flex-end" alignItems="center" alignContent='space-around'>
                                      <Grid xs={2}>
                                        <img
                                          className="p-2 rounded-full bg-gray-100 border border-gray-200" 
                                          src={
                                            verifiedRealms.ogImage ? verifiedRealms.ogImage : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n_qNHbNptQi-kGTQRFnmoAAAAA%26pid%3DApi&f=1"
                                          } 
                                          alt="DAO-banner" 
                                        />
                                      </Grid>
                                      <Grid xs={5}>
                                        <Col>
                                          <p className="text-sm text-dracula font-semibold">{verifiedRealms.symbol}</p>
                                          <p className="my-1 text-normal text-sm">{verifiedRealms.displayName}</p>
                                        </Col>
                                      </Grid>
                                      <Grid xs={5}>
                                        <Col>
                                          <Row justify='flex-end'>
                                            {verifiedRealms.twitter ? 
                                              <a className="text-twitter-blue text-xs underline">
                                                {verifiedRealms.twitter}
                                              </a>
                                              : null
                                            }
                                          </Row>
                                          <Spacer y={0.5}/>
                                          <Row justify='flex-end'>
                                            {verifiedRealms.website ? 
                                              <a target="_blank" href={verifiedRealms.website} className="text-dracula text-xs underline">
                                                View Website
                                              </a>
                                              : null
                                            }
                                          </Row>
                                        </Col>
                                      </Grid>
                                    </Grid.Container>
                                    <Row>
                                      <a target="_blank" href={`https://realms.today/dao/${verifiedRealms.symbol}`} className="flex items-center justify-center bg-gray-200 text-dracula p-2 text-xs rounded-xl w-full">
                                        Explore {verifiedRealms.displayName} on realms.today<HiOutlineExternalLink className="text-dracula ml-1 w-3 h-3" />
                                      </a>
                                    </Row>
                                  </div>
                                </Grid>
                            ))
                          ) : (
                            <>
                              {certifiedRealms.map((verifiedRealms) => (
                                <Grid alignContent='flex-end' id={verifiedRealms.symbol} key={verifiedRealms.displayName} xs={4}>
                                <div className="w-full border border-gray-200 rounded-xl p-1 shadow-md">
                                  <Grid.Container gap={1} justify="flex-end" alignItems="center" alignContent='space-around'>
                                    <Grid xs={2}>
                                      <img
                                        className="p-2 rounded-full bg-gray-100 border border-gray-200" 
                                        src={
                                          verifiedRealms.ogImage ? verifiedRealms.ogImage : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n_qNHbNptQi-kGTQRFnmoAAAAA%26pid%3DApi&f=1"
                                        } 
                                        alt="DAO-banner" 
                                      />
                                    </Grid>
                                    <Grid xs={5}>
                                      <Col>
                                        <p className="text-sm text-dracula font-semibold">{verifiedRealms.symbol}</p>
                                        <p className="my-1 text-normal text-sm">{verifiedRealms.displayName}</p>
                                      </Col>
                                    </Grid>
                                    <Grid xs={5}>
                                      <Col>
                                        <Row justify='flex-end'>
                                          {verifiedRealms.twitter ? 
                                            <a className="text-twitter-blue text-xs underline">
                                              {verifiedRealms.twitter}
                                            </a>
                                            : null
                                          }
                                        </Row>
                                        <Spacer y={0.5}/>
                                        <Row justify='flex-end'>
                                          {verifiedRealms.website ? 
                                            <a target="_blank" href={verifiedRealms.website} className="text-dracula text-xs underline">
                                              View Website
                                            </a>
                                            : null
                                          }
                                        </Row>
                                      </Col>
                                    </Grid>
                                  </Grid.Container>
                                  <div>
                                    <a target="_blank" href={`https://realms.today/dao/${verifiedRealms.symbol}`} className="flex items-center justify-center bg-gray-200 text-dracula p-2 text-xs rounded-xl w-full">
                                      Explore {verifiedRealms.displayName} on realms.today<HiOutlineExternalLink className="text-dracula ml-1 w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              </Grid>
                              ))
                              }
                            </>
                          )}
                        </Grid.Container>
                      </Grid>

                        <Grid>
                        <Row gap={1}>
                          <div className="my-5">
                            <h2 className="flex items-center text-3xl font-semibold">
                              <Tooltip 
                                placement="topStart"
                                content={<span className="text-xs">Unchartered DAOs are DAOs without an <br/>identity (icon, display name, symbol, Twitter, etc).</span>}>
                                <span className="mr-1 p-1.5 border-dashed border-2 rounded-xl">Unchartered</span>
                              </Tooltip>
                              DAOs 
                              <span className="mx-2 text-2xl bg-gray-200 py-1 px-2 h-min rounded-xl tracking-tighter">{uncharteredDaoList.length}/{allRealms.length}</span>
                            </h2>
                          </div>
                        </Row>
                        <Grid.Container gap={1}>
                          {uncharteredDaoList && uncharteredDaoList.length > 0 ? (
                            uncharteredDaoList.map((uncharteredRealmList) => (
                              <Grid xs={3}>
                              <div className="w-full border border-gray-200 rounded-xl shadow-md">
                                <Grid.Container gap={2} alignItems="center">
                                  <Grid xs={3}>
                                    <img
                                      className="p-1 rounded-full border border-gray-200" 
                                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n_qNHbNptQi-kGTQRFnmoAAAAA%26pid%3DApi&f=1"
                                      alt="DAO-banner" 
                                    />
                                  </Grid>
                                  <Grid xs={9}>
                                    <Col>
                                      <p className="my-1 text-normal text-sm text-dracula">{uncharteredRealmList.account.name}</p>
                                    </Col>
                                  </Grid>
                                </Grid.Container>
                              </div>
                            </Grid>
                            ))
                          ) : (
                            <h1>No results found!</h1>
                          )}
                        </Grid.Container>
                        </Grid>
                      </Grid.Container>
                  </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </>
    )
}

export default DAOPage;