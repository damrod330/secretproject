import React, { Component } from 'react';
import HeroInfo from '../components/fragments/HeroInfo'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';
import '../styles/CharacterPage.css';
import HeroAbilities from '../components/fragments/HeroAbilities';


class CharacterPage extends Component {

    state = {
        isProgressionModeEnabled: true,
        currentExpirience: 1000,
        data: null
    }

    componentDidMount() {
        axios.get("/character").then(res => {
            this.setState({ data: res.data });
        }).catch(error => {console.log(error)});
    }

    render() {
        return (
            <div>
                <SideNav />
                {this.state.data ?
                    <div className="container">
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={6} md={4}>
                                <HeroInfo />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2}>
                                <HeroTraits traits={this.state.data.traits} 
                                isProgressionModeEnabled={this.state.isProgressionModeEnabled} 
                                characterId={this.state.data.id}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <HeroAbilities abilities={this.state.data.abilities} characterId={this.state.data.id}/>
                            </Grid>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

export default CharacterPage;