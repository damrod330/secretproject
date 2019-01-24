import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class HeroInfo extends Component {

    state = {
        title: "Bohater",
        isEditModeEnabled: false,
        characterId: this.props.characterId,
        hero: {
            basicInfo: [
                {
                    name: "Doświadczenie",
                    value: this.props.xp
                },
                {
                    name: "Imię",
                    value: this.props.name
                },
                {
                    name: "Rasa",
                    value: this.props.race
                },
                {
                    name: "Aktualna profesja",
                    value: this.props.currentProfession
                },
                {
                    name: "Poprzednia profesja",
                    value: this.props.previousProfession
                },
            ],
            additionalInfo: this.props.additionalInfo
        }
    }

    handleToggleEditState() {
        if (this.state.isEditModeEnabled) {
            this.setState(
                {
                    title: "Bohater",
                    isEditModeEnabled: false
                }
            );
        } else {
            this.setState(
                {
                    title: "Edytuj bohatera",
                    isEditModeEnabled: true
                }
            );
        }
        //     axios.put(`/character/${this.state.characterId}`, this.state.traits).then(res => {
        //         console.log(res.status);
        //         this.setState(
        //             {
        //                 title: "Cechy",
        //                 isEditModeEnabled: false
        //             }
        //         );
        //     }).catch(error => {
        //         console.log(error);
        //         this.setState(
        //             {
        //                 title: "Cechy",
        //                 isEditModeEnabled: false
        //             }
        //         );
        //     });
        // } else {
        //     this.setState(
        //         {
        //             title: "Edytuj cechy",
        //             isEditModeEnabled: true
        //         }
        //     );
        // }
    }


    handleInputChange(e, index, isMandatory) {
        const stateCopy = { ...this.state };
        if (isMandatory) {
            stateCopy.hero.basicInfo[index].value = e.target.value;
        } else {
            stateCopy.hero.additionalInfo[index].value = e.target.value;
        }
        this.setState(stateCopy);
    }

    render() {
        let createInfoItem = (info, index, isMandatory) => {

            if (!this.state.isEditModeEnabled) {
                if (info.value) {
                    return (
                        <ListItem button>
                            <ListItemText primary={info.name} secondary={info.value} />
                        </ListItem>
                    )
                } else {
                    return null;
                }
            } else {
                return (
                    <ListItem>
                        <TextField key={info.name + "TextField"} label={info.name} type="text" value={info.value}
                            onChange={e => this.handleInputChange(e, index, isMandatory)} />
                    </ListItem>
                )
            }
        }

        return (
            <div className="paper-card">
                <div className="paper-card-title">
                    <h2>{this.state.title}</h2>
                    <IconButton className="edit-btn" onClick={() => this.handleToggleEditState()}>{!this.state.isEditModeEnabled ? <i className="fa fa-pencil" /> : <i className="fa fa-save" />}</IconButton>
                </div>
                <div className="paper-card-body">
                    <List>
                        {this.state.hero.basicInfo.map((info, index) => { return createInfoItem(info, index, true) })}
                        {this.state.hero.additionalInfo.map((info, index) => { return createInfoItem(info, index, false) })}
                    </List>
                </div>
            </div>
        );
    }
}

export default HeroInfo;