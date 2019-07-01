import React from 'react';
import { Link } from 'react-router-dom';

const NavStyle = {
    display: "flex",
    justifyContent: "right",
    position: "absolute",
    top: 0,
    left: 0,
    height: "70px",
    borderBottom: "1px solid gray",
    width: "100vw"
}

const ListEl = {
    listStyle: "none",
    fontSize: "14px",
    margin: "10px"
}

const UlStyle = {
    display: "flex",
    width: "calc(100vw - 100px)",
    justifyContent: "flex-end"
}

export default function TopNav() {

    return (
        <div style={NavStyle}>
            <ul style={UlStyle}>
                <li style={ListEl}><Link to="/">Events Index</Link></li>
                <li style={ListEl}><Link to="/">Learn More</Link></li>
            </ul>
        </div>
    )

}