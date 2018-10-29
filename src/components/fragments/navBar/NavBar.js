import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
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


const styles = theme => ({
    root: {
        width: '100%',
        display:"flex",
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
        auth: true,
        open: false,
    };


    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { auth,open } = this.state;
        return (



            <div className={classes.root}>


                <Popper open={open}  anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (

                        <Slide
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper className={"borderLess"}>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList className={"banner"}>
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                        <MenuItem ></MenuItem>
                                        <MenuItem ></MenuItem>


                                        <Button disabled className={classes.button}> </Button>{/*invisible sign to keep error away*/}



                                    </MenuList>
                                </ClickAwayListener>
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
                {auth && (

                    <AppBar position="static" className={"navBar"}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} buttonRef={node => {
                                this.anchorEl = node;
                            }}
                                        aria-owns={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
                                        color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                Material-UI
                            </Typography>
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Wyszukaj.."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Toolbar>

                    </AppBar>



                )}
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);