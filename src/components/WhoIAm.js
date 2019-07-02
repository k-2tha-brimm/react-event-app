import React from 'react';
import '../css/App.css';

const DivStyle = {
    position: "relative",
    width: "80%",
    marginTop: "100px",
    textAlign: "left",
    marginRight: "18%",
    marginLeft: "18%",
}

const ParaStyle = {
    width: "80%",
    lineHeight: 1.7,
}

const LIStyle = {
    listStyle: "none",
    textDecoration: "none"
}

export default function WhoIAm() {

    return (
        <div style={DivStyle}>
            <h1 style={{textDecoration: "overline"}}>Hi, I'm Kevin!</h1>
            <p style={ParaStyle}>
            My name is Kevin Brimmerman, and I am a Chicago native currently building web applications in the Bay Area. 
            I am proficient in React/Redux, Ruby on Rails, Express/Node.js, Go (golang), PostgreSQL, & MongoDB. 
            Prior to becomming a software developer, I was a marketing manager with a degree from UC Berkeley. 
            When I am not coding, I am probably reading a new book, snowboarding, hiking with my dog Kitsu, 
            playing badminton, or rewatching The Office.

            <br />
            <br />
            
            Thanks for taking a look at my project! If you would like to learn more about my,
            please click on one of my social media links below!
            </p>

            <div>
                <ul style={{display: "flex", justifyContent: "space-between", width: "80%", padding: 0, marginTop: "40px"}}>
                    <li style={LIStyle}><a style={LIStyle} href="https://www.linkedin.com/in/kbrimm/" target="_blank" className="nav-link" >LinkedIn</a></li>
                    <li style={LIStyle}><a style={LIStyle} href="https://www.facebook.com/kevin.brimmerman" target="_blank" className="nav-link" >Facebook</a></li>
                    <li style={LIStyle}><a style={LIStyle} href="https://www.instagram.com/kev_cuddy/" target="_blank" className="nav-link" >Instagram</a></li>
                    <li style={LIStyle}><a style={LIStyle} href="https://github.com/k-2tha-brimm" target="_blank" className="nav-link" >GitHub</a></li>
                    <li style={LIStyle}><a style={LIStyle} href="https://kevykevbrimm.yelp.com " target="_blank" className="nav-link" >Yelp</a></li>
                </ul>
            </div>
        </div>
    )

}