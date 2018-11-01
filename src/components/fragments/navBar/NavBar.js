import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/es/InputBase/InputBase";
import Popper from "@material-ui/core/es/Popper/Popper";
import Paper from "@material-ui/core/es/Paper/Paper";
import ClickAwayListener from "@material-ui/core/es/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import './NavBar.css'
import Button from "@material-ui/core/es/Button/Button";
import Slide from "@material-ui/core/es/Slide/Slide";
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Divider from "@material-ui/core/es/Divider/Divider";
import {compose} from "recompose";


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

    fullList: {
        width: 'auto',
    },

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

});

class NavBar extends React.Component {
    state = {
        open: true,
        top: false,
        isSm: false,
    };


    handleToggle = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({open: false});
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
        let {isSm} =this.state;


        // let fullList = (
        //     <div className={classes.fullList}>
        //         <List>
        //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        //                 <ListItem button key={text}>
        //                     <ListItemText primary={text}/>
        //                 </ListItem>
        //             ))}
        //         </List>
        //         <Divider/>
        //         <List>
        //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
        //                 <ListItem button key={text}>
        //                     <ListItemText primary={text}/>
        //                 </ListItem>
        //             ))}
        //         </List>
        //     </div>
        // );

        if (isWidthUp('sm', this.props.width)) {
            open=false;
            isSm=true;
        }
        if (isWidthUp('md', this.props.width)) {
            open=true;
            isSm=false;
        }


        // else if (isWidthUp('md',this.props.width))
        // {
        //     this.setState({
        //         open:true
        //     })
        // }
        return (



            <div className={classes.root}>


                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({TransitionProps, placement}) => (

                        <Slide
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                            timeout={{enter: 4342}}
                        >
                            <Paper className={"borderLess"}>
                                {/*<ClickAwayListener onClickAway={this.handleClose}>*/}
                                <MenuList className={"banner"}>
                                    <MenuItem className={classes.menuItem}>Profile</MenuItem>
                                    <MenuItem className={classes.menuItem}>My account</MenuItem>
                                    <MenuItem className={classes.menuItem}>Logout</MenuItem>


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
                        anchor="top"
                        open={this.state.top}
                        onClose={this.toggleDrawer('top', false)}
                        onOpen={this.toggleDrawer('top', true)}
                    >
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('top', false)}
                            onKeyDown={this.toggleDrawer('top', false)}
                        >
                            {/*{fullList}*/}
                            <div className={classes.fullList}>
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

export default compose(withStyles(styles),withWidth())(NavBar);