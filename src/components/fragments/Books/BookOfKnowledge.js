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
import Mutations from "./PagesOfKnowledge/Mutations"
import Spells from "./PagesOfKnowledge/Spells"
import Armory from "./PagesOfKnowledge/Armory"




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
    constructor(props){
        super(props);
        this.state = {
            value: 0,
        };
    }

    // static getDerivedStateFromProps(props,state){
    //     this.setState({ value:this.props.componentToRender });
    //
    // }
    //
    // handleChange = (event, value) => {
    //     this.setState({ value:this.props.componentToRender });
    // };



    render() {

        const {classes} = this.props;
        const { value } = this.state;



        return (
            <Paper className={"paper"}>

                {/*<Tabs*/}
                {/*value={this.state.value}*/}
                {/*onChange={this.handleChange}*/}
                {/*variant={"fullWidth"}*/}
                {/*indicatorColor="secondary"*/}
                {/*textColor="secondary"*/}
                {/*className={classes.root}*/}
                {/*>*/}
                {/*<Tab color={"secondary"} icon={<img src={ArmoryIcon} alt={"Armory"} className={"icons"}/>} />*/}
                {/*<Tab icon={<img src={BestiaryIcon} alt={"Bestiary"} className={"icons"}/>} />*/}
                {/*<Tab icon={<img src={SpellsIcon} alt={"Spells"} className={"icons"}/>} />*/}
                {/*<Tab icon={<img src={MutationsIcon} alt={"Mutations"} className={"icons"}/>} />*/}
                {/*</Tabs>*/}

                {this.props.componentToRender === 0 && <TabContainer><Armory/></TabContainer>}
                {this.props.componentToRender === 1 && <TabContainer><Bestiary/></TabContainer>}
                {this.props.componentToRender === 2 && <TabContainer><Spells/></TabContainer>}
                {this.props.componentToRender === 3 && <TabContainer> <Mutations/> </TabContainer>}



            </Paper>

        )
    }


}


BookOfKnowledge.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};

export default withStyles(styles,{withTheme : true})(BookOfKnowledge);
