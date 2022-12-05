import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import Navigation from '@components/Navigation'
import { NextSeo } from 'next-seo'
import { PublicKey, Transaction, Connection, AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Container, Grid } from '@nextui-org/react'
import { Tab } from '@headlessui/react'
import CreateStakeAccount from '@components/Stake/CreateStakeAccount'
import ValidatorList from "@components/Stake/ValidatorList";

const STAKE_PROGRAM_PK = new PublicKey('Stake11111111111111111111111111111111111111');
const WALLET_OFFSET = 44;
const DATA_SIZE = 200

const StakePage = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const base58PubKey = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const [stakeAccounts, setStakeAccounts] = useState([]);
    const [stakeCard, setStakeCard] = useState();

    const getStakeAccounts = async () => {
        try{
            const stakeAccounts = await connection.getParsedProgramAccounts(
            STAKE_PROGRAM_PK,
            {
                filters: [
                    { dataSize: DATA_SIZE }, 
                    {
                        memcmp: {
                            offset: 12,
                            bytes: 'CNByFKFL67KbVPuxwhWDCGMqShuiPMUA3WKbkAhXv4xy',
                        },
                    },
                ],
            })
            console.log('This is your stake accounts', stakeAccounts)
            setStakeAccounts(stakeAccounts)
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        //getStakeAccounts();
    }, [])
    
    return(
        <>
            <NextSeo
                title="Stork Drops | Stake your SOL to decentralize the network and earn exclusive rewards."
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops | Stake your SOL to decentralize the network and earn exclusive rewards.',
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
            
            <Container fluid>
                <section className="my-5 flex flex-col items-center">
                    <span>Earn up to [top validator] APY</span>
                    <h1 className="my-2.5 text-xl md:text-5xl font-extrabold w-full md:w-2/4 text-center">Staking is a way to earn rewards by investing your crypto assets</h1>

                    <div className="flex justify-center my-5">
                        <CreateStakeAccount/>
                    </div>

                    <div>
                        <ValidatorList/>
                    </div>

                    <div className="max-w-1/2 hidden">
                        <Tab.Group vertical>
                            <Tab.List className="grid grid-cols-2 gap-4 p-2">
                                <Tab className={({ selected }) =>
                                selected ? 'font-semibold text-dracula text-sm md:text-base border-gray-400' : 'font-semibold text-gray-400 text-sm md:text-base'}>Stake</Tab>
                                <Tab className={({ selected }) =>
                                selected ? 'font-semibold text-dracula text-sm md:text-base border-gray-400' : 'font-semibold text-gray-400 text-sm md:text-base'}>Unstake</Tab>
                            </Tab.List>
                            <div>
                                {!base58PubKey ? 'No stake account found.' : 'You have a stake card.'}
                            </div>
                            <Tab.Panels>
                                <Tab.Panel>
                                    Stake
                                </Tab.Panel>
                                <Tab.Panel>
                                    Unstake
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </section>
            </Container>
        </>
    )
}

export default StakePage;