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
class Armor extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        armors:[],
        leatherArmors:[],
        studdedArmors:[],
        chainArmors:[],
        scaleArmors:[],
        plateArmors:[],
        ithilmarArmors:[],
        gromrilArmor:[],
        segregatedArmors:[],
        tables:[],



    };
    addToAccordingTable (String, armorData){
        switch (String){
            case "CHAIN":{
                this.state.chainArmors.push("Zbroje Kolcze");
                this.state.chainArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.chainArmors);

                break;
            }
            case "LEATHER":{
                this.state.leatherArmors.push("Zbroje Skórzane");
                this.state.leatherArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.leatherArmors);

                break;
            }
            case "STUDDED":{
                this.state.studdedArmors.push("Zbroje Ćwiekowane");
                this.state.studdedArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.studdedArmors);

                break;
            }
            case "SCALE":{
                this.state.scaleArmors.push("Zbroje Łuskowe");
                this.state.scaleArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.scaleArmors);

                break;
            }
            case "PLATE":{
                this.state.plateArmors.push("Zbroje Płytowe");
                this.state.plateArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.plateArmors);

                break;
            }
            case "ITHILMAR":{
                this.state.ithilmarArmors.push("Zbroje Kolcze z Ithilmaru");
                this.state.ithilmarArmors.push(armorData);
                this.state.segregatedArmors.push(this.state.ithilmarArmors);

                break;
            }
            case "GROMRIL":{
                this.state.gromrilArmor.push("Zbroje Płytowe z Gromrilu");
                this.state.gromrilArmor.push(armorData);
                this.state.segregatedArmors.push(this.state.gromrilArmor);

                break;
            }
            default :
                return "brkn";


        }
    };
    componentDidMount() {
        fetch(url + "/armors", {
            method: 'GET',
            headers: header,
            credentials: 'same-origin'
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                armors: findresponse,
            })

        }).then(()=>{
            this.state.armors.map((dynamicData) => (
                this.addToAccordingTable(dynamicData.type,dynamicData)
        ))




        }).then(()=>{
            this.setState({
                tables: this.renderTables(this.props)
            })
        });
    }

    handleChange = event => {
        this.setState({value: event.target.value});
    };

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





    generatePanels=(armorTables,props,mainKey)=>{
        let name = armorTables[0];
        const {classes} = props;

        armorTables.splice(0,1);


        return (


                <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}} key={mainKey}>
                    <ExpansionPanelSummary  key={1}>
                        <Typography gutterBottom variant="h5" component="h5" key={mainKey}>{name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={10}>
                                <Table>
                                    <TableHead key={mainKey}>
                                        <TableRow  key={-1} classes={{root: classes.tableShrink}}>
                                            <CustomTableCell>Typ Zbroi</CustomTableCell>
                                            <CustomTableCell>Cena</CustomTableCell>
                                            <CustomTableCell>Obciążenie</CustomTableCell>
                                            <CustomTableCell>Chronione lokacje</CustomTableCell>
                                            <CustomTableCell>Punkty Zbroi</CustomTableCell>
                                            <CustomTableCell>Dostępność</CustomTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody classes={{root: classes.tableShrink}}>
                                        {armorTables.map((dynamicData,key) => (
                                        <TableRow  key={key} classes={{root: classes.tableShrink}}>
                                            <CustomTableCell><Typography
                                                noWrap={true}>{dynamicData.name}</Typography></CustomTableCell>
                                            <CustomTableCell>
                                                {dynamicData.price.gold!==0?<Typography>{dynamicData.price.gold}zk</Typography>:null}
                                                {dynamicData.price.silver!==0?<Typography>{dynamicData.price.silver}s</Typography>:null}
                                                {dynamicData.price.bronze!==0?<Typography>{dynamicData.price.bronze}p</Typography>:null}
                                            </CustomTableCell>
                                            <CustomTableCell>{dynamicData.weight}</CustomTableCell>
                                            <CustomTableCell>

                                                {dynamicData.protectionAreas.map((locations,key) => {
                                                    return (<Typography  key={key}>
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
                            <Grid item xs={1}>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        )



    };
    renderTables=(props)=>{

        return this.state.segregatedArmors.map((segregatedArmor,key)=>(
            this.generatePanels(segregatedArmor,props,key)

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
                {/*<Grid container alignItems={"center"} justify={"flex-start"}>*/}
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


Armor.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Armor);
