import React from 'react';

const Day = ({ day, hours }) => {
	return(
		<div className="Day">
			<h3 className="accent">{ day }</h3>
			<h3>{ hours }</h3>
		</div>
	);
}

export default Day;