import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Head from 'next/head'
import { Grid, Container, Avatar } from '@nextui-org/react'
import Navigation from "../components/Navigation"
import AppBar from '../components/AppBar'
import ProfilePictureModal from '../components/ProfilePictureModal'
import { useWallet } from '@solana/wallet-adapter-react';
import { FiCopy, FiXCircle } from "react-icons/fi";

const Settings = ({ children, ...props }) => {
    // wallet details
    const { publicKey, wallet } = useWallet();
    const [copied, setCopied] = useState(false);

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletAddress = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 6) + '..' + base58.slice(-6);
    }, [children, wallet, base58]);

    const copyAddress = useCallback(async () => {
        if (base58) {
            await navigator.clipboard.writeText(base58);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
        }
    }, [base58]);
  
    return(
        <>
            <div>
            <Head>
                <title>Stork Drops - Airdrops. Whitelists. Alpha. One Social Platform.</title>
                <meta name="description" content="Stork Drops - Settings" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container xl>
                <Navigation/>
                <Grid.Container gap={2} justify='center'> 
                    <Grid className="h-auto" xs={2}>
                        <AppBar/>
                    </Grid>
                    <Grid xs={10}>
                        <div className="">
                            <Grid.Container gap={2} direction='column'>
                                <Grid>
                                    <h2 className="text-3xl font-extrabold text-dracula">Settings</h2>
                                    <Grid.Container gap={2}>
                                        
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <p className="my-3 font-semibold text-dracula text-xl">Profile Picture</p>
                                    <Grid.Container justify="center" alignItems="center" direction='row'>
                                        <Grid>
                                            <Avatar
                                                className="w-20 h-20 border border-dracula mr-5"
                                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                                zoomed
                                            />
                                        </Grid>
                                        <Grid>
                                            <div>
                                                <span className="font-semibold text-dracula">Wallet Address</span>
                                            </div>
                                            <div className="">
                                                <span className="flex items-center text-sm cursor-pointer text-dracula">{walletAddress}<FiCopy onClick={copyAddress} className="ml-2 hover:text-clean-blue"/></span>
                                                <span className="text-xs">{copied ? 'Copied!' : ''}</span>
                                            </div>
                                        </Grid>
                                    </Grid.Container>
                                </Grid>
                                <Grid>
                                    <ProfilePictureModal/>
                                </Grid>
                            </Grid.Container>
                        </div>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
        </>
    )
}

export default Settings;