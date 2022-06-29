import { Grid } from '@nextui-org/react';
import DarkModeSwitch from '../DarkModeSwitch'

const Footer = () => {
    return(
        <Grid.Container>
            <Grid>
                <DarkModeSwitch/>
            </Grid>
        </Grid.Container>
    )
}

export default Footer