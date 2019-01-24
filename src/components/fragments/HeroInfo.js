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
            xp: this.props.xp,
            name: this.props.name,
            race: this.props.race,
            currentProfession: this.props.currentProfession,
            previousProfession: this.props.previousProfession,
            additionalInfo: this.props.additionalInfo
        }
    }

    handleToggleEditState() {
        // if (this.state.isEditModeEnabled) {
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


    handleInputChange(e, index, propName) {
        // const stateCopy = { ...this.state };
        // let hero = stateCopy.hero[index];
        // trait[propName] = e.target.value;
        // this.setState({ ...stateCopy });
    }

    render() {
        let createInfoItem = (label, value) => {
            if (!this.state.isEditModeEnabled) {
                return (
                    <ListItem button>
                        <ListItemText primary={label} secondary={value} />
                    </ListItem>
                )
            }
        }
        // let createTrait = (trait, index) => {
        //     if (!this.state.isEditModeEnabled) {
        //         // Standard mode
        //         let canUpgrade = ((Number(trait.currentValue) >= (Number(trait.baseValue) + Number(trait.maxProgress))) ? false : true) && this.state.isProgressionModeEnabled;
        //         return (
        //             <li key={trait.name}>
        //                 <div className="label">{trait.displayName}:</div>
        //                 <div>
        //                     <span className="value">{trait.currentValue}</span>
        //                     <Button disabled={!canUpgrade} onClick={() => { this.handleIncreaseTraitClick(trait, index) }}>+</Button>
        //                 </div>

        //             </li>
        //         )
        //     } else {
        //         // Edit mode
        //         return (
        //             <li key={trait.name}>
        //                 <div className="label">{trait.name}:</div>
        //                 <div>
        //                     <input type="number" value={trait.baseValue} onChange={(e) => this.handleTraitInputChange(e, index, "baseValue")} />
        //                     <input type="number" value={trait.currentValue} onChange={(e) => this.handleTraitInputChange(e, index, "currentValue")} />
        //                     <input type="number" value={trait.maxProgress} onChange={(e) => this.handleTraitInputChange(e, index, "maxProgress")} />
        //                 </div>
        //             </li>);
        //     }
        // }

        return (
            <div className="paper-card">
                <div className="paper-card-title">
                    <h2>{this.state.title}</h2>
                    <IconButton className="edit-btn" onClick={() => this.handleToggleEditState()}>{!this.state.isEditModeEnabled ? <i className="fa fa-pencil" /> : <i className="fa fa-save" />}</IconButton>
                </div>
                <div className="paper-card-body">
                    <List>
                        {createInfoItem("Doświadczenie", this.state.hero.xp)}
                        {createInfoItem("Imię", this.state.hero.name)}
                        {this.state.hero.currentProfession ? createInfoItem("Aktualna profesja", this.state.hero.currentProfession) : null}
                        {this.state.hero.previousProfession ? createInfoItem("Poprzednia profesja", this.state.hero.previousProfession) : null}
                        {this.state.hero.additionalInfo.map((additionalInfo) => { return createInfoItem(additionalInfo.name, additionalInfo.value) })}
                    </List>
                </div>
            </div>
        );
    }
}

export default HeroInfo;