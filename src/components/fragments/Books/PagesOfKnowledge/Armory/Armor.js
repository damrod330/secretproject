import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../../img/dist/paper/linedpaper.png'
import {compose} from "recompose";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import {fade} from '@material-ui/core/styles/colorManipulator';
import TableHead from '@material-ui/core/TableHead';
import {url} from '../../../../../Constants'
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

let header = {
    "Content-Type": "application/json"
};

class Armor extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        armors: [],
        leatherArmors: [],
        studdedArmors: [],
        chainArmors: [],
        scaleArmors: [],
        plateArmors: [],
        ithilmarArmors: [],
        gromrilArmor: [],
        segregatedArmors: [],
        tables: [],
        typeOfArmor: [],


    };

    addToAccordingTable(String, armorData) {
        switch (String) {
            case "CHAIN": {
                if (!this.state.typeOfArmor.includes("Zbroje Kolcze")) {
                    this.state.typeOfArmor.push("Zbroje Kolcze");
                    this.state.segregatedArmors.push(this.state.chainArmors);
                }

                this.state.chainArmors.push(armorData);

                break;
            }
            case "LEATHER": {
                if (!this.state.typeOfArmor.includes("Zbroje Skórzane")) {
                    this.state.typeOfArmor.push("Zbroje Skórzane");
                    this.state.segregatedArmors.push(this.state.leatherArmors);
                }

                this.state.leatherArmors.push(armorData);

                break;
            }
            case "STUDDED": {
                if (!this.state.typeOfArmor.includes("Zbroje Ćwiekowane")) {
                    this.state.typeOfArmor.push("Zbroje Ćwiekowane");
                    this.state.segregatedArmors.push(this.state.studdedArmors);
                }

                this.state.studdedArmors.push(armorData);


                break;
            }
            case "SCALE": {
                if (!this.state.typeOfArmor.includes("Zbroje Łuskowe")) {
                    this.state.typeOfArmor.push("Zbroje Łuskowe");
                    this.state.segregatedArmors.push(this.state.scaleArmors);
                }
                this.state.scaleArmors.push(armorData);

                break;
            }
            case "PLATE": {
                if (!this.state.typeOfArmor.includes("Zbroje Płytowe")) {
                    this.state.segregatedArmors.push(this.state.plateArmors);

                    this.state.typeOfArmor.push("Zbroje Płytowe");
                }
                this.state.plateArmors.push(armorData);

                break;
            }
            case "ITHILMAR": {
                if (!this.state.typeOfArmor.includes("Zbroje Kolcze z Ithilmar")) {
                    this.state.segregatedArmors.push(this.state.ithilmarArmors);

                    this.state.typeOfArmor.push("Zbroje Kolcze z Ithilmaru");
                }
                this.state.ithilmarArmors.push(armorData);

                break;
            }
            case "GROMRIL": {
                if (!this.state.typeOfArmor.includes("broje Płytowe z Gromrilu")) {
                    this.state.typeOfArmor.push("Zbroje Płytowe z Gromrilu");
                    this.state.segregatedArmors.push(this.state.gromrilArmor);

                }
                this.state.gromrilArmor.push(armorData);

                break;
            }
            default :
                return "brkn";


        }
    };

    componentDidMount() {
        // fetch(url + "/armors", {
        //     method: 'GET',
        //     headers: header,
        //     credentials: 'same-origin'
        // }).then((Response) => Response.json()).then((findresponse) => {
        //     this.setState({
        //         armors: findresponse,
        //     })

        // }).then(() => {
        //     this.state.armors.map((dynamicData) => (
        //         this.addToAccordingTable(dynamicData.type, dynamicData)
        //     ))


        // }).then(() => {
        //     this.setState({
        //         tables: this.renderTables(this.props)
        //     })
        // });

        axios.get('/armors')
            .then(res => {
                this.setState({armors: res.data});
                this.state.armors.map((dynamicData) => (
                    this.addToAccordingTable(dynamicData.type, dynamicData)
                ));
                this.setState({
                    tables: this.renderTables(this.props)
                });
            });
    }

    handleChange = event => {
        this.setState({value: event.target.value});
    };

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
            default:
                return "sie zjebalo";

        }
    }


    generatePanels = (armorTables, props, mainKey) => {
        let typeOfArmor = this.state.typeOfArmor;
        const {classes} = props;


        return (

            <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}} key={mainKey}>
                <ExpansionPanelSummary key={1}>
                    <Typography gutterBottom variant="h5" component="h5"
                                key={mainKey}>{typeOfArmor[mainKey]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                    <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                        <Grid item>
                        </Grid>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead key={mainKey}>
                                    <TableRow key={-1} classes={{root: classes.tableShrink}}>
                                        <CustomTableCell>Typ Zbroi</CustomTableCell>
                                        <CustomTableCell>Cena</CustomTableCell>
                                        <CustomTableCell>Obciążenie</CustomTableCell>
                                        <CustomTableCell>Chronione lokacje</CustomTableCell>
                                        <CustomTableCell>Punkty Zbroi</CustomTableCell>
                                        <CustomTableCell>Dostępność</CustomTableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody classes={{root: classes.tableShrink}}>
                                    {armorTables.map((dynamicData, key) => (
                                            <TableRow key={key} classes={{root: classes.tableShrink}}>
                                                <CustomTableCell><Typography
                                                    noWrap={true}>{dynamicData.name}</Typography></CustomTableCell>
                                                <CustomTableCell>
                                                    {dynamicData.price.gold !== 0 ?
                                                        <Typography>{dynamicData.price.gold}zk</Typography> : null}
                                                    {dynamicData.price.silver !== 0 ?
                                                        <Typography>{dynamicData.price.silver}s</Typography> : null}
                                                    {dynamicData.price.bronze !== 0 ?
                                                        <Typography>{dynamicData.price.bronze}p</Typography> : null}
                                                </CustomTableCell>
                                                <CustomTableCell>{dynamicData.weight}</CustomTableCell>
                                                <CustomTableCell>

                                                    {dynamicData.protectionAreas.map((locations, key) => {
                                                        return (<Typography key={key}>
                                                                {this.changeENUM(locations)}
                                                            </Typography>
                                                        )
                                                    })}
                                                </CustomTableCell>
                                                <CustomTableCell>{dynamicData.pz}</CustomTableCell>
                                                <CustomTableCell>{this.changeENUM(dynamicData.availability)}</CustomTableCell>


                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item >
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )


    };
    renderTables = (props) => {


        return this.state.segregatedArmors.map((segregatedArmor, key) => (
            this.generatePanels(segregatedArmor, props, key)

        ))
    };


    render() {
        const {classes} = this.props;
        const {width} = this.props;



        if (isWidthDown('md', width)) {


        }
        if (isWidthUp('lg', width)) {


        }


        return (
            <Paper className={classes.paper}>

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


Armor.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Armor);
