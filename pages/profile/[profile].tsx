import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from "react"
import { useRouter } from 'next/router'
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import Head from 'next/head';
import axios from 'axios';
import Navigation from "../../components/Navigation"
import { Container, Grid, Spacer, Row, Col, Collapse, Progress, Loading, Table } from '@nextui-org/react';
import { ProfileContext } from "../../context/ProfileContext"
import { TokenIcon, TokenName, TokenSymbol, TokenTotalPrice, TokenChange } from "../../utils/tokenList";
import AppBar from "../../components/AppBar";
import { Tab } from '@headlessui/react'
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { BsTwitter } from "react-icons/bs";
import { getAllDomains, NameRegistryState, performReverseLookupBatch } from "@bonfida/spl-name-service";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { NftCard } from "../../components/Profile/NftGalleryCard"
import useSWR from "swr"
import { FiPlusSquare } from "react-icons/fi";
import Skeleton from 'react-loading-skeleton'
import Footer from '@components/Footer';
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";
import { fetchSolanaNameServiceName } from "@utils/name-service"
import { WalletMultiButton } from '@components/WalletConnect';

interface Result {
  pubkey: PublicKey;
  registry: NameRegistryState;
  reverse: string;
}

interface TokenAccount {
  publicKey: string;
  mint: string;
  amount: number;
  decimals: number;
  symbol: string;
  logo: string | undefined;
}

const TOKEN_LIST_API =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json";

// Mint address of tokens we display
const acceptedTokens = [
  { name: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ" }, //DUST
  { name: "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp" }, // FIDA
  { name: "BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3" }, // BOP PROTOCOL
  { name: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" }, // USDC
  { name: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i" }, // UST
  { name: "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP" }, // AURY
  { name: "So11111111111111111111111111111111111111112" } // SOL
]

const NonVerifiedTwitter = () => {
  return (
    <a className="flex items-center w-max bg-twitter-blue text-white text-xs font-semibold hover:opacity-75 hover:cursor-pointer" href="https://naming.bonfida.org/twitter" target="_blank" rel="noopener">
      <BsTwitter className="mr-2 text-white"/>Link Twitter Handle
    </a>
  )
}

const fetcher = url => fetch(url).then(r => r.json())

const Profile = () => {
    const router = useRouter()
    const { profile } = router.query
    const publicAddress = profile as string;
    const formattedPublicKey = new PublicKey(parseFloat(publicAddress));

    const { data } = useSWR(`https://api.helius.xyz/v0/addresses/${publicAddress}/transactions?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c`, fetcher);
    const { data: allSNSAccounts } = useSWR(`https://api.helius.xyz/v0/addresses/${formattedPublicKey}/names?api-key=ba739f74-3869-40bb-bfd3-3cfc4be8ef7c`, fetcher, { refreshInterval: 35000 });

    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState<TokenAccount[] | null>(null);
    
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const base58PubKey = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const { connection } = useConnection();
    const [transactionHistory, setTransactionHistory] = React.useState(null);
    const [twitterNameLookup, setTwitterNameLookup] = useState("");
    const [bonfidaNameLookup, setBonfidaNameLookup] = useState("");
    const [domainCollection, setDomainCollection] = useState<Result[] | any>([]);
    const [tokenCollection, setTokenCollection] = useState<any>([]);
    const [copied, setCopied] = useState(false);

    const mounted = useRef(true);

    const shortenedWalletAddress = useMemo(() => {
      if (!publicAddress) return null;
      return publicAddress.slice(0, 4) + '..' + publicAddress.slice(-4);
  }, [publicAddress]);

    const copyAddress = useCallback(async () => {
      if (publicAddress) {
          await navigator.clipboard.writeText(publicAddress);
          setCopied(true);
          setTimeout(() => setCopied(false), 400);
      }
  }, [publicAddress]);

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
          console.log(domainCollection)
          mounted.current = false;
        }
    } catch (error) {
      console.log(error);
    }
  }

    const getTwitterName = async () => {
        try{
            const registry = await getHandleAndRegistryKey(connection, publicKey);
            setTwitterNameLookup(registry[0]);
        } catch (error){
            console.log(error)
        }
    }

    // Bonfida SNS Username
    const loadSNSUsername = async () => {
      try {
          const username = await fetchSolanaNameServiceName(connection, publicAddress);
          setBonfidaNameLookup(username.solanaDomain);
      } catch (error) {
          console.log(error);
      }
    }

    const fetchTokens = async () => {
        // Get Token Accounts owned by wallet
        const {
          data: { tokens: tokenList },
        } = await axios.get(TOKEN_LIST_API);
        const response = await connection.getParsedTokenAccountsByOwner(
          formattedPublicKey,
          { programId: TOKEN_PROGRAM_ID }
        );
  
        // Parsing Token info
        let parsedTokens: TokenAccount[] = [];
        response.value.forEach((tokenAccount) => {
          const mint = tokenAccount.account.data["parsed"]["info"]["mint"];
          const amount = Number(
            tokenAccount.account.data["parsed"]["info"]["tokenAmount"]["amount"]
          );
          if (amount) {
            const tokenMetadata = tokenList.find(
              (tokenInfo: any) => tokenInfo.address === mint
            );
            if (tokenMetadata) {
              parsedTokens.push({
                publicKey: tokenAccount.pubkey.toBase58(),
                mint,
                amount,
                decimals: tokenMetadata.decimals,
                symbol: tokenMetadata.symbol,
                logo: tokenMetadata.logoURI,
              });
            }
          }
        });
        setTokens(parsedTokens);
    };

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
                bytes: publicAddress, // base58 encoded string
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
        //console.log(sortedTokenAccounts);
      } catch (error) {
        console.log(error);
      }
  }

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicAddress,
    connection,
  });

  const VerifiedTwitter = () => {
    return (
      <a className="flex items-center w-max bg-twitter-blue text-white rounded-full text-xs font-semibold hover:opacity-75 hover:cursor-pointer" href={`https://twitter.com/${twitterNameLookup}`} target="_blank" rel="noopener">
        @{twitterNameLookup}
      </a>
    )
  }

  const portfolioItemTotal = (tokenCollection.length + 1) + nfts.length;

  useEffect(() => {
    loadSNSUsername();
    getSNSAccounts();
    getTwitterName();
    getTokenAccounts();

    if (connected){
      router.push(`/profile/${base58PubKey}`);
    }
  }, [publicAddress]);
  
  // if (!publicKey) return <></>;
  // if (error === true) return <div>Have some error</div>;
  // if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="Social meets degeneracy." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation/>

            <Container xl>
            <Grid.Container justify="center">
                    <Grid xs={0} sm={0} md={1.5} lg={1.5}>
                        <AppBar/>
                    </Grid>
                    <Grid className="p-4" xs={12} sm={12} md={10.5} lg={10.5} direction="column">
                      {connected ? (
                        <>
                          <Grid.Container direction="row" justify="space-between">
                            <Grid xs={12} sm={12} md={9.5} lg={9.5}>
                                <Grid.Container direction='column'>
                                    <Grid>
                                    <Grid.Container gap={1} direction="column">
                                      {/* Profile Intro */}
                                      <Grid>
                                        <div className="grid grid-cols-2 grid-rows-1 items-center space-between">
                                          <div className="flex items-center">
                                            <img 
                                              className="mr-4 w-24 h-24 rounded-full"
                                              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
                                            <div>
                                            <Col>
                                                  <Row align="center">
                                                    <span className="mr-2.5 text-3xl font-normal text-dracula">{bonfidaNameLookup ? bonfidaNameLookup + ".sol" : shortenedWalletAddress}</span>
                                                    <span onClick={copyAddress} className="flex items-center w-min bg-gray-200 text-dracula px-2.5 py-1 rounded-full text-xs font-semibold hover:opacity-80 hover:cursor-pointer">
                                                      {shortenedWalletAddress}
                                                    </span>
                                                  </Row>
                                                  <Spacer y={0.5}/>
                                                  <Row>
                                                    <a className="flex items-center w-min bg-twitter-blue text-white px-2.5 py-1 rounded-xl text-xs font-semibold hover:opacity-80 hover:cursor-pointer" href={`https://twitter.com/${twitterNameLookup}`} target="_blank" rel="noopener">
                                                      {twitterNameLookup ? <VerifiedTwitter/> : <NonVerifiedTwitter/>}
                                                    </a>
                                                  </Row>
                                                  <Spacer y={0.5}/>
                                                  <div className="flex items-center justify-between text-sm">
                                                    <div>
                                                      0 Followers
                                                    </div>
                                                    <div>
                                                      0 Following
                                                    </div>
                                                  </div>
                                                </Col>
                                            </div>
                                          </div>

                                          <div className="min-w-fit">
                                          <Col className="bg-gray-100 border border-gray-200 rounded-xl p-4">
                                              <Row>
                                                <span className="text-sm font-semibold">Net Worth</span>
                                              </Row>
                                              <Spacer y={0.5}/>
                                              <Row align="center">
                                                <Col className="text-xs">NFTs</Col>
                                                <Col>
                                                  <Progress size="sm" color="success" value={((nfts.length /portfolioItemTotal) * 100)} />
                                                </Col>
                                                <Col className="text-xs ml-2 text-right">
                                                  {((nfts.length /portfolioItemTotal) * 100).toFixed(2)}%
                                                </Col>
                                              </Row>
                                              <Row align="center">
                                                <Col className="text-xs">Wallet</Col>
                                                <Col>
                                                  <Progress size="sm" color="secondary" value={((tokenCollection.length /portfolioItemTotal) * 100)} />
                                                </Col>
                                                <Col className="text-xs ml-2 text-right">
                                                  {((tokenCollection.length /portfolioItemTotal) * 100).toFixed(2)}%
                                                </Col>
                                              </Row>
                                              <Row align="center">
                                                <Col className="text-xs">Domains</Col>
                                                <Col className="w-full">
                                                  <Progress className="w-full" size="sm" color="primary" value={((domainCollection.length /portfolioItemTotal) * 100)} />
                                                </Col>
                                                <Col className="text-xs ml-2 text-right">
                                                  {((domainCollection.length /portfolioItemTotal) * 100).toFixed(2)}%
                                                </Col>
                                              </Row>
                                            </Col>
                                          </div>
                                        </div>
                                      </Grid>
                                      
                                      <Grid>
                                        <Tab.Group>
                                          <Tab.List>
                                            <Grid.Container className="my-5 p-2 border border-gray-200 rounded-xl" alignContent="flex-end" alignItems="flex-end">
                                              <Grid xs={12}>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-sm rounded-xl px-2 py-1'}>
                                                  <Grid.Container gap={1} alignItems="center" alignContent="center">
                                                    <Grid>
                                                      Wallet
                                                    </Grid>
                                                    <Grid>
                                                      <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                                        {tokenCollection ? tokenCollection.length + domainCollection.length : 0}
                                                      </div>
                                                    </Grid>
                                                  </Grid.Container>
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-sm rounded-xl px-2 py-1'}>
                                                  <Grid.Container gap={1} alignItems="center" alignContent="center">
                                                    <Grid>
                                                      NFTs
                                                    </Grid>
                                                    <Grid>
                                                      <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                                        {nfts ? nfts.length : 0}
                                                      </div>
                                                    </Grid>
                                                  </Grid.Container>
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-white text-sm bg_sunrise rounded-xl px-2 py-0.5' : 'font-semibold text-dracula text-sm rounded-xl px-2 py-1'}>
                                                  <Grid.Container gap={1} alignItems="center" alignContent="center">
                                                    <Grid>
                                                      Activity
                                                    </Grid>
                                                    <Grid>
                                                      <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                                        {data ? data.length : 0}
                                                      </div>
                                                    </Grid>
                                                  </Grid.Container>
                                                </Tab>
                                              </Grid>
                                            </Grid.Container>
                                          </Tab.List>

                                          {/* Portfolio Tab */}
                                          <Tab.Panels>
                                            <Tab.Panel>
                                              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                                                <div className="">
                                                <Collapse
                                                        expanded={true}
                                                        className="w-full h-full"
                                                        bordered
                                                        title={<span className="text-normal font-semibold text-dracula">Coins ({tokenCollection.length + 1})</span>}
                                                        arrowIcon={<FiPlusSquare/>}
                                                      >
                                                  <Grid.Container direction="column">
                                                    {tokenCollection && tokenCollection.length > 0 ? (
                                                      tokenCollection.map(account => (
                                                        <>
                                                      <Grid xs={12}>
                                                        <div className="rounded-xl hover:bg-gray-50 w-full h-full px-4">
                                                        <Row align="center">
                                                          <Col span={3}>
                                                            <TokenIcon mint={account.mint}/>
                                                          </Col>
                                                          <Col>
                                                            <p className="text-sm font-semibold">
                                                              {<TokenName mint={account.mint}/> ? <TokenName mint={account.mint}/> : account.mint}
                                                            </p>
                                                            <div className="text-dracula text-sm">
                                                              {(account.amount) / LAMPORTS_PER_SOL}
                                                              <span className="ml-1">{<TokenSymbol mint={account.mint}/> ? <TokenSymbol mint={account.mint}/> : account.mint}</span>
                                                            </div>
                                                          </Col>
                                                          <Col>
                                                            <span className="font-semibold text-sm">
                                                              {/* $<TokenTotalPrice tokenAddress={(account.mint)} sumAmount={(account.amount)}/> */}
                                                            </span>
                                                            <div className="text-dracula font-semibold text-sm">
                                                              {/* <TokenChange tokenAddress={(account.mint)}/> */}
                                                            </div>
                                                          </Col>
                                                        </Row>
                                                        </div>
                                                      </Grid>
                                                      </>
                                                      ))
                                                      ) : (
                                                        <Skeleton count={5} />
                                                      )}
                                                    </Grid.Container>
                                                    </Collapse>
                                                </div>
                                                <div className="">
                                                <Collapse
                                                        expanded={true}
                                                        className="w-full h-full"
                                                        bordered
                                                        title={<span className="text-normal font-semibold text-dracula">Domains ()</span>}
                                                        arrowIcon={<FiPlusSquare/>}
                                                      >
                                                        <Grid.Container gap={2} direction="column">
                                                          {allSNSAccounts && allSNSAccounts.length > 0 ? (
                                                            allSNSAccounts.map(domains => (
                                                              <Grid className="hover:bg-gray-50 rounded-xl h-full" xs={12}>
                                                                <Row align="center">
                                                                  <Col span={1}>
                                                                    <TokenIcon mint="EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp"/>
                                                                  </Col>
                                                                  <Col offset={1}>
                                                                    <span className="flex items-center text-sm text-dracula">
                                                                      {domains}.sol
                                                                    </span>
                                                                  </Col>
                                                                </Row>
                                                              </Grid>
                                                              ))
                                                              ) : (
                                                              <Skeleton count={5} />
                                                          )}
                                                      </Grid.Container>
                                                      </Collapse>
                                                </div>
                                              </div>
                                            </Tab.Panel>
                                            
                                            {/* Collectibles Tab Panel */}
                                            <Tab.Panel>
                                              <Grid.Container gap={1}>
                                              {nfts && nfts.length > 0 ? (
                                                nfts.map(nft => (
                                                  <Grid xs={6} sm={6} md={3} lg={4} alignContent="flex-start" alignItems="flex-start">
                                                    <div className="rounded-xl w-full">
                                                        <NftCard key={nft.mint} details={nft} />
                                                      <p className="mt-5 text-sm text-dracula font-semibold">{nft.data.symbol}</p>
                                                      <p className="text-sm text-dracula font-normal">{nft.data.name}</p>
                                                    </div>
                                                  </Grid>
                                                  ))
                                                  ) : (
                                                  <div className="flex justify-center">
                                                    No NFTs.
                                                  </div>
                                              )}
                                              </Grid.Container>
                                            </Tab.Panel>

                                            {/* Activity Tab Panel */}
                                            <Tab.Panel>
                                                <div className="grid grid-cols-1 auto-rows-auto gap-4">
                                                  {data && data.length > 0 ? (
                                                    data
                                                    .map(transactionHistory => (
                                                      <div className="p-3 border rounded-xl">
                                                          <div className="flex items-center text-xs mb-2.5">
                                                            <span className="p-1 rounded-full font-semibold bg-gray-200 text-dracula">{transactionHistory.type}</span>
                                                            <span className="ml-2 p-1 rounded-full font-semibold bg-gray-200 text-dracula">{transactionHistory.source}</span>
                                                          </div>
                                                          <div>
                                                            {transactionHistory.description}
                                                          </div>
                                                      </div>
                                                      ))
                                                      ) : (
                                                    <div className="flex justify-center border rounded-xl p-2">
                                                      No transactions found.
                                                    </div>
                                                  )}
                                                </div>
                                            </Tab.Panel>

                                          </Tab.Panels>

                                        </Tab.Group>
                                      </Grid>             
                                    </Grid.Container>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={12} sm={12} md={2.5} lg={2.5}>
                                <Grid.Container direction="column">
                                    <Grid>
                                    <div>
                                        <span className="px-2 py-2 text-xs font-semibold shadow-md text-white bg_sunrise rounded-xl">People to follow</span>
                                    </div>
                                    </Grid>
                                </Grid.Container>  
                            </Grid>
                        </Grid.Container>   
                        </>
                      ) : (
                         <>
                        <div className="flex items-center justify-center h-screen">
                          <WalletMultiButton/>
                        </div>
                         </> 
                      )}
                            
                    </Grid>
                </Grid.Container>
            </Container>
            <Footer/>
        </>
    );
};

export default Profile;
