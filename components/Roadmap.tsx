import { useEffect, useState } from 'react'
import { Grid, Text, Spacer, Card, Divider, Col } from '@nextui-org/react';

const Roadmap = () =>{

    return(
        <>
            <h2 className="mb-2.5 text-6xl font-extrabold text-center leading-normal">The Roadmap</h2>
            <p className="text-center text-xl">Here's how we see things. At Stork Drops, we like phases - like the Marvel Cinematic Universe.</p>
            <Grid.Container className="my-5" gap={2}>
                <Grid 
                    xs={12} 
                    sm={12} 
                    md={4} 
                    lg={4}>
                    <Card css={{ padding: 10, border: 0, height: 400, width: 350 }} bordered={false}>
                        <div>
                            <h2 className="text-3xl font-extrabold">// 001 Initialization</h2>
                            <ul className="list-disc p-2 mt-2.5">
                                <li>Assemble the gang</li>
                                <li>Launch our NFT</li>
                                <li>Launch V2 Website</li>
                                <li>Develop partnerships</li>
                                <li>Prepare staking &amp; tokenomics</li>
                            </ul>
                        </div>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4}>
                        <Card css={{ padding: 10, border: 0, height: 400, width: 350 }} bordered={false}>
                            <div>
                                <h2 className="text-3xl font-extrabold">// 002 Expansion</h2>
                                <ul className="list-disc p-2 mt-2.5">
                                    <li>Expand the team</li>
                                    <li>Launch staking</li>
                                    <li>Introduce V1 of <b><i>The Dropzone</i></b></li>
                                    <li>Prepare <b><i>The Drop House</i></b></li>
                                </ul>
                            </div>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                            <Card css={{ padding: 10, border: 0, height: 400, width: 350 }} bordered={false}>
                                <div>
                                    <h2 className="text-3xl font-extrabold">// 003 Communal</h2>
                                    <ul className="list-disc p-2 mt-2.5">
                                        <li>Launch <b><i>The Dropzone</i></b></li>
                                        <li>Introduce chatrooms</li>
                                        <li>Update V2 of <b><i>The Dropzone</i></b></li>
                                    </ul>
                                </div>
                            </Card>
                        </Grid>
            </Grid.Container>
        </>
    )
}

export default Roadmap