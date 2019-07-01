import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


const EventDetails = inject("displayStore") (
    observer (
        class EventDetails extends React.Component {
            
            constructor(props) {
                super(props);
                this.state = {
                    loading: this.props.displayStore.loading
                }
            }

            componentWillMount() {
                this.props.displayStore.fetchEvent(this.props.match.params.eventId)
                    .then(() => this.setState({ loading: false }))
            }

            render () {
                if(this.props.displayStore.loading) {
                    return (
                        <div className="loading">Loading...</div>
                    )
                }

                return (
                    <div className="details-container" id="details">
                         <li>{this.props.displayStore.event.name}</li>
                         <p>Click here to go to the event page: <Link to={`/events/${this.props.match.params.eventId}/info`} event={this.props.displayStore.event}>Event Page</Link></p>
                    </div>
                )
            }
        }
    )
)

export default EventDetails;