import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./BOF.css"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/es/Typography/Typography";
import Bestiary from "./PagesOfKnowledge/Bestiary"
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
function TabContainer({children}) {
    return (
        <Typography component="div"  style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};



class BookOfKnowledge extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {
        const {classes} = this.props;
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

                {value === 0 && <TabContainer><Bestiary/></TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
                {value === 3 && <TabContainer>Item Four</TabContainer>}



            </Paper>

        )
    }


}


BookOfKnowledge.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};

export default withStyles(styles,{withTheme : true})(BookOfKnowledge);

