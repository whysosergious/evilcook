/**
 * Anchor element
 */
import React, { useState, useEffect } from 'react';
import './Anchor.css';

const Anchor = ({ text, altClass, style, link, fileName, clicked }) => {

	// dynamically import media :)
	const [ icon, setIcon ] = useState(null);

	useEffect(() => {
		import(`ass/vector/icons/files/${ fileName }`).then(ico => {
			setIcon(ico.default);
		});
	}, [fileName]);

	if(!icon) return(null);

	let textMargin = text ? { marginRight: '.4rem' } : null ;
	let iconSrc = altClass === 'icon'
		?
		<img src={ icon }
			alt={ `${ fileName } icon` }
			style={ textMargin }
		/>
		:
		null;

	const handleClick = event => {
		event.preventDefault();
		clicked();
	}

   return (
      <a className={ `Anchor ${ altClass }` }
			style={ style }
			href={ link }
			target="_blank"
			rel="noreferrer"
			onClick={ clicked && handleClick }
		>
			{ iconSrc }
			<h4>{ text }</h4>
		</a>
   );
}

export default Anchor;