import React from 'react';

import Warning from './warning.component';

const WarningList = (warnings) => {
	const data = warnings['warnings'];
	const items = [];
	let i = 0;
	while (i < data.length) {
		items.push(<Warning item={data[i]}/>);
		i++;
	}

	return (
		<table class="table table-striped">
			<thead class="thead-dark">
				<tr>
			    	<th scope="col">Time</th>
			    	<th scope="col">Description</th>
			    	<th scope="col">Location</th>
			    </tr>
			</thead>
			<tbody>
				{items}
			</tbody>
		</table>
	)
}

export default WarningList;