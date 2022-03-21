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
                From tokens to airdrops, blah blah blah blah blah blah blah.
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
                The current whitelist meta sucks, blah blah blah blah blah blah blah.
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
                Closed alpha is lame, blah blah blah blah blah.
            </Text>
        </Grid>
    )
}

const Features = () =>{
    const [selectedFeature, setSelectedFeature] = useState('airdrop')

    return(
        <Grid.Container className="items-center" gap={2}>
            <Grid
                justify='center'
                xs={12} 
                sm={12} 
                md={6} 
                lg={6}>
                {selectedFeature === 'airdrop' && <AirDropCard/>}
                {selectedFeature === 'whitelist' && <WhiteListCard/>}
                {selectedFeature === 'alpha' && <AlphaCard/>}
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} justify="center">
                <div>
                    <div
                        id="airdropButton"
                        className={selectedFeature === 'airdrop' ? 'features-active' : 'features-inactive'}
                        onClick={()=> setSelectedFeature("airdrop")}>
                        Gain access to exclusive <br/>ecosystem airdrops
                    </div>
                    <Spacer y={2}/>
                    <div
                        id="whitelistButton"
                        className={selectedFeature === 'whitelist' ? 'features-active' : 'features-inactive'}
                        onClick={()=> setSelectedFeature("whitelist")}>
                        Get in the most coveted <br/>whitelists
                    </div>
                    <Spacer y={2}/>
                    <div
                        id="alphaButton"
                        className={selectedFeature === 'alpha' ? 'features-active' : 'features-inactive'}
                        onClick={()=> setSelectedFeature("alpha")}>
                        Earn more with the best alpha <br/>by the community, for the community
                    </div>
                </div>
            </Grid>
        </Grid.Container>
    )
}

export default Features