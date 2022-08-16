import { Grid, Container } from '@nextui-org/react';
import DarkModeSwitch from '../DarkModeSwitch'
import React, { Fragment } from 'react'
import Link from 'next/link';
import NetworkStatus from '@components/NetworkStatus';

const Footer = () => {
    return(
        <div className="border-t border-gray-200 py-2.5">
            <Container fluid>
                <Grid.Container direction="row" alignItems="center" justify="space-between">
                    <Grid>
                        <Link href="/">
                            <img
                                className='w-6 cursor-pointer hover:opacity-80' 
                                src="/sd-package.svg"/>
                        </Link>
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