import React, {Component} from 'react';
import FoodSearch from './FoodSearch';
import Diary from './Diary';
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
        this.setState({message: 'Hello', fetching: false});
        this.databaseQuery();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className="App-intro">
                        {'Welcome to '}
                        <a target="new" href="https://github.com/williamliu52/my-food-pal">
                            {'MyFoodPal'}
                        </a>
                        {this.state.id}
                    </h2>
                </div>
                <Diary />
                <FoodSearch/>
            </div>
        );
    }
}

export default App;
