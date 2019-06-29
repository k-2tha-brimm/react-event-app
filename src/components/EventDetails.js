import React from 'react';

function EventDetails({event}) {

    return (
        <div>
            <li>{event.name}</li>
        </div>
    )
}

export default EventDetails;