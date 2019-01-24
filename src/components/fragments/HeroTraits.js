import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios';

class HeroTraits extends Component {

    state = {
        title: "Cechy",
        characterId: this.props.characterId,
        isEditModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        traits: this.props.traits
    }

    handleToggleEditState() {
        if (this.state.isEditModeEnabled) {
            axios.put(`/character/${this.state.characterId}/traits`, this.state.traits).then(res => {
                console.log(res.status);
                this.props.responseMessage("success", "Zaktualizowano cechy");
                this.setState(
                    {
                        title: "Cechy",
                        isEditModeEnabled: false
                    }
                );
            }).catch(error => {
                console.log(error);
                this.props.responseMessage("error", "Nie udało się zaktualizowac cech.");
                this.setState(
                    {
                        title: "Cechy",
                        isEditModeEnabled: false
                    }
                );
            });
        } else {
            this.setState(
                {
                    title: "Edytuj cechy",
                    isEditModeEnabled: true
                }
            );
        }

    }


    handleTraitInputChange(e, index, propName) {
        const stateCopy = { ...this.state };
        let trait = stateCopy.traits[index];
        trait[propName] = e.target.value;
        this.setState({ ...stateCopy });
    }

    handleIncreaseTraitClick(trait, index) {
        axios.put(`/character/${this.state.characterId}/incrementTrait`, trait).then(res => {
            console.log(res.status);
            const stateCopy = { ...this.state };
            let trait = stateCopy.traits[index];
            trait.currentValue = Number(trait.currentValue) + Number(trait.progressStep);
            this.setState({ ...stateCopy });
            this.props.handleSubstractXp(100);
            this.props.responseMessage("success", `Dodano +${trait.progressStep} do cechy ${trait.name} kosztem 100 xp.`);
        }).catch(error => {
            this.props.responseMessage("error", "Nie posiadasz wystarczająco punktów doświadczenia.");
            console.log(error);
        });
    }

    render() {
        let createTrait = (trait, index) => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
                let canUpgrade = ((Number(trait.currentValue) >= (Number(trait.baseValue) + Number(trait.maxProgress))) ? false : true) && this.state.isProgressionModeEnabled;
                return (
                    <li key={trait.name}>
                        <div className="label">{trait.displayName}:</div>
                        <div>
                            <span className="value">{trait.currentValue}</span>
                            <Button disabled={!canUpgrade} onClick={() => { this.handleIncreaseTraitClick(trait, index) }}>+</Button>
                        </div>

                    </li>
                )
            } else {
                // Edit mode
                return (
                    <li key={trait.name}>
                        <div className="label">{trait.name}:</div>
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
                    <h2>{this.state.title}</h2>
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

export default HeroTraits;