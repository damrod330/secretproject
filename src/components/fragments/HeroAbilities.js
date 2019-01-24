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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';

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
        title: "Zdolności",
        expanded: null,
        checked: [],
        isEditModeEnabled: false,
        isAddAbilityModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        characterId: this.props.characterId,
        abilities: this.props.abilities,
        allAbilities: null
    }

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    handleToggleEditState() {
        if (!this.state.isEditModeEnabled) {
            axios.get("/abilities").then(res => {
                let checked = []
                this.state.abilities.forEach(ability => {
                    checked.push(ability.id);
                });
                this.setState(
                    {
                        title: "Wybierz zdolności",
                        allAbilities: res.data,
                        checked: checked,
                        isEditModeEnabled: true
                    });
            }).catch(error => { 
                this.props.responseMessage("error", "Nie mozna pobrać zdolności");
                console.log(error) 
            });
        } else {
            let abilities = [];
            this.state.allAbilities.forEach(ability => {
                if (this.state.checked.find(abilityId => { return abilityId == ability.id })) {
                    abilities.push(ability);
                }
            })

            axios.put(`/character/${this.state.characterId}/abilities`, this.state.checked).then(res => {
                console.log(res.status);
                this.props.responseMessage("success", "Zaktualizowano zdolności");

                this.setState(
                    {
                        title: "Zdolności",
                        abilities: abilities,
                        isEditModeEnabled: false
                    });
            }).catch(error => {
                this.props.responseMessage("error", "Nie udało się zaktualizować zdolności");
                console.log(error);
                this.setState(
                    {
                        title: "Zdolności",
                        isEditModeEnabled: false
                    });
            });
        }
    }

    handleAddAbility = () => {
        axios.get("/abilities").then(res => {
            this.setState(
                {
                    allAbilities: res.data,
                    isAddAbilityModeEnabled: true
                });
        }).catch(error => { console.log(error) });
    }


    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        let createAbility = (ability, index) => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
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
                    <ListItem key={ability.id} role={undefined} dense button onClick={this.handleToggle(ability.id)}>
                        <Checkbox
                            checked={this.state.checked.indexOf(ability.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={ability.name} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
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
                        {
                            this.state.isEditModeEnabled ?
                                <List>
                                    {this.state.allAbilities.map((ability, index) => { return createAbility(ability, index) })}
                                </List>
                                : <div>
                                    {this.state.abilities.map((ability, index) => { return createAbility(ability, index) })}
                                </div>
                        }
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
