import { Grid, Container } from '@nextui-org/react';
import DarkModeSwitch from '../DarkModeSwitch'
import React, { Fragment } from 'react'
import Link from 'next/link';
import NetworkStatus from '@components/NetworkStatus';
import MusicPlayer from '@components/MusicPlayer';
import { useWallet } from '@solana/wallet-adapter-react';

const Footer = () => {
    const { connected } = useWallet();
    return(
        <div className="z-50 hidden fixed bg-white bottom-0 w-full md:block border-t border-gray-200 py-1.5">
            <Container fluid>
                <div className="flex items-center justify-between">
                    <div>
                    {connected ? <MusicPlayer/> : null}
                    </div>
                    <div>
                    <NetworkStatus/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer;