import { NextSeo } from 'next-seo';
import React, { useEffect, useState, useContext, useCallback, useRef, useMemo } from "react"
import { useRouter } from 'next/router'
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import Navigation from "../../components/Navigation"
import { Container, Grid, Spacer, Row, Col, Collapse, Progress, Loading } from '@nextui-org/react';
import { TokenIcon, TokenName, TokenSymbol, TokenPrice, TokenTotalPrice, TokenChange } from "../../utils/tokenList";
import { Tab } from '@headlessui/react'
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { BsTwitter } from "react-icons/bs";
import { getAllDomains, NameRegistryState, performReverseLookupBatch } from "@bonfida/spl-name-service";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NftCard } from "../../components/Profile/NftGalleryCard"
import useSWR from "swr"
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";
import { fetchSolanaNameServiceName } from "@utils/name-service"
import { WalletMultiButton } from '@components/WalletConnect';
import Table from '@components/Table';
import usePriceFeed from '@hooks/usePriceFeed'
import { useTable, useSortBy } from 'react-table'
import { formatDollar, formatTimeAgo } from '@utils/formatters'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Disclosure } from '@headlessui/react'
import { AiOutlinePlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';

interface Result {
  pubkey: PublicKey;
  registry: NameRegistryState;
  reverse: string;
}

const whitelistedTokens = [
  {
    name: "SOL",
    mintAddress: "So11111111111111111111111111111111111111111"
  },
  {
    name: "WSOL",
    mintAddress: "So11111111111111111111111111111111111111112"
  },
  {
    name: "DUST",
    mintAddress: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ"
  },
  {
    name: "FIDA",
    mintAddress: "EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp"
  },
  {
    name: "BOP",
    mintAddress: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ"
  },
  {
    name: "USDC",
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  },
  {
    name: "UST",
    mintAddress: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i"
  },
  {
    name: "AURY",
    mintAddress: "AURYydfxJib1ZkTir1Jn1J9ECYUtjb6rKQVmtYaixWPP"
  },
  {
    name: "SONAR",
    mintAddress: "sonarX4VtVkQemriJeLm6CKeW3GDMyiBnnAEMw1MRAE"
  },
  {
    name: "PRT",
    mintAddress: "PRT88RkA4Kg5z7pKnezeNH4mafTvtQdfFgpQTGRjz44"
  },
  {
    name: "RAY",
    mintAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"
  },
  {
    name: "SAMO",
    mintAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  },
  {
    name: "ATLAS",
    mintAddress: "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
  },
]

const NonVerifiedTwitter = () => {
  return (
    <a className="flex items-center w-max bg-twitter-blue text-white text-xs font-semibold hover:opacity-75 hover:cursor-pointer" href="https://naming.bonfida.org/twitter" target="_blank" rel="noopener">
      <div className="mr-2">
        <BsTwitter />
      </div>
      Link Twitter Handle
    </a>
  )
}

const fetcher = url => fetch(url).then(r => r.json())

const Profile = () => {
    const router = useRouter()
    const { profile } = router.query
    const publicAddress = profile as string;
    const formattedPublicKey = new PublicKey(parseFloat(publicAddress));

    const { data: publicKeyTransactions } = useSWR(`/api/v1/transactions/${publicAddress}`, fetcher);
    const { data: allSNSAccounts } = useSWR(`/api/v1/nameService/${publicAddress}`, fetcher);
    const { data: solanaMarketPrice } = useSWR(`https://price.jup.ag/v1/price?id=SOL`, fetcher);
    
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const base58PubKey = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const { connection } = useConnection();
    const [SOLBalance, setSOLBalance] = useState(0);
    const [twitterNameLookup, setTwitterNameLookup] = useState("");
    const [bonfidaNameLookup, setBonfidaNameLookup] = useState("");
    const [domainCollection, setDomainCollection] = useState<Result[] | any>([]);
    const [tokenCollection, setTokenCollection] = useState<any>([]);
    const [userTokens, setUserTokens] = useState<any>([]);
    const [fullTokenAccountsValue, setFullTokenAccountsValue] = useState(0);
    const [copied, setCopied] = useState(false);

    const mounted = useRef(true);

    // memoize and remove transactions from publicKeyTransactions that have a type of UNKNOWN
    const filteredTransactions = useMemo(() => {
      if (publicKeyTransactions) {
        return publicKeyTransactions?.data?.filter((transaction: any) => transaction.type !== "UNKNOWN")
      }
    }, [publicKeyTransactions])

    console.log('Your wallet activity :', filteredTransactions)

    const shortenedWalletAddress = useMemo(() => {
      if (!publicAddress) return null;
      return publicAddress.slice(0, 4) + '..' + publicAddress.slice(-4);
  }, [publicAddress]);

    const copyAddress = useCallback(async () => {
      if (publicAddress) {
          await navigator.clipboard.writeText(publicAddress);
          setCopied(true);
          setTimeout(() => setCopied(false), 400);
          toast.success('Wallet address copied.')
      }
  }, [publicAddress]);

  const getSOLBalance = async () => {
    try {
        const walletBalance = await connection.getBalance(publicKey)
        setSOLBalance(walletBalance / LAMPORTS_PER_SOL)
    }catch (error){
        console.log(error)
    }
  }

  function UserTokenTable({columns, data}){ 
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    )
    return(
      <table className="w-full text-left" {...getTableProps()}>
        <thead className="border-b h-16">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                        : ''
                      }
                    </span>
                </th>
                ))}
            </tr>
          ))}
        </thead>
          <tbody classname="text-left" {...getTableBodyProps()}>
            <tr className="hover:bg-gray-50 cursor-pointer border-b">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10">
                    <TokenIcon mint="So11111111111111111111111111111111111111112"/>
                  </div>
                  <div className="ml-2">
                    <div className="text-dracula text-xs font-semibold">
                      <span>
                        <TokenSymbol mint="So11111111111111111111111111111111111111112"/>
                      </span>
                    </div>
                    <p className="text-sm font-xs">
                      Solana
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center">
                    <div>
                      <p className="text-xs font-semibold">
                        ${(SOLBalance * solanaMarketPrice?.data?.price).toFixed(4)}
                      </p>
                      <div className="text-dracula text-xs">
                          {SOLBalance}
                          <span className="ml-1">
                            <TokenSymbol mint="So11111111111111111111111111111111111111112"/>
                          </span>
                      </div>
                    </div>
                </div>
              </td>
              <td>
              <div className="flex items-center">
                <div className="">
                  <p className="text-xs font-semibold">
                    $<TokenPrice mintAddress="So11111111111111111111111111111111111111112"/> 
                  </p>
                  <div className="text-dracula font-semibold text-xs">
                    <TokenChange tokenAddress="So11111111111111111111111111111111111111112"/>
                  </div>
                </div>
              </div>
              </td>
            </tr>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="hover:bg-gray-50 rounded-xl cursor-pointer border-b" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td className="py-3" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )
  }

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

        // filter out tokenAccounts that have a uiAmount less than 0.001 and are in the whitelistedTokens array
        const filteredTokenAccounts = tokenAccounts?.filter(
          (tokenAmount) => tokenAmount.account.data.parsed.info.tokenAmount.uiAmount > 0.001 && 
          whitelistedTokens.some(({ mintAddress }) => mintAddress === tokenAmount.account.data.parsed.info.mint)
        );

        // clean up filteredTokenAccounts array, map over the filteredTokenAccounts, return the mint and uiAmount
        const tokenAccountsMapped = filteredTokenAccounts?.map((tokenAmount) => {
          return {
            mint: tokenAmount.account.data.parsed.info.mint,
            amount: tokenAmount.account.data.parsed.info.tokenAmount.uiAmount,
          }
        });

        // for each mint in the tokenAccountsMapped, fetch the token price from https://price.jup.ag/v1/price?id={mint}, return data.price. match the price and id to the mint in the userTokens array and return it
        const tokenAccountsMappedWithPrice = await Promise.all(tokenAccountsMapped?.map(async (tokenAmount) => {
          const tokenPrice = await fetch(`https://price.jup.ag/v1/price?id=${tokenAmount.mint}`).then((res) => res.json());
          return {
            mint: tokenAmount.mint,
            amount: tokenAmount.amount,
            price: tokenPrice.data.price,
            fullUSDValue: tokenPrice.data.price * tokenAmount.amount
          }
        }));

        // for each object in the tokenAccountsMappedWithPrice array, add up the fullUSDValue and return it
        const totalUSDValue = tokenAccountsMappedWithPrice?.reduce((acc, tokenAmount) => {
          return acc + tokenAmount.fullUSDValue
        }, 0);
        
        setFullTokenAccountsValue(totalUSDValue);
        setUserTokens(tokenAccountsMappedWithPrice);
      } catch (error) {
        console.log(error);
      }
  }

  // const getStakeAccounts = async () => {
  //   try{

  // }

  const tokenListColumns = [
    {
        Header: () => <span className="text-sm font-base md:font-semibold">Token</span>,
        id: 'coin',
        Cell: (row) => {
          return(
            <div className="flex items-center">
              <div className="w-10 h-10">
                <TokenIcon mint={row.row.original.mint}/>
              </div>
              <div className="ml-2">
                <div className="text-dracula text-xs font-semibold">
                  <span>{<TokenSymbol mint={row.row.original.mint}/> ? <TokenSymbol mint={row.row.original.mint}/> : row.row.original.mint}</span>
                </div>
                <p className="text-sm font-xs">
                  <TokenName mint={row.row.original.mint}/>
                </p>
              </div>
            </div>
          )
        },
    },
    {
      Header: ()=> <span className="text-sm font-base md:font-semibold">Balance</span>,
      id: 'Balance',
      Cell: (row) => {
          return(
            <div className="flex items-center">
              <div className="">
                <p className="text-xs font-semibold">
                  ${(row.row.original.fullUSDValue).toFixed(4)}
                </p>
                <div className="text-dracula text-xs">
                  {(row.row.original.amount.toFixed(4))}
                  <span className="ml-1">{<TokenSymbol mint={row.row.original.mint}/> ? <TokenSymbol mint={row.row.original.mint}/> : row.row.original.mint}</span>
                </div>
              </div>
            </div>
          )
      }
  },
    {
      Header: () => <span className="text-sm font-semibold md:font-extrabold">Price</span>,
      id: 'price',
      Cell: (row) => {
          return(
            <div className="flex items-center">
              <div className="">
                <p className="text-xs font-semibold">
                  $<TokenPrice mintAddress={row.row.original.mint}/> 
                </p>
                <div className="text-dracula font-semibold text-xs">
                  <TokenChange tokenAddress={(row.row.original.mint)}/>
                </div>
              </div>
            </div>
          )
      }
  },
  ]

  const domainTableData = useMemo(() => (allSNSAccounts ? allSNSAccounts?.data?.domainNames : []), [allSNSAccounts])
  const domainListColumns = [
    {
      Header: () => <span className="text-sm font-semibold md:font-semibold">Domains</span>,
      id: 'name',
      accessor: (row) => { return <span className="text-dracula text-sm font-base font-semibold">{row}.sol</span>},
  }
  ]

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

  const portfolioItemTotal = (userTokens.length) + (SOLBalance ? 1 : 0) + (tokenCollection.length) + nfts.length;

  // Sample data
  const data = [
    { 
      name: 'Net Worth', 
      x: 8 
    },
    { 
      name: 'Paperhandness', 
      x: 4 
    },
    { name: 'Trader', x: 3 },
    { name: 'NFT Enjoyer', x: 9 },
];

  useEffect(() => {
    getSOLBalance();
    loadSNSUsername();
    getSNSAccounts();
    getTwitterName();
    getTokenAccounts();

    if (connected){
      router.push(`/profile/${base58PubKey}`);
    } else {
      router.push(`/`);
    }
  }, [publicAddress]);

  return (
        <>
            <NextSeo
                title="My Profile - Track your Solana NFTs, tokens, and journey across the ecosystem."
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'My Profile - Track your Solana NFTs, tokens, and journey across the ecosystem.',
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

            <section className="my-5">
            <Container fluid>
            <Grid.Container justify="center">
                    <Grid xs={12} sm={12} md={12} lg={12} direction="column">
                      {connected ? (
                        <>
                          <Grid.Container direction="row" justify="space-between">
                            <Grid xs={12} sm={12} md={12} lg={12}>
                                <Grid.Container direction='column'>
                                    <Grid>
                                    <Grid.Container direction="column">
                                      {/* Profile Intro */}
                                      <Grid>
                                        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 items-center space-between gap-4">
                                          <div className="flex items-center">
                                            <img 
                                              className="mr-4 w-24 h-24 rounded-full"
                                              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
                                            <div>
                                            <Col>
                                              <Row align="center">
                                                <span className="mr-2.5 text-xl md:text-3xl font-normal text-dracula">{bonfidaNameLookup ? bonfidaNameLookup + ".sol" : shortenedWalletAddress}</span>
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
                                              <div className="flex items-center text-sm">
                                                <div>
                                                  0 Followers
                                                </div>
                                                <div className="ml-2">
                                                  0 Following
                                                </div>
                                              </div>
                                            </Col>
                                            </div>
                                          </div>

                                          
                                          </div>
                                      </Grid>
                                      
                                      <Grid>
                                        <Tab.Group>
                                          <Tab.List className="border-b my-5">
                                            <Grid.Container className="rounded-full" alignContent="center" alignItems="center">
                                              <Grid xs={12}>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-dracula text-sm md:text-base border-gray-400 border-b-2' : 'font-semibold text-gray-400 text-sm md:text-base'}>
                                                  <Grid.Container gap={1} alignItems="center" alignContent="center">
                                                    <Grid>
                                                      Wallet
                                                    </Grid>
                                                    <Grid>
                                                      <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                                        {SOLBalance ? userTokens.length + 1 + domainCollection.length : 0}
                                                      </div>
                                                    </Grid>
                                                  </Grid.Container>
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                  selected ? 'font-semibold text-dracula text-sm md:text-base border-gray-400 border-b-2' : 'font-semibold text-gray-400 text-sm md:text-base'}>
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
                                                  selected ? 'font-semibold text-dracula text-sm md:text-base border-gray-400 border-b-2' : 'font-semibold text-gray-400 text-sm md:text-base'}>
                                                  <Grid.Container gap={1} alignItems="center" alignContent="center">
                                                    <Grid>
                                                      Activity
                                                    </Grid>
                                                    <Grid>
                                                      <div className="text-xs bg-gray-200 text-dracula px-1.5 py-0.5 rounded-md">
                                                        {publicKeyTransactions ? filteredTransactions.length : 0}
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
                                              <div className="grid grid-cols-1 grid-rows-1 gap-4">
                                                <div className="grid grid-cols-1 auto-rows-auto rounded-xl">
                                                  <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-4 h-full">

                                                    {/* NET WORTH PANEL */}
                                                    <div className="bg-gray-50 border rounded-xl p-4">
                                                      <div className="flex flex-col bg-white p-2 border rounded-xl">
                                                        <span className="text-sm font-semibold">Net Worth</span>
                                                        <span className="text-2xl font-extrabold">{formatDollar((SOLBalance * solanaMarketPrice?.data?.price) + fullTokenAccountsValue) ? formatDollar((SOLBalance * solanaMarketPrice?.data?.price) + fullTokenAccountsValue) : "$0" }</span>
                                                      </div>
                                                      <Spacer y={0.25}/>
                                                        <div className="">
                                                          <Col className="bg-white border rounded-xl p-4">
                                                            <Row>
                                                              <span className="text-sm font-semibold">Allocation</span>
                                                            </Row>
                                                            <Spacer y={0.25}/>
                                                            <Row align="center">
                                                              <Col className="text-xs">Collectibles</Col>
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
                                                                <Progress size="sm" color="secondary" value={(((userTokens.length + 1 + domainCollection.length) /portfolioItemTotal) * 100)} />
                                                              </Col>
                                                              <Col className="text-xs ml-2 text-right">
                                                                {(((userTokens.length + 1 + domainCollection.length) / portfolioItemTotal) * 100).toFixed(2)}%
                                                              </Col>
                                                            </Row>
                                                            <Row align="center">
                                                              <Col className="text-xs">Domains</Col>
                                                              <Col className="w-full">
                                                                <Progress className="w-full" size="sm" color="primary" value={((domainCollection.length /portfolioItemTotal) * 100)} />
                                                              </Col>
                                                              <Col className="text-xs ml-2 text-right">
                                                                {((domainCollection.length / portfolioItemTotal) * 100).toFixed(2)}%
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                        </div>
                                                    </div>

                                                    {/* DEGENSCORE PANEL */}
                                                    <div className="bg-gray-50 border rounded-xl p-4">
                                                      <span className="text-sm font-semibold">User Type:</span>
                                                      <ResponsiveContainer className="text-xs" width="100%" height={300}>
                                                          <RadarChart outerRadius="80%" data={data}>
                                                            <PolarGrid />
                                                            <PolarAngleAxis dataKey="name" />
                                                            <PolarRadiusAxis orientation="middle" tick={false} axisLine={false} domain={[0, 10]} />
                                                            <Radar dataKey="x" stroke="green" fill="green" fillOpacity={0.25} />
                                                          </RadarChart>
                                                      </ResponsiveContainer>
                                                    </div>
                                                
                                                  
                                                  </div>
                                                  <div className="my-2.5">
                                                    <UserTokenTable columns={tokenListColumns} data={userTokens} />
                                                    <Table columns={domainListColumns} data={domainTableData} />
                                                    <div className="flex items-center justify-center">
                                                      <a target="_blank" href="https://twitter.com/@storkdrops_" className="w-64 flex justify-center my-2.5 p-2 text-center bg-gray-50 hover:bg-gray-200 text-dracula rounded-full text-xs font-semibold">
                                                        Missing your favorite token? Let us know!
                                                      </a>
                                                    </div>
                                                  </div>

                                                  <div className="my-2.5">
                                                    <Disclosure defaultOpen>
                                                      {({ open }) => (
                                                        <>
                                                          <Disclosure.Button className="flex items-center justify-between border hover:bg-gray-50 rounded-xl text-dracula w-full p-2">
                                                            <span className="text-xl font-semibold">Apps</span>
                                                            <AiOutlinePlusSquare/>
                                                          </Disclosure.Button>
                                                          <Disclosure.Panel className="p-2 text-sm text-gray-500">
                                                              Coming Soon..
                                                          </Disclosure.Panel>
                                                        </>
                                                      )}
                                                    </Disclosure>
                                                  </div>


                                                </div>
                                              </div>
                                            </Tab.Panel>
                                            
                                            {/* Collectibles Tab Panel */}
                                            <Tab.Panel>
                                            <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-auto gap-4 items-end">
                                              {nfts && nfts.length > 0 ? (
                                                nfts.map(nft => (
                                                      <div className="">
                                                        <NftCard details={nft} />
                                                        <p className="mt-5 text-base text-dracula font-semibold">{nft.data.symbol}</p>
                                                        <p className="text-sm text-dracula font-base">{nft.data.name}</p>
                                                      </div>
                                                  ))
                                                  ) : (
                                                  <div className="flex justify-center">
                                                    No NFTs.
                                                  </div>
                                              )}
                                              </div>
                                            </Tab.Panel>

                                            {/* Activity Tab Panel */}
                                            <Tab.Panel>
                                              <div className="grid grid-cols-1 auto-rows-auto gap-4 text-xs">
                                                {filteredTransactions && filteredTransactions.length > 0 ? (
                                                  filteredTransactions.map(transactionHistory => (
                                                    <div className="p-3 border rounded-xl">
                                                        <div className="flex items-center">
                                                          <span className="p-1 rounded-full font-semibold bg-gray-200 text-dracula">{transactionHistory.type}</span>
                                                          <span className="ml-2 p-1 rounded-full font-semibold bg-gray-200 text-dracula">{transactionHistory.source}</span>
                                                        </div>
                                                        <Spacer y={0.5}/>
                                                        <div>
                                                          {transactionHistory.description}
                                                        </div>
                                                        <Spacer y={0.5}/>
                                                        <div className="text-sm font-semibold">
                                                          {formatTimeAgo(transactionHistory.timestamp)}
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
            </section>
        </>
    );
};

export default Profile;
