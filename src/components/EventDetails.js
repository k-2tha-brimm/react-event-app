import React from 'react';
import { inject, observer } from 'mobx-react';
import Modal from './Modal.js';
import ReactHtmlParser from 'react-html-parser';
import '../css/App.css';

// Begin Styling //
//
const DetailComponent = {
    display: "block",
    position: "relative",
    marginRight: "18%",
    marginLeft: "18%",
    textAlign: "center",
    marginTop: "8%",
    height: "100%",
    border: "1px solid grey",
    borderRadius: 5,
    background: "white"
}

const InfoStyle = {
    marginTop: "3px",
    marginLeft: "8px"
}

const Deets = {
    textAlign: "center",
    position: "relative",
    top: "40px",
    left: 0,
    alignContent: "center",
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: "70px"
}

const ButtonStyle = {
    width: "320px",
    height: "44px",
    background: "#138548",
    color: "white",
    fontWeight: 800,
    fontSize: 14,
    borderRadius: 5,
    marginRight: "5px"
}

const EditButton = {
    width: "80px",
    height: "20px",
    marginLeft: "20px",
    fontWeight: 600,
    borderRadius: 5,
    color: "white",
    background: "#6441A3",
    fontSize: 12
}
//
// End Styling //




const EventDetails = inject("appStore", "displayStore") (
    observer (
        class EventDetails extends React.Component {
            
            constructor(props) {
                super(props);
                this.state = {
                    event: this.props.displayStore.event,
                    loading: this.props.displayStore.loading,
                    show: this.props.appStore.show,
                    cat: null
                }
                this.handleStateChange = this.handleStateChange.bind(this);
            }

            componentWillMount() {
                this.props.displayStore.fetchEvent(this.props.match.params.eventId)
                    .then(() =>
                        this.setState({ 
                        event: this.props.displayStore.event, 
                        loading: false,
                        cat: this.props.displayStore.event.category }))
            }

            openModal() {
                this.setState({
                    show: true
                });
            }

            handleStateChange(val) {
                this.setState({ cat: val });
            }

            render () {

                if(!this.state.event || !this.state.cat) {
                    return null;
                }

                const html = this.props.displayStore.event.description_html

                return (
                    <div className="details-container" id="details" style={DetailComponent}>
                        <div className="background-image"></div>

                        <Modal show={this.state.show} event={this.state.event} handleStateChange={this.handleStateChange} />

                        <div style={{
                            height: "300px"
                        }}>

                        <img 
                            src={this.state.event.logo_uri}
                            style={{ 
                                borderTopLeftRadius: 5, 
                                border: "1px solid black",
                                top: 0,
                                left: 0,
                                float: "left",
                            }} 
                            alt={this.state.event.name} 
                            width="60%"
                            height="99%"
                            />

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                                background: "#F7F9F9",
                                height: "100%",
                                borderTopRightRadius: "5px",
                            }}>

                                <h2 style={{ 
                                    fontSize: 32, 
                                    fontWeight: 600,
                                    marginLeft: "8px",
                                    marginBottom: "3px"
                                }}>

                                    {this.state.event.name}

                                </h2>

                                <p style={InfoStyle}>Category: {this.state.cat.name} <button style={EditButton} onClick={() => this.openModal()}>Edit</button></p>
                                <p style={InfoStyle}>By {this.state.event.organizer.name}</p>
                                <p style={InfoStyle}>${Math.trunc(this.state.event.min_ticket_price)} - ${Math.trunc(this.state.event.max_ticket_price)}</p>
                            </div>
                        </div>

                        <div style={{
                            height: "65px",
                            width: "95%",
                            marginTop: "8px",
                            borderBottom: "1px solid grey",
                            padding: "10px",
                            margin: "auto",
                            textAlign: "right"
                        }}>
                            <button style={ButtonStyle}><a 
                                href={this.state.event.uri}
                                style={{
                                    textDecoration: "none",
                                    color: "white"
                                }}
                                target="_blank"
                                rel="noopener noreferrer">
                                    Get Tickets
                                </a>
                            </button>
                        </div>

                        <div className="info-container" id="details" style={Deets}>
                            <div>{ReactHtmlParser(html)}</div>
                        </div>

                    </div>
                )
            }
        }
    )
)

export default EventDetails;