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
import {url} from '../../../../Constants'
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
    tableShrink:{
        height:0,
        border:"1px solid",

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
class Spells extends React.Component {
    state = {
        filter: undefined,
        value: 'all',
        spells:[],
        isTable:false,
        filteredSpells:[],

    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };


    componentDidMount() {
        fetch(url + "/spells", {
            method: 'GET',
            headers: header,
            credentials: 'same-origin'
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                spells: findresponse,
                filteredSpells:findresponse
            });
            if (this.state.spells.table ===''||this.state.spells.table ===null){
                this.setState({isTable:false});

            }else {
                this.setState({isTable:true})
            }
        })
    }


    filterList = event =>{
        let filteredList= this.state.spells;
        filteredList = filteredList.filter((item)=> {
            return item.name.toString().toLowerCase().search(
                event.target.value.toString().toLowerCase())!==-1;

        });
        this.setState({filteredSpells:filteredList})

    };
    componentWillMount(){
        this.setState({filteredSpells:this.state.spells})
    }


    render() {
        const {classes} = this.props;
        const {width} = this.props;






        return (
            <Paper className={classes.paper}>
                <Grid container alignItems={"center"} justify={"flex-start"}>
                    {/*<Grid item xs={6}>*/}

                        {/*<div className={classes.paper}>*/}
                            {/*<FormControl>*/}
                                {/*<RadioGroup*/}
                                    {/*aria-label="position"*/}
                                    {/*name="position"*/}
                                    {/*value={this.state.value}*/}
                                    {/*onChange={this.handleChange}*/}
                                    {/*row*/}
                                {/*>*/}
                                    {/*<FormControlLabel*/}
                                        {/*value="all"*/}
                                        {/*control={<Radio color="default"/>}*/}
                                        {/*label="Mutacje"*/}
                                    {/*/>*/}
                                    {/*<FormControlLabel*/}
                                        {/*value="khorn"*/}
                                        {/*control={<Radio color="default"/>}*/}
                                        {/*label="Mutacje Khorna"*/}
                                    {/*/>*/}
                                    {/*<FormControlLabel*/}
                                        {/*value="nurgl"*/}
                                        {/*control={<Radio color="default"*/}
                                        {/*/>}*/}
                                        {/*label="Mutacje Nurgla"*/}
                                    {/*/>*/}
                                    {/*<FormControlLabel*/}
                                        {/*value="slaanesh"*/}
                                        {/*control={<Radio color="default"*/}
                                        {/*/>}*/}
                                        {/*label="Mutacje Slaanesha"*/}
                                    {/*/>*/}
                                    {/*<FormControlLabel*/}
                                        {/*value="treentch"*/}
                                        {/*control={<Radio color="default"*/}
                                        {/*/>}*/}
                                        {/*label="Mutacje Tzeentcha"*/}
                                    {/*/>*/}
                                {/*</RadioGroup>*/}
                            {/*</FormControl>*/}

                        {/*</div>*/}
                    {/*</Grid>*/}
                    <Grid item xs={8} >
                    </Grid>
                    <Grid item xs={3} >
                        <Grid container alignItems={"center"} justify={"center"}>

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
                                    onChange={this.filterList}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={0} alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                    <Grid item xs={12}>
                        <LazyLoad height={300}>
                            {this.state.filteredSpells.map((dynamicData, key) => (

                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}} key={key}>
                            <ExpansionPanelSummary key={key}>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            {dynamicData.name}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2}>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails key={key}>

                                <Grid container>
                                    <Grid item xs={7}>
                                        <Typography>
                                            <b>Wymagany poziom mocy:</b> {dynamicData.powerLevel}
                                        </Typography>
                                        <Typography>
                                            <b>Czas rzucania:</b> {dynamicData.castTime}

                                        </Typography>
                                        <Typography>
                                            <b>Składnik:</b> {dynamicData.component} (+1)
                                        </Typography>
                                        <Typography>
                                            <b>Czas trwania:</b> {dynamicData.duration}
                                        </Typography>
                                        <Typography>
                                            <b>Opis:</b> {dynamicData.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        {this.state.isTable ? dynamicData.table.map((table,key)=>{
                                            return(

                                                <Table  key={key}>
                                                    <TableHead key={key}>
                                                        <TableRow classes={{root: classes.tableShrink }} key={key}>
                                                            <CustomTableCell>Rzut</CustomTableCell>
                                                            <CustomTableCell>Efekt</CustomTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody classes={{root: classes.tableShrink }}  key={key+1}>

                                                        <TableRow key={key+1} classes={{root: classes.tableShrink }}>
                                                            <CustomTableCell><Typography noWrap={true}>{table.first}</Typography></CustomTableCell>
                                                            <CustomTableCell>{table.second}</CustomTableCell>
                                                        </TableRow>

                                                    </TableBody>
                                                </Table>

                                            )
                                        })

                                         : null}
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


Spells.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Spells);
