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
import mutant from './../../../../img/icon/tentacle.png';
import MutantsBorderIcon from './../../../../img/icon/tentacleBorder.png';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import InputBase from "@material-ui/core/es/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {fade} from '@material-ui/core/styles/colorManipulator';
import LazyLoad from 'react-lazyload';
import {url} from '../../../../Constants'

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

class Bestiary extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        beasts: [],

    };


    handleChange = event => {
        this.setState({value: event.target.value});
    };

    componentDidMount() {
        fetch(url + "/creatures", {
            method: 'GET',
            headers: header,
            credentials: 'same-origin'
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                beasts: findresponse,
            })
        })
    }

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
                                        label="Wszystko"
                                    />
                                    <FormControlLabel
                                        value="wildlife"
                                        control={<Radio color="default"
                                                        icon={<img src={WildlifeBorderIcon} alt={"dzikie zwierzeta"}
                                                                   style={sortIcon}/>}
                                                        checkedIcon={<img src={WildLifeIcon} alt={"Dziki Zwirz"}
                                                                          style={sortIcon}/>}/>}
                                        label="Zwierzęta"
                                    />
                                    <FormControlLabel
                                        value="demons"
                                        control={<Radio color="default"
                                                        icon={<img src={DemonBorderIcon} alt={"mordujace demony"}
                                                                   style={sortIcon}/>}
                                                        checkedIcon={<img src={DemonIcon} alt={"wymordowane demony"}
                                                                          style={sortIcon}/>}/>}
                                        label="Demony"
                                    />
                                    <FormControlLabel
                                        value="undead"
                                        control={<Radio color="default"
                                                        icon={<img src={UndeadBorderIcon} alt={"trupczaki"}
                                                                   style={sortIcon}/>}
                                                        checkedIcon={<img src={UndeadIcon} alt={"umarlaki"}
                                                                          style={sortIcon}/>}/>}
                                        label="Ożywieńcy"
                                    />
                                    <FormControlLabel
                                        value="muties"
                                        control={<Radio color="default"
                                                        icon={<img src={MutantsBorderIcon} alt={"GMO"}
                                                                   style={sortIcon}/>}
                                                        checkedIcon={<img src={MutantsIcon} alt={"mutaciaki"}
                                                                          style={sortIcon}/>}/>}
                                        label="Mutanci"
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

                <Grid container alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <LazyLoad>
                            {this.state.beasts.map((dynamidData, key) => (


                                <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                                    <ExpansionPanelSummary expandIcon={<img src={dynamidData.type} alt={"Dziki Zwirz"}
                                                                            style={expandIcon}/>}>
                                        {/* TODO Ikona winna sie zmieniac wraz z pochodzeniam danego stwora i.e wilk - wildLife, kapra demon - demonIcon, chtulu - mutantIcon */}
                                        <Typography gutterBottom variant="h5"
                                                    component="h5">{dynamidData.name}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                        <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                                            <Grid item xs={2}>
                                                <img src={"/img/Books/Bestiary/mino.png"} width={"100%"} height={"100%"}
                                                     alt={"img"}/>
                                            </Grid>
                                            <Grid item xs={3}>

                                                <Typography>
                                                    {dynamidData.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Paper classes={{root: classes.tableHeader}}>
                                                    Cechy Główne:
                                                </Paper>
                                                <Table>
                                                    <TableBody>

                                                        <TableRow key={key}>

                                                            <CustomTableCell>WW</CustomTableCell>
                                                            <CustomTableCell>US</CustomTableCell>
                                                            <CustomTableCell>K</CustomTableCell>
                                                            <CustomTableCell>Odp</CustomTableCell>
                                                            <CustomTableCell>Zr</CustomTableCell>
                                                            <CustomTableCell>Int</CustomTableCell>
                                                            <CustomTableCell>SW</CustomTableCell>
                                                            <CustomTableCell>Odg</CustomTableCell>

                                                        </TableRow>
                                                        <TableRow key={key}>

                                                            <CustomTableCell>25</CustomTableCell>
                                                            <CustomTableCell>30</CustomTableCell>
                                                            <CustomTableCell>30</CustomTableCell>
                                                            <CustomTableCell>30</CustomTableCell>
                                                            <CustomTableCell>25</CustomTableCell>
                                                            <CustomTableCell>30</CustomTableCell>
                                                            <CustomTableCell>30</CustomTableCell>
                                                            <CustomTableCell>15</CustomTableCell>

                                                        </TableRow>


                                                    </TableBody>
                                                </Table>


                                                <Paper classes={{root: classes.tableHeader}}>
                                                    Cechy Drugorzędne:
                                                </Paper>
                                                <Table>

                                                    <TableBody>

                                                        <TableRow key={3}>
                                                            <CustomTableCell>A</CustomTableCell>
                                                            <CustomTableCell>Żyw</CustomTableCell>
                                                            <CustomTableCell>S</CustomTableCell>
                                                            <CustomTableCell>Wt</CustomTableCell>
                                                            <CustomTableCell>Sz</CustomTableCell>
                                                            <CustomTableCell>Mag</CustomTableCell>
                                                            <CustomTableCell>PO</CustomTableCell>
                                                            <CustomTableCell>PP</CustomTableCell>

                                                        </TableRow>
                                                        <TableRow key={4}>
                                                            <CustomTableCell>1</CustomTableCell>
                                                            <CustomTableCell>8</CustomTableCell>
                                                            <CustomTableCell>3</CustomTableCell>
                                                            <CustomTableCell>3</CustomTableCell>
                                                            <CustomTableCell>4</CustomTableCell>
                                                            <CustomTableCell>0</CustomTableCell>
                                                            <CustomTableCell>0</CustomTableCell>
                                                            <CustomTableCell>0</CustomTableCell>

                                                        </TableRow>


                                                    </TableBody>
                                                </Table>

                                                <Grid container spacing={8}>
                                                    <Grid item xs={4}>
                                                        <Typography>
                                                            <b>Ekwipunek:</b><br/>
                                                            {dynamidData.armors}<br/>
                                                            {dynamidData.weapons}<br/>
                                                            {dynamidData.items}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography>
                                                            <b>Umiejetności:</b><br/>
                                                            {dynamidData.skills.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography>
                                                            <b>Zdolności:</b><br/>
                                                            {dynamidData.abilities.name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ))}
                        </LazyLoad>
                                            </Grid>


                </Grid>
            </Paper>

        )
    }


}


Bestiary.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Bestiary);
