import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventIndex from './EventIndex.js';
import EventInfo from './EventInfo.js';
import EventDetails from './EventDetails.js';

const App = () => (
    <div className="main">
        <Switch>
            <Route exact path="/events/:eventId/info" component={EventInfo} />
            <Route exact path="/events/:eventId" component={EventDetails} />
            <Route path="/" component={EventIndex} />
        </Switch>
    </div>
)

export default App;