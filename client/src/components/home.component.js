import React, { useState, useEffect } from "react";
import axios from 'axios';

function Search() {
	const [data, setData] = useState({ entries: [] });
	const [zone, setZone] = useState('zone');

  	useEffect(() => {
    	let ignore = false;

    	async function fetchData() {
      		const result = await axios('http://localhost:4000/entries/view/' + zone);
      		if (!ignore) setData(result.data);
    	}

    	fetchData();
    	return () => { ignore = true; }
  	}, [zone]);

  	return (
    	<>
		    <input value={zone} onChange={e => setZone(e.target.value)} />
		    <h2>Warnings for {zone}</h2>
	      	<table className="table table-striped" style={{marginTop: 20}}>
	      		<thead>
	      			<tr>
	      				<th>Time submitted</th>
	      				<th>Description</th>
	      				<th>Author</th>
	      			</tr>
	      		</thead>
	      		<tbody>
			        {data.entries.map(item => (
			        	<tr key={item._id}>
			        		<td>{item.entry_time}</td>
			        		<td>{item.entry_description}</td>
			        		<td>{item.entry_author}</td>
				        </tr>
			        ))}
	      		</tbody>
	      	</table>
	    </>
  	);
}
export default Search;