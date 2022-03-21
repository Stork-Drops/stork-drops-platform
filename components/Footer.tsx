import { Grid, Card, Text, Divider, Link } from '@nextui-org/react';

const Footer = () =>{
    return(
        <>
            <Divider/>
            <Grid.Container className="my-5">
                <Grid xs={12} sm={12} md={6} lg={6}>
                    <p className="my-5">&copy; 2022 Stork Drops. All rights reserved.</p>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6} justify="flex-end">
                    <Grid.Container gap={4}>
                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <Link>Discord</Link>
                        </Grid>
                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <Link>Twitter</Link>
                        </Grid>
                        <Grid xs={4} sm={4} md={4} lg={4}>
                            <Link>Github</Link>
                        </Grid>
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Footer