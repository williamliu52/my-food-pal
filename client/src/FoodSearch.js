import React, { Component } from 'react';
import {Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import USDA from './USDA';

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [],         // list of foods returned from search
            clearQuery: false, // button to clear search box
            query: "",         // actual words in search box
            nutrients: {}      // food nutrients info
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
                    foods: results
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
        // temp table holding foods until components are created
        const foodRows = this.state.foods.map((food, idx) => (
            <tr key={idx}>
                <td>{food.name}</td>
                <td>
                    <Button onClick={() => this.handleReport(food.ndbno)}>
                        Nutrition Info
                    </Button>
                </td>
            </tr>
        ));

        return (
            <div className='search'>
                <form className='form-inline' onSubmit={this.handleSearch.bind(this)}>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Search for a food'
                            value={this.state.query}
                            onChange={this.handleQueryChange.bind(this)}
                        />
                    <Button type='submit' className='btn btn-default'>Search</Button>
                    </FormGroup>
                </form>
                <div className='center-block searchResults col-md-6 center-block'>
                    <table className="table table-hover table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th colSpan='2'>Food</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodRows.slice(0,9)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}

export default FoodSearch;
