import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import Navigation from '@components/Navigation'
import { NextSeo } from 'next-seo'
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import JupiterForm from "@components/Swap/JupiterForm";
import { JupiterProvider } from "@jup-ag/react-hook";
import { Connection } from '@solana/web3.js'

import styles from "./JupiterForm.module.css";

interface IJupiterFormProps {}
interface IState {
  amount: number;
  inputMint: PublicKey;
  outputMint: PublicKey;
  slippage: number;
}

export const SECOND_TO_REFRESH = 50 * 1000;

const JupiterWrapper: React.FC = ({ children }) => {
    const connection = new Connection("https://rpc.ankr.com/solana", 'confirmed');
    const wallet = useWallet();
    return (
      <JupiterProvider
        connection={connection}
        userPublicKey={wallet.publicKey || undefined}
        routeCacheDuration={SECOND_TO_REFRESH}
        enforceSingleTx={true}
      >
        {children}
      </JupiterProvider>
    );
  };

const SwapPage = () => {
    const INPUT_MINT_ADDRESS = "So11111111111111111111111111111111111111112"
    const OUTPUT_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

    return(
        <>
            <NextSeo
                title="Stork Drops | Find the best route and swap any SPL token for 0% fees."
                description="Stork Drops is creating a platfrom to explore the Solana ecosystem, connect with others, and collect unique drops."
                openGraph={{
                    title: 'Stork Drops | Find the best route and swap any SPL token for 0% fees.',
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

            <section className="flex items-center justify-center">
                <div className="w-full grid grid-cols-1 grid-auto-rows gap-2">
                    <div className="text-center my-5">
                        <h1 className="text-5xl font-extrabold">Swap</h1>
                        <span className="text-sm font-medium">Trade any SPL token for 0% fees.</span>
                    </div>
                    <JupiterWrapper>
                        <div className="flex items-center justify-center">
                            <JupiterForm/>
                        </div>
                    </JupiterWrapper>
                </div>
            </section>
        </>
    )
}

export default SwapPage