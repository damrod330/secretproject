import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MySnackbarContent from '../UI/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';


import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../store/actions/index';


class LoginForm extends Component {

    state = {
        login: null,
        password: null,
        isSnackbarOpen: true
        };

    handleLoginChange = (e) => {
        this.setState({ login: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleOnRegisterClicked(e) {
        e.preventDefault();
        this.props.clearError();
        this.props.onRegisterClicked(false);
    }

    handleHideSnack = () => {
        this.setState({isSnackbarOpen: false})
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.login, this.state.password);
        this.setState({isSnackbarOpen: true})
    }

    snackBarType() {
        if (this.props.logoutMessage) {
            return <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.isSnackbarOpen}
                autoHideDuration={6000}
                onClose={this.handleHideSnack}>
                <MySnackbarContent
                    onClose={this.handleHideSnack}
                    variant="success"
                    message={this.props.logoutMessage}
                />
            </Snackbar>
        } else if(this.props.authorizationError){
            return <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.isSnackbarOpen}
                autoHideDuration={6000}
                onClose={this.handleHideSnack}>
                <MySnackbarContent
                    onClose={this.handleHideSnack}
                    variant="error"
                    message={this.props.authorizationError}
                />
            </Snackbar>
        } else if(this.props.error){
            return <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.isSnackbarOpen}
                autoHideDuration={6000}
                onClose={this.handleHideSnack}>
                <MySnackbarContent
                    onClose={this.handleHideSnack}
                    variant="error"
                    message={this.props.error}
                />
            </Snackbar>
        } else {
            return null;
        }
    }

    render() {

        let snackbar = this.snackBarType();

        return (
            <form onSubmit={this.handleOnSubmit}>
                {snackbar}
                <TextField
                    className="white-text"
                    label="Nazwa użytkownika"
                    type="text"
                    margin="normal"
                    onChange={this.handleLoginChange}
                />
                <TextField
                    className="white-text"
                    type="password"
                    label="Hasło"
                    margin="normal"
                    onChange={this.handlePasswordChange}
                />
                <Button type="submit" variant="contained" color="primary"> Zaloguj się</Button>
                <p>Nie masz konta? <a href="" onClick={this.handleOnRegisterClicked.bind(this)}>Zarejestruj się</a></p>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        logoutMessage: state.auth.logoutMessage,
        authorizationError: state.auth.authorizationError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password) => dispatch(actions.auth(login, password)),
        clearError: () => dispatch(actions.clearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);