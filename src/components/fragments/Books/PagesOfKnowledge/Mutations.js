import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../img/paper-texture-alt.jpg'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import {compose} from "recompose";
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
    tableShrink: {
        height: 0,
        border: "1px solid",

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

class Mutations extends React.Component {
    state = {
        filter: undefined,
        value: 'ALL',
        mutations: [],
        isTable: false,
        khorn: [],
        nurgl: [],
        slaanesh: [],
        tzeentch: [],
        filteredMutations: [],
        filteredMutationsAfterSearch: [],
        searchValue: "",
        pairsParsedForTable: [],

    };

    changeENUM(String) {
        switch (String) {
            case "SINGLE":
                return "Pojedyńcza";
            case "MULTIPLE":
                return "Wielokrotna";
            default:
                return "sie zjebalo";

        }
    }

    handleChange = event => {
        this.setState({value: event.target.value});
        this.showMutations(event.target.value);
        this.setState({
            searchValue: ""
        });

    };

    componentDidMount() {
        fetch(url + "/mutations", {
            method: 'GET',
            headers: header,
            credentials: 'same-origin'
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                mutations: findresponse,
            });

        }).then(() => {
            this.filterMutations();

        }).then(() => {
            this.showMutations(this.state.value);
            this.setState({
                filteredMutationsAfterSearch: this.state.filteredMutations

            })


        })
    }


    filterMutations() {
        this.state.mutations.map((mutation) => {
            switch (mutation.godType) {
                case "KHORNE": {

                    return this.state.khorn.push(mutation);

                }
                case "NURGLE": {
                    return this.state.nurgl.push(mutation);

                }
                case "SLAANESH": {
                    return this.state.slaanesh.push(mutation);

                }
                case "TZEENTCH": {
                    return this.state.tzeentch.push(mutation);

                }
                case "ALL": {
                    return this.state.mutations;

                }
                default:
                    return this.state.mutations;
            }

        })
    }

    filterList = event => {
        this.setState({
            searchValue: event.target.value
        });
        let filteredList = this.state.filteredMutations;
        filteredList = filteredList.filter((item) => {
            return item.name.toString().toLowerCase().search(
                event.target.value.toString().toLowerCase()) !== -1;

        });
        this.setState({filteredMutationsAfterSearch: filteredList})

    };

    componentWillMount() {
        this.setState({filteredMutationsAfterSearch: this.state.filteredMutations})

    }

    showMutations(String) {
        switch (String) {
            case "KHORNE": {
                this.setState({
                    filteredMutations: this.state.khorn,
                    filteredMutationsAfterSearch: this.state.khorn
                });
                break;
            }
            case "NURGLE": {
                this.setState({
                    filteredMutations: this.state.nurgl,
                    filteredMutationsAfterSearch: this.state.nurgl
                });
                break;
            }
            case "SLAANESH": {
                this.setState({
                    filteredMutations: this.state.slaanesh,
                    filteredMutationsAfterSearch: this.state.slaanesh
                });
                break;
            }
            case "TZEENTCH": {
                this.setState({
                    filteredMutations: this.state.tzeentch,
                    filteredMutationsAfterSearch: this.state.tzeentch
                });
                break;
            }
            case "ALL": {
                this.setState({
                    filteredMutations: this.state.mutations,
                    filteredMutationsAfterSearch: this.state.mutations
                });
                break;
            }

        }


    }



    generateTable(dynamicData,key,classes){

            return(<Table key={key}>
                <TableHead key={key+"head"}>
                    <TableRow classes={{root: classes.tableShrink}} key={key}>
                        {dynamicData.table.map((table, keyHeader) => {

                            return (
                                <CustomTableCell
                                    key={keyHeader}>{table.first}</CustomTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                {this.generateBodyTable(dynamicData,classes,key)}

            </Table>)

    }
    generateBodyTable(Data,classes,key){
        let mutationTable=this.fromPairsToRows(Data);
        return(<TableBody classes={{root: classes.tableShrink}} key={key}>


            {mutationTable.map((row,rowKey)=>(

                <TableRow key={rowKey} classes={{root: classes.tableShrink}}>
                    {row.map((item,itemKey)=>
                        <CustomTableCell key={itemKey}>{item}</CustomTableCell>

                    )}

                </TableRow>
            ))}



        </TableBody>)
    }

    fromPairsToRows(oldTable) {
        let rows = [];
        let pairRows=[];

        for (let i = 0; i < oldTable.table[0].second.length; i++) {
            oldTable.table.map((pair) => {

                rows.push(pair.second[i])
            });
            pairRows.push(rows);
            rows=[];

        }
        let newTable=pairRows;
        return newTable;
    }

    render() {
        const {classes} = this.props;
        const {width} = this.props;


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
                                        value="ALL"
                                        control={<Radio color="default"/>}
                                        label="Mutacje"
                                    />
                                    <FormControlLabel
                                        value="KHORNE"
                                        control={<Radio color="default"/>}
                                        label="Mutacje Khorna"
                                    />
                                    <FormControlLabel
                                        value="NURGLE"
                                        control={<Radio color="default"
                                        />}
                                        label="Mutacje Nurgla"
                                    />
                                    <FormControlLabel
                                        value="SLAANESH"
                                        control={<Radio color="default"
                                        />}
                                        label="Mutacje Slaanesha"
                                    />
                                    <FormControlLabel
                                        value="TZEENTCH"
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
                                    onChange={this.filterList}
                                    value={this.state.searchValue}
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
                        <LazyLoad height={300}>
                            {this.state.filteredMutationsAfterSearch.map((dynamicData, key) => (


                                <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}
                                                key={key}>
                                    <ExpansionPanelSummary key={key}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    {dynamicData.roll} {dynamicData.name}
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography gutterBottom variant="h5" component="h5" align={"right"}>
                                                    <b>
                                                        PS: {dynamicData.ps}
                                                    </b></Typography>
                                            </Grid>
                                        </Grid>

                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails key={key}>

                                        <Grid container>
                                            <Grid item xs={7}>
                                                <Typography>
                                                    <b>Typ:</b> {this.changeENUM(dynamicData.type)}.
                                                </Typography>
                                                <Typography>
                                                    <b>Opis:</b> {dynamicData.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                {

                                                    dynamicData.table === '' || dynamicData.table !== null? this.generateTable(dynamicData,key,classes)
                                                        :
                                                        null
                                                }

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
                            ))}
                        </LazyLoad>
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
