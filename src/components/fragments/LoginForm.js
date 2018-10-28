import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            login: '',
            password: ''
        }
    }

    handleOnRegisterClicked(e) {
        e.preventDefault();
        this.props.onRegisterClicked(false);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        console.log('Submit was clicked.');
    }

    render() {
        console.log(this.props)
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
                    type="password"
                    label="Hasło"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary"> Zaloguj się</Button>
                <p>Nie masz konta? <a href="" onClick={this.handleOnRegisterClicked.bind(this)}>Zarejestruj się</a></p>
            </form>
        );
    }
}

export default LoginForm;