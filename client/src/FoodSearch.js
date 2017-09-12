import React, { Component } from 'react';
import {Button, FormControl, FormGroup} from 'react-bootstrap';
import USDA from './USDA';
import NutritionInfo from './NutritionInfo';
import FoodResults from './FoodResults';
import './FoodSearch.css';

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],         // list of foods returned from search
            clearQuery: false, // button to clear search box
            query: "",         // actual words in search box
            nutrients: ""      // food nutrients info
        };
    }

    // function to handle text being input into search box
    handleQueryChange = function (e) {
        this.setState({
            query: e.target.value
        });
    }

    // function to handle search button being clicked; calls USDA.search
    handleSearch = function (e) {
        e.preventDefault();
        const text = this.state.query
        if (text) {
            USDA.search(text, results => {
                this.setState({
                    foods: results,
                    nutrients: ""
                });
            });

            this.setState({
                clearQuery: true
            });
        } else {
            this.setState({
                clearQuery: false
            });
        }
    }

    // function to handle clear button being called
    handleSearchCancel = function () {
        this.setState({
            foods: [],
            clearQuery: false,
            query: ""
        });
    };

    // function to handle search button being clicked; calls USDA.report
    handleReport = function (ndbno) {
        if (ndbno) {
            USDA.report(ndbno, results => {
                this.setState({
                    nutrients: results
                });
            });
        }
    }

    render() {
        return (
            <div className='search'>
                <form className='search-box form-inline' onSubmit={this.handleSearch.bind(this)}>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Search for a food'
                            value={this.state.query}
                            onChange={this.handleQueryChange.bind(this)}
                        />
                    <Button type='submit' className='search-btn btn btn-default'>Search</Button>
                    </FormGroup>
                </form>
                <FoodResults
                    report={this.handleReport.bind(this)}
                    foods={this.state.foods}
                />
                <NutritionInfo info={this.state.nutrients} />
            </div>
        )
    }
}

export default FoodSearch;
