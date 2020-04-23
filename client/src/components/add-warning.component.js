import React, { Component } from "react";
import axios from 'axios';

export default class AddWarning extends Component {
	constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onClickLocation = this.onClickLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            time: '',
            location: []
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }

    onClickLocation(e) {
        navigator.geolocation.getCurrentPosition(success, error);

        const self = this;
        function success(pos) {
            const coords = pos.coords;
            self.setState({
                location: [coords.longitude, coords.latitude]
            });
        }

        function error() {
            console.log("Unable to retrieve location.");
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Entry Description: ${this.state.description}`);
        console.log(`Entry Time: ${this.state.time}`);
        console.log(`Entry Location: ${this.state.location}`);
        
        const newEntry = {
            description: this.state.description,
            time: this.state.time,
            location: [this.state.location[0], this.state.location[1]]
        };

        axios.post('https://parksaverapi.herokuapp.com/add', newEntry)
            .then(res => console.log(res.data))
            .then(
                this.setState({
                    description: '',
                    time: '',
                    location: []
                })
            );

        
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
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.time}
                                onChange={this.onChangeTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input 
                                type="button" 
                                className="form-control"
                                value= "Get Current Location"
                                onClick={this.onClickLocation}
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