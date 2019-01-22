import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class HeroTraits extends Component {

    state = {
        editModeEnabled: false,
        traits: [
            {
                id: 'WW',
                displayName: "Walka wręcz",
                baseValue: 27,
                currentValue: 32,
                maxProgress: 15,
                progressStep: 5
            },
            {
                id: 'US',
                displayName: "Umiejętności strzeleckie",
                baseValue: 50,
                currentValue: 65,
                maxProgress: 25,
                progressStep: 5
            }
        ]
    }

    handleOnTextChanged(event, propName) {
        // const stateCopy = { ...this.state };
        // stateCopy[propName] = event.target.value;
        // this.setState(stateCopy);
        this.setState({ [propName]: event.target.value })
    }

    render() {
        let createTrait = trait => {
            let canUpgrade = (trait.currentValue < trait.baseValue + trait.maxProgress) ? true : false;
            return (
                <tr key={trait.id}>
                    <td className="label">{trait.displayName}:</td>
                    <td><Button>-</Button></td>
                    <td className="value">{trait.currentValue}</td>
                    <td><Button>+</Button></td>
                </tr>
            )
        }

        return (
            <div className="paper-card">
                <div className="paper-card-title">
                    <h2>Cechy</h2>
                </div>
                <div className="paper-card-body-sm">
                    <table className="traits">
                        <tbody>
                            {this.state.traits.map(trait => { return createTrait(trait) })}
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default HeroTraits;