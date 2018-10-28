import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MainPage.css'


class MainPage extends React.Component {
    render() {
        return (
            <div className={"withNavBar"}>
                <Grid container spacing={0}>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={8}>
                        <Paper>xs=8</Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper>asd</Paper>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainPage;
