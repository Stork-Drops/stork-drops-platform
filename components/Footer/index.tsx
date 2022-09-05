import { Grid, Container } from '@nextui-org/react';
import DarkModeSwitch from '../DarkModeSwitch'
import React, { Fragment } from 'react'
import Link from 'next/link';
import NetworkStatus from '@components/NetworkStatus';

const Footer = () => {
    return(
        <div className="z-50 hidden fixed bg-white bottom-0 w-full md:block border-t border-gray-200 py-1">
            <Container fluid>
                <Grid.Container direction="row" alignItems="center" justify="space-between">
                    <Grid>
                        <Link href="/">
                            <img
                                className='w-6 cursor-pointer hover:opacity-80' 
                                src="/sd-package.svg"/>
                        </Link>
                    </Grid>
                    <Grid>
                        <p className="text-xs font-semibold">
                            
                        </p>
                    </Grid>
                    <Grid className="flex items-center">
                        <NetworkStatus/>
                    </Grid>
                </Grid.Container>
            </Container>
        </div>
    )
}

export default Footer;