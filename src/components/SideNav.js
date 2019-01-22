import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { LOGOUT_SUCCESS } from '../store/const/messages';
import { connect } from "react-redux";
import * as actions from '../store/actions/index';
import '../styles/main.css';
import logo from '../img/dist/logo.png';
import { Link } from 'react-router-dom';


class SideNav extends Component {

    state = {
        currentPath: window.location.href.substring(window.location.href.lastIndexOf('/'))
    }

    handleLogout = () => {
        this.props.onLogout();
    }

    render() {

        const createMenuItem = (path, label)=>{
            return <Link to={path} className="link"><li className={this.state.currentPath == path ? "active" : null}>{label}</li></Link>
        }

        return (
            <div className="side-nav">
                <img src={logo} className="side-nav-logo" />
                <div className="side-nav-menu">
                    <ul>
                        {createMenuItem("/character", "Karta postaci")}
                        {createMenuItem("/equipment", "Ekwipunek")}
                        {createMenuItem("/armory", "Zbrojownia")}
                        {createMenuItem("/bestiary", "Bestiariusz")}
                        {createMenuItem("/spells", "Księga zaklęć")}
                        {createMenuItem("/mutations", "Mutacje")}
                        <Link to={"/"} className="link"><li onClick={this.handleLogout}>Wyloguj się</li></Link>
                    </ul>
                </div>
            </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (message) => dispatch(actions.logout(message))
    };
};

export default connect(null, mapDispatchToProps)(SideNav);
// export default SideNav;