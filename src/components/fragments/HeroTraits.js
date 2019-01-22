import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class HeroTraits extends Component {

    state = {
        isEditModeEnabled: false,
        isProgressionModeEnabled: this.props.isProgressionModeEnabled,
        currentExpirience: this.props.currentExpirience,
        traits: this.props.traits
    }

    handleToggleEditState() {
        this.setState({ isEditModeEnabled: !this.state.isEditModeEnabled });
    }

    render() {
        let createTrait = trait => {
            if (!this.state.isEditModeEnabled) {
                // Standard mode
                let canUpgrade = ((trait.currentValue < trait.baseValue + trait.maxProgress) ? true : false) && this.state.isProgressionModeEnabled;
                return (
                    <li key={trait.name}>
                        <div className="label">{trait.displayName}:</div>
                        <div  className="value">
                            {canUpgrade ? <Button>-</Button> : null}
                            <span>{trait.currentValue}</span>
                            {canUpgrade ? <Button>+</Button> : null}
                        </div>

                    </li>
                )
            } else {
                // Edit mode
                return (
                    <tr key={trait.name}>
                        <td className="label">{trait.name}:</td>
                        <td> <TextField type="number" label={"bazowa"} type="text" value={trait.baseValue} /></td>
                        <td> <TextField type="number" label={"aktualna"} type="text" value={trait.currentValue} /></td>
                        <td> <TextField type="number" label={"rozwój"} type="text" value={trait.maxProgress} /></td>
                    </tr>);
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
                        {this.state.traits.map(trait => { return createTrait(trait) })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default HeroTraits;