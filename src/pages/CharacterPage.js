import React, { Component } from 'react';
import HeroCard from '../components/fragments/HeroCard'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';
import './CharacterPage.css';


class CharacterPage extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount(){
        axios.get("/weapons").then(res=>{

        }).catch(error=>{
            
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
                    <Grid item xs={6} sm={4} md={3}>
                        <HeroTraits />
                    </Grid>
                </Grid>
                </div>
                <SideNav/>

            </div>
        );
    }
}

export default CharacterPage;