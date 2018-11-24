import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/es/Grid/Grid";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../BOF.css"
import Card from "@material-ui/core/es/Card/Card";
import CardActionArea from "@material-ui/core/es/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Flippy, {FrontSide, BackSide} from 'react-flippy';
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Popover from '@material-ui/core/Popover';
import frontPaper from './../../../../img/paper-texture-alt.jpg'
import {Flipper, Flipped} from 'react-flip-toolkit';
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


import FormLabel from '@material-ui/core/FormLabel';
// import "../../../styles/main.css";


const styles = theme => ({
    paper: {
        // boxShadow:"0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 2px 1px -1px rgba(0, 0, 0, 0)",
        //   fontFamily:"Garamond",
        backgroundImage: `url(${frontPaper})`
    },

    popover: {
        pointerEvents: 'none',
    },
    card: {
        width: "100%",
        maxHeight: "100%",
        boxShadow: "0px 0px 0px 0px",

    },
    cardShrink: {
        paddingLeft: 4,
        paddingRight: 4,
    },
    media: {
        height: 160,
        width:110,
        paddingLeft: 5,
        paddingRight: 0,
    },
    table: {
        width: "100%",
        height: "100%",
        fontFamily: "Courier",

    },
    shrinker: {
        height: 0,
        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 2,
        paddingLeft: 0,
        backgroundColor: "transparent",


    },
    row: {
        height: 0,

        paddingTop: 2,
        paddingRight: 0,
        paddingBottom: 2,
        paddingLeft: 0,

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


class Bestiary extends React.Component {
    state = {
        anchorElSkill: null,
        anchorElAbility: null,
        anchorElEquipment: null,
        filter: undefined,
        value: 'all',
        gridForFlippedCards:6, // 6 for PC 12 for mobile fight me irl if u think otherwise

    };
    handlePopoverOpenSkill = event => {
        this.setState({anchorElSkill: event.currentTarget});
    };

    handlePopoverCloseSkill = () => {
        this.setState({anchorElSkill: null});
    };
    handlePopoverOpenAbility = event => {
        this.setState({anchorElAbility: event.currentTarget});
    };

    handlePopoverCloseAbility = () => {
        this.setState({anchorElAbility: null});
    };
    handlePopoverOpenEquipment = event => {
        this.setState({anchorElEquipment: event.currentTarget});
    };

    handlePopoverCloseEquipment = () => {
        this.setState({anchorElEquipment: null});
    };
    handleChange = event => {
        this.setState({value: event.target.value});
    };


    render() {
        const {classes} = this.props;
        const {anchorElAbility, anchorElEquipment, anchorElSkill} = this.state;
        const openAbility = Boolean(anchorElAbility);
        const openSkill = Boolean(anchorElSkill);
        const openEquipment = Boolean(anchorElEquipment);
        const {width} = this.props;
        let {gridForFlippedCards} = this.state;


        if (isWidthDown('md', width)) {
            gridForFlippedCards = 12;
        }
        if (isWidthUp('lg', width)) {
            gridForFlippedCards=6;
        }

        return (
            <Paper className={classes.paper}>
                <div className={classes.paper}>
                    <FormControl >
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
                                control={<Radio color="default" icon={<img src={WildlifeBorderIcon} alt={"dzikie zwierzeta"} className={"sortIcon"} /> } checkedIcon={<img src={WildLifeIcon} alt={"Dziki Zwirz"} className={"sortIcon"}/>}/>}
                                label="Zwierzęta"
                            />
                            <FormControlLabel
                                value="demons"
                                control={<Radio color="default" icon={<img src={DemonBorderIcon} alt={"mordujace demony"} className={"sortIcon"} /> } checkedIcon={<img src={DemonIcon} alt={"wymordowane demony"} className={"sortIcon"} /> }/>}
                                label="Demony"
                            />
                            <FormControlLabel
                                value="undead"
                                control={<Radio color="default" icon={ <img src={UndeadBorderIcon} alt={"trupczaki"} className={"sortIcon"} />} checkedIcon={<img src={UndeadIcon} alt={"umarlaki"} className={"sortIcon"} /> }/>}
                                label="Ożywieńcy"
                            />
                            <FormControlLabel
                                value="muties"
                                control={<Radio color="default" icon={ <img src={MutantsBorderIcon} alt={"GMO"} className={"sortIcon"} />} checkedIcon={<img src={MutantsIcon} alt={"mutaciaki"} className={"sortIcon"} /> }/>}
                                label="Mutanci"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>

                {/*<Flipper*/}
                    {/*flipKey={this.state.value}*/}
                {/*>*/}
                    <Grid container spacing={0} alignItems={"flex-start"} justify={"flex-start"} className={classes.paper}>


                        <Grid item xs={gridForFlippedCards}>
                            {/*<Flipped>*/}
                                <Card className={classes.card}>
                                    <Flippy

                                        flipOnHover={false} // default false
                                        flipOnClick={true} // default false
                                        flipDirection="horizontal" // horizontal or vertical
                                        ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                                        // if you pass isFlipped prop component will be controlled component.
                                        // and other props, which will go to div
                                        style={{
                                            paddingTop: 0,
                                            paddingRight: 0,
                                            paddingBottom: 0,
                                            paddingLeft: 0,


                                        }}

                                    >
                                        <FrontSide style={{
                                            backgroundImage: `url(${frontPaper})`,
                                            border: "1px solid black",
                                        }}>
                                            <CardActionArea>
                                                <CardContent className={classes.cardShrink}>
                                                    <Grid container alignItems={"center"} justify={"center"}>
                                                        <Grid item xs={12}>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                Minotaur Bydlak
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container alignItems={"flex-start"} justify={"flex-start"}>
                                                        <Grid item xs={3}>
                                                            <CardMedia

                                                                className={classes.media}
                                                                image="/img/Books/Bestiary/mino.png"
                                                                title="Goddamn minotaur"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1}/>
                                                        <Grid item xs={8}>
                                                            <Typography component="p">
                                                                Minotaury często bywają strażnikami kaplic poświęconych
                                                                Chaosowi
                                                                oraz grobowców poległych rycerzy Chaosu.
                                                                Gromadzą stosy trofeów, włącznie z pancerzami i
                                                                czaszkami
                                                                pokonanych
                                                                wrogów, które urastają w wielkie kopce,
                                                                czasami całkowicie pokrywające strzeżone miejsce.
                                                                Dlaczego
                                                                bogowie
                                                                Chaosu przeznaczają ich do takiej służby,
                                                                tego nie wiadomo.
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </CardActionArea>
                                        </FrontSide>
                                        <BackSide style={{
                                            backgroundImage: `url(${frontPaper})`,
                                            border: "1px solid black"
                                        }}>

                                            <Grid container alignItems={"center"} justify={"center"}>
                                                <Grid item xs={12}>
                                                    {/*<Typography gutterBottom variant="h6" component="h6">*/}
                                                    {/*Minotaur Bydlak*/}
                                                    {/*</Typography>*/}
                                                    <Typography
                                                        aria-owns={openSkill ? 'mouse-over-skill' : undefined}
                                                        aria-haspopup="true"
                                                        onMouseEnter={this.handlePopoverOpenSkill}
                                                        onMouseLeave={this.handlePopoverCloseSkill}
                                                        component={"p"}
                                                    >
                                                        <b>Umiejętności:</b>
                                                    </Typography>

                                                    <Popover
                                                        id="mouse-over-skill"
                                                        className={classes.popover}
                                                        classes={{
                                                            paper: classes.paper,
                                                        }}
                                                        open={openSkill}
                                                        anchorEl={anchorElSkill}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        onClose={this.handlePopoverCloseSkill}
                                                        disableRestoreFocus
                                                    >
                                                        <Typography>Dowodzenie albo warzenie trucizn, unik, ukrywanie
                                                            się, śledzenie</Typography>
                                                    </Popover>


                                                    <Typography
                                                        aria-owns={openAbility ? 'mouse-over-ability' : undefined}
                                                        aria-haspopup="true"
                                                        onMouseEnter={this.handlePopoverOpenAbility}
                                                        onMouseLeave={this.handlePopoverCloseAbility}
                                                        component={"p"}
                                                    >
                                                        <b>Zdolności:</b>

                                                    </Typography>

                                                    <Popover
                                                        id="mouse-over-ability"
                                                        className={classes.popover}
                                                        classes={{
                                                            paper: classes.paper,
                                                        }}
                                                        open={openAbility}
                                                        anchorEl={anchorElAbility}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        onClose={this.handlePopoverCloseAbility}
                                                        disableRestoreFocus
                                                    >
                                                        <Typography>Błyskawiczne przeładowanie albo strzał mierzony,
                                                            wyczucie kierunku</Typography>
                                                    </Popover>


                                                    <Typography
                                                        aria-owns={openEquipment ? 'mouse-over-equipment' : undefined}
                                                        aria-haspopup="true"
                                                        onMouseEnter={this.handlePopoverOpenEquipment}
                                                        onMouseLeave={this.handlePopoverCloseEquipment}
                                                        component={"p"}
                                                    >
                                                        <b>Wyposażenie:</b>
                                                    </Typography>


                                                    <Popover
                                                        id="mouse-over-equipment"
                                                        className={classes.popover}
                                                        classes={{
                                                            paper: classes.paper,
                                                        }}
                                                        open={openEquipment}
                                                        anchorEl={anchorElEquipment}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        onClose={this.handlePopoverCloseEquipment}
                                                        disableRestoreFocus
                                                    >
                                                        <Typography>łuk albo kusza, lekki pancerz (skórzana
                                                            kurta)</Typography>
                                                    </Popover>


                                                    <Table className={classes.table}>
                                                        <TableHead>
                                                            <TableRow className={classes.shrinker}>
                                                                <CustomTableCell>Cechy</CustomTableCell>
                                                                <CustomTableCell>Główne</CustomTableCell>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>

                                                            <TableRow className={classes.row} key={1}>

                                                                <CustomTableCell>WW</CustomTableCell>
                                                                <CustomTableCell>US</CustomTableCell>
                                                                <CustomTableCell>K</CustomTableCell>
                                                                <CustomTableCell>Odp</CustomTableCell>
                                                                <CustomTableCell>Zr</CustomTableCell>
                                                                <CustomTableCell>Int</CustomTableCell>
                                                                <CustomTableCell>SW</CustomTableCell>
                                                                <CustomTableCell>Odg</CustomTableCell>

                                                            </TableRow>
                                                            <TableRow className={classes.row} key={2}>

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


                                                    <Table className={classes.table}>
                                                        <TableHead>
                                                            <TableRow className={classes.shrinker}>
                                                                <CustomTableCell>Cechy</CustomTableCell>
                                                                <CustomTableCell>Drugo.</CustomTableCell>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>
                                                                <CustomTableCell/>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>

                                                            <TableRow className={classes.row} key={3}>
                                                                <CustomTableCell>A</CustomTableCell>
                                                                <CustomTableCell>Żyw</CustomTableCell>
                                                                <CustomTableCell>S</CustomTableCell>
                                                                <CustomTableCell>Wt</CustomTableCell>
                                                                <CustomTableCell>Sz</CustomTableCell>
                                                                <CustomTableCell>Mag</CustomTableCell>
                                                                <CustomTableCell>PO</CustomTableCell>
                                                                <CustomTableCell>PP</CustomTableCell>

                                                            </TableRow>
                                                            <TableRow className={classes.row} key={4}>
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


                                                </Grid>
                                            </Grid>

                                        </BackSide>
                                    </Flippy>
                                </Card>
                            {/*</Flipped>*/}


                        </Grid>
                        <Grid item xs={gridForFlippedCards}>
                            <Card className={classes.card}>
                                <Flippy

                                    flipOnHover={false} // default false
                                    flipOnClick={true} // default false
                                    flipDirection="horizontal" // horizontal or vertical
                                    ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                                    // if you pass isFlipped prop component will be controlled component.
                                    // and other props, which will go to div
                                    style={{
                                        paddingTop: 0,
                                        paddingRight: 0,
                                        paddingBottom: 0,
                                        paddingLeft: 0,


                                    }}

                                >
                                    <FrontSide style={{
                                        backgroundImage: `url(${frontPaper})`,
                                        border: "1px solid black",
                                    }}>
                                        <CardActionArea>
                                            <CardContent className={classes.cardShrink}>
                                                <Grid container alignItems={"center"} justify={"center"}>
                                                    <Grid item xs={12}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            Minotaur Bydlak
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container alignItems={"flex-start"} justify={"flex-start"}>
                                                    <Grid item xs={3}>
                                                        <CardMedia

                                                            className={classes.media}
                                                            image="/img/Books/Bestiary/mino.png"
                                                            title="Goddamn minotaur"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}/>
                                                    <Grid item xs={8}>
                                                        <Typography component="p">
                                                            Minotaury często bywają strażnikami kaplic poświęconych
                                                            Chaosowi
                                                            oraz grobowców poległych rycerzy Chaosu.
                                                            Gromadzą stosy trofeów, włącznie z pancerzami i czaszkami
                                                            pokonanych
                                                            wrogów, które urastają w wielkie kopce,
                                                            czasami całkowicie pokrywające strzeżone miejsce. Dlaczego
                                                            bogowie
                                                            Chaosu przeznaczają ich do takiej służby,
                                                            tego nie wiadomo.
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </FrontSide>
                                    <BackSide style={{
                                        backgroundImage: `url(${frontPaper})`,
                                        border: "1px solid black"
                                    }}>

                                        <Grid container alignItems={"center"} justify={"center"}>
                                            <Grid item xs={12}>
                                                {/*<Typography gutterBottom variant="h6" component="h6">*/}
                                                {/*Minotaur Bydlak*/}
                                                {/*</Typography>*/}
                                                <Typography
                                                    aria-owns={openSkill ? 'mouse-over-skill' : undefined}
                                                    aria-haspopup="true"
                                                    onMouseEnter={this.handlePopoverOpenSkill}
                                                    onMouseLeave={this.handlePopoverCloseSkill}
                                                    component={"p"}
                                                >
                                                    <b>Umiejętności:</b>
                                                </Typography>

                                                <Popover
                                                    id="mouse-over-skill"
                                                    className={classes.popover}
                                                    classes={{
                                                        paper: classes.paper,
                                                    }}
                                                    open={openSkill}
                                                    anchorEl={anchorElSkill}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    onClose={this.handlePopoverCloseSkill}
                                                    disableRestoreFocus
                                                >
                                                    <Typography>Dowodzenie albo warzenie trucizn, unik, ukrywanie
                                                        się, śledzenie</Typography>
                                                </Popover>


                                                <Typography
                                                    aria-owns={openAbility ? 'mouse-over-ability' : undefined}
                                                    aria-haspopup="true"
                                                    onMouseEnter={this.handlePopoverOpenAbility}
                                                    onMouseLeave={this.handlePopoverCloseAbility}
                                                    component={"p"}
                                                >
                                                    <b>Zdolności:</b>

                                                </Typography>

                                                <Popover
                                                    id="mouse-over-ability"
                                                    className={classes.popover}
                                                    classes={{
                                                        paper: classes.paper,
                                                    }}
                                                    open={openAbility}
                                                    anchorEl={anchorElAbility}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    onClose={this.handlePopoverCloseAbility}
                                                    disableRestoreFocus
                                                >
                                                    <Typography>Błyskawiczne przeładowanie albo strzał mierzony,
                                                        wyczucie kierunku</Typography>
                                                </Popover>


                                                <Typography
                                                    aria-owns={openEquipment ? 'mouse-over-equipment' : undefined}
                                                    aria-haspopup="true"
                                                    onMouseEnter={this.handlePopoverOpenEquipment}
                                                    onMouseLeave={this.handlePopoverCloseEquipment}
                                                    component={"p"}
                                                >
                                                    <b>Wyposażenie:</b>
                                                </Typography>


                                                <Popover
                                                    id="mouse-over-equipment"
                                                    className={classes.popover}
                                                    classes={{
                                                        paper: classes.paper,
                                                    }}
                                                    open={openEquipment}
                                                    anchorEl={anchorElEquipment}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    onClose={this.handlePopoverCloseEquipment}
                                                    disableRestoreFocus
                                                >
                                                    <Typography>łuk albo kusza, lekki pancerz (skórzana
                                                        kurta)</Typography>
                                                </Popover>


                                                <Table className={classes.table}>
                                                    <TableHead>
                                                        <TableRow className={classes.shrinker}>
                                                            <CustomTableCell>Cechy</CustomTableCell>
                                                            <CustomTableCell>Główne</CustomTableCell>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        <TableRow className={classes.row} key={1}>

                                                            <CustomTableCell>WW</CustomTableCell>
                                                            <CustomTableCell>US</CustomTableCell>
                                                            <CustomTableCell>K</CustomTableCell>
                                                            <CustomTableCell>Odp</CustomTableCell>
                                                            <CustomTableCell>Zr</CustomTableCell>
                                                            <CustomTableCell>Int</CustomTableCell>
                                                            <CustomTableCell>SW</CustomTableCell>
                                                            <CustomTableCell>Odg</CustomTableCell>

                                                        </TableRow>
                                                        <TableRow className={classes.row} key={2}>

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


                                                <Table className={classes.table}>
                                                    <TableHead>
                                                        <TableRow className={classes.shrinker}>
                                                            <CustomTableCell>Cechy</CustomTableCell>
                                                            <CustomTableCell>Drugo.</CustomTableCell>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>
                                                            <CustomTableCell/>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>

                                                        <TableRow className={classes.row} key={3}>
                                                            <CustomTableCell>A</CustomTableCell>
                                                            <CustomTableCell>Żyw</CustomTableCell>
                                                            <CustomTableCell>S</CustomTableCell>
                                                            <CustomTableCell>Wt</CustomTableCell>
                                                            <CustomTableCell>Sz</CustomTableCell>
                                                            <CustomTableCell>Mag</CustomTableCell>
                                                            <CustomTableCell>PO</CustomTableCell>
                                                            <CustomTableCell>PP</CustomTableCell>

                                                        </TableRow>
                                                        <TableRow className={classes.row} key={4}>
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


                                            </Grid>
                                        </Grid>

                                    </BackSide>
                                </Flippy>
                            </Card>


                        </Grid>


                    </Grid>
                 {/*</Flipper>*/}
            </Paper>

        )
    }


}


Bestiary.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,

};

export default compose(withStyles(styles), withWidth())(Bestiary);
