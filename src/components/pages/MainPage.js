import React, { Component } from 'react';

import './LoginPage.css';
import logo from './../../img/logo.png' // relative path to image 

class MainPage extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="bg-mask">
                <div><img src={logo} className="logo-img" /></div>;
                  
            </div>
        );
    }
}

export default MainPage;