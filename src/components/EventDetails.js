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

                console.log(this.props);
                console.log(this.props.displayStore);
                console.log(this.props.match.params.eventId);
                return (
                    <div>HELLO</div>
                )
            }
        }
    )
)

export default EventDetails;