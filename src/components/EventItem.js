import React from 'react';
import { Link } from 'react-router-dom';

function EventItem({event}) {

    function image() {
        if(event.organizer.logo_uri) {
            return (
                <img src={event.organizer.logo_uri} alt={event.organizer.name}></img>
            )
        } else {
            return (
                <img 
                    src="https://s29745.pcdn.co/wp-content/uploads/2018/04/25310953_1432004253578951_1619212099641187218_o.jpg.optimal.jpg" 
                    alt="concert"
                    height="200"
                    width="400">
                </img>
            )
        }
    }

    return (
        <div className="item-container">
            <h3>{event.name}</h3>
            <Link to={`/events/${event.id}`} event={event} >{image()}</Link>
        </div>
    )

}

export default EventItem;