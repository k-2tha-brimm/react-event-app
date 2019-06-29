import React from 'react';
import { Route } from 'react-router-dom';
import EventIndex from './EventIndex.js';
import EventDetails from './EventItem.js';

const App = () => (
    <div className="main">
        <Route path="/" component={EventIndex} />
        <Route path="/events/:eventId" component={EventDetails} />
    </div>
)

export default App;