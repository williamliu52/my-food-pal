import React, { Component } from 'react';

class NutritionInfo extends Component {
    render() {
        let nutrients = "";
        if (this.props.info) {
            nutrients = this.props.info.map((nutrient, idx) => (
                <tr key={idx}>
                    <td>{nutrient.name}</td>
                    <td>{nutrient.unit}</td>
                    <td>{nutrient.value}</td>
                </tr>
            ));
            return (
                <div className='col-md-4'>
                    <table className="table table-hover table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th colSpan='3'>Nutrition Info</th>
                            </tr>
                            <tr>
                                <th>Nutrient</th>
                                <th>Unit</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutrients}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div className='col-md-4'></div>
            )
        }
    }
}

export default NutritionInfo;
