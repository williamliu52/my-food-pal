import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Diary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDate: new Date()
        }
    }

    handleBack = function (e) {
        this.setState({
            activeDate: new Date(this.state.activeDate.setDate(this.state.activeDate.getDate()-1))
        })
    }
    handleForward = function (e) {
        this.setState({
            activeDate: new Date(this.state.activeDate.setDate(this.state.activeDate.getDate()+1))
        })
    }

    render() {
        return (
            <div className='col-md-4'>
                <Button onClick={this.handleBack.bind(this)}>{'<'}</Button>
                {this.state.activeDate.toDateString()}
                <Button onClick={this.handleForward.bind(this)}>{'>'}</Button>
            </div>
        )
    }
}

export default Diary;
