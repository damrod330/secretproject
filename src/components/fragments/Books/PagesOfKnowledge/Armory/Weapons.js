import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../../img/paper-texture-alt.jpg'

import {compose} from "recompose";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import InputBase from "@material-ui/core/es/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {fade} from '@material-ui/core/styles/colorManipulator';
import TableHead from '@material-ui/core/TableHead';
import {url} from '../../../../../Constants'
import LazyLoad from 'react-lazyload';


const styles = theme => ({
    paper: {
        // boxShadow:"0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 2px 1px -1px rgba(0, 0, 0, 0)",
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

let header = {
    "Content-Type": "application/json"
};

class Melee extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        meleeTable: [],
        rangedTable: [],
        segregatedWeapons: [],
        weapons: [],
        tables: [],
        fireArmTable:[],
        balistaTable:[],
        ammoTable:[],

    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };


    generatePanels = (weaponsTable, props, masterKey) => {
        let name = weaponsTable[0];
        const {classes} = props;

        weaponsTable.splice(0, 1);


        return (

            <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}} key={masterKey}>
                <ExpansionPanelSummary key={masterKey}>
                    <Typography gutterBottom variant="h5" component="h5">Broń Biała</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                        <Grid item  md={1}>

                        </Grid>
                        <Grid item xs={12} md={10}>

                            <Table key={masterKey}>
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
                                                    noWrap={true}>{dynamicData.name}</Typography></CustomTableCell>
                                                <CustomTableCell>{dynamicData.price}</CustomTableCell>
                                                <CustomTableCell>{dynamicData.weight}</CustomTableCell>
                                                <CustomTableCell>{this.changeCategoryENUM(dynamicData.category)}</CustomTableCell>
                                                <CustomTableCell>{dynamicData.power}</CustomTableCell>
                                                <CustomTableCell>{dynamicData.range}</CustomTableCell>
                                                <CustomTableCell>{dynamicData.reloadTime}</CustomTableCell>
                                                <CustomTableCell>{dynamicData.weaponTraits.map((trait)=>(this.changeTraitEMUM(trait)))}</CustomTableCell>
                                                <CustomTableCell>{this.changeENUM(dynamicData.availability)}</CustomTableCell>

                                            </TableRow>
                                        )
                                    )}

                                </TableBody>
                            </Table>

                        </Grid>
                        <Grid item  md={1}>
                        </Grid>

                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        )


    };

    addToAccordingTable(String, weaponData) {
        switch (String) {
            case "MELEE": {
                this.state.meleeTable.push("Broń Biała");
                this.state.meleeTable.push(weaponData);
                this.state.segregatedWeapons.push(this.state.meleeTable);

                break;
            }
            case "RANGED": {
                this.state.rangedTable.push("Broń Dystansowa");
                this.state.rangedTable.push(weaponData);
                this.state.segregatedWeapons.push(this.state.rangedTable);

                break;
            }
            case "FIREARM": {
                this.state.fireArmTable.push("Broń Palna");
                this.state.fireArmTable.push(weaponData);
                this.state.segregatedWeapons.push(this.state.fireArmTable);

                break;
            }
            case "BALISTA": {
                this.state.balistaTable.push("Balisty");
                this.state.balistaTable.push(weaponData);
                this.state.segregatedWeapons.push(this.state.balistaTable);

                break;
            }
            case "AMMO": {
                this.state.ammoTable.push("Amunicja");
                this.state.ammoTable.push(weaponData);
                this.state.segregatedWeapons.push(this.state.ammoTable);

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
            case "CROSSBOW":
                return "Kusza";
            case "LONG_BOW":
                return "Długi Łuk";
            case "THROW":
                return "Rzucana";
            case "SLINGSHOT":
                return "Proca";
            case "IMMOBILIZING":
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
            case "MECHANICAL":
                return "Mechaniczna";
            case "FIREARM":
                return "Palna"
            default: return "sie zjebalo";
        }
    }
    changeTraitEMUM(String){
        switch (String){
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
            default: return "sie zjebalo";


        }
    }
    changeENUM(String){
        switch(String){
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
            case "HEAD":
                return "Głowa ";
            case "LEFT_HAND":
                return "Lewa Ręka ";
            case "RIGHT_HAND":
                return "Prawa Ręka ";
            case "LEFT_LEG":
                return "Lewa Noga ";
            case "RIGHT_LEG":
                return "Prawa Noga ";
            case "BODY":
                return "Korpus ";
            case "ALL":
                return "Wszystkie";
            default: return "sie zjebalo";

        }
    }

    componentDidMount() {
        fetch(url + "/weapons", {
            method: 'GET',
            headers: header,
            credentials: 'same-origin'
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                weapons: findresponse,
            })

        }).then(() => {
            this.state.weapons.map((dynamicData) => (
                this.addToAccordingTable(dynamicData.type, dynamicData)
            ))


        }).then(() => {
            this.setState({
                tables: this.renderTables(this.props)
            })
        });
    }

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    renderTables = (props) => {

        return this.state.segregatedWeapons.map((segregatedWeapon, key) => (
            this.generatePanels(segregatedWeapon, props, key)

        ))
    };

    render() {
        const {classes} = this.props;
        const {width} = this.props;
        let sortIcon;
        let expandIcon = {
            height: 64,
            width: 64
        };


        if (isWidthDown('md', width)) {

            sortIcon = {
                width: 32,
                height: 32
            };
        }
        if (isWidthUp('lg', width)) {
            sortIcon = {
                width: 64,
                height: 64
            };

        }


        return (
            <Paper className={classes.paper}>
                {/*<Grid container  alignItems={"center"} justify={"flex-start"}>*/}
                {/*<Grid item xs={9}>*/}

                {/*<div className={classes.paper}>*/}


                {/*</div>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={3}>*/}
                {/*<Grid container>*/}

                {/*<div className={classes.search}>*/}
                {/*<div className={classes.searchIcon}>*/}
                {/*<SearchIcon/>*/}
                {/*</div>*/}
                {/*<InputBase*/}
                {/*placeholder="Wyszukaj.."*/}
                {/*classes={{*/}
                {/*root: classes.inputRoot,*/}
                {/*input: classes.inputInput,*/}
                {/*}}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</Grid>*/}
                {/*</Grid>*/}
                {/*</Grid>*/}

                <Grid container alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>

                        <LazyLoad height={300}>
                        {this.state.tables}
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
