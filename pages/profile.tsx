import React, { useEffect, useState, useContext, useCallback, useRef } from "react"
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import Head from 'next/head';
import Navigation from "../components/Navigation"
import { Container, Grid, Spacer, Row, Col } from '@nextui-org/react';
import { ProfileContext } from "../context/ProfileContext"
import { TokenIcon, TokenName, TokenSymbol, TokenPrice, TokenChange } from "../utils/tokenList";
import AppBar from "../components/AppBar";
import { Tab } from '@headlessui/react'
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { BsTwitter } from "react-icons/bs";
import { getAllDomains, NameRegistryState, performReverseLookupBatch } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";
import { HiOutlineIdentification } from "react-icons/hi";
import { Metaplex } from "@metaplex-foundation/js";
import { NftCard } from "../components/Profile/NftGalleryCard"

interface Result {
  pubkey: PublicKey;
  registry: NameRegistryState;
  reverse: string;
}

// Mint address of tokens we display
const acceptedTokens = [
  { name: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ" }, //DUST
  { name: "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp" }, // FIDA
  { name: "BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3" }, // BOP PROTOCOL
  { name: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" }, // USDC
  { name: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i" }, // UST
  { name: "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP" } // AURY
]

const NonVerifiedTwitter = () => {
  return (
    <a className="flex items-center w-max bg-twitter-blue text-white p-1 rounded-full text-xs font-semibold hover:opacity-75 hover:cursor-pointer" href="https://naming.bonfida.org/twitter" target="_blank" rel="noopener">
      <BsTwitter className="mr-2 text-white h-3 w-3"/>Link Twitter Handle
    </a>
  )
}


const Profile = () => {
    const { bonfidaUsername, walletAddress, compactWalletAddress, tokenCollection, setTokenCollection, nftCollection, setNFTCollection, twitterUsername } = useContext(ProfileContext);
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const { connection } = useConnection();
    const [transactionHistory, setTransactionHistory] = React.useState(null);
    const [domainCollection, setDomainCollection] = useState<Result[] | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    const mounted = useRef(true);

    const metaplex = new Metaplex(connection);

    const copyAddress = useCallback(async () => {
      if (walletAddress) {
          await navigator.clipboard.writeText(walletAddress);
          setCopied(true);
          setTimeout(() => setCopied(false), 400);
      }
  }, [walletAddress]);

    const getSNSAccounts = async () => {
      try{
          const domains = await getAllDomains(connection, publicKey);
          const registries = await NameRegistryState.retrieveBatch(connection, [
            ...domains,
          ]);
          const reverses = await performReverseLookupBatch(connection, [
            ...domains,
          ]);
          const _domainCollection: Result[] = [];
          for (let i = 0; i < domains.length; i++) {
            _domainCollection.push({
              pubkey: domains[i],
              registry: registries[i]!,
              reverse: reverses[i]!,
            });
          }
          if (mounted.current) {
            setDomainCollection(_domainCollection)
            mounted.current = false;
          }
      } catch (error) {
        console.log(error);
      }
    }

    const getTokenAccounts = async () => {
      try{
        //TODO get the wallet key dynamically
       const tokenAccounts:{[index: string]:any} = await connection.getParsedProgramAccounts(
        // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        TOKEN_PROGRAM_ID,
        {
          filters: [
            { dataSize: 165, }, // number of bytes
            {
              memcmp: {
                offset: 32, // number of bytes
                bytes: walletAddress, // base58 encoded string
              },
            },
          ],
        })

        const filteredTokenAccounts = tokenAccounts?.filter(
          (tokenAmount) => tokenAmount.account.data.parsed.info.tokenAmount.uiAmount > 0.001 && acceptedTokens.some(({ name }) => name === tokenAmount.account.data.parsed.info.mint)
        );

        const sortedTokenAccounts = filteredTokenAccounts?.sort((a, b) => {
          return b.sumAmount - a.sumAmount;
        });

        setTokenCollection(sortedTokenAccounts);
        console.log(sortedTokenAccounts);
      } catch (error) {
        console.log(error);
      }
  }

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletAddress,
    connection,
  });

  // const getNfts = async () => {
  //   try{
  //     const nftAccounts = await metaplex.nfts().findAllByOwner(publicKey);
  //     // loop over every nftAccount then findByMint and return that image src to console log
  //     for (let i = 0; i < nftAccounts.length; i++) {
  //       const nftAccount = nftAccounts[i];
  //       const nft = await metaplex.nfts().findByMint(nftAccount.mint);
  //       // push nft to nftAccounts array
  //       nftAccounts.push(nft);
  //       console.log(nftAccounts);
  //       setNFTCollection(nftAccounts);
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  const VerifiedTwitter = () => {
    return (
      <a className="flex items-center w-max bg-twitter-blue text-white p-1 rounded-full text-xs font-semibold hover:opacity-75 hover:cursor-pointer" href="https://naming.bonfida.org/twitter" target="_blank" rel="noopener">
          <BsTwitter className="mr-2 text-white h-3 w-3"/>@{twitterUsername}
      </a>
    )
  }

  useEffect(() => {
    getTokenAccounts();
    getSNSAccounts();
  }, [publicKey])
  
  // if (!publicKey) return <></>;
  // if (error === true) return <div>Have some error</div>;
  // if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="What if we assembled a group of people to buy a futbol club?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container xl>
                <Navigation/>
                <Grid.Container gap={2} justify="center"> 
                    <Grid xs={12} sm={12} md={1} lg={1} direction="column">
                        <AppBar/>
                    </Grid> 

                    <Grid xs={12} sm={12} md={11} lg={11}>
                      <Grid.Container direction="column">
                        <Grid>
                          <Grid.Container direction="row" alignItems="center">
                              <Grid>
                                  <img 
                                    className="w-24 h-24 rounded-full"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
                              </Grid>
                              <Spacer/>
                              <Grid>
                                  <Row className="items-center">
                                      <Col>
                                        <Row align="center">
                                          <span className="mr-2 text-4xl font-normal text-dracula">{bonfidaUsername ? bonfidaUsername + `.sol` : compactWalletAddress}</span>
                                          <span onClick={copyAddress} className="flex items-center w-min bg-gray-200 text-dracula my-1.5 px-2.5 py-1 rounded-full text-xs font-semibold hover:opacity-80 hover:cursor-pointer">
                                            {compactWalletAddress}
                                          </span>
                                        </Row>
                                        <Spacer y={0.5}/>
                                        <a className="flex items-center w-min bg-twitter-blue text-white my-1.5 px-2.5 py-1 rounded-full text-xs font-semibold hover:opacity-80 hover:cursor-pointer" href={`https://twitter.com/${twitterUsername}`} target="_blank" rel="noopener">
                                          {twitterUsername ? <VerifiedTwitter/> : <NonVerifiedTwitter/>}
                                        </a>
                                      </Col>
                                  </Row>
                              </Grid>
                          </Grid.Container>
                        </Grid>

                        <Spacer y={2.5}/>

                        <Grid>
                          <Tab.Group>
                            <Tab.List>
                              <Grid.Container alignContent="flex-end" alignItems="flex-end">
                                <Grid xs={12}>
                                  <Tab className={({ selected }) =>
                                    selected ? 'font-semibold text-white text-normal bg-clean-blue rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-normal rounded-xl px-2 py-1'}>
                                    <Grid.Container gap={1} alignItems="center" alignContent="center">
                                      <Grid>
                                        Coins
                                      </Grid>
                                      <Grid>
                                        <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                          {tokenCollection ? tokenCollection.length : 0}
                                        </div>
                                      </Grid>
                                    </Grid.Container>
                                  </Tab>
                                  <Tab className={({ selected }) =>
                                    selected ? 'font-semibold text-white text-normal bg-clean-blue rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-normal rounded-xl px-2 py-1'}>
                                    <Grid.Container gap={1} alignItems="center" alignContent="center">
                                      <Grid>
                                        Collectibles
                                      </Grid>
                                      <Grid>
                                        <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                          {nfts ? nfts.length : 0}
                                        </div>
                                      </Grid>
                                    </Grid.Container>
                                  </Tab>
                                  <Tab className={({ selected }) =>
                                    selected ? 'font-semibold text-white text-normal bg-clean-blue rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-normal rounded-xl px-2 py-1'}>
                                    <Grid.Container gap={1} alignItems="center" alignContent="center">
                                      <Grid>
                                        Domains
                                      </Grid>
                                      <Grid>
                                        <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                          {domainCollection ? domainCollection.length : 0}
                                        </div>
                                      </Grid>
                                    </Grid.Container>
                                  </Tab>
                                </Grid>
                              </Grid.Container>
                            </Tab.List>

                            <Spacer y={2.5}/>

                            {/* Coins Tab */}
                            <Tab.Panels>
                              <Tab.Panel>
                                <div className="">
                                  <Grid.Container gap={1}>
                                    {tokenCollection && tokenCollection.length > 0 ? (
                                      tokenCollection.map(account => (
                                        <Grid xs={4}>
                                          <div className="bg-gray-100 w-full rounded-xl p-2 shadow-sm">
                                            <Grid.Container gap={2} justify="space-around" alignItems="center">
                                              <Grid xs={3}>
                                                <TokenIcon mint={account.account.data["parsed"]["info"]["mint"]}/>
                                              </Grid>
                                              <Grid className="text-sm" xs={5}>
                                                <Col>
                                                    <p className="text-sm font-semibold">
                                                      {<TokenName mint={account.account.data["parsed"]["info"]["mint"]}/> ? <TokenName mint={account.account.data["parsed"]["info"]["mint"]}/> : account.account.data["parsed"]["info"]["mint"]}
                                                    </p>
                                                    <div className="text-dracula">
                                                      {(account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]).toFixed(4)}
                                                      <span className="ml-1">{<TokenSymbol mint={account.account.data["parsed"]["info"]["mint"]}/> ? <TokenSymbol mint={account.account.data["parsed"]["info"]["mint"]}/> : account.account.data["parsed"]["info"]["mint"]}</span>
                                                    </div>
                                                </Col>
                                              </Grid>
                                              <Grid className="text-sm" xs={4} alignContent="center">
                                                  <Col>
                                                    <span className="font-semibold">
                                                      $<TokenPrice tokenAddress={(account.account.data["parsed"]["info"]["mint"])} sumAmount={(account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"])}/>
                                                    </span>
                                                    <div className="text-dracula font-semibold">
                                                      <TokenChange tokenAddress={(account.account.data["parsed"]["info"]["mint"])}/>
                                                    </div>
                                                  </Col>
                                              </Grid>
                                            </Grid.Container>
                                          </div>
                                        </Grid>
                                        ))
                                        ) : (
                                          <div className="flex justify-center">
                                            No coins.
                                          </div>
                                        )}
                                  </Grid.Container>
                                </div>
                              </Tab.Panel>
                              
                              {/* Collectibles Tab Panel */}
                              <Tab.Panel>
                                <Grid.Container gap={2}>
                                {nfts && nfts.length > 0 ? (
                                  nfts.map(nft => (
                                    <Grid xs={2}>
                                      <NftCard key={nft.mint} details={nft} />
                                    </Grid>
                                    ))
                                    ) : (
                                    <div className="flex justify-center">
                                      No coins.
                                    </div>
                                )}
                                </Grid.Container>
                              </Tab.Panel>

                              {/* Domains Tab Panel */}
                              <Tab.Panel>
                                <Grid.Container gap={2} alignItems="center">
                                    {domainCollection && domainCollection.length > 0 ? (
                                      domainCollection
                                      .map(domains => (
                                        <Grid key={domains.reverse} xs={2}>
                                          <div className="w-full flex items-center justify-center bg-gray-200 p-2 rounded-xl h-16 shadow-sm">
                                            <span className="flex items-center justify-center text-normal font-semibold text-dracula">
                                              <HiOutlineIdentification className="mr-2 text-dracula w-5 h-5"/>{domains.reverse}.sol
                                            </span>
                                          </div>
                                        </Grid>
                                        ))
                                        ) : (
                                      <div className="flex justify-center">
                                        No domains found.
                                      </div>
                                    )}
                                </Grid.Container>
                              </Tab.Panel>
                            </Tab.Panels>

                          </Tab.Group>
                        </Grid>
                      </Grid.Container>
                      
                    </Grid> 
                    {/* end of column */}
                </Grid.Container>
            </Container>
        </div>
    );
};

export default Profile;
