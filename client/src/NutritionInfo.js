import React, { Component } from 'react';

const MACROS = ["Energy", "Protein", "Total lipid (fat)",
                "Carbohydrate, by difference", "Sodium, Na",
                "Sugars, total", "Fiber, total dietary"];
const MACRO_SET = new Set(MACROS);

class NutritionInfo extends Component {
    render() {
        let nutrients = "";
        if (this.props.info) {
            nutrients = this.props.info.map((nutrient, idx) => {
                if (MACRO_SET.has(nutrient.name)) {
                    return <tr key={idx}>
                        <td>{nutrient.name}</td>
                        <td>{nutrient.unit}</td>
                        <td>{nutrient.value}</td></tr>;
                }
            });
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
