import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CharacterPage from './pages/CharacterPage';
import MainLayout from './MainLayout';


const Main = ()=> (
    <main>
        <Switch>
            <Route path="/character" component={CharacterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={LoginPage}/>
            <Route path="/" component={MainLayout}/>
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