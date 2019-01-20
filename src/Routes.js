import React from 'react';
import LoginPage from './pages/LoginPage';
import CharacterPage from './pages/CharacterPage';
import MainLayout from './MainLayout';

import { Route, Switch, BrowserRouter, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';



// const Main = () => (
//     <main>
//         <Switch>
//             <Route path="/character" component={CharacterPage} />
//             <Route path="/login" component={LoginPage} />
//             <Route path="/register" component={LoginPage} />
//             <Route path="/" component={MainLayout} />
//         </Switch>
//     </main>
// );

class Routers extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/login" exact component={LoginPage} />
                <Redirect to="/login" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/character" component={CharacterPage} />
                    <Route path="/" exact component={MainLayout} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routers));