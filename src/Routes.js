import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainLayout from './components/MainLayout';


const Main = ()=> (
    <main>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={LoginPage}/>
            <Route path="/main" component={MainLayout}>
            </Route>

        </Switch>
    </main>
);

class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        );
    }
}

export default Routers;