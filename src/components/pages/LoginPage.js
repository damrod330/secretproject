import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './LoginPage.css';

class LoginPage extends Component {

    render() {
        return (
            <div className="bg-mask">
                <div className="frosted-glass login-card">
                    <div className="card">
                        <TextField
                            className="white-text"
                            id="standard-name"
                            label="Nazwa użytkownika"
                            type="text"
                            margin="normal"
                        />

                        <TextField
                            className="white-text"
                            id="password"
                            type="password"
                            label="Hasło"
                            margin="normal"
                        />

                        <Button variant="contained" color="primary"> Zaloguj się</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;