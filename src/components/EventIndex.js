import React from 'react';
import '../css/App.css';
import EventItem from './EventItem.js'
import { inject, observer } from 'mobx-react';


const EventIndex = inject("appStore") (
  observer(
    class EventIndex extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          loading: this.props.appStore.loading
        }
      }

      componentWillMount() {
        this.props.appStore.fetchEvents(this.props.appStore.offset)
          .then(() => this.setState({ loading: false}));

        let child = document.getElementById("page-error");
        if(child) {
          document.getElementById("app").removeChild(child);
        }

        window.scrollTo(0, 0);
      }


      updateEvents(field) {
        if(field === 'next') {
          this.props.appStore.increaseOffset();
          this.componentWillMount();
        } else if(field === 'prev') {
          if(this.props.appStore.offset > 0) {
            this.props.appStore.decreaseOffset();
            this.componentWillMount();
          } else {
            const el = document.createElement("LI");

            let child = document.getElementById("page-error");
            
            if(!child) {
              el.setAttribute("id", "page-error");
              const text = document.createTextNode("You are already on page one!");
              el.appendChild(text);
              document.getElementById("app").appendChild(el);
            }
          }
        }
      }
    
      render () {

        if(this.props.appStore.loading) {
          return (
            <div className="loading">Loading...</div>
          )
        }

        let events = (
          this.props.appStore.events.map(event => (
            <li key={event.id} style={{listStyle: "none"}}><EventItem event={event} /></li>
          ))
        )
    
        return (
          <div className="App" id="app">
            <div className="item-container">
              {events}
            </div>
              <button type="button" onClick={() => this.updateEvents('prev')}>Prev</button>
              <button type="button" onClick={() => this.updateEvents('next')}>Next</button>
          </div>
        );
      }
    }
  )
)


export default EventIndex;
