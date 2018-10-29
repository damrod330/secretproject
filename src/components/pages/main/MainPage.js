import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import './MainPage.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/es/Typography/Typography";
import SwipeableViews from 'react-swipeable-views';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class MainPage extends React.Component {
    state = {
        valuePaperLeft: 0,
        valuePaperRight: 0
    };
    handleChangePaperLeft = (event, value) => {
        this.setState({valuePaperLeft : value});
    };

    handleChangeIndexPaperLeft = index => {
        this.setState({valuePaperLeft: index});
    };
    handleChangePaperRight = (event, value) => {
        this.setState({valuePaperRight : value});
    };

    handleChangeIndexPaperRight = index => {
        this.setState({valuePaperRight: index});
    };


    render() {
        const {classes, theme} = this.props;
        const { valuePaperRight } = this.state;
        return (
            <div className={"withNavBar"}>
                <Grid container spacing={8}>
                    <Grid item xs={1}>
                        <Paper>xs=1</Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Tabs
                            value={this.state.valuePaperLeft}
                            onChange={this.handleChangePaperLeft}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Ogół"/>
                            <Tab label="Zdolności i Umiejętności"/>
                            <Tab label="Ekwipunek"/>
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.valuePaperLeft}
                            onChangeIndex={this.handleChangeIndexPaperLeft}
                        >
                            <TabContainer dir={theme.direction}>
                                <Paper>xs=5</Paper>

                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <Paper>xs=6</Paper>

                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <Paper>xs=7</Paper>

                            </TabContainer>
                        </SwipeableViews>

                    </Grid>
                    <Grid item xs={5}>
                        <Tabs
                            value={this.state.valuePaperRight}
                            onChange={this.handleChangePaperRight}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Zbrojownia"/>
                            <Tab label="Bestiariusz"/>
                            <Tab label="Mutacje"/>
                        </Tabs>

                            <TabContainer dir={theme.direction}>
                                <Paper>xs=4</Paper>

                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <Paper>xs=1</Paper>

                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <Paper>xs=2</Paper>

                            </TabContainer>

                        {valuePaperRight === 0 && <TabContainer>Item One</TabContainer>}
                        {valuePaperRight === 1 && <TabContainer>Item Two</TabContainer>}
                        {valuePaperRight === 2 && <TabContainer>Item Three</TabContainer>}
                    </Grid>
                    <Grid item xs={1}>
                        <Paper>xs=01</Paper>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

MainPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, {withTheme: true})(MainPage);
