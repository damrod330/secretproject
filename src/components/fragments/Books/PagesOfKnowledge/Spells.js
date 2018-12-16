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
                width: 140,
            },
        },
        [theme.breakpoints.up('md')]: {
            width: 0,
            '&:focus': {
                width: 300,
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


class Spells extends React.Component {
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
                    <Grid item xs={12} >
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
                                        <Typography gutterBottom variant="h5" component="h5">
                                            Sobowtór
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2}>
                                        {/*<Typography gutterBottom variant="h5" component="h5" align={"right"} > <b>PS: 0</b></Typography>*/}
                                    </Grid>
                                </Grid>


                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography>
                                            <b>Wymagany poziom mocy:</b> 7
                                        </Typography>
                                        <Typography>
                                            <b>Czas rzucania:</b> 3 akcje

                                        </Typography>
                                        <Typography>
                                            <b>Składnik:</b> pukiel włosów przedstawiciela rasy, w którego chce przeobraźić się czarodziej (+1)
                                        </Typography>
                                        <Typography>
                                            <b>Czas trwania:</b> liczba minut równa wartości Magii czarodzieja
                                        </Typography>
                                        <Typography>
                                            <b>Opis:</b> Czarodziej przybiera wygląd (wraz z ubraniem, zbroją, itp.)
                                            dowolnej żywej istoty humanoidalnej majac Zaklęcie rwy glos mającej poniżej 3 metrów wzrostu
                                            (człowiek, elf, ork, itp.). Zaklęcie zmienia tylko wygląd zewnętrzny, nie modyfikacja barwy głosu ani nie zapewnia wiedzy i umiejętności typowych dla przedstawicieli danej rasy.
                                            Na przykład czarodziej, który wygląda jak ork, ale nie zna języka goblińskiego, powinien raczej milczeć w gronie zielonoskórych. Jeśli czarodziej zachowuje się podejrzanie,
                                            obserwująca go osoba może wykonać test Inteligencji. Udany test oznacza, że orientuje się, że ma do czynienia z iluzją. Jeśli czarodziej chce przybrać wygląd konkretnej osoby,
                                            musi wykonać udany test splatania magii.
                                            W przeciwnym wypadku przyjmuje postać przeciętnego osobnika danej rasy
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                        <ExpansionPanel classes={{root: classes.paper, expanded: classes.expansionPanel}}>
                            <ExpansionPanelSummary>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            Oszołomienie
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2}>
                                        {/*<Typography gutterBottom variant="h5" component="h5" align={"right"} > <b>PS: 3</b></Typography>*/}
                                    </Grid>
                                </Grid>


                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>

                                <Grid container spacing={8}>
                                    <Grid item xs={7}>
                                        <Typography>
                                            <b>Wymagany poziom mocy:</b> 8
                                        </Typography>
                                        <Typography>
                                            <b>Czas rzucania:</b>akcja

                                        </Typography>
                                        <Typography>
                                            <b>Składnik:</b>trochę piwa (+1)
                                        </Typography>
                                        <Typography>
                                            <b>Czas trwania:</b> liczba rund równa wartości Magii czarodzieja
                                        </Typography>
                                        <Typography>
                                            <b>Opis:</b> Czarodziej mocą swojego umyslu ogłupia dowolną postać znajdującą się w odległości do 24 metrów.
                                            Ofiara moze odeprzeć czar, wykonując udany test Siły Woli.
                                            Nieudany test oznacza, ze w trakcie trwania czaru postac pozostaje oszołomiona przez magiczną moc.
                                            Należy wykonać rzut Ik100 i sprawdzić wynik w poniższej tabeli, aby określić, co się dzieje z postacią do chwili wygaśnięcia czaru.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Table >
                                            <TableHead >
                                                <TableRow classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>Rzut</CustomTableCell>
                                                    <CustomTableCell>Efekt</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody classes={{root: classes.tableShrink }}>

                                                <TableRow key={1} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell><Typography noWrap={true}>01-20</Typography></CustomTableCell>
                                                    <CustomTableCell>Otępienie. W każdej rundzie postać może wykonać tylko 1 akcję zwykłą</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={2} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>21-40</CustomTableCell>
                                                    <CustomTableCell>Ucieczka: Postać biegnie w losowym kierunku (uustalonym przez MG)</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={3} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>41-60</CustomTableCell>
                                                    <CustomTableCell>Atak: Oszołomiana ofiara atakuje najbliższą postać, bez względu na to, czy jest to wróg czy przyjaciel. Jeżeli niema nikogo w zasięgu ataku, rusza biegiem w kierunku najbliższej istoty(wykonując akcję "szarża", jeśli to możliwe)</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={4} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>61-80</CustomTableCell>
                                                    <CustomTableCell>Paraliż:Postać stoi bez ruchu. Nie może wykonywać żadnych akcji ani unikać ciosów</CustomTableCell>
                                                </TableRow>
                                                <TableRow key={5} classes={{root: classes.tableShrink }}>
                                                    <CustomTableCell>81-00</CustomTableCell>
                                                    <CustomTableCell>Lęk: Postać zwija się w kłębek i zamyka oczy. Jest traktowana jako bezbronna.</CustomTableCell>
                                                </TableRow>




                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>


                            </ExpansionPanelDetails>
                        </ExpansionPanel>


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
