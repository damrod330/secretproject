import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
});

class HeroAbilities extends Component {

    state = {
        title: "Twoje zdolności",
        expanded: null,
        isEditModeEnabled: false,
        isAddAbilityModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        characterId: this.props.characterId,
        abilities: this.props.abilities,
        allAbilities: null
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    handleToggleEditState() {
        this.setState({ isEditModeEnabled: !this.state.isEditModeEnabled });
    }

    handleAddAbility(){
        axios.get("/abilities").then(res => {
            this.setState({ allAbilities: res.data,
            isAddAbilityModeEnabled: true });

        }).catch(error => {console.log(error)});
    }


    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        let createAbility = (ability, index) => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
                if (!this.state.isAddAbilityModeEnabled) {
                return (
                    <ExpansionPanel key={ability.name}
                        expanded={expanded === ability.name}
                        onChange={this.handleChange(ability.name)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{ability.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{ability.description}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
                } else {
                    return (
                        
                        <ExpansionPanel key={ability.name}
                            expanded={expanded === ability.name}
                            onChange={this.handleChange(ability.name)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{ability.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>{ability.description}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>)
                }
            } else {
                // Edit mode
                return (<p>Edit mode</p>)
            }
        }

        return (
            <div className={classes.root}>
                <div className="paper-card">
                    <div className="paper-card-title">
                        <h2>{this.state.title}</h2>
                        <IconButton className="edit-btn" onClick={() => this.handleToggleEditState()}>{!this.state.isEditModeEnabled ? <i className="fa fa-pencil" /> : <i className="fa fa-save" />}</IconButton>
                    </div>
                    <div className="paper-card-body">
                        {this.isAddAbilityModeEnabled ? 
                        this.state.allAbilities.map((ability, index) => { return createAbility(ability, index) })
                        :this.state.abilities.map((ability, index) => { return createAbility(ability, index) })}
                        <Button onClick={()=>this.handleAddAbility()}>Dodaj zdolność</Button>
                    </div>
                </div>
            </div>
        );
    }
}

HeroAbilities.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeroAbilities);
