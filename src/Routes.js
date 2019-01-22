import React from 'react';
import LoginPage from './pages/LoginPage';
import CharacterPage from './pages/CharacterPage';
import MainLayout from './MainLayout';
import BOF from './components/fragments/Books/BookOfKnowledge'
import { Route, Switch, BrowserRouter, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Bestiary from "./components/fragments/Books/PagesOfKnowledge/Bestiary";
import Armory from './components/fragments/Books/PagesOfKnowledge/Armory';
import Mutations from "./components/fragments/Books/PagesOfKnowledge/Mutations";
import Spells from "./components/fragments/Books/PagesOfKnowledge/Spells";



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
        let routes;

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={CharacterPage} />

                    <MainLayout>
                        <Route path="/bestiary" exact component={Bestiary}/>
                        <Route path="/armory" exact component={Armory}/>
                        <Route path="/mutations" exact component={Mutations}/>
                        <Route path="/spells" exact component={Spells}/>
                    </MainLayout>

                    <Redirect to="/" />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/" component={LoginPage} />  
                </Switch>
            );
        }

        return (
            <div>{routes}</div>

                
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