import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import MainPage from './components/pages/main/MainPage';
import LoginPage from './components/pages/LoginPage';
import NavBar from './components/fragments/navBar/NavBar'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={LoginPage}/>


            <Route path="/main" component={MainPage}>

            </Route>

        </Switch>
    </main>

);
const Layout = () =>(
    <div>
        <NavBar/>
        <Main/>
    </div>
);
//TODO footeR?

class Routers extends React.Component {


    render() {
        return (
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        );

    }
}

export default Routers;