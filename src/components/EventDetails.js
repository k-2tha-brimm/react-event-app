import React from 'react';
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
                        <h2>{this.props.displayStore.event.name}</h2>
                        {this.props.displayStore.event.description_plain}
                    </div>
                )
            }
        }
    )
)

export default EventDetails;