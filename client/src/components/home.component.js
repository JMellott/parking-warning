import React, { Component } from "react";
import ViewWarnings from "./view-warnings.component";

export default class Home extends Component	{
	constructor(props) {
		super(props);

		this.state = {
			locationPermission : false,
			currentLocation : []
		}
	}

	componentDidMount() {
		navigator.permissions.query({name: 'geolocation'}).then((result) => {
			if (result.state == 'granted') {
				navigator.geolocation.getCurrentPosition(success, error);

		        const self = this;
		        function success(pos) {
		            const coords = pos.coords;
		            self.setState({
		            	locationPermission: true,
		                currentLocation: [coords.longitude, coords.latitude]
		            });
		        }

		        function error() {
		            console.log("Unable to retrieve location.");
		        }

			} else if (result.state == 'prompt') {
				navigator.geolocation.getCurrentPosition(success, error);

		        const self = this;
		        function success(pos) {
		            const coords = pos.coords;
		            self.setState({
		            	locationPermission: true,
		                currentLocation: [coords.longitude, coords.latitude]
		            });
		        }

		        function error() {
		            console.log("Unable to retrieve location.");
		        }
			}
		});
	}

  	render() {
  		const locationEnabled = this.state.locationPermission;
  		let content;

  		if (locationEnabled == false) {
  			return (
  				<div style={{marginTop: 10}}>
  					<h2>Your location is blocked. :(</h2>
  					<p>We need to access your location in order to find information 
  						for your area! If you want to use this application, please 
  						enable location permissions for this app.</p>
  				</div>
  			)
  		}

        return (
            <div style={{marginTop: 10}}>
                <ViewWarnings currentLocation={this.state.currentLocation}/>
            </div>
        )
    }
}


			///         {data.entries.map(item => (
			//         	<tr key={item._id}>
			//         		<td>{item.entry_time}</td>
			//         		<td>{item.entry_description}</td>
			//         		<td>{item.entry_author}</td>
			// 	        </tr>
			//         ))}
	  //     		</tbody>
	  //     	</table>
	  //   </>
  	// );