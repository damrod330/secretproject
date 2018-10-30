import React from 'react'
import { Grid, Paper } from '@material-ui/core/es';
import { NavBar } from './../../fragments';
import CharacterPage from '../CharacterPage/CharacterPage';

class MainPage extends React.Component {

    render() {
        return (
            // Navbar
            // <NavBar />

            // Main grid
            <Grid container alignItems={"center"} justify={"center"}>
                <Grid xs={0} md={2} lg={2}>
                    <Paper>Navigation menu</Paper>
                </Grid>
                <Grid xs={12} md={10} lg={8}>
                    <CharacterPage></CharacterPage>
                </Grid>
            </Grid>
        );
    }
}

export default MainPage