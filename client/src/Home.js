import React from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import Cats from './Cats';
import NewCat from './NewCat';
import UpdateCat from './UpdateCat';

const Home = () => {
    if (!document.cookie) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Switch>
                <Route path="/cats" component={Cats} />
                <Route path="/new-cat" component={NewCat} />
                <Route path="/update-cat/:id" component={UpdateCat} />
            </Switch>

        </div>
    );
}

export default Home;