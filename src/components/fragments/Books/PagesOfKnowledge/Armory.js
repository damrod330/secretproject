import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import "./../BOF.css"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/es/Typography/Typography";
import ArmorIcon from './../../../../img/icon/armor.png';
import WeaponIcon from './../../../../img/icon/weapons.png';
import AmmoIcon from './../../../../img/icon/ranged.png';
import Armors from "./Armory/Armor"
import Weapons from "./Armory/Weapons"
import Ammo from "./Armory/Ammo"




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



class Armory extends React.Component {
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
                    variant={"fullWidth"}
                    indicatorColor="secondary"
                    textColor="secondary"
                    className={classes.root}
                >
                    <Tab color={"secondary"} icon={<img src={ArmorIcon} alt={"Armory"} className={"icons"}/>} />
                    <Tab icon={<img src={WeaponIcon} alt={"Bestiary"} className={"icons"}/>} />
                </Tabs>

                {value === 0 && <TabContainer> <Armors/> </TabContainer>}
                {value === 1 && <TabContainer> <Weapons/> </TabContainer>}



            </Paper>

        )
    }


}


Armory.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};

export default withStyles(styles,{withTheme : true})(Armory);

