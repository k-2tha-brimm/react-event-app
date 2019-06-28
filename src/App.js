import React from 'react';
import './App.css';
import EventItem from './EventItem.js'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: null
    }
  }

  componentDidMount() {
    fetch("http://api.my-events.site/api/v1/events/?limit=20")
      .then(res => res.json())
      .then(data => this.setState({events: data.results}))
  }

  render () {

    if(!this.state.events) {
      return null;
    }

    let events = (
      this.state.events.map((event, idx) => (
        <li key={idx} style={{listStyle: "none"}}><EventItem event={event} /></li>
      ))
    )

    return (
      <div className="App">
        <div className="item-container">
          {events}
        </div>
      </div>
    );
  }
}

export default App;
