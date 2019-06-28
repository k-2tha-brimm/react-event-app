import React from 'react';
import '../css/App.css';
import EventItem from './EventItem.js'
import { inject, observer } from 'mobx-react';


const App = inject("appStore") (
  observer(
    class App extends React.Component {

      componentWillMount() {
        this.props.appStore.fetchEvents(this.props.appStore.offset);
      }


      updateEvents(field) {
        if(field === 'next') {
          this.props.appStore.increaseOffset();
        } else {
          if(this.props.appStore.offset > 0) {
            this.props.appStore.decreaseOffset();
          }
        }
      }
    
      render () {

        let events = (
          this.props.appStore.events.map(event => (
            <li key={event.id} style={{listStyle: "none"}}><EventItem event={event} /></li>
          ))
        )
    
        return (
          <div className="App">
            <div className="item-container">
              {events}
            </div>
              <button type="button" onClick={() => this.updateEvents('prev')}>Next</button>
              <button type="button" onClick={() => this.updateEvents('next')}>Next</button>
          </div>
        );
      }
    }
  )
)


export default App;
