import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import CharacterList from './components/pages/CharacterList';
import LoginPage from './components/pages/LoginPage';


class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/main" component={MainPage} />
                    <Route path="/character-list" component={CharacterList} />
                </Switch>
            </BrowserRouter>
        );

    }
}
export default Routers;