import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DiaryFoods from './DiaryFoods';

class Diary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDate: new Date(),
            diaryFoods: []
        }
    }

    componentDidUpdate() {
        this.getDiaryFoods(this.state.activeDate.toDateString());
    }

    getDiaryFoods = function (date) {
        // Date comes in as: Fri Sept 22 2017
        let splitDate = date.split(" ");
        let parsedDate = splitDate[1] + '-' + splitDate[2] + '-' + splitDate[3];
        let route = '/db/getDiaryFoods/' + parsedDate
        fetch('/db/getDiaryFoods', {
            method: 'get'
        }).then(resp => {
            if (!resp.ok) {
                throw new Error(`status ${resp.status}`);
            }
            return resp.json();
        }).then(json => {
            this.setState({
                diaryFoods: json
            });
        });
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
            <div className='col-md-5'>
                <Button onClick={this.handleBack.bind(this)}>{'<'}</Button>
                {this.state.activeDate.toDateString()}
                <Button onClick={this.handleForward.bind(this)}>{'>'}</Button>
                <DiaryFoods foods={this.state.diaryFoods} />
            </div>
        )
    }
}

export default Diary;
