import React, { Fragment } from 'react'
import Link from 'next/link';
import { Grid, Container, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from './WalletConnect';

const Navigation = () => {
    const router = useRouter();

    return(
        <>
            <div className="border-b border-gray-200">
                <Container fluid>
                    <Grid.Container direction="row" alignItems="center" justify="space-between">
                        <Grid className="flex items-center justify-between">
                            <Link href="/">
                                <img
                                    className='w-36 cursor-pointer hover:opacity-80' 
                                    src="/sd-full.svg"/>
                            </Link>
                            <div 
                                style={{
                                    fontSize: '0.6rem',
                                }}
                                className="ml-1 w-min bg_sunrise text-white px-2.5 py-1 rounded-full font-semibold hover:opacity-80">
                                beta
                            </div>  
                        </Grid>
                        <Grid className="flex items-center">
                            <WalletMultiButton/>
                        </Grid>
                    </Grid.Container>
                </Container>
            </div>
        </>
    )
}

export default Navigation;