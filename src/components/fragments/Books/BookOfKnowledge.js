import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./BOF.css"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/es/Typography/Typography";
import Bestiary from "./PagesOfKnowledge/Bestiary"
import SwipeableViews from 'react-swipeable-views';
import ArmoryIcon from './../../../img/icon/armory.png';
import BestiaryIcon from './../../../img/icon/monsters.png';
import SpellsIcon from './../../../img/icon/magic2.png';
import MutationsIcon from './../../../img/icon/mutations.png';





const styles = theme => ( {
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "#545454",




        // backgroundColor:"#383838",
    },
    customTab:{
        width: "128px",
        height: "128px",
        touchRipple:{button: {color: '#FFFFFF'}}

    }
});
function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};



class BookOfKnowledge extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    render() {
        const {classes,theme} = this.props;
        const { value } = this.state;



        return (
            <Paper className={"paper"}>

                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                    indicatorColor="secondary"
                    textColor="secondary"
                    className={classes.root}
                >
                    <Tab color={"secondary"} icon={<img src={ArmoryIcon} alt={"Armory"} className={"icons"}/>} />
                    <Tab icon={<img src={BestiaryIcon} alt={"Bestiary"} className={"icons"}/>} />
                    <Tab icon={<img src={SpellsIcon} alt={"Spells"} className={"icons"}/>} />
                    <Tab icon={<img src={MutationsIcon} alt={"Mutations"} className={"icons"}/>} />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><Bestiary/></TabContainer>
                    <TabContainer dir={theme.direction}>Item twa</TabContainer>
                    <TabContainer dir={theme.direction}>Item czy</TabContainer>
                    <TabContainer dir={theme.direction}>Item czery</TabContainer>
                </SwipeableViews>
                {/*{value === 0 && <TabContainer><Bestiary/></TabContainer>}*/}
                {/*{value === 1 && <TabContainer>Item Two</TabContainer>}*/}
                {/*{value === 2 && <TabContainer>Item Three</TabContainer>}*/}
                {/*{value === 3 && <TabContainer>Item Four</TabContainer>}*/}
                {/*{value === 4 && <TabContainer>Item Five</TabContainer>}*/}
                {/*{value === 5 && <TabContainer>Item Six</TabContainer>}*/}
                {/*{value === 6 && <TabContainer>Item Seven</TabContainer>}*/}


            </Paper>

        )
    }


}


BookOfKnowledge.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};

export default withStyles(styles,{withTheme : true})(BookOfKnowledge);

