import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './components/pages/MainPage';
import CharacterList from './components/pages/CharacterList';


class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/main" component={MainPage} />
                    <Route path="/character-list" component={CharacterList} />
                </Switch>
            </BrowserRouter>
        );

    }
}
export default Routers;