import React from 'react';

import { routerHook } from 'logic/router';

const GalleryPage = props => {
	const handleClick = () => {
		routerHook.routeTo('/');
	}
	return(
		<div style={{ position: 'fixed', top: '0', left:'0', height: '50%', width: '100%', backgroundColor: 'red'}}>
			<h1 className={ `dark` }>This is the gallery</h1>
			<button onClick={ handleClick }>Home</button>
		</div>
	);
}

export default GalleryPage;