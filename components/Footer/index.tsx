import { Grid, Container } from '@nextui-org/react';
import DarkModeSwitch from '../DarkModeSwitch'
import React, { Fragment } from 'react'
import Link from 'next/link';

const Footer = () => {
    return(
        <Container fluid className="border-t border-gray-200">
            <Grid.Container gap={1} direction="row" alignItems="center" justify="space-between">
                <Grid>
                    <Link href="/">
                        <img
                            className='w-10 cursor-pointer hover:opacity-80' 
                            src="/sd-package.svg"/>
                    </Link>
                </Grid>
                <Grid className="flex items-center">
                    
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default Footer;