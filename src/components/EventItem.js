import React from 'react';
import { Link } from 'react-router-dom';


const EventStyle = {
    marginTop: "3px",
    marginBottom: "3px",
    textAlign: "left",
    marginLeft: "8px"
}

function parseDate(date) {
    let newDate;
    let newTime;
    let dateArr = date.split('T');
    newDate = dateArr[0];
    let timeArr = dateArr[1].split('Z');
    newTime = timeArr[0].split('.')[0];
    return { date: newDate, time: newTime }
}

function EventItem({event}) {

    function amPm() {
        if(parseDate(event.start_time).time.split(":")[0] > 12) {
            return (
                "P.M."
            )
        } else {
            return (
                "A.M."
            )
        }
    }

    function image() {
        if(event.organizer.logo_uri) {
            return (
                <img src={event.organizer.logo_uri} 
                     alt={event.organizer.name}
                     height="200" 
                     width="100%"
                     style={{borderRadius: "5px"}}></img>
            )
        } else {
            return (
                <img 
                    src="https://s29745.pcdn.co/wp-content/uploads/2018/04/25310953_1432004253578951_1619212099641187218_o.jpg.optimal.jpg" 
                    alt="concert"
                    height="200"
                    width="100%"
                    style={{borderRadius: "5px"}}>
                </img>
            )
        }
    }

    return (
        <div className="item-container">
            <Link to={`/events/${event.id}`} event={event} >{image()}</Link>
            <Link to={`/events/${event.id}`} 
                  event={event}
                  className="headline"
                  style={{
                        textDecoration: "none",
                        font: "black"
                    }}>

                    <h3 style={{
                        marginTop: "2px",
                        marginLeft: "8px",
                        textAlign: "left"
                    }}>
                        {event.name}
                    </h3>
            </Link>
            <p style={EventStyle}>Event Date: {parseDate(event.start_time).date.split('-')[1]}/
                                              {parseDate(event.start_time).date.split('-')[2]}/
                                              {parseDate(event.start_time).date.split('-')[0]}</p>
            <p style={EventStyle}>Event starts at {parseDate(event.start_time).time.split(":")[0]%12}:
                                                  {parseDate(event.start_time).time.split(":")[1]} {amPm()}</p>
            <p style={EventStyle}>Tickets start at ${Math.trunc(event.min_ticket_price)}</p>
        </div>
    )

}

export default EventItem;