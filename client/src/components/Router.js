import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';


import App from './App';
import BookPage from './BookPage';

const Router = () => (
    <HashRouter basename="/">
        <Switch>
            <Route exact path="/" component = {App} />
            <Route exact path="/book/:bookid" component = {BookPage} />
        </Switch>
    </HashRouter>
)


export default Router;