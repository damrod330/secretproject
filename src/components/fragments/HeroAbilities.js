import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class HeroAbilities extends Component {

    state = {
        isEditModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        characterId: this.props.characterId,
        abilities: this.props.abilities
    }

    handleToggleEditState() {
        this.setState({ isEditModeEnabled: !this.state.isEditModeEnabled });
    }


    handleTraitInputChange(e, index, propName) {
        const stateCopy = { ...this.state };
        let trait = stateCopy.traits[index];
        trait[propName] = e.target.value;
        this.setState({ ...stateCopy });
    }

    render() {
        let createAbility = (ability, index) => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
                let canUpgrade = this.state.isProgressionModeEnabled;
                return (
                    <li> {ability.name} </li>
                )
            } else {
                // Edit mode
                return (
                    <li key={trait.name}>
                        <div className="label">{trait.displayName}:</div>
                        <div>
                            <input type="number" value={trait.baseValue} onChange={(e) => this.handleTraitInputChange(e, index, "baseValue")} />
                            <input type="number" value={trait.currentValue} onChange={(e) => this.handleTraitInputChange(e, index, "currentValue")} />
                            <input type="number" value={trait.maxProgress} onChange={(e) => this.handleTraitInputChange(e, index, "maxProgress")} />
                        </div>
                    </li>);
            }
        }

        return (
            <div className="paper-card">
                <div className="paper-card-title">
                    <h2>Cechy</h2>
                    <IconButton className="edit-btn" onClick={() => this.handleToggleEditState()}>{!this.state.isEditModeEnabled ? <i className="fa fa-pencil" /> : <i className="fa fa-save" />}</IconButton>
                </div>
                <div className="paper-card-body">
                    <ul className="traits">
                        {this.state.traits.map((trait, index) => { return createTrait(trait, index) })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default HeroAbilities;