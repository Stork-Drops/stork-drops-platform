import { useEffect, useState } from 'react'
import { Grid, Text, Spacer, Card } from '@nextui-org/react';

const AirDropCard = () => {
    return(
        <Grid justify="center" direction='column'>
            <Card css={{ height: 400, border: 0 }} bordered={false}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        autoResize={true}
                        objectFit="cover"
                        src="/feature1.jpg"
                        width='100%'
                        height='100%'
                    />
                </Card.Body>
            </Card>
            <Text className="my-5">
                <h2 className="mb-2 text-2xl font-extrabold">Airdrops, whitelists, and more</h2>
                If you've been in the Solana ecosystem for awhile you should remember the early airdrop days. $COPE?
                Yup, we want to bring that back in a fun way. Membership holders will be <span className="underline mr-1">automatically</span> 
                eligible to receive drops - the very best for the loyal.
            </Text>
        </Grid>
    )
}

const WhiteListCard = () => {
    return(
        <Grid justify="center" direction='column'>
            <Card css={{ height: 400, border: 0 }} bordered={false}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        autoResize={true}
                        objectFit="cover"
                        src="/feature2.jpg"
                        width='100%'
                        height='100%'
                    />
                </Card.Body>
            </Card>
            <Text className="my-5">
                <h2 className="mb-2 text-2xl font-extrabold">The Dropzone</h2>
                Stay up-to-date on all the drops from airdrops, NFTs, and new protocols.
                Each project recommendation will go through <span className="underline mr-1">strict</span>quality control. 
                No fugazy, no shite. Period.
            </Text>
        </Grid>
    )
}

const AlphaCard = () => {
    return(
        <Grid justify="center" direction='column'> 
            <Card css={{ height: 400, border: 0 }} bordered={false}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        autoResize={true}
                        objectFit="cover"
                        src="/feature3.jpg"
                        width='100%'
                        height='100%'
                    />
                </Card.Body>
            </Card>
            <Text className="my-5">
                <h2 className="mb-2 text-2xl font-extrabold">Chat Hub</h2>
                We're bringing chatrooms back, AOL-style. <br/>
                Earn more with the best alpha, by the community for the community.
                Connect with others via social graph for Web3.0. 
            </Text>
        </Grid>
    )
}

const Features = () =>{
    return(
        <>
        <Grid.Container className="flex items-top" gap={2}>
            <Grid justify='center' xs={12} sm={12} md={4} lg={4}>
                <AirDropCard/>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4} justify="center">
                <WhiteListCard/>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
                <AlphaCard/>
            </Grid>
        </Grid.Container>
        </>
    )
}

export default Features