import React, { Component } from 'react';
import USDA from './USDA';

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [], // list of foods returned from search
            clearQuery: false, // button to clear search box
            query: "" // actual words in search box
        };
    }

    // function to handle text being input into search box
    handleQueryChange = (e) => {
        this.setState({
            query: e.target.value
        });
    };

    handleSearch = (e) => {
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
    handleSearchCancel = () => {
        this.setState({
            foods: [],
            clearQuery: false,
            query: ""
        });
    };

    render() {
        // temp table holding foods until components are created
        const foodRows = this.state.foods.map((food, idx) => (
            <tr key={idx}>
                <td>{food.name}</td>
                <td>{food.group}</td>
            </tr>
        ));

        return (
            <div className='search'>
                <form className='form-inline' onSubmit={this.handleSearch}>
                    <div className='form-group searchBox'>
                        <label for='foodSearchBox'>Search</label>
                        <input
                            type='text'
                            className='form-control'
                            id='foodSearchBox'
                            placeholder='Search for a food'
                            value={this.state.query}
                            onChange={this.handleQueryChange}
                        />
                    </div>
                    <button type='submit' className='btn btn-default'>Search</button>
                </form>
                <div className='center-block searchResults col-md-8 center-block'>
                    <table className="table table-hover table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
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
