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

class HeroSkills extends Component {

    state = {
        title: "Umiejętności",
        expanded: null,
        checked: [],
        isEditModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        characterId: this.props.characterId,
        skills: this.props.skills,
        allSkills: null
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
            axios.get("/skills").then(res => {
                let checked = []
                this.state.skills.forEach(skill => {
                    checked.push(skill.id);
                });
                this.setState(
                    {
                        title: "Wybierz umiejętności",
                        allSkills: res.data,
                        checked: checked,
                        isEditModeEnabled: true
                    });
            }).catch(error => { console.log(error) });
        } else {
            let skills = [];
            this.state.allSkills.forEach(skill => {
                if (this.state.checked.find(skillId => { return skillId == skill.id })) {
                    skills.push(skill);
                }
            })

            axios.put(`/character/${this.state.characterId}/skills`, this.state.checked).then(res => {
                console.log(res.status);
                this.setState(
                    {
                        title: "Umiejętności",
                        skills: skills,
                        isEditModeEnabled: false
                    });
            }).catch(error => {
                console.log(error);
                this.setState(
                    {
                        title: "Umiejętności",
                        isEditModeEnabled: false
                    });
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        let createSkill = (skill, index) => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
                return (
                    <ExpansionPanel key={skill.name}
                        expanded={expanded === skill.name}
                        onChange={this.handleChange(skill.name)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{skill.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{skill.description}</Typography>
                            <Typography>Dotyczy: {skill.trait}</Typography>
                            <Typography>Typ: {skill.type}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            } else {
                return (
                    <ListItem key={skill.id} role={undefined} dense button onClick={this.handleToggle(skill.id)}>
                        <Checkbox
                            checked={this.state.checked.indexOf(skill.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={skill.name} />
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
                                    {this.state.allSkills.map((skill, index) => { return createSkill(skill, index) })}
                                </List>
                                : <div>
                                    {this.state.skills.map((skill, index) => { return createSkill(skill, index) })}
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

HeroSkills.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeroSkills);
