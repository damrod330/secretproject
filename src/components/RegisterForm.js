import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import axios from '../axios';

class RegisterForm extends Component {

    constructor() {
        super();
        this.state = {
            formData: {
                username: "",
                email: "",
                password: "",
                rePassword: ""
            },
            registering: false,
            registerSuccess: false,
            registerError: null,
            error: null
        }
    }

    usernameChangeHandler = (e) => {
        const copyState = { ...this.state };
        this.setState({
            ...copyState,
            formData: {
                ...copyState.formData,
                username: e.target.value
            }
        });
    }

    emailChangeHandler = (e) => {
        const copyState = { ...this.state };
        this.setState({
            ...copyState,
            formData: {
                ...copyState.formData,
                email: e.target.value
            }
        });
    }

    passwordChangeHandler = (e) => {
        const copyState = { ...this.state };
        this.setState({
            ...copyState,
            formData: {
                ...copyState.formData,
                password: e.target.value
            }
        });
    }

    rePasswordChangeHandler = (e) => {
        const copyState = { ...this.state };
        this.setState({
            ...copyState,
            formData: {
                ...copyState.formData,
                rePassword: e.target.value
            }
        });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('rejestruje');
        if (this.state.formData.password === this.state.formData.rePassword) {
            //TODO validation
            this.setState({ registering: true, registerError: null, registerSuccess: null, error: null });
            axios.post('/auth/register', {
                username: this.state.formData.username,
                email: this.state.formData.email,
                password: this.state.formData.password
            })
                .then(res => {
                    this.setState({
                        formData: {
                            username: "",
                            email: "",
                            password: "",
                            rePassword: ""
                        },
                        registering: false,
                        registerSuccess: true,
                        registerError: null,
                        error: null
                    })
                    this.props.onLoginClicked(true);
                })
                .catch(err => {
                    this.setState({ registering: false, registerError: err.message });
                })
        }
    }

    handleOnLoginClicked(e) {
        e.preventDefault();
        this.props.onLoginClicked(true);
    }



    render() {
        const redirect = this.state.registerSuccess ? <Redirect to="/login" /> : null;
        return (
            <form onSubmit={this.handleOnSubmit}>
                {redirect}
                <TextField
                    className="white-text"
                    label="Nazwa użytkownika"
                    type="text"
                    margin="normal"
                    value={this.state.formData.username}
                    onChange={this.usernameChangeHandler}
                />

                <TextField
                    className="white-text"
                    label="Email"
                    type="email"
                    margin="normal"
                    value={this.state.formData.email}
                    onChange={this.emailChangeHandler}
                />

                <TextField
                    className="white-text"
                    type="password"
                    label="Hasło"
                    margin="normal"
                    value={this.state.formData.password}
                    onChange={this.passwordChangeHandler}
                />

                <TextField
                    className="white-text"
                    type="password"
                    label="Powtórz hasło"
                    margin="normal"
                    color="secondary"
                    value={this.state.formData.rePassword}
                    onChange={this.rePasswordChangeHandler}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                        />
                    }
                    label="Nie przeczytałem warunków korzystania z serwisu i czytać nie będę ale je akceptuję."
                />

                <Button type="submit" variant="contained" color="secondary"> Zarejestruj się</Button>
                <p>Masz konto? <a href="#" onClick={this.handleOnLoginClicked.bind(this)}>Przejdź do logowania.</a></p>
            </form>
        );
    }
}

export default RegisterForm;