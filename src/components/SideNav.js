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
        currentActive: '/'
    }

    handleLogout = () => {
        this.props.onLogout();
    }


    handleLinkClicked(e){
        console.log(e.target);
        console.log(e.target.classList);
        e.target.classList.add("active");
        console.log(this);
    }

    render() {
        return (
            <div className="side-nav">
                <img src={logo} className="side-nav-logo" />
                <div className="side-nav-menu">
                    <ul onClick={e=>this.handleLinkClicked(e)}>
                        <Link to={"/character"} className="link"><li>Karta postaci</li></Link>
                        <Link to={"/"} className="link"><li>Profil</li></Link>
                        <Link to={"/"} className="link"><li>Zbrojownia</li></Link>
                        <Link to={"/"} className="link"><li>Bestiariusz</li></Link>
                        <Link to={"/"} className="link"><li>Księga zaklęć</li></Link>
                        <Link to={"/"} className="link"><li>Mutacje</li></Link>
                        <Link to={"/"} className="link"><li>Mapa</li></Link>
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