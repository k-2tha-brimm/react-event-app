import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Modal from './Modal.js';

const DetailComponent = {
    display: "block",
    position: "relative",
    marginRight: "20%",
    marginLeft: "20%",
    textAlign: "center",
    marginTop: "5%",
    padding: "10px",
}


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
                    .then(res => this.setState({ 
                        event: this.props.displayStore.event, 
                        loading: false,
                        cat: this.props.displayStore.event.category }))
                console.log(this.state);
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

                if(!this.state.event) {
                    return null;
                }

                if(this.props.displayStore.loading) {
                    return (
                        <div className="loading">Loading...</div>
                    )
                }

                console.log(this.state.event.name);

                return (
                    <div className="details-container" id="details" style={DetailComponent}>

                        <Modal show={this.state.show} event={this.state.event} handleStateChange={this.handleStateChange} />

                        <h2 style={{fontSize: 32, fontWeight: 600}}>{this.state.event.name}</h2>
                        
                        <img 
                            src={this.state.event.logo_uri}
                            style={{borderRadius: 5, border: "1px solid black"}} 
                            alt={this.state.event.name} 
                            />

                        <p>Category: {this.state.cat.name} <button onClick={() => this.openModal()}>Edit</button></p>
                        <p>Organizer: {this.state.event.organizer.name}</p>
                        <p>Click here to go to the event page: <Link to={`/events/${this.props.match.params.eventId}/info`} event={this.props.displayStore.event}>Event Page</Link></p>
                    </div>
                )
            }
        }
    )
)

export default EventDetails;