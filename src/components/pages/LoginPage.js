import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class LoginPage extends Component {
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Paper>
                    <Grid
                        container>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-name"
                                label="Nazwa użytkownika"
                                type="text"
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                type="password"
                                label="Hasło"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default LoginPage;