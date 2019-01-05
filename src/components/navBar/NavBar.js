import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Popper from "@material-ui/core/es/Popper/Popper";
import Paper from "@material-ui/core/es/Paper/Paper";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import './NavBar.css'
import Slide from "@material-ui/core/es/Slide/Slide";
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Divider from "@material-ui/core/es/Divider/Divider";
import {compose} from "recompose";
import Banner from "../../img/Banner.png"
import NewWindow from 'react-new-window'
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArmoryIcon from './../../img/icon/armory.png';
import BestiaryIcon from './../../img/icon/monsters.png';
import SpellsIcon from './../../img/icon/magic2.png';
import MutationsIcon from './../../img/icon/mutations.png';


import Button from "@material-ui/core/Button";

// import Button from "@material-ui/core/es/Button/Button";
// import ClickAwayListener from "@material-ui/core/es/ClickAwayListener/ClickAwayListener";
// import InputBase from "@material-ui/core/es/InputBase/InputBase";
// import SearchIcon from '@material-ui/icons/Search';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    menuItem: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        '&:focus': {
            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
            borderRadius: 20,
            color: 'white',
            marginLeft: 20,
            marginRight: 20,


            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},


    root: {
        width: '100%',
        display: "flex",
        color: "white",

    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    list: {
        width: 250,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
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
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    trans: {
        backgroundColor: "transparent",
        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0), 0 2px 2px 0 rgba(0, 0, 0, 0), 0 3px 1px -2px rgba(0, 0, 0, 0)",
    },
    banner: {
        backgroundImage: `url(${Banner})`,
        backgroundSize: "100% 100%",
        width: "250px",
        height: "700px",
        paddingLeft: "10px"

    },
    icons: {
        width: 64,
        height: 64,
    }

});
const map = <NewWindow copyStyles={true} url={"http://localhost:8080/"}/>

class NavBar extends React.Component {
    state = {
        open: true,
        left: false,
        isSm: false,
        nestItemOpen: true,
        openMap:false,
    };
    handleClick = () => {
        this.setState(state => ({nestItemOpen: !state.nestItemOpen}));
    };
    handleMap = () => {
        this.setState(state => ({openMap: !state.openMap}));
    };
    handleUnMap = () => {
        this.setState(state => ({openMap: false}));
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const {classes} = this.props;
        const {width} = this.props;
        let {open} = this.state;
        let {isSm} = this.state;


        if (isWidthDown('md', width)) {
            open = false;
            isSm = true;
        }
        if (isWidthUp('lg', width)) {
            open = true;
            isSm = false;
        }


        return (



            <div className={classes.root}>


                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({TransitionProps, placement}) => (

                        <Slide
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                            timeout={{enter: 1000}}
                        >
                            <Paper className={classes.trans}>
                                {/*<ClickAwayListener onClickAway={this.handleClose}>*/}
                                <MenuList className={classes.banner}>
                                    <MenuItem className={classes.menuItem}>Profile</MenuItem>
                                    <MenuItem className={classes.menuItem}>My account</MenuItem>

                                    <List className={classes.menuItem}>
                                        <ListItem button onClick={this.handleClick}>
                                            <ListItemText primary="Przedmioty"/>
                                            {this.state.nestItemOpen ? <ExpandLess/> : <ExpandMore/>}
                                        </ListItem>
                                        <Collapse in={this.state.nestItemOpen} timeout="auto" unmountOnExit>
                                            <List disablePadding className={classes.menuItem}>
                                                <ListItem button>

                                                    {/*<img src={ArmoryIcon} alt={"Armory"} className={classes.icons}/>*/}

                                                    <ListItemText primary="Zbrojownia"/>
                                                </ListItem>
                                                <ListItem button>

                                                    {/*<img src={BestiaryIcon} alt={"Bestiary"}*/}
                                                    {/*className={classes.icons}/>*/}
                                                    <ListItemText primary="Bestiariusz"/>
                                                </ListItem>
                                                <ListItem button>

                                                    {/*<img src={SpellsIcon} alt={"Spells"} className={classes.icons}/>*/}

                                                    <ListItemText primary="Księga Zaklęć"/>
                                                </ListItem>
                                                <ListItem button>
                                                    {/*<img src={MutationsIcon} alt={"Mutations"}*/}
                                                    {/*className={classes.icons}/>*/}
                                                    <ListItemText primary="Mutacje"/>
                                                </ListItem>
                                                <ListItem button onClick={this.handleMap}>
                                                    <ListItemText primary="Mapa"/>
                                                    {this.state.openMap ? <NewWindow copyStyles={true} onUnload={this.handleUnMap} url={"http://localhost:8080/"}/> : null}

                                                </ListItem>
                                            </List>
                                        </Collapse>
                                    </List>


                                    <MenuItem className={classes.menuItem}>Logout</MenuItem>
                                    <MenuItem className={classes.menuItem}>Mapa</MenuItem>


                                    {/*<Button disabled className={classes.button}> </Button>/!*invisible sign to keep error away*!/*/}


                                </MenuList>

                                {/*</ClickAwayListener>*/}
                            </Paper>

                        </Slide>

                    )}

                </Popper>


                {/*<FormGroup>*/}
                {/*<FormControlLabel*/}
                {/*control={*/}
                {/*<Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />*/}
                {/*}*/}
                {/*label={auth ? 'Logout' : 'Login'}*/}
                {/*/>*/}
                {/*</FormGroup>*/}


                {/*<AppBar position="static" className={"navBar"}>*/}
                {/*<Toolbar>*/}
                {/*<IconButton className={classes.menuButton} buttonRef={node => {*/}
                {/*this.anchorEl = node;*/}
                {/*}}*/}
                {/*aria-owns={open ? 'menu-list-grow' : undefined}*/}
                {/*aria-haspopup="true"*/}
                {/*onClick={this.handleToggle}*/}
                {/*color="inherit">*/}
                {/*<MenuIcon />*/}
                {/*</IconButton>*/}
                {/*<Typography className={classes.title} variant="h6" color="inherit" noWrap>*/}
                {/*Material-UI*/}
                {/*</Typography>*/}
                {/*<div className={classes.grow} />*/}
                {/*<div className={classes.search}>*/}
                {/*<div className={classes.searchIcon}>*/}
                {/*<SearchIcon />*/}
                {/*</div>*/}
                {/*<InputBase*/}
                {/*placeholder="Wyszukaj.."*/}
                {/*classes={{*/}
                {/*root: classes.inputRoot,*/}
                {/*input: classes.inputInput,*/}
                {/*}}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</Toolbar>*/}

                {/*</AppBar>*/}

                {isSm ?
                    <SwipeableDrawer
                        open={this.state.left}
                        onClose={this.toggleDrawer('left', false)}
                        onOpen={this.toggleDrawer('left', true)}
                        classes={{paper: classes.trans}}

                    >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                            className={classes.banner}
                        >

                            <div className={classes.list}>
                                <List>
                                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                        <ListItem button key={text}>
                                            <ListItemText primary={text}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider/>
                                <List>
                                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                        <ListItem button key={text}>
                                            <ListItemText primary={text}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>
                    </SwipeableDrawer>
                    : null}
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
};

export default compose(withStyles(styles), withWidth())(NavBar);