import React, { Component } from 'react';
import FoodSearch from './FoodSearch';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    let params = {
        'format': 'json',
        'q': 'butter',
        'sort': 'n',
        'max': 10,
        'offset': 0,
        'api_key': 'DEMO_KEY'
    };

    fetch('/api/search', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(params)
        // body: params
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'Welcome to '}
          <a target="new" href="https://github.com/williamliu52/my-food-pal">
            {'MyFoodPal'}
          </a><br/>
        </p>
        <p className="App-intro">
          {'Keyword: '}
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
        <FoodSearch />
      </div>
    );
  }
}

export default App;
