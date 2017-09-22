import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DiaryFoods extends Component {
    render() {
        const foodRows = (
            <tr>
                <td colSpan='7'>No foods logged today</td>
            </tr>
        );

        if (this.props.foods.length > 0) {
            const foodRows = this.props.foods.map((food, idx) => (
                <tr key={idx}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ));
        }

        return (
            <div className='diaryFoods col-md-12 center-block'>
                <table className="table table-hover table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Amount</th>
                            <th>Unit</th>
                            <th>Calories</th>
                            <th>Protein (g)</th>
                            <th>Fat (g)</th>
                            <th>Carbs (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DiaryFoods;
