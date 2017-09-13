import React, { Component } from 'react';
import { Button, Pagination } from 'react-bootstrap';

class FoodResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemStart: 0,
            itemEnd: 10
        }
    }
    getReport = function(ndbno) {
        this.props.report(ndbno);
    }

    handleSelect = function (e) {
        this.setState({
            activePage: e,
            itemStart: 10*e,
            itemEnd: 10 + 10*e
        });
    }
    render() {
        const foodRows = this.props.foods.map((food, idx) => (
            <tr key={idx}>
                <td>{food.name}</td>
                <td>
                    <Button onClick={() => this.getReport(food.ndbno)}>
                        Nutrition Info
                    </Button>
                </td>
            </tr>
        ));

        if (this.props.foods.length > 0) {
            return (
                <div className='searchResults col-md-8 center-block'>
                    <table className="table table-hover table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th colSpan='2'>Results</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodRows.slice(this.state.itemStart, this.state.itemEnd)}
                        </tbody>
                    </table>
                    <div>
                        <Pagination
                            prev
                            next
                            ellipsis
                            maxButtons={5}
                            bsSize='medium'
                            items={Math.ceil(this.props.foods.length/10-1)}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect.bind(this)} />
                        <br />
                    </div>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

export default FoodResults;
