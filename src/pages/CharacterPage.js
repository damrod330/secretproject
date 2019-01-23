import React, { Component } from 'react';
import HeroInfo from '../components/fragments/HeroInfo'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';
import '../styles/CharacterPage.css';


class CharacterPage extends Component {

    state = {
        isProgressionModeEnabled: false,
        currentExpirience: 1000,
        data: null
    }

    componentDidMount() {
        axios.get("/character/5c4760b66c063f2d8263e096").then(res => {
            this.setState({ data: res.data });
        }).catch(error => {

        });
    }

    handleUpdateTraitsOnTheServer(traits){
        axios.put(`/character/5c4760b66c063f2d8263e096/traits`,traits).then(res => {
            console.log(res.status);
        }).catch(error => {
            console.log(error);
        });
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
                            <Grid item xs={6} sm={4} md={3}>
                                <HeroTraits traits={this.state.data.traits} 
                                isProgressionModeEnabled={this.state.isProgressionModeEnabled} 
                                updateTraitsOnServer={this.handleUpdateTraitsOnTheServer}/>
                            </Grid>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

export default CharacterPage;