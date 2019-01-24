import React, { Component } from 'react';
import HeroInfo from '../components/fragments/HeroInfo'
import HeroTraits from '../components/fragments/HeroTraits'
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import SideNav from '../components/SideNav';
import '../styles/main.css';
import '../styles/CharacterPage.css';
import HeroAbilities from '../components/fragments/HeroAbilities';
import HeroSkills from '../components/fragments/HeroSkills';

//Snackbar
import MySnackbarContent from '../UI/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';

class CharacterPage extends Component {

    state = {
        isProgressionModeEnabled: true,
        data: null,
        error: null,
        success: null,
        messageType: "success",
        message: "",
        snackbarOpen: false
    }

    componentDidMount() {
        axios.get("/character").then(res => {
            this.setState({ data: res.data, error: null, snackbarOpen: false });
        }).catch(error => {
            this.setState({ snackbarOpen: true, error: true, success: false, messageType: "error", message: "Nie pobrano postaci, sprawdź połączenie." });
        });
    }

    handleHideSnack = () => {
        this.setState({ snackbarOpen: false, error: null, success: null });
    }

    handleMessage = (type, message) => {
        switch (type) {
            case "success":
                console.log(type);
                this.setState({ snackbarOpen: true, error: null, success: true, messageType: "success", message: message });
                break;
            case "error":
                this.setState({ snackbarOpen: true, error: true, success: false, messageType: "error", message: message });
                break;
            default:
                this.setState({ snackbarOpen: false, error: null, success: false, messageType: "", message: "" });
        }
    }

    handleSubstractXp = (ammount) => {
        const stateCopy = { ...this.state };
        stateCopy.data.xp = stateCopy.data.xp - ammount;
        this.setState({...stateCopy});
    }

    render() {
        let snackbar = this.state.error || this.state.success ? <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={6000}
            onClose={this.handleHideSnack}>
            <MySnackbarContent
                onClose={this.handleHideSnack}
                variant={this.state.messageType}
                message={this.state.message}
            />
        </Snackbar> : null;
        return (
            <div>
                {snackbar}
                <SideNav />
                {this.state.data ?
                    <div className="container">
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <HeroInfo
                                    characterId={this.state.data.id}
                                    xp={this.state.data.xp}
                                    name={this.state.data.name}
                                    race={this.state.data.race}
                                    currentProfession={this.state.data.currentProfession}
                                    previousProfession={this.state.data.previousProfession}
                                    additionalInfo={this.state.data.additionalInfo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <HeroTraits traits={this.state.data.traits}
                                    isProgressionModeEnabled={this.state.isProgressionModeEnabled}
                                    isProgressionModeEnabled={this.state.isProgressionModeEnabled}
                                    isProgressionModeEnabled={this.state.isProgressionModeEnabled}
                                    responseMessage={this.handleMessage}
                                    characterId={this.state.data.id}
                                    handleSubstractXp={this.handleSubstractXp} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <HeroAbilities
                                    abilities={this.state.data.abilities}
                                    responseMessage={this.handleMessage}
                                    characterId={this.state.data.id} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <HeroSkills
                                    skills={this.state.data.skills}
                                    characterId={this.state.data.id}
                                    responseMessage={this.handleMessage}
                                />
                            </Grid>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

export default CharacterPage;