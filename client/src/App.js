import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import AddWarning from "./components/add-warning.component";

class App extends Component {
	render() {
		return (
    		<Router>
    			<div className="container">
      				<nav className="navbar navbar-expand-lg navbar-light bg-light">
      	  				<Link to="/" className="navbar-brand">View Nearby</Link>
                  <Link to="/add" className="navbar-brand">Add Warning</Link>
      	  		</nav>
      	  		<br/>

			        <Route path="/" exact component={Home} />
			        <Route path="/add" component={AddWarning} />
			    </div>
      </Router>
    );
  }
}

export default App;
