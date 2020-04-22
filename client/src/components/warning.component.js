import React from 'react';

const Warning = (item) => {
	console.log(item.item);
	return (
		<tr>
			<td>{item.item.time}</td>
			<td>{item.item.description}</td>
			<td>{item.item.location.coordinates}</td>
		</tr>
	)
}

export default Warning;