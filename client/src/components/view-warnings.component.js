import React, { Component } from "react";
import axios from 'axios';

import WarningList from "./warning-list.component";

export default class ViewWarnings extends Component {
	constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);

        this.state = {
        	currentLocation: props.currentLocation, 
            warnings : [],
            isLoading : true
        }
    }

    componentDidMount() {
    	const locationData = {
    		location: this.state.currentLocation
    	}

    	this.fetchData(locationData);
        this.timer = setInterval(() => this.fetchData(locationData), 30000);
    }

    async fetchData(loc) {
    	try {
    		this.setState({isLoading: true});
    		const result = await axios.post('https://parksaverapi.herokuapp.com/view/', loc);
    		this.setState({
    			warnings: result.data,
    			isLoading: false
    		});
    	}

    	catch (e) {
    		console.log(e);
    		this.setState({
    			isLoading: false
    		});
    	}
    }

	render() {
		if (this.state.isLoading) {
			return (
				<div style = {{marginTop: 10}}>
					<h1>Loading...</h1>
				</div>
			)
		}
		return (
			<div style={{marginTop: 10}}>
                <h3>Warnings Near You:</h3>
                <WarningList warnings={this.state.warnings}/>
            </div>
		)
	}
}