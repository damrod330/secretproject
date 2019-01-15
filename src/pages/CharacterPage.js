import React, { Component } from 'react';

import '../styles/main.css';
import logo from '../img/logo.png';
import HeroCard from '../components/fragments/HeroCard'
import Grid from '@material-ui/core/Grid';
import {url} from '../Constants';


class CharacterCard extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount(){
        fetch(url + "/weapons", {
            method: 'GET',
            // headers: header,
            credentials: 'same-origin'
        }).then(res => res.json())
        .then(weapons => {
            // console.log("sukces");
            // console.log(weapons);
        })
        .catch(err => {
            // console.log("error");
            // console.log(err);
        });
    }

    render() {
        return (
            <div className="bg-mask">
                <div className="container">
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6} md={4}>
                        <HeroCard />
                    </Grid>
                </Grid>
                </div>
                <div className="side-nav"><img src={logo} className="logo-img" /></div>
            </div>
        );
    }
}

export default CharacterCard;