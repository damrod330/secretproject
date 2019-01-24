import React from 'react'
import {Grid} from '@material-ui/core/es';
import NavBar from './components/navBar/NavBar'



class MainLayout extends React.Component {
    constructor(props){
        super();
        this.state={
            componentToRender:0,
        }
    }

    navbarCallback = (dataFromNavbar) => {
        this.setState({
            componentToRender:dataFromNavbar
        });
    };
c
    render() {
        return (
            <div className="bg-mask">
                <Grid container spacing={0} alignItems={"flex-start"} justify={"center"}>
                    <Grid item xs={12} lg={2}>

                        <NavBar callBackFromChildren={this.navbarCallback}/>

                    </Grid>
                    <Grid item xs={12} md={12} lg={10}>
                        <div className="paper-card">
                            <div className="paper-card-body">
                                {this.props.children}
                            </div>

                        </div>

                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default MainLayout