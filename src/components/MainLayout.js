import React from 'react'
import { Grid, Paper } from '@material-ui/core/es';
import NavBar from './fragments/navBar/NavBar';

class MainLayout extends React.Component {

    render() {
        return (
            <div>
                <NavBar></NavBar>

                <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item xs={12} md={2} lg={2}>
                        <Paper>Navigation menu</Paper>
                    </Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <Paper>Main Content</Paper>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainLayout