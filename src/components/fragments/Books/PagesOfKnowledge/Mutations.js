import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../img/paper-texture-alt.jpg'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import {compose} from "recompose";
import DemonIcon from './../../../../img/icon/demons2.png';
import DemonBorderIcon from './../../../../img/icon/demons2Border.png';
import WildLifeIcon from './../../../../img/icon/wildlife.png';
import WildlifeBorderIcon from './../../../../img/icon/wildlifeBorder.png';
import UndeadIcon from './../../../../img/icon/undead.png';
import UndeadBorderIcon from './../../../../img/icon/undeadBorder.png';
import MutantsIcon from './../../../../img/icon/tentacle.png';
import MutantsBorderIcon from './../../../../img/icon/tentacleBorder.png';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from "@material-ui/core/es/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from "@material-ui/core/Button";


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
    tableShrink:{
        height:0
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


class Mutations extends React.Component {
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
                <Grid container alignItems={"center"} justify={"flex-start"}>
                    <Grid item xs={9}>

                        <div className={classes.paper}>
                            <FormControl>
                                <RadioGroup
                                    aria-label="position"
                                    name="position"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio color="default"/>}
                                        label="Mutacje"
                                    />
                                    <FormControlLabel
                                        value="khorn"
                                        control={<Radio color="default"/>}
                                        label="Mutacje Khorna"
                                    />
                                    <FormControlLabel
                                        value="nurgl"
                                        control={<Radio color="default"
                                        />}
                                        label="Mutacje Nurgla"
                                    />
                                    <FormControlLabel
                                        value="slaanesh"
                                        control={<Radio color="default"
                                        />}
                                        label="Mutacje Slaanesha"
                                    />
                                    <FormControlLabel
                                        value="treentch"
                                        control={<Radio color="default"
                                        />}
                                        label="Mutacje Tzeentcha"
                                    />
                                </RadioGroup>
                            </FormControl>

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

                <Grid container spacing={0} alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="h5" component="h5">001-005
                                            Albinos
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography gutterBottom variant="h5" component="h5" align={"right"} > <b>PS: 0</b></Typography>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography>
                                            Typ: Pojedynczy.
                                        </Typography>
                                        <Typography>
                                            Opis:
                                            Tracisz 1k10 punktów Odporności i otrzymujesz modyfikator -5 do Testów
                                            spostrzegawczości związanych ze wzrokiem, wykonywanych w jasnym Swietle.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelDetails>
                            <Divider/>
                            <ExpansionPanelActions>
                                <Button size="small" color="primary">
                                    MUTUJ
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>


                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="h5" component="h5">011-015
                                            Bestia o tysiącu...
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography gutterBottom variant="h5" component="h5" align={"right"} > <b>PS: 3</b></Typography>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography>
                                            Typ: Wielokrotny.
                                        </Typography>
                                        <Typography>
                                            Opis:
                                            Twoje ciało wytwarza tysiąc rak, uszu, palców, oczu, sutków lub innych czesci ciała. Wyrastaja z kazdego micjsca ciała i nie sposób ich ukryć. Wola bogów Chaosu jest zlośliwa,
                                            dlatego poza potwornym wygladem nie zapewniają żADnych korzyści, choć obniżają wartość Oglady o 2k18 punktów.
                                        </Typography>
                                        <Typography>
                                            Warianty: Aby określić, jakie organy pokryly ciało mutanta, należy wykonać rzut 1k100 i sprawdzič wynik w tabeli.


                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Table >
                                            <TableHead >
                                            <TableRow classes={{root: classes.tableShrink }}>
                                            <CustomTableCell>Rzut</CustomTableCell>
                                            <CustomTableCell>Narośl</CustomTableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody classes={{root: classes.tableShrink }}>

                                                <TableRow key={1} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>01-10</CustomTableCell>
                                                    <CustomTableCell>Oczy</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={2} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>11-20</CustomTableCell>
                                                    <CustomTableCell>Nosy</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={3} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>21-30</CustomTableCell>
                                                    <CustomTableCell>Uszy</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={4} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>31-40</CustomTableCell>
                                                    <CustomTableCell>Wrzody</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={5} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>41-50</CustomTableCell>
                                                    <CustomTableCell>Języki</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={6} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>51-60</CustomTableCell>
                                                    <CustomTableCell>Sutki</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={7} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>61-70</CustomTableCell>
                                                    <CustomTableCell>Nogi lub ręce</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={8} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>81-90</CustomTableCell>
                                                    <CustomTableCell>Stopy lub dłonie</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={9} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>91-99</CustomTableCell>
                                                    <CustomTableCell>Odbyt</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={10} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>00</CustomTableCell>
                                                    <CustomTableCell>Twarze</CustomTableCell>
                                                </TableRow>



                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelDetails>
                            <Divider/>
                            <ExpansionPanelActions>
                                <Button size="small" color="primary">
                                    MUTUJ
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>


                    </Grid>


                </Grid>
            </Paper>

        )
    }


}


Mutations.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Mutations);
