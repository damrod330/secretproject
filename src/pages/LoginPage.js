import React, { Component } from 'react';

import '../styles/main.css';
import logo from '../img/logo.png'

import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            showLogin: true
        }
    }

    changeState(state) {
        this.setState({ showLogin: state }, any => {
        });
    }

    render() {
        return (
            <div className="bg-mask">
                <div><img src={logo} className="logo-img" /></div>;
                    <div className="paper-card" id="login-card">
                    <div className="paper-card-body">
                        {this.state.showLogin ? <LoginForm onRegisterClicked={this.changeState.bind(this)}></LoginForm>
                            : <RegisterForm onLoginClicked={this.changeState.bind(this)}></RegisterForm>}
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;