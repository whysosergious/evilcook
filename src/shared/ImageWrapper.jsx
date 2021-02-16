/**
 * Image wrapper
 */
import React from 'react';

const ImageWrapper = ({ imgSrc, imgDesc, altClass, style, clicked, index }) => {

   return (
      <div className={ `Image-Wrapper ${ altClass }` }
			style={ style }
			onClick={ ()=>clicked(index) }

		>
			<img src={ imgSrc } alt={ imgDesc || "No decription available" } />
		</div>
   );
}

export default ImageWrapper;