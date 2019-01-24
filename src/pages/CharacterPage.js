import React, { Component } from 'react';
// import HeroInfo from '../components/fragments/HeroInfo-old'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';
import '../styles/CharacterPage.css';
import HeroAbilities from '../components/fragments/HeroAbilities';
// import HeroSkills from '../components/fragments/HeroSkills';

//Snackbar
import MySnackbarContent from '../UI/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';

class CharacterPage extends Component {

    state = {
        isProgressionModeEnabled: true,
        currentExpirience: 1000,
        data: null,
        error: null,
        snackbarOpen: false
    }

    componentDidMount() {
        axios.get("/character").then(res => {
            this.setState({ data: res.data, error: null, snackbarOpen: false });
        }).catch(error => {
            this.setState({snackbarOpen: true, error: "Nie mozna pobrać postaci, sprawdź połączenie"});
        });
    }

    handleHideSnack = () => {
        this.setState({snackbarOpen: false})
    }

    render() {
        let snackbar = this.state.error ? <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={this.state.snackbarOpen}
        autoHideDuration={6000}
        onClose={this.handleHideSnack}>
        <MySnackbarContent
            onClose={this.handleHideSnack}
            variant="error"
            message={this.state.error}
        />
    </Snackbar> : null;
        return (
            <div>
                {snackbar}
                <SideNav />
                {this.state.data ?
                    <div className="container">
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={6} md={4}>
                                {/* <HeroInfo /> */}
                            </Grid>
                            <Grid item xs={6} sm={6} md={2}>
                                <HeroTraits traits={this.state.data.traits}
                                    isProgressionModeEnabled={this.state.isProgressionModeEnabled}
                                isProgressionModeEnabled={this.state.isProgressionModeEnabled} 
                                    isProgressionModeEnabled={this.state.isProgressionModeEnabled}
                                    characterId={this.state.data.id} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <HeroAbilities abilities={this.state.data.abilities} characterId={this.state.data.id} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                {/* <HeroSkills skills={this.state.data.skills} characterId={this.state.data.id} /> */}
                            </Grid>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

export default CharacterPage;