import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventIndex from './EventIndex.js';
import EventDetails from './EventDetails.js';
import TopNav from './TopNav.js';
import WhoIAm from './WhoIAm.js';

const App = () => (
    <div className="main">
        <TopNav />
        <Switch>
            <Route exact path="/events/:eventId" component={EventDetails} />
            <Route exact path="/who_i_am" component={WhoIAm} />
            <Route path="/" component={EventIndex} />
        </Switch>
    </div>
)

export default App;