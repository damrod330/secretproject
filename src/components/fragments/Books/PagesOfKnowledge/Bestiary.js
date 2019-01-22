import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../img/dist/paper/linedpaper.png'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import {compose} from "recompose";
import DemonIcon from './../../../../img/icon/demons2.png';
import DemonBorderIcon from './../../../../img/icon/demons2Border.png';
import WildLifeIcon from './../../../../img/icon/wildlifeicon.png';
import WildlifeBorderIcon from './../../../../img/icon/wildlifeBorder.png';
import UndeadIcon from './../../../../img/icon/undeadicon.png';
import UndeadBorderIcon from './../../../../img/icon/undeadBorder.png';
import MutantsIcon from './../../../../img/icon/tentacle.png';
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
                width: 220,
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
        value: 'ALL',
        beasts: [],
        mutants: [],
        wildlife: [],
        undead: [],
        demons: [],
        filteredBeasts: [],
        filteredBeastsAfterSearch: [],
        searchValue: "",
        mobile: false,


    };


    handleChange = event => {
        this.setState({value: event.target.value});
        this.showBeasts(event.target.value);
        this.setState({
            searchValue: ""
        });
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
        }).then(() => {
            this.filterBeasts();

        }).then(() => {
            this.showBeasts(this.state.value);
            this.setState({
                filteredBeastsAfterSearch: this.state.filteredBeasts

            })
        })
    }

    filterList = event => {
        this.setState({
            searchValue: event.target.value
        });
        let filteredList = this.state.filteredBeasts;
        filteredList = filteredList.filter((item) => {
            return item.name.toString().toLowerCase().search(
                event.target.value.toString().toLowerCase()) !== -1;

        });
        this.setState({filteredBeastsAfterSearch: filteredList})

    };

    componentWillMount() {
        this.setState({filteredBeastsAfterSearch: this.state.filteredBeasts})

    }

    filterBeasts() {
        this.state.beasts.map((beast) => {
            switch (beast.type) {
                case "DEMON": {

                    return this.state.demons.push(beast);


                }
                case "MUTANT": {
                    return this.state.mutants.push(beast);

                }
                case "WILDLIFE": {
                    return this.state.wildlife.push(beast);

                }
                case "UNDEAD": {
                    return this.state.undead.push(beast);

                }
                case "ALL": {
                    return this.state.beasts;

                }
                default:
                    return this.state.beasts;
            }

        })
    }

    showBeasts(String) {
        switch (String) {
            case "DEMON": {
                this.setState({
                    filteredBeasts: this.state.demons,
                    filteredBeastsAfterSearch: this.state.demons

                });
                break;
            }
            case "MUTANT": {
                this.setState({
                    filteredBeasts: this.state.mutants,
                    filteredBeastsAfterSearch: this.state.mutants

                });
                break;
            }
            case "UNDEAD": {
                this.setState({
                    filteredBeasts: this.state.undead,
                    filteredBeastsAfterSearch: this.state.undead

                });
                break;
            }
            case "WILDLIFE": {
                this.setState({
                    filteredBeasts: this.state.wildlife,
                    filteredBeastsAfterSearch: this.state.wildlife

                });
                break;
            }
            case "ALL": {
                this.setState({
                    filteredBeasts: this.state.beasts,
                    filteredBeastsAfterSearch: this.state.beasts

                });
                break;
            }
        }

    };

    showDesktop = (dynamicData, classes, key) => {
        return (<Grid container spacing={8} alignItems={"flex-start"}
                      justify={"flex-start"}>
            <Grid item xs={2}>
                <img
                    // src={"/img/Books/Bestiary/mino.png"}
                    //  src={require("./../../../../img/Beasts/" + `${dynamicData.imageName}` + ".png")}
                    width={"100%"}
                    height={"100%"}
                    alt={"img"} key={key}/>
            </Grid>
            <Grid item xs={3}>

                <Typography>
                    {dynamicData.description}
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <Paper classes={{root: classes.tableHeader}}>
                    Cechy Główne:
                </Paper>
                <Table>
                    <TableBody>

                        <TableRow key={-1}>


                            {dynamicData.traits.slice(0, 8).map((trait, traitKey) => (
                                <CustomTableCell key={traitKey}>{trait.first}</CustomTableCell>
                            ))}


                        </TableRow>

                        <TableRow key={key}>
                            {dynamicData.traits.slice(0, 8).map((trait, traitKey) => (
                                <CustomTableCell key={traitKey}>{trait.second}</CustomTableCell>
                            ))}


                        </TableRow>


                    </TableBody>
                </Table>


                <Paper classes={{root: classes.tableHeader}}>
                    Cechy Drugorzędne:
                </Paper>
                <Table>

                    <TableBody>

                        <TableRow key={-1}>
                            {dynamicData.traits.slice(8, 16).map((trait, traitKey) => (
                                <CustomTableCell key={traitKey}>{trait.first}</CustomTableCell>
                            ))}


                        </TableRow>
                        <TableRow key={key + 1}>
                            {dynamicData.traits.slice(8, 16).map((trait, traitKey) => (
                                <CustomTableCell key={traitKey}>{trait.second}</CustomTableCell>
                            ))}


                        </TableRow>


                    </TableBody>
                </Table>

                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <Typography>
                            <b>Ekwipunek:</b><br/>
                            {dynamicData.armors}<br/>
                            {dynamicData.weapons}<br/>
                            {dynamicData.items}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            <b>Umiejetności:</b><br/>
                            {dynamicData.skills.map((skill) => {
                                return (skill.name)
                            })

                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            <b>Zdolności:</b><br/>
                            {dynamicData.abilities.map((ability) => {
                                return (ability.name)
                            })

                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Typography>
                    <b>Zasady Specialne:</b>
                    {dynamicData.specialRules}
                </Typography>
            </Grid>

        </Grid>)
    };

    showMobile = (dynamicData, classes, key) => {
        return (<Grid container spacing={8} alignItems={"flex-start"}
                      justify={"flex-start"}>
            <Grid item xs={2}>
                <img
                    // src={"/img/Books/Bestiary/mino.png"}
                    //  src={require("./../../../../img/Beasts/" + `${dynamicData.imageName}` + ".png")}
                    width={"100%"}
                    height={"100%"}
                    alt={"img"} key={key}/>
            </Grid>
            <Grid item xs={12}>

                <Typography>
                    {dynamicData.description}
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Paper classes={{root: classes.tableHeader}}>
                        Cechy Główne:
                    </Paper>
                    <Table>
                        <TableBody>

                            <TableRow key={-1}>


                                {dynamicData.traits.slice(0, 8).map((trait, traitKey) => (
                                    <CustomTableCell key={traitKey}>{trait.first}</CustomTableCell>
                                ))}


                            </TableRow>

                            <TableRow key={key}>
                                {dynamicData.traits.slice(0, 8).map((trait, traitKey) => (
                                    <CustomTableCell key={traitKey}>{trait.second}</CustomTableCell>
                                ))}


                            </TableRow>


                        </TableBody>
                    </Table>


                    <Paper classes={{root: classes.tableHeader}}>
                        Cechy Drugorzędne:
                    </Paper>
                    <Table>

                        <TableBody>

                            <TableRow key={-1}>
                                {dynamicData.traits.slice(8, 16).map((trait, traitKey) => (
                                    <CustomTableCell key={traitKey}>{trait.first}</CustomTableCell>
                                ))}


                            </TableRow>
                            <TableRow key={key + 1}>
                                {dynamicData.traits.slice(8, 16).map((trait, traitKey) => (
                                    <CustomTableCell key={traitKey}>{trait.second}</CustomTableCell>
                                ))}


                            </TableRow>


                        </TableBody>
                    </Table>

                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Typography>
                                <b>Ekwipunek:</b><br/>
                                {dynamicData.armors}<br/>
                                {dynamicData.weapons}<br/>
                                {dynamicData.items}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                <b>Umiejetności:</b><br/>
                                {dynamicData.skills.map((skill) => {
                                    return (skill.name)
                                })

                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                <b>Zdolności:</b><br/>
                                {dynamicData.abilities.map((ability) => {
                                    return (ability.name)
                                })

                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography>
                        <b>Zasady Specialne:</b>
                        {dynamicData.specialRules}
                    </Typography>
                </Grid>
            </Grid>

        </Grid>)
    };


    render() {

        const {classes} = this.props;
        const {width} = this.props;
        let {mobile} = this.state;
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
            mobile = true;
        }
        if (isWidthUp('lg', width)) {
            sortIcon = {
                width: 64,
                height: 64
            };
            mobile = false;

        }

        let headerDekstop = <Grid container alignItems={"center"} justify={"flex-start"}>

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
                                value="ALL"
                                control={<Radio color="default"/>}
                                label="Wszystko"
                            />
                            <FormControlLabel
                                value="WILDLIFE"
                                control={<Radio color="default"
                                                icon={<img src={WildlifeBorderIcon} alt={"dzikie zwierzeta"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={WildLifeIcon} alt={"Dziki Zwirz"}
                                                                  style={sortIcon}/>}/>}
                                label="Zwierzęta"
                            />
                            <FormControlLabel
                                value="DEMON"
                                control={<Radio color="default"
                                                icon={<img src={DemonBorderIcon} alt={"mordujace demony"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={DemonIcon} alt={"wymordowane demony"}
                                                                  style={sortIcon}/>}/>}
                                label="Demony"
                            />
                            <FormControlLabel
                                value="UNDEAD"
                                control={<Radio color="default"
                                                icon={<img src={UndeadBorderIcon} alt={"trupczaki"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={UndeadIcon} alt={"umarlaki"}
                                                                  style={sortIcon}/>}/>}
                                label="Ożywieńcy"
                            />
                            <FormControlLabel
                                value="MUTANT"
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
                            value={this.state.searchValue}
                            onChange={this.filterList}
                            placeholder="Wyszukaj.."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </Grid>;

        let headerMobile = <Grid container>
            <Grid item xs={12}>

            <Grid container justify={"center"}>
                <Grid item >
                    <FormControl>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.value}
                            onChange={this.handleChange}
                            row
                        >
                            <FormControlLabel
                                value="ALL"
                                control={<Radio color="default"/>}
                                label="Wszystko"
                            />
                            <FormControlLabel
                                value="WILDLIFE"
                                control={<Radio color="default"
                                                icon={<img src={WildlifeBorderIcon} alt={"dzikie zwierzeta"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={WildLifeIcon} alt={"Dziki Zwirz"}
                                                                  style={sortIcon}/>}/>}
                                label="Zwierzęta"
                            />
                            <FormControlLabel
                                value="DEMON"
                                control={<Radio color="default"
                                                icon={<img src={DemonBorderIcon} alt={"mordujace demony"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={DemonIcon} alt={"wymordowane demony"}
                                                                  style={sortIcon}/>}/>}
                                label="Demony"
                            />
                            <FormControlLabel
                                value="UNDEAD"
                                control={<Radio color="default"
                                                icon={<img src={UndeadBorderIcon} alt={"trupczaki"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={UndeadIcon} alt={"umarlaki"}
                                                                  style={sortIcon}/>}/>}
                                label="Ożywieńcy"
                            />
                            <FormControlLabel
                                value="MUTANT"
                                control={<Radio color="default"
                                                icon={<img src={MutantsBorderIcon} alt={"GMO"}
                                                           style={sortIcon}/>}
                                                checkedIcon={<img src={MutantsIcon} alt={"mutaciaki"}
                                                                  style={sortIcon}/>}/>}
                                label="Mutanci"
                            />
                        </RadioGroup>
                    </FormControl>


                </Grid>
            </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                <Grid container justify={"center"}>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            value={this.state.searchValue}
                            onChange={this.filterList}
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
        </Grid>;


        return (
            <Paper className={classes.paper}>
                {mobile === false ? headerDekstop : headerMobile}


                <Grid container alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <LazyLoad height={300}>


                            {this.state.filteredBeastsAfterSearch.map((dynamicData, key) => (



                                <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}
                                                key={key}>
                                    <ExpansionPanelSummary expandIcon={<img
                                        src={require("./../../../../img/icon/" + `${dynamicData.type}` + ".png")}
                                        alt={""}
                                        style={expandIcon}/>} key={key}>
                                        {/* TODO Ikona winna sie zmieniac wraz z pochodzeniam danego stwora i.e wilk - wildLife, kapra demon - demonIcon, chtulu - mutantIcon */}
                                        <Typography gutterBottom variant="h5"
                                                    component="h5" key={key}>{dynamicData.name}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {mobile === false ? this.showDesktop(dynamicData, classes, key) : this.showMobile(dynamicData, classes, key)}


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
