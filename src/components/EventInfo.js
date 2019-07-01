import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHtmlParser from 'react-html-parser';


const EventInfo = inject("displayStore") (
    observer (
        class EventInfo extends React.Component {
            
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

                const html = this.props.displayStore.event.description_html

                return (
                    <div className="details-container" id="details">
                         <div>{ReactHtmlParser(html)}</div>
                    </div>
                )
            }
        }
    )
)

export default EventInfo;