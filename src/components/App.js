import React from 'react';
import '../css/App.css';
import EventItem from './EventItem.js'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: null,
      offset: 0
    }
  }
  
  componentDidMount() {
    fetch(`http://api.my-events.site/api/v1/events/?limit=20&offset=${this.state.offset}`)
      .then(res => res.json())
      .then(data => this.setState({events: data.results}));
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(prevState.offset !== nextProps.offset) {
  //     return { offset: nextProps.offset };
  //   } else {
  //     return null;
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.offset !== this.state.offset) {
      console.log('I have been reached');
      fetch(`http://api.my-events.site/api/v1/events/?limit=20&offset=${this.state.offset}`)
        .then(res => res.json())
        .then(data => this.setState({events: data.results}));
    };
  }


  updateEvents(field) {
    let off = this.state.offset;
    if(field === 'next') {
      return e => this.setState({
        offset: off += 20
      });
    } else if(field === 'prev') {
      return e => this.setState({
        offset: off -= 20
      });
    }
  }

  render () {

    if(!this.state.events) {
      return null;
    } else {
      console.log(this.state);
    }

    let events = (
      this.state.events.map(event => (
        <li key={event.id} style={{listStyle: "none"}}><EventItem event={event} /></li>
      ))
    )

    return (
      <div className="App">
        <div className="item-container">
          {events}
        </div>
          <button type="button" onClick={() => this.updateEvents('prev').bind(this)}>Next</button>
          <button type="button" onClick={() => this.updateEvents('next').bind(this)}>Next</button>
      </div>
    );
  }
}

export default App;
