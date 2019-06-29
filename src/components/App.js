import React from 'react';
import '../css/App.css';
import EventItem from './EventItem.js'
import { inject, observer } from 'mobx-react';


const App = inject("appStore") (
  observer(
    class App extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          loading: this.props.appStore.loading
        }
      }

      componentWillMount() {
        this.props.appStore.fetchEvents(this.props.appStore.offset)
          .then(() => this.setState({ loading: false}));
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

        console.log(this.props.appStore.events.length);

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
