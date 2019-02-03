import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./../BOF.css"
import Typography from "@material-ui/core/es/Typography/Typography";
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import TableCell from '@material-ui/core/TableCell';
import frontPaper from './../../../../img/dist/paper/old-paper.jpg'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { compose } from "recompose";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputBase from "@material-ui/core/es/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from "@material-ui/core/Button";
import LazyLoad from 'react-lazyload';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../../../axios';


const styles = theme => ({
    paper: {
        //   fontFamily:"Garamond",
        backgroundImage: `url(${frontPaper})`,
        paddingLeft: 0
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    modal: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: "15%",
        left: "30%",
    },
    modalForTable: {
        position: 'absolute',
        width: 1200,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: "15%",
        left: "15%",
        height: 600,
        overflowY: "auto"

    },


    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    textFieldHead: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    menu: {
        width: 200,
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
        openAddModal: false,
        numberOfColumns: 0,
        numberOfRows: 0,
        openAddModalTable: false,
        allowTable: false,
        addMutation: {
            name: "",
            type: "SINGLE",
            description: "",
            godType: "KHORN",
            ps: 0,
            roll: 0,
            comment: "",
            variants: "",
            table: [],
            id: "",

        },
        tableToPairs: [],
        tableHeader: [],
        tableBody: [],
        tableSubBody: [],
        fabVisible:true,
        mobile:false,
    };

    handleAllowTable = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleOpenModalTable = () => {
        this.setState({ openAddModalTable: true })

    };
    handleModalAdd = (name) => event => {

        this.setState({
            addMutation: {
                ...this.state.addMutation,
                [name]: event.target.value
            }



        })
    };
    handleModalAddTable = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };
    openAddModal = () => {
        this.setState({ openAddModal: true })

    };

    handlePushToTableHeader = i => event => {
        let table = this.state.tableHeader.slice();
        table[i] = event.target.value;
        this.setState({
            tableHeader: table
        });
    };
    handlePushToTableBody = (j, i, D1Array, D2Array) => event => {
        console.log(j, i);

        D1Array = this.state.tableBody.slice();
        D2Array = this.state.tableSubBody.slice();
        this.setState({
            tableBody: D1Array,
            tableSubBody: D2Array
        });
        D2Array[i] = event.target.value;
        D1Array[j] = D2Array;
    };
    fromTableToPairs = () => {
        let table = {
            first: "",
            second: ""

        };

        for (let i = 0; i < this.state.numberOfColumns; i++) {
            table.first = (this.state.tableHeader[i]);
            table.second = (this.state.tableBody[i]);

            this.state.addMutation.table.push(table);
            table = {
                first: "",
                second: ""
            };
        }


        this.setState({
            openAddModalTable: false
        });
    };

    fillAddMutations = () => {


        this.setState({
            openAddModal: false
        });
        // fetch(url + "/mutations", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: this.state.addMutation.name,
        //         type: this.state.addMutation.type,
        //         description: this.state.addMutation.description,
        //         godType: this.state.addMutation.godType,
        //         ps: this.state.addMutation.ps,
        //         roll: this.state.addMutation.roll,
        //         comment: this.state.addMutation.comment,
        //         variants: this.state.addMutation.variants,
        //         table: this.state.addMutation.table,
        //     }),
        //     headers: header,
        //     credentials: 'same-origin'
        // }).then((Response) => Response.json()).then((findresponse) => {
        //     this.setState({

        //     })
        // });

        axios.post('/mutations', {
            name: this.state.addMutation.name,
            type: this.state.addMutation.type,
            description: this.state.addMutation.description,
            godType: this.state.addMutation.godType,
            ps: this.state.addMutation.ps,
            roll: this.state.addMutation.roll,
            comment: this.state.addMutation.comment,
            variants: this.state.addMutation.variants,
            table: this.state.addMutation.table})
            .then(res => {

            });

    };


    generateTableForNewMutation = (classes) => {
        let nbrOfRows = this.state.numberOfRows;
        let nbrOfColumns = this.state.numberOfColumns;
        let table = [];
        let temp = [];
        let key = "";
        let D1Array = new Array(nbrOfColumns);
        let D2Array = new Array(nbrOfRows);


        for (let i = 0; i < nbrOfColumns; i++) {
            temp.push(
                <TextField key={"nagłówek" + i}
                           className={classes.textFieldHead}
                           onChange={this.handlePushToTableHeader(i)}
                           margin="normal"
                           error
                           label={"Nagłówek: " + i}

                />);
            for (let j = 0; j < nbrOfRows; j++) {


                key = i.toString();
                key += j.toString();
                temp.push(<TextField key={key}
                                     className={classes.textField}
                                     onChange={this.handlePushToTableBody(i, j,D1Array,D2Array)}
                                     margin="normal"
                                     label={"Rząd: " + j + " Kolumna: " + i}
                />)


            }
            table.push(temp);
            temp = [];
        }

        return table;

    };

    changeENUM(String) {
        switch (String) {
            case "SINGLE":
                return "Pojedyńcza";
            case "MULTIPLE":
                return "Wielokrotna";


        }
    }

    changeGodTypeENUM(String) {
        switch (String) {
            case "KHORN": {

                return "Khorn"

            }
            case "NURGLE": {
                return "Nurgl"

            }
            case "SLAANESH": {
                return "Slaanesh";

            }
            case "TZEENTCH": {
                return "Tzeentch";

            }

        }
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.showMutations(event.target.value);
        this.setState({
            searchValue: ""
        });

    };

    componentDidMount() {
        // fetch(url + "/mutations", {
        //     method: 'GET',
        //     headers: header,
        //     credentials: 'same-origin'
        // }).then((Response) => Response.json()).then((findresponse) => {
        //     this.setState({
        //         mutations: findresponse,
        //     });

        // }).then(() => {
        //     this.filterMutations();

        // }).then(() => {
        //     this.showMutations(this.state.value);
        //     this.setState({
        //         filteredMutationsAfterSearch: this.state.filteredMutations

        //     })
        // })

        axios.get('/mutations')
            .then(res => {
                console.log(res);
                this.setState({ mutations: res.data });
                this.filterMutations();
                this.showMutations(this.state.value);
                this.setState({
                    filteredMutationsAfterSearch: this.state.filteredMutations

                });
            });


    }


    filterMutations() {
        this.state.mutations.map((mutation) => {
            switch (mutation.godType) {
                case "KHORN": {

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
        this.setState({ filteredMutationsAfterSearch: filteredList })

    };

    componentWillMount() {
        this.setState({ filteredMutationsAfterSearch: this.state.filteredMutations })

    }

    showMutations(String) {
        switch (String) {
            case "KHORN": {
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
            default:
                console.log("Sie zjebalo (mutacje| filtr mutacji)")

        }


    }


    generateTable(dynamicData, key, classes) {

        return (<Table key={key}>
            <TableHead key={key + "head"}>
                <TableRow classes={{ root: classes.tableShrink }} key={key}>
                    {dynamicData.table.map((table, keyHeader) => {

                        return (
                            <CustomTableCell
                                key={keyHeader}>{table.first}</CustomTableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
            {this.generateBodyTable(dynamicData, classes, key)}

        </Table>)

    }

    generateBodyTable(Data, classes, key) {
        let mutationTable = this.fromPairsToRows(Data);
        return (<TableBody classes={{ root: classes.tableShrink }} key={key}>


            {mutationTable.map((row, rowKey) => (

                <TableRow key={rowKey} classes={{ root: classes.tableShrink }}>
                    {row.map((item, itemKey) =>

                        <CustomTableCell key={itemKey}>
                            {itemKey%row.length===0? <Typography noWrap={true}>{item}</Typography>:<Typography>{item}</Typography>}
                        </CustomTableCell>
                    )}

                </TableRow>
            ))}


        </TableBody>)
    }

    fromPairsToRows(oldTable) {
        let rows = [];
        let pairRows = [];

        for (let i = 0; i < oldTable.table[0].second.length; i++) {
            oldTable.table.map((pair) => {

                rows.push(pair.second[i])
            });
            pairRows.push(rows);
            rows = [];

        }
        let newTable = pairRows;
        return newTable;
    }

    showForMobileHeader=(dynamicData,classes,key)=>{
        return(<Grid container>
            <Grid item xs={7}>
                <Typography gutterBottom variant="h5" component="h5">
                    {dynamicData.roll}
                </Typography>
                <Typography gutterBottom variant="h5" component="h5">
                    {dynamicData.name}
                </Typography>

            </Grid>
            <Grid item xs={5}>
                <Typography noWrap gutterBottom variant="h5" component="h5" align={"right"}>
                    <b>
                        PS: {dynamicData.ps}
                    </b></Typography></Grid>
        </Grid>)
    };
    showForDesktopHeader=(dynamicData,classes,key)=>{
        return(<Grid container>
            <Grid item xs={10}>
                <Typography gutterBottom variant="h5" component="h5">
                    {dynamicData.roll} {dynamicData.name}
                </Typography>

            </Grid>
            <Grid item xs={2}>
                <Typography noWrap gutterBottom variant="h5" component="h5" align={"right"}>
                    <b>
                        PS: {dynamicData.ps}
                    </b></Typography></Grid>
        </Grid>)
    };
    showForDesktop=(dynamicData,classes,key)=>{
        return(<Grid container>
            <Grid item xs={7}>
                <Typography>
                    <b>Bóg:</b> {this.changeGodTypeENUM(dynamicData.godType)}
                </Typography>
                <Typography>
                    <b>Typ:</b> {this.changeENUM(dynamicData.type)}.
                </Typography>
                <Typography>
                    <b>Opis:</b> {dynamicData.description}
                </Typography>
                {dynamicData.variants!==""?
                    <Typography>
                        <b>Wariant:</b> {dynamicData.variants}
                    </Typography>:
                    <Typography/>
                }
                {dynamicData.comment!==""?
                    <Typography>
                        <b>Komentarz:</b> {dynamicData.comment}
                    </Typography>:
                    <Typography/>
                }
            </Grid>
            <Grid item xs={5}>
                {

                    dynamicData.table.length!==0


                        ? this.generateTable(dynamicData, key, classes)
                        :
                        null
                }

            </Grid>
        </Grid>)
    };
    showForMobile=(dynamicData,classes,key)=>{
        return(<Grid container>
                <Grid item xs={12}>
                    <Typography>
                        <b>Bóg:</b> {this.changeGodTypeENUM(dynamicData.godType)}
                    </Typography>
                    <Typography>
                        <b>Typ:</b> {this.changeENUM(dynamicData.type)}.
                    </Typography>
                    <Typography>
                        <b>Opis:</b> {dynamicData.description}
                    </Typography>
                    {dynamicData.variants!==""?
                        <Typography>
                            <b>Wariant:</b> {dynamicData.variants}
                        </Typography>:
                        <Typography/>
                    }
                    {dynamicData.comment!==""?
                        <Typography>
                            <b>Komentarz:</b> {dynamicData.comment}
                        </Typography>:
                        <Typography/>
                    }




                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        {

                            dynamicData.table.length!==0 ? this.generateTable(dynamicData, key, classes)
                                :
                                null
                        }

                    </Grid>
                </Grid>
            </Grid>
        )
    };

    render() {
        let mutationType = ["","SINGLE", "MULTIPLE"];
        let godType = ["","NURGLE", "KHORN", "TZEENTCH", "SLAANESH"];
        const {classes} = this.props;
        const {width} = this.props;
        let {mobile}=this.state;
        let {fabVisible}=this.state;

        if (isWidthDown('md', width)) {
            fabVisible = false;
            mobile=true;
        }
        if (isWidthUp('lg', width)) {
            fabVisible = true;
            mobile=false;
        }

        const desktopVersion = <Grid container alignItems={"center"} justify={"flex-start"}>
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
                                value="KHORN"
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
        </Grid>;

        const mobileVersion =
            <Grid container >
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
                                        label="Mutacje"
                                    />
                                    <FormControlLabel
                                        value="KHORN"
                                        control={<Radio color="default"/>}
                                        label="Khorn"
                                    />
                                    <FormControlLabel
                                        value="NURGLE"
                                        control={<Radio color="default"
                                        />}
                                        label="Nurgl"
                                    />
                                    <FormControlLabel
                                        value="SLAANESH"
                                        control={<Radio color="default"
                                        />}
                                        label="Slaanesh"
                                    />
                                    <FormControlLabel
                                        value="TZEENTCH"
                                        control={<Radio color="default"
                                        />}
                                        label="Tzeentch"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify={"center"}>
                    <Grid item xs={12}>
                        <Grid container justify={"center"}>


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
            </Grid>;


        return (
            <Paper className={classes.paper}>
                {mobile===false? desktopVersion: mobileVersion}

                <Grid container spacing={0} alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <LazyLoad height={300}>
                            {this.state.filteredMutationsAfterSearch.map((dynamicData, key) => (


                                <ExpansionPanel classes={{ root: classes.paper, expanded: classes.expansionPanel }}
                                                key={key}>
                                    <ExpansionPanelSummary key={key}>

                                        {mobile ===false? this.showForDesktopHeader(dynamicData,classes,key): this.showForMobileHeader(dynamicData,classes,key)}


                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails key={key}>

                                        {mobile===false? this.showForDesktop(dynamicData,classes,key): this.showForMobile(dynamicData,classes,key)}



                                    </ExpansionPanelDetails>
                                    <Divider />
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
                {fabVisible ? <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.openAddModal}>
                    <AddIcon/>
                </Fab> : null}

                <Modal
                    disableBackdropClick
                    open={this.state.openAddModal}

                >
                    <div className={classes.modal}>
                        <Typography variant="h6" id="modal-title">
                            Dodaj Mutację
                        </Typography>
                        <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>
                            <Grid item xs={4}>

                                <TextField
                                    label="Nazwa Mutacji"
                                    className={classes.textField}
                                    onChange={this.handleModalAdd('name')}
                                    margin="normal"
                                />

                                <TextField
                                    label="Punkty Strachu"
                                    onChange={this.handleModalAdd('ps')}
                                    type="number"
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <TextField
                                    label="Rzut Kością By Otrzymać"
                                    className={classes.textField}
                                    onChange={this.handleModalAdd('roll')}
                                    margin="normal"
                                />


                                <TextField
                                    label="Dodatkowy Komentarz"
                                    className={classes.textField}
                                    // value={this.state.addMutation.comment}
                                    onChange={this.handleModalAdd('comment')}
                                    margin="normal"
                                /><TextField
                                select
                                label="Typ"
                                className={classes.textField}
                                onChange={this.handleModalAdd('type')}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                            >
                                {mutationType.map(option => (
                                    <option key={option} value={option}>
                                        {this.changeENUM(option)}
                                    </option>
                                ))}
                            </TextField>

                                <TextField
                                    select
                                    label="Bóstwo"
                                    className={classes.textField}
                                    onChange={this.handleModalAdd('godType')}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {godType.map(option => (
                                        <option key={option} value={option}>
                                            {this.changeGodTypeENUM(option)}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Opis"
                                    multiline
                                    rows="7"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleModalAdd('description')}
                                />
                                <TextField
                                    label="Warianty"
                                    multiline
                                    rows={4}
                                    className={classes.textField}
                                    onChange={this.handleModalAdd('variants')}
                                    margin="normal"
                                />


                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={this.state.allowTable}
                                        onChange={this.handleAllowTable('allowTable')}
                                        value="Tabela istnieje?"
                                    />
                                }
                                                  label={"Istnieje Tabela?"} />
                                <TextField
                                    disabled={!this.state.allowTable}
                                    label="Liczba Nagłówków"
                                    className={classes.textField}
                                    value={this.state.numberOfColumns}
                                    onChange={this.handleModalAddTable('numberOfColumns')}
                                    margin="normal"
                                />
                                <TextField
                                    disabled={!this.state.allowTable}

                                    label="Liczba Rzędów"
                                    className={classes.textField}
                                    value={this.state.numberOfRows}
                                    onChange={this.handleModalAddTable('numberOfRows')}
                                    margin="normal"
                                />
                                <Button size="large" color="primary" onClick={this.handleOpenModalTable}
                                        disabled={!this.state.allowTable}>
                                    ¿Tabela?
                                </Button>
                            </Grid>

                        </Grid>
                        <Button size="large" color="primary" onClick={this.fillAddMutations}>
                            Dodaj
                        </Button>
                    </div>

                </Modal>


                <Modal

                    open={this.state.openAddModalTable}
                    disableBackdropClick
                >
                    <div className={classes.modalForTable}>
                        <Typography variant="h6" id="modal-title">
                            Tabela Efektów
                        </Typography>
                        <Grid container spacing={8} alignItems={"flex-start"} justify={"flex-start"}>

                            {this.generateTableForNewMutation(classes).map((item, key) => (
                                <Grid item xs={3} key={key}>
                                    {item}
                                </Grid>
                            ))}


                        </Grid>
                        <Button size="large" color="primary" onClick={this.fromTableToPairs}>
                            Dodaj
                        </Button>
                    </div>
                </Modal>


            </Paper>


        )
    }


}


Mutations.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Mutations);
