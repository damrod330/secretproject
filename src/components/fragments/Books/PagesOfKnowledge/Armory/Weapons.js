import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../../img/dist/paper/old-paper.jpg'
import {compose} from "recompose";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import {fade} from '@material-ui/core/styles/colorManipulator';
import TableHead from '@material-ui/core/TableHead';
import LazyLoad from 'react-lazyload';

import axios from '../../../../../axios';


const styles = theme => ({
    paper: {
        //   fontFamily:"Garamond",
        backgroundImage: `url(${frontPaper})`,
        paddingLeft: 0
    },

    tableHeader: {
        backgroundColor: "black",
        color: "#FFFFFF",
        padding: "2px",

    },
    expansionPanel: {
        marginBottom: "1px",
        marginTop: "1px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.45),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.45),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: 0,
            '&:focus': {
                width: 70,
            },
        },
        [theme.breakpoints.up('md')]: {
            width: 0,
            '&:focus': {
                width: 120,
            },
        },

    },


});


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        paddingTop: 4,
        paddingRight: 12,
        paddingBottom: 4,
        paddingLeft: 12,
        borderBottom: 0,
    },
    body: {

        borderBottom: 0,

        fontSize: 14,
        paddingTop: 2,
        paddingRight: 12,
        paddingBottom: 4,
        paddingLeft: 12,

    },

}))(TableCell);


class Melee extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        meleeTable: [],
        rangedTable: [],
        segregatedWeapons: [],
        weapons: [],
        tables: [],
        fireArmTable: [],
        balistaTable: [],
        ammoTable: [],
        typeOfWeapon: [],
        mobile: false,

    };

    generatePanels = (weaponsTable, props, masterKey, mobile) => {
        let typeOfWeapon = this.state.typeOfWeapon;
        const {classes} = props;


        return (

            <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}} key={masterKey}>
                <ExpansionPanelSummary key={masterKey}>
                    <Typography gutterBottom variant="h5" component="h5">{typeOfWeapon[masterKey]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={10}>
                            {mobile === false ? this.showForDesktop(weaponsTable, classes, masterKey) : this.showForMobile(weaponsTable, classes, masterKey)}

                        </Grid>
                        <Grid item md={1}>
                        </Grid>

                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        )


    };

    addToAccordingTable(String, weaponData) {
        switch (String) {
            case "MELEE": {
                if (!this.state.typeOfWeapon.includes("Broń Biała")) {
                    this.state.typeOfWeapon.push("Broń Biała");
                    this.state.segregatedWeapons.push(this.state.meleeTable);

                }
                this.state.meleeTable.push(weaponData);

                break;
            }
            case "RANGED": {
                if (!this.state.typeOfWeapon.includes("Broń Dystansowa")) {
                    this.state.segregatedWeapons.push(this.state.rangedTable);
                    this.state.typeOfWeapon.push("Broń Dystansowa");
                }
                this.state.rangedTable.push(weaponData);


                break;
            }
            case "FIREARM": {
                if (!this.state.typeOfWeapon.includes("Broń Palna")) {
                    this.state.segregatedWeapons.push(this.state.fireArmTable);

                    this.state.typeOfWeapon.push("Broń Palna");
                }
                this.state.fireArmTable.push(weaponData);

                break;
            }
            case "BALISTA": {
                if (!this.state.typeOfWeapon.includes("Balisty")) {
                    this.state.segregatedWeapons.push(this.state.balistaTable);

                    this.state.typeOfWeapon.push("Balisty");
                }
                this.state.balistaTable.push(weaponData);

                break;
            }
            case "AMMO": {
                if (!this.state.typeOfWeapon.includes("Amunicja")) {

                    this.state.typeOfWeapon.push("Amunicja");
                    this.state.segregatedWeapons.push(this.state.ammoTable);

                }
                this.state.ammoTable.push(weaponData);

                break;
            }

            default :
                return "brkn";


        }
    };

    changeCategoryENUM(String) {
        switch (String) {
            case "NORMAL":
                return "Zwykła";
            case "BASIC":
                return "Zwykła";
            case "CROSSBOW":
                return "Kusza";
            case "LONG_BOW":
                return "Długi Łuk";
            case "THROWN":
                return "Rzucana";
            case "SLINGSHOT":
                return "Proca";
            case "IMMOBILISATION":
                return "Unieruchamiająca";
            case "CAVALERY":
                return "Kawaleryjska";
            case "PARRY":
                return "Parująca";
            case "TWO_HANDED":
                return "Dwuręczna";
            case "FLAIL":
                return "Korbacz";
            case "FENCING":
                return "Szermiercza";
            case "EXPLOSIVE":
                return "Palna";
            case "MECHANIC":
                return "Mechaniczna";
            case "SLING":
                return "Proca";
            case "FIREARM":
                return "Palna";
            case "OTHER":
                return "Inne?";
            default:
                return "Brak";
        }
    }

    changeTraitEMUM(String) {
        switch (String) {
            case "SPECIAL":
                return "Specjalny";
            case "CRUSHING":
                return "Druzgocący";
            case "SLOW":
                return "Powolony";
            case "NONE":
                return "Brak";
            case "STUNNING":
                return "Ogłuszający";
            case "PARRY":
                return "Parujący";
            case "HEAVY":
                return "Ciężki";
            case "FAST":
                return "Szybki";
            case "BALLANCED":
                return "Wyważony";
            case "IMMOBILIZING":
                return "Unieruchamiający";
            case "PENETRATING":
                return "Przebijający Zbroję";
            case "FRAGMENTATION":
                return "Odłamkowy";
            case "ELUSIVE":
                return "Zawodny";
            case "EXPERIMENTAL":
                return "Eksperymentalny";
            default:
                return "Brak";


        }
    }

    changeENUM(String) {
        switch (String) {
            case "RARE":
                return "Rzadkie";
            case "COMMON":
                return "Przeciętna";
            case "VERY_RARE":
                return "Znikoma";
            case "SPORADIC":
                return "Sporadyczna";
            case "LITTLE":
                return "Mała";
            case "NONE":
                return "Brak";
            default:
                return "Brak";

        }
    }

    componentDidMount() {
        // fetch(url + "/weapons", {
        //     method: 'GET',
        //     headers: header,
        //     credentials: 'same-origin'
        // }).then((Response) => Response.json()).then((findresponse) => {
        //     this.setState({
        //         weapons: findresponse,
        //     })

        // }).then(() => {
        //     this.state.weapons.map((dynamicData) => (
        //         this.addToAccordingTable(dynamicData.type, dynamicData)
        //     ))


        // }).then(() => {
        //     this.setState({
        //         tables: this.renderTables(this.props)
        //     })
        // });

        axios.get("/weapons")
            .then(res => {
                this.setState({weapons: res.data});
                this.state.weapons.map((dynamicData) => (
                    this.addToAccordingTable(dynamicData.type, dynamicData)
                ));
                this.setState({
                    tables: this.renderTables(this.props)
                });
            })


    }

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    renderTables = (props, mobile) => {

        return this.state.segregatedWeapons.map((segregatedWeapon, key) => (
            this.generatePanels(segregatedWeapon, props, key, mobile)

        ))
    };

    showForDesktop = (weaponsTable, classes, masterKey) => {
        return (<Table key={masterKey}>
            <TableHead key={masterKey}>
                <TableRow classes={{root: classes.tableShrink}}>
                    <CustomTableCell>Nazwa</CustomTableCell>
                    <CustomTableCell>Cena</CustomTableCell>
                    <CustomTableCell>Obciążenie</CustomTableCell>
                    <CustomTableCell>Kategoria</CustomTableCell>
                    <CustomTableCell>Siła Broni</CustomTableCell>
                    <CustomTableCell>Zasięg</CustomTableCell>
                    <CustomTableCell>Przeładowanie</CustomTableCell>
                    <CustomTableCell>Cechy Oręża</CustomTableCell>
                    <CustomTableCell>Dostępność</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody classes={{root: classes.tableShrink}}>
                {weaponsTable.map((dynamicData, key) => (

                        <TableRow key={key} classes={{root: classes.tableShrink}}>
                            <CustomTableCell><Typography
                            >{dynamicData.name}</Typography></CustomTableCell>
                            <CustomTableCell>
                                {dynamicData.price.gold !== 0 ? <Typography>{dynamicData.price.gold}zk</Typography> : null}
                                {dynamicData.price.silver !== 0 ?
                                    <Typography>{dynamicData.price.silver}s</Typography> : null}
                                {dynamicData.price.bronze !== 0 ?
                                    <Typography>{dynamicData.price.bronze}p</Typography> : null}
                            </CustomTableCell>
                            <CustomTableCell>{dynamicData.weight}</CustomTableCell>
                            <CustomTableCell>{this.changeCategoryENUM(dynamicData.category)}</CustomTableCell>
                            <CustomTableCell>{dynamicData.power}</CustomTableCell>
                            <CustomTableCell>{dynamicData.range}</CustomTableCell>
                            <CustomTableCell>{dynamicData.reloadTime}</CustomTableCell>
                            <CustomTableCell>{dynamicData.weaponTraits.map((trait) => (this.changeTraitEMUM(trait)))}</CustomTableCell>
                            <CustomTableCell>{this.changeENUM(dynamicData.availability)}</CustomTableCell>

                        </TableRow>
                    )
                )}

            </TableBody>
        </Table>);
    };
    showForMobile = (weaponsTable, classes, masterKey) => {
        return (
            <div>
                {weaponsTable.map((dynamicData, key) => (
                        <div key={key}>
                            <Grid key={key} container spacing={8}>
                                <Grid  item xs={4}>
                                    <Typography key={"nameKey" + key}><b>Nazwa:</b></Typography>
                                    <Typography key={"nameValue" + key}>{dynamicData.name}</Typography>
                                    <br/>
                                    <Typography key={"priceKey" + key}><b>Cena:</b></Typography>

                                    {dynamicData.price.gold !== 0 ?
                                        <Typography key={"gold" + key}>{dynamicData.price.gold}zk</Typography> : null}
                                    {dynamicData.price.silver !== 0 ?
                                        <Typography key={"silver" + key}>{dynamicData.price.silver}s</Typography> : null}
                                    {dynamicData.price.bronze !== 0 ?
                                        <Typography key={"bronze" + key}>{dynamicData.price.bronze}p</Typography> : null}


                                    <br/>
                                    <Typography key={"weightKey" + key}><b>Obciążenie:</b></Typography>
                                    <Typography key={"weightValue" + key}>{dynamicData.weight}</Typography>
                                    <br/>
                                    <Typography key={"categoryKey" + key}><b>Kategoria:</b></Typography>
                                    <Typography
                                        key={"categoryValue" + key}>{this.changeCategoryENUM(dynamicData.category)}</Typography>
                                    <br/>
                                    <Typography key={"strengthKey" + key}><b>Siła Broni:</b></Typography>
                                    <Typography key={"strengthValue" + key}>{dynamicData.power}</Typography>
                                    <br/>

                                </Grid>
                                <Grid  item xs={2}/>


                                <Grid  item xs={6}>
                                    <Typography key={"rangeKey" + key}><b>Zasięg:</b></Typography>
                                    <Typography key={"rangeValue" + key}>{dynamicData.range}</Typography>
                                    <br/>
                                    <Typography key={"reloadKey" + key}><b>Przeładowanie:</b></Typography>
                                    <Typography key={"reloadValue" + key}>{dynamicData.reloadTime}</Typography>
                                    <br/>
                                    <Typography key={"traitKey" + key}><b>Cechy:</b></Typography>
                                    <Typography
                                        key={"traitValue" + key}>{dynamicData.weaponTraits.map((trait) => (this.changeTraitEMUM(trait)))}</Typography>
                                    <br/>
                                    <Typography key={"availabilityKey" + key}><b>Dostępność:</b></Typography>
                                    <Typography
                                        key={"availabilityValue" + key}>{this.changeENUM(dynamicData.availability)}</Typography>
                                </Grid>
                            </Grid>


                            <hr/>
                        </div>
                    )
                )}
            </div>);
    };

    render() {

        const {classes} = this.props;
        const {width} = this.props;
        let {mobile} = this.state;


        if (isWidthDown('md', width)) {
            mobile = true

        }
        if (isWidthUp('lg', width)) {
            mobile = false


        }


        return (
            <Paper className={classes.paper}>
                <Grid container alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>

                        <LazyLoad height={300}>
                            {this.renderTables(this.props, mobile)}
                        </LazyLoad>


                    </Grid>


                </Grid>
            </Paper>

        )
    }


}


Melee.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Melee);
