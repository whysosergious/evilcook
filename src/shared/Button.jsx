/**
 * Button
 */
import React from 'react';
import './Button.css';

const Button = ({ text, altClass, style, textColor, clicked }) => {

	const handleClick = () => {
		clicked();
	}

   return (
      <button className={ altClass }
			style={ style }
			onClick={ handleClick }
		>
			<h2 style={{ color: textColor, borderColor: textColor }}>{ text }</h2>
		</button>
   );
}

export default Button;