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


class Armor extends React.Component {
    state = {
        filter: undefined,
        value: 'all',

    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };


    render() {
        const {classes} = this.props;
        const {width} = this.props;
        let sortIcon;
        let expandIcon={
            height:64,
            width:64
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
                <Grid container  alignItems={"center"} justify={"flex-start"}>
                    <Grid item xs={9}>

                        <div className={classes.paper}>


                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Wyszukaj.."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container  alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary >
                                <Typography gutterBottom variant="h5" component="h5">Zbroje Skórzane</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                                    <Grid item xs={1}>

                                    </Grid>
                                    <Grid item xs={10}>

                                        <Table >
                                            <TableHead >
                                                <TableRow classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>Typ Zbroi</CustomTableCell>
                                                    <CustomTableCell>Cena</CustomTableCell>
                                                    <CustomTableCell>Obciążenie</CustomTableCell>
                                                    <CustomTableCell>Chronione lokacje</CustomTableCell>
                                                    <CustomTableCell>Punkty Zbroi</CustomTableCell>
                                                    <CustomTableCell>Dostępność</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody classes={{root: classes.tableShrink }}>

                                                <TableRow key={1} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>Hełm</Typography></CustomTableCell>
                                                    <CustomTableCell>3zk</CustomTableCell>
                                                    <CustomTableCell>10</CustomTableCell>
                                                    <CustomTableCell>Głowa</CustomTableCell>
                                                    <CustomTableCell>1</CustomTableCell>
                                                    <CustomTableCell>Przeciętna</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={2} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>Kaftan</Typography></CustomTableCell>
                                                    <CustomTableCell>6zk</CustomTableCell>
                                                    <CustomTableCell>40</CustomTableCell>
                                                    <CustomTableCell>Korpus</CustomTableCell>
                                                    <CustomTableCell>1</CustomTableCell>
                                                    <CustomTableCell>Przeciętna</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={3} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>Kurta</Typography></CustomTableCell>
                                                    <CustomTableCell>12zk</CustomTableCell>
                                                    <CustomTableCell>50</CustomTableCell>
                                                    <CustomTableCell>Kropus, Ręce</CustomTableCell>
                                                    <CustomTableCell>1</CustomTableCell>
                                                    <CustomTableCell>Przeciętna</CustomTableCell> </TableRow>
                                                <TableRow key={4} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>Nogawice</Typography></CustomTableCell>
                                                    <CustomTableCell>10zk</CustomTableCell>
                                                    <CustomTableCell>20</CustomTableCell>
                                                    <CustomTableCell>Nogi</CustomTableCell>
                                                    <CustomTableCell>1</CustomTableCell>
                                                    <CustomTableCell>Przeciętna</CustomTableCell> </TableRow>
                                                <TableRow key={5} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>Skórznia</Typography></CustomTableCell>
                                                    <CustomTableCell>25zk</CustomTableCell>
                                                    <CustomTableCell>80</CustomTableCell>
                                                    <CustomTableCell>Wszystkie</CustomTableCell>
                                                    <CustomTableCell>1</CustomTableCell>
                                                    <CustomTableCell>Mała</CustomTableCell>
                                                </TableRow>




                                            </TableBody>
                                        </Table>

                                    </Grid>
                                    <Grid item xs={1}>
                                    </Grid>

                                </Grid>

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary>
                                <Typography>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary>
                                <Typography>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


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
