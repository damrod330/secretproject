import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class HeroCard extends Component {


    state = {
        name: 'Jon\'athrin Mull',
        race: 'Elf',
        currentProfession: "Wojownik klanowy",
        previousProfession: 'brak',
        age: '52',
        gender: 'mężczyzna',
        weight: '76kg',
        height: '191cm',
        eyeColor: 'niebieski',
        hairColor: 'blond',
        starSign: 'brak',
        siblings: 'brak',
        placeOfBirth: 'Wielki Las',
        specialCharactersOfAppearance: 'Nadgryzione prawe ucho.',
    }

    labels = {
        name: 'Nazwa',
        race: 'Rasa',
        currentProfession: 'Aktualna profesja',
        previousProfession: 'Poprzednia profesja',
        age: 'Wiek',
        gender: 'Płeć',
        weight: 'Waga',
        height: 'Wzrost',
        eyeColor: 'Kolor oczu',
        hairColor: 'Kolor włosów',
        starSign: 'Znak gwiezdny',
        siblings: 'Rodzeństwo',
        placeOfBirth: 'Miejsce urodzenia',
        specialCharactersOfAppearance: 'Znaki specjalne'
    }

    handleOnTextChanged(event, propName) {
        // const stateCopy = { ...this.state };
        // stateCopy[propName] = event.target.value;
        // this.setState(stateCopy);
        this.setState({[propName]: event.target.value})
    }

    render() {
        let createTextField = (propName) => {
            return (
                <Grid item sm={12} md={6} key={propName + "Grid"}>
                    <TextField key={propName + "TextField"} label={this.labels[propName]} type="text" value={this.state[propName]}
                        onChange={ev => this.handleOnTextChanged(ev, propName)}/>
                </Grid>
            )
        }

        let textField = [];
        for (let property in this.state) {
            if (this.state.hasOwnProperty(property)) {
                textField.push(createTextField(property));
            }
        }

        return (
            <div className="paper-card">
                <div className="paper-card-title">
                    <h2>Bohater</h2>
                </div>
                <div className="paper-card-body-sm">
                    <Grid container spacing={8}>
                        {textField.map((textField)=>{return textField})}
                        {/* {createTextField("name")}
                        {createTextField("race")}
                        {createTextField("currentProfession")}
                        {createTextField("previousProfession")}
                        {createTextField("age")}
                        {createTextField("gender")}
                        {createTextField("weight")}
                        {createTextField("height")}
                        {createTextField("eyeColor")}
                        {createTextField("hairColor")}
                        {createTextField("starSign")}
                        {createTextField("siblings")}
                        {createTextField("placeOfBirth")}
                        {createTextField("specialCharactersOfAppearance")} */}
                    </Grid>

                </div>
            </div>
        );
    }
}

export default HeroCard;