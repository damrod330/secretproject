import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

class RegisterForm extends Component {

    constructor() {
        super();
        this.state = {
            formData: {}
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
    }

    handleOnLoginClicked(e) {
        e.preventDefault();
        this.props.onLoginClicked(true);
    }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit.bind(this)}>
                <TextField
                    className="white-text"
                    label="Nazwa użytkownika"
                    type="text"
                    margin="normal"
                />

                <TextField
                    className="white-text"
                    label="Email"
                    type="email"
                    margin="normal"
                />

                <TextField
                    className="white-text"
                    type="password"
                    label="Hasło"
                    margin="normal"
                />

                <TextField
                    className="white-text"
                    type="password"
                    label="Powtórz hasło"
                    margin="normal"
                    color="secondary"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                        />
                    }
                    label="Nie przeczytałem warunków korzystania z serwisu i czytać nie będę ale je akceptuję."
                />

                <Button variant="contained" color="secondary" href={"/rpg/main"}> Zarejestruj się</Button>
                <p>Masz konto? <a href="" onClick={this.handleOnLoginClicked.bind(this)}>Przejdź do logowania.</a></p>
            </form>
        );
    }
}

export default RegisterForm;