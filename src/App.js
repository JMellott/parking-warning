import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Search from "./components/search.component";
import AddWarning from "./components/add-warning.component";
import ViewWarnings from "./components/view-warnings.component";

import logo from "./logo.svg";

class App extends Component {
	render() {
		return (
    		<Router>
    			<div className="container">
      				<nav className="navbar navbar-expand-lg navbar-light bg-light">
      	  				<a class="navbar-brand" href="https://google.com" target="_blank">
      	  					<img src={logo} width="30" height="30" alt="google.com"/>
      	  				</a>
      	  				<Link to="/" className="navbar-brand">Parking Warnings</Link>
      	  				<div className="collapse navbar-collapse">
      	  					<ul className="navbar-nav mr-auto">
      	  						<li className="navbar-item">
      	  							<Link to="/" className="nav-link">Zones</Link>
      	  						</li>
      	  					</ul>
      	  				</div>
      	  			</nav>
      	  			<br/>

			        <Route path="/" exact component={Search} />
			        <Route path="/add" component={AddWarning} />
			        <Route path="/view/:zone" component={ViewWarnings} />
			    </div>
      </Router>
    );
  }
}

export default App;
