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
                    loading: this.props.displayStore.loading,
                    show: this.props.appStore.show
                }
            }

            componentWillMount() {
                this.props.displayStore.fetchEvent(this.props.match.params.eventId)
                    .then(() => this.setState({ loading: false }))
            }

            openModal() {
                this.setState({
                    show: true
                });
            }

            render () {
                if(this.props.displayStore.loading) {
                    return (
                        <div className="loading">Loading...</div>
                    )
                }

                console.log(this.props.displayStore.event.category.name);

                return (
                    <div className="details-container" id="details" style={DetailComponent}>

                        <Modal show={this.state.show} event={this.props.displayStore.event}/>

                        <h2 style={{fontSize: 32, fontWeight: 600}}>{this.props.displayStore.event.name}</h2>
                        
                        <img 
                            src={this.props.displayStore.event.logo_uri}
                            style={{borderRadius: 5, border: "1px solid black"}} 
                            alt={this.props.displayStore.event.name} 
                            />

                        <p>Category: {this.props.displayStore.event.category.name} <button onClick={() => this.openModal()}>Edit</button></p>
                        <p>Organizer: {this.props.displayStore.event.organizer.name}</p>
                        <p>Click here to go to the event page: <Link to={`/events/${this.props.match.params.eventId}/info`} event={this.props.displayStore.event}>Event Page</Link></p>
                    </div>
                )
            }
        }
    )
)

export default EventDetails;