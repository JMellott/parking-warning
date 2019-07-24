import React, { Component } from "react";
import axios from 'axios';

export default class AddWarning extends Component {
	constructor(props) {
        super(props);

        this.onChangeEntryDescription = this.onChangeEntryDescription.bind(this);
        this.onChangeEntryTime = this.onChangeEntryTime.bind(this);
        this.onChangeEntryAuthor = this.onChangeEntryAuthor.bind(this);
        this.onChangeEntryZone = this.onChangeEntryZone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            entry_description: '',
            entry_time: '',
            entry_author: '',
            entry_zone: ''
        }
    }

    onChangeEntryDescription(e) {
        this.setState({
            entry_description: e.target.value
        });
    }

    onChangeEntryTime(e) {
        this.setState({
            entry_time: e.target.value
        });
    }

    onChangeEntryAuthor(e) {
        this.setState({
            entry_author: e.target.value
        });
    }

    onChangeEntryZone(e) {
        this.setState({
            entry_zone: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Entry Description: ${this.state.entry_description}`);
        console.log(`Entry Time: ${this.state.entry_time}`);
        console.log(`Entry By: ${this.state.entry_author}`);
        console.log(`Entry Zone: ${this.state.entry_zone}`);
        
        const newEntry = {
            entry_description: this.state.entry_description,
            entry_time: this.state.entry_time,
            entry_author: this.state.entry_author,
            entry_zone: this.state.entry_zone
        };

        axios.post('http://localhost:4000/entries/add', newEntry)
            .then(res => console.log(res.data));

        this.setState({
            entry_description: '',
            entry_time: '',
            entry_author: '',
            entry_zone: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add Warning</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.entry_description}
                                onChange={this.onChangeEntryDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.entry_time}
                                onChange={this.onChangeEntryTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.entry_author}
                                onChange={this.onChangeEntryAuthor}
                                />
                    </div>
                    <div className="form-group">
                        <label>Zone: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.entry_zone}
                                onChange={this.onChangeEntryZone}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Entry" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}