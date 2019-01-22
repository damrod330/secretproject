import React, { Component } from 'react';
import HeroCard from '../components/fragments/HeroCard'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';


class EquipmentPage extends Component {

    state = {
        isProgressionModeEnabled: true,
        currentExpirience: 1000,
        data: null
    }

    componentDidMount() {
        axios.get("/character/5c4760b66c063f2d8263e096").then(res => {
            console.log(res.data);
            this.setState({ data: res.data });
        }).catch(error => {

        });
    }

    render() {
        return (
            <div>
                <SideNav/>
                {this.state.data ?
                    <div className="container">
                        <Grid container spacing={16}>
                           
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

export default EquipmentPage;