import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './MainLayout';


const Main = ()=> (
    <main>
        <Switch>
            <Route exact path="/main" component={LoginPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={LoginPage}/>
            <Route path="/" component={MainLayout}>
            </Route>

        </Switch>
    </main>
);

class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter basename={"/rpg"}>
                <Main/>
            </BrowserRouter>
        );
    }
}

export default Routers;