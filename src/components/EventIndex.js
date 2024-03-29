import React from 'react';
import '../css/App.css';
import EventItem from './EventItem.js'
import { inject, observer } from 'mobx-react';

const IndexStyling = {
  margin: "8%",
  marginBottom: "1%",
  marginTop: "20px",
  padding: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly"
}

const LIStyling = {
  width: "24%",
  height: "400px",
  maxWidth: "24%",
  maxHeight: "400px",
  listStyle: "none",
  margin: "5px 2px 5px 2px",
  borderRadius: "5px",
  boxSizing: "border-box",
}

const NavButtons = {
  width: 130,
  height: 30,
  background: "blue",
  color: "white",
  fontWeight: 600,
  borderRadius: 7,
  margin: "5px 40px 5px 40px",
  fontSize: "16px"
}


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
            <li key={event.id} 
                style={LIStyling}
                className="item">
                                  <EventItem event={event} />
            </li>
          ))
        )
    
        return (
          <div className="App" id="app">

            <ul className="item-index-container" style={IndexStyling}>
              {events}
            </ul>

              <button 
                type="button" 
                onClick={() => this.updateEvents('prev')}
                style={NavButtons}>
                  Prev
              </button>

              <button 
                type="button" 
                onClick={() => this.updateEvents('next')}
                style={NavButtons}>
                  Next
              </button>

          </div>
        );
      }
    }
  )
)


export default EventIndex;
