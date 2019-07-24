import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Entry = props => (
    <tr>
        <td>{props.entry.entry_description}</td>
        <td>{props.entry.entry_time}</td>
        <td>{props.entry.entry_author}</td>
        <td>{props.entry.entry_zone}</td>
    </tr>
)

export default class Home extends Component {
	constructor(props) {
        super(props);


        this.onChangeEntryZone = this.onChangeEntryZone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
        	entries: [],
        	entry_zone: ''
        }
    }

    onChangeEntryZone(e) {
        this.setState({
            entry_zone: e.target.value
        });
        console.log(this.state);
    }

    entryList() {
    	return this.state.entries.map(function(currentEntry, i) {
    		return <Entry entry={currentEntry} key={i} />;
    	})
    }

    onSubmit(e) {
        e.preventDefault();

        const zone = this.state.entry_zone;
        
        console.log(`Form submitted:`);
        console.log(`Entry Zone: ` + zone);

        axios.get(`http://localhost:4000/entries/view/${this.state.entry_zone}`)
    		.then(response => {
    			this.setState({entries: response.data,
    				entry_zone: zone});
    			console.log(this.state);
    		})
    		.catch(function (error) {
    			console.log(error);
    		})



        this.setState({
            entries: [],
            entry_zone: ''
        })
    }

	render() {
		return (
			<div style={{marginTop: 10}}>
                <h3>Search for a parking zone here:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <input  type="text"
                                className="form-control"
                                value={this.state.entry_zone}
                                onChange={this.onChangeEntryZone}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>
            </div>
		)
	}
}

function WarningList(props) {
	return (
		<p>{props.entries}</p>
	);
}