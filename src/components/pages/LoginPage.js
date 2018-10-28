import React, { Component } from 'react';

import './App.css';
import './LoginPage.css';
import logo from './../../img/logo.png' // relative path to image 

import RegisterForm from '../fragments/RegisterForm';
import LoginForm from '../fragments/LoginForm';


class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            showLogin: true
        }
    }

    changeState(state) {
        console.log(state);
        this.setState({ showLogin: state }, any => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="bg-mask">
                <div><img src={logo} className="logo-img" /></div>;
                <div className="paper-card">
                    <div className="paper-card-body">
                        {this.state.showLogin ? <LoginForm onRegisterClicked={this.changeState.bind(this)}></LoginForm> : <RegisterForm onLoginClicked={this.changeState.bind(this)}></RegisterForm>}
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;